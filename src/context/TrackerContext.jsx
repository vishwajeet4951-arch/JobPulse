import { createContext, useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage.js';

const TrackerContext = createContext(null);

export const STORAGE_KEY = 'jobpulse_applications_v1';
export const CURRENT_SCHEMA_VERSION = '1.0.0';
export const VALID_STAGES = ['saved', 'applied', 'interviewing', 'offer'];

/**
 * Validates an imported JSON payload (supports both versioned schema and legacy array format).
 * @param {string} jsonData
 * @returns {{ valid: boolean, records: Array, count: number, version: string, error: string | null }}
 */
export function validateImportPayload(jsonData) {
  if (!jsonData || typeof jsonData !== 'string' || !jsonData.trim()) {
    return { valid: false, records: [], count: 0, version: 'unknown', error: 'Uploaded file is empty.' };
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonData);
  } catch (err) {
    return { valid: false, records: [], count: 0, version: 'unknown', error: `Invalid JSON syntax: ${err.message}` };
  }

  let rawList = [];
  let schemaVersion = CURRENT_SCHEMA_VERSION;

  if (Array.isArray(parsed)) {
    rawList = parsed;
    schemaVersion = 'legacy';
  } else if (parsed && typeof parsed === 'object') {
    if (parsed.version && !parsed.version.startsWith('1.')) {
      return {
        valid: false,
        records: [],
        count: 0,
        version: parsed.version,
        error: `Unsupported backup version "${parsed.version}". Only 1.x backups are supported.`
      };
    }
    if (Array.isArray(parsed.applications)) {
      rawList = parsed.applications;
      schemaVersion = parsed.version || CURRENT_SCHEMA_VERSION;
    } else {
      return {
        valid: false,
        records: [],
        count: 0,
        version: parsed.version || 'unknown',
        error: 'Backup JSON object missing "applications" array.'
      };
    }
  } else {
    return { valid: false, records: [], count: 0, version: 'unknown', error: 'Root JSON is neither an array nor a backup object.' };
  }

  // Validate individual records
  const validRecords = [];
  for (let i = 0; i < rawList.length; i++) {
    const r = rawList[i];
    if (!r || typeof r !== 'object') continue;

    // Required fields: title, company, status
    if (!r.title || typeof r.title !== 'string' || !r.company || typeof r.company !== 'string') {
      continue;
    }

    const status = VALID_STAGES.includes(r.status) ? r.status : 'saved';
    const now = new Date().toISOString();

    validRecords.push({
      id: r.id || `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      jobId: r.jobId || `job_custom_${Math.random().toString(36).substring(2, 7)}`,
      title: r.title.trim(),
      company: r.company.trim(),
      location: r.location || 'Remote',
      salary: r.salary || null,
      category: r.category || 'Engineering',
      seniority: r.seniority || 'Mid-Level',
      workMode: r.workMode || 'Remote',
      status,
      matchScore: typeof r.matchScore === 'number' && !isNaN(r.matchScore) ? r.matchScore : null,
      notes: typeof r.notes === 'string' ? r.notes : '',
      appliedDate: r.appliedDate || (status === 'applied' ? now : null),
      interviewDate: r.interviewDate || (status === 'interviewing' ? now : null),
      offerDate: r.offerDate || (status === 'offer' ? now : null),
      createdAt: r.createdAt || now,
      updatedAt: r.updatedAt || now
    });
  }

  if (validRecords.length === 0) {
    return {
      valid: false,
      records: [],
      count: 0,
      version: schemaVersion,
      error: 'No valid application records found with required fields (title, company).'
    };
  }

  return {
    valid: true,
    records: validRecords,
    count: validRecords.length,
    version: schemaVersion,
    error: null
  };
}

export function TrackerProvider({ children }) {
  const [applications, setApplications] = useLocalStorage(STORAGE_KEY, []);

  // Add a new job to tracker or update status if already exists
  const trackJob = useCallback((job, status = 'saved', matchScore = null) => {
    if (!job?.id) return;

    setApplications((prev) => {
      const existingIndex = prev.findIndex((app) => app.jobId === job.id);
      const now = new Date().toISOString();

      if (existingIndex >= 0) {
        // Update existing record
        const updated = [...prev];
        const old = updated[existingIndex];
        updated[existingIndex] = {
          ...old,
          status,
          matchScore: matchScore !== null ? matchScore : old.matchScore,
          appliedDate: status === 'applied' && !old.appliedDate ? now : old.appliedDate,
          interviewDate: status === 'interviewing' && !old.interviewDate ? now : old.interviewDate,
          offerDate: status === 'offer' && !old.offerDate ? now : old.offerDate,
          updatedAt: now
        };
        return updated;
      }

      // Create new application record
      const newEntry = {
        id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        jobId: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        category: job.category || 'Engineering',
        seniority: job.experienceLevel || job.seniority || 'Mid-Level',
        workMode: job.type || job.workMode || 'Remote',
        status,
        matchScore: typeof matchScore === 'number' ? matchScore : null,
        notes: '',
        appliedDate: status === 'applied' ? now : null,
        interviewDate: status === 'interviewing' ? now : null,
        offerDate: status === 'offer' ? now : null,
        createdAt: now,
        updatedAt: now
      };

      return [newEntry, ...prev];
    });
  }, [setApplications]);

  // Update status and timestamps consistently
  const updateApplicationStatus = useCallback((appId, newStatus) => {
    if (!VALID_STAGES.includes(newStatus)) return;

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const now = new Date().toISOString();
        return {
          ...app,
          status: newStatus,
          appliedDate: newStatus === 'applied' && !app.appliedDate ? now : app.appliedDate,
          interviewDate: newStatus === 'interviewing' && !app.interviewDate ? now : app.interviewDate,
          offerDate: newStatus === 'offer' && !app.offerDate ? now : app.offerDate,
          updatedAt: now
        };
      })
    );
  }, [setApplications]);

  // Update notes
  const updateApplicationNotes = useCallback((appId, notes) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          notes: typeof notes === 'string' ? notes : '',
          updatedAt: new Date().toISOString()
        };
      })
    );
  }, [setApplications]);

  // General updater for application records
  const updateApplication = useCallback((appId, updates) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          ...updates,
          updatedAt: new Date().toISOString()
        };
      })
    );
  }, [setApplications]);

  // Remove application
  const removeApplication = useCallback((appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  }, [setApplications]);

  const isJobTracked = useCallback((jobId) => {
    return applications.some((app) => app.jobId === jobId);
  }, [applications]);

  const getApplicationByJobId = useCallback((jobId) => {
    return applications.find((app) => app.jobId === jobId) || null;
  }, [applications]);

  // Counts by stage
  const countsByStatus = useMemo(() => {
    const counts = { saved: 0, applied: 0, interviewing: 0, offer: 0 };
    applications.forEach((app) => {
      if (counts[app.status] !== undefined) {
        counts[app.status] += 1;
      }
    });
    return counts;
  }, [applications]);

  // Formulated Analytics Metrics (Documented & Zero-Denominator Safe)
  const analytics = useMemo(() => {
    const totalCount = applications.length;
    const { saved, applied, interviewing, offer } = countsByStatus;

    // Active Opportunities: Applications in Applied or Interviewing stages
    // (actively moving through hiring pipeline, excluding inactive Saved and terminal Offer)
    const activeOpportunities = applied + interviewing;

    // Pipeline Submissions: Total that reached Applied or further
    const appliedOrFurther = applied + interviewing + offer;

    // Interviewing or further: Total that reached Interviewing or Offer
    const interviewedOrFurther = interviewing + offer;

    // 1. Application Rate: % of tracked jobs actually submitted (applied or beyond)
    // Denominator: Total tracked applications
    const applicationRate = totalCount > 0 ? Math.round((appliedOrFurther / totalCount) * 100) : 0;

    // 2. Interview Rate: % of submitted applications advancing to interview or offer
    // Denominator: Applications that were submitted (appliedOrFurther)
    const interviewRate = appliedOrFurther > 0 ? Math.round((interviewedOrFurther / appliedOrFurther) * 100) : 0;

    // 3. Offer Rate: % of interviewed candidates securing an offer
    // Denominator: Applications that reached interview stage (interviewedOrFurther)
    const offerRate = interviewedOrFurther > 0 ? Math.round((offer / interviewedOrFurther) * 100) : 0;

    // Average ATS Match Score: Arithmetic mean of valid numerical scores
    const scoredApps = applications.filter(
      (app) => typeof app.matchScore === 'number' && !isNaN(app.matchScore)
    );
    const avgMatchScore =
      scoredApps.length > 0
        ? Math.round(scoredApps.reduce((acc, a) => acc + a.matchScore, 0) / scoredApps.length)
        : null;

    return {
      totalCount,
      countsByStatus,
      activeOpportunities,
      applicationRate,
      interviewRate,
      offerRate,
      avgMatchScore,
      scoredCount: scoredApps.length
    };
  }, [applications, countsByStatus]);

  // Export versioned JSON backup
  const exportData = useCallback(() => {
    const exportPayload = {
      version: CURRENT_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      source: 'JobPulse Application Tracker',
      count: applications.length,
      applications
    };

    const dataStr = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jobpulse_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [applications]);

  // Validate import string without side-effects
  const validateImport = useCallback((jsonData) => {
    return validateImportPayload(jsonData);
  }, []);

  // Apply import: supports either 'merge' or 'replace' mode
  const applyImport = useCallback((records, mode = 'merge') => {
    if (!Array.isArray(records) || records.length === 0) {
      return { success: false, error: 'No records to import.' };
    }

    if (mode === 'replace') {
      setApplications(records);
      return { success: true, count: records.length, mode: 'replace' };
    }

    // Merge mode: deduplicate by jobId or id
    setApplications((prev) => {
      const merged = [...prev];
      let importedNewCount = 0;

      for (const incoming of records) {
        const existingIdx = merged.findIndex(
          (m) => (incoming.jobId && m.jobId === incoming.jobId) || m.id === incoming.id
        );

        if (existingIdx >= 0) {
          // Conflict handling: merge fields, keep existing notes if incoming notes are blank
          const existing = merged[existingIdx];
          merged[existingIdx] = {
            ...existing,
            ...incoming,
            notes: incoming.notes ? incoming.notes : existing.notes,
            matchScore: incoming.matchScore !== null ? incoming.matchScore : existing.matchScore,
            updatedAt: new Date().toISOString()
          };
        } else {
          merged.unshift(incoming);
          importedNewCount++;
        }
      }

      return merged;
    });

    return { success: true, count: records.length, mode: 'merge' };
  }, [setApplications]);

  // Backward-compatible importData method
  const importData = useCallback((jsonData) => {
    const validation = validateImportPayload(jsonData);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    return applyImport(validation.records, 'merge');
  }, [applyImport]);

  const value = {
    applications,
    trackJob,
    saveJob: (job) => trackJob(job, 'saved'),
    updateApplicationStatus,
    updateApplicationNotes,
    updateApplication,
    removeApplication,
    isJobTracked,
    getApplicationByJobId,
    countsByStatus,
    analytics,
    exportData,
    validateImport,
    applyImport,
    importData
  };

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

TrackerProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
}

export default TrackerContext;
