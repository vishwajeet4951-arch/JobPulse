import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Kanban,
  Download,
  Upload,
  ArrowRight,
  Sparkles,
  Database,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useTracker, VALID_STAGES } from '../../context/TrackerContext.jsx';
import { useJobs } from '../../context/JobContext.jsx';
import { useATS } from '../../context/ATSContext.jsx';
import { mockJobs } from '../../data/mockJobs.js';
import TrackerAnalytics from './TrackerAnalytics.jsx';
import TrackerFilters from './TrackerFilters.jsx';
import KanbanBoard from './KanbanBoard.jsx';
import ApplicationListView from './ApplicationListView.jsx';
import ApplicationDetailModal from './ApplicationDetailModal.jsx';
import ImportExportModal from './ImportExportModal.jsx';

/**
 * Module 3: Complete Application Tracker
 * Integrates 4-stage Kanban board, List table view, filter controls,
 * analytics dashboard, detailed application/notes modal, and JSON backup restore.
 */
export function ApplicationTracker({ onNavigateToExplorer, onNavigateToATS }) {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    removeApplication
  } = useTracker();

  const { selectJob } = useJobs();
  const { loadJobIntoATS } = useATS();

  // View & Filter States
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStages, setSelectedStages] = useState([...VALID_STAGES]);
  const [sortBy, setSortBy] = useState('updatedAt-desc');

  // Modal States
  const [activeAppModal, setActiveAppModal] = useState(null);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);

  // Stage toggle handler
  const handleStageToggle = (stg) => {
    setSelectedStages((prev) => {
      if (prev.includes(stg)) {
        // Prevent unchecking all stages; keep at least one
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== stg);
      }
      return [...prev, stg];
    });
  };

  const handleSelectAllStages = () => {
    setSelectedStages([...VALID_STAGES]);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStages([...VALID_STAGES]);
    setSortBy('updatedAt-desc');
  };

  // Check if job exists in mockJobs
  const isJobLinked = (jobId) => {
    return mockJobs.some((j) => j.id === jobId);
  };

  // Cross-module navigation to Job Explorer
  const handleOpenInExplorer = (jobId) => {
    if (jobId && selectJob) {
      selectJob(jobId);
    }
    if (onNavigateToExplorer) {
      onNavigateToExplorer();
    }
  };

  // Cross-module navigation to ATS Matcher
  const handleSendToATS = (jobId) => {
    const matched = mockJobs.find((j) => j.id === jobId);
    if (matched && loadJobIntoATS) {
      loadJobIntoATS(matched);
    }
    if (onNavigateToATS) {
      onNavigateToATS();
    }
  };

  // Derived filtered & sorted applications
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // 1. Search Query Filter (Title or Company)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (app) =>
          (app.title && app.title.toLowerCase().includes(q)) ||
          (app.company && app.company.toLowerCase().includes(q))
      );
    }

    // 2. Stage Filter
    if (selectedStages.length < VALID_STAGES.length) {
      result = result.filter((app) => selectedStages.includes(app.status));
    }

    // 3. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'appliedDate-desc': {
          const timeA = a.appliedDate ? new Date(a.appliedDate).getTime() : 0;
          const timeB = b.appliedDate ? new Date(b.appliedDate).getTime() : 0;
          return timeB - timeA;
        }
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'matchScore-desc':
          return (b.matchScore || 0) - (a.matchScore || 0);
        case 'matchScore-asc':
          return (a.matchScore || 0) - (b.matchScore || 0);
        case 'updatedAt-desc':
        default: {
          const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return timeB - timeA;
        }
      }
    });

    return result;
  }, [applications, searchQuery, selectedStages, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      {/* Tracker Header */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>Offline-First localStorage Persistence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Application Tracker
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Organize your job search across Saved, Applied, Interviewing, and Offer stages.
              Persisted locally with cross-tab synchronization, analytics, and JSON backup.
            </p>
          </div>

          {/* Action Buttons: Backup Modal & Explore */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsBackupModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold shadow-sm transition"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Backup / Restore</span>
            </button>

            {onNavigateToExplorer && (
              <button
                type="button"
                onClick={onNavigateToExplorer}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Section */}
      <TrackerAnalytics />

      {/* Filter and Control Bar */}
      <TrackerFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStages={selectedStages}
        onStageToggle={handleStageToggle}
        onSelectAllStages={handleSelectAllStages}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalMatching={filteredApplications.length}
        totalApplications={applications.length}
        onClearFilters={handleClearFilters}
      />

      {/* Empty State when zero applications exist in system */}
      {applications.length === 0 ? (
        <div className="p-12 sm:p-16 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl space-y-4">
          <Kanban className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-base sm:text-lg font-bold text-white">Your Pipeline is Empty</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Start by saving developer roles from the <strong>Job Explorer</strong> or testing your resume in the <strong>ATS Matcher</strong> to track your first application.
          </p>
          {onNavigateToExplorer && (
            <button
              type="button"
              onClick={onNavigateToExplorer}
              className="mt-2 inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg transition"
            >
              <span>Explore Developer Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : viewMode === 'kanban' ? (
        /* Kanban Board View */
        <KanbanBoard
          applications={filteredApplications}
          onOpenDetails={(app) => setActiveAppModal(app)}
          onStageChange={updateApplicationStatus}
          onDelete={(app) => setAppToDelete(app)}
          onOpenInExplorer={handleOpenInExplorer}
          onSendToATS={handleSendToATS}
          isJobLinked={isJobLinked}
        />
      ) : (
        /* List / Table View */
        <ApplicationListView
          applications={filteredApplications}
          onOpenDetails={(app) => setActiveAppModal(app)}
          onStageChange={updateApplicationStatus}
          onDelete={(app) => setAppToDelete(app)}
          onOpenInExplorer={handleOpenInExplorer}
          onSendToATS={handleSendToATS}
          isJobLinked={isJobLinked}
        />
      )}

      {/* Slide-Over Application Detail & Notes Modal */}
      {activeAppModal && (
        <ApplicationDetailModal
          application={
            // Keep active modal synced with freshest application state
            applications.find((a) => a.id === activeAppModal.id) || activeAppModal
          }
          isOpen={Boolean(activeAppModal)}
          onClose={() => setActiveAppModal(null)}
          onUpdateStatus={updateApplicationStatus}
          onUpdateNotes={updateApplicationNotes}
          onDelete={(app) => removeApplication(app.id)}
          onOpenInExplorer={handleOpenInExplorer}
          onSendToATS={handleSendToATS}
        />
      )}

      {/* Backup / Restore Modal */}
      <ImportExportModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      {appToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Deletion</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove <strong>{appToDelete.title}</strong> at{' '}
              <strong>{appToDelete.company}</strong> from your pipeline?
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setAppToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  removeApplication(appToDelete.id);
                  setAppToDelete(null);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ApplicationTracker.propTypes = {
  onNavigateToExplorer: PropTypes.func,
  onNavigateToATS: PropTypes.func
};

export default ApplicationTracker;
