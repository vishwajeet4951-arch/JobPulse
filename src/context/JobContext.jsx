import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import initialMockJobs from '../data/mockJobs.js';
import useDebounce from '../hooks/useDebounce.js';

const JobContext = createContext(null);

/**
 * Filter Semantics Documentation:
 * -------------------------------------------------------------
 * 1. Within a multi-select dimension (categories, seniorities, workModes, techStack):
 *    Uses OR semantics.
 *    - e.g. workModes: ['Remote', 'Hybrid'] matches jobs that are Remote OR Hybrid.
 *    - e.g. techStack: ['React', 'Node.js'] matches jobs containing React OR Node.js.
 *
 * 2. Across different filter dimensions (Search Query AND Category AND WorkMode AND Experience AND Skills AND MinSalary):
 *    Uses AND semantics.
 *    - Every active dimension must be satisfied for a job to appear in results.
 *
 * 3. Search query:
 *    Matches substring (case-insensitive) across:
 *    - title, company, location, description (overview), required skills, and preferred skills.
 */
export function JobProvider({ children }) {
  const [jobs] = useState(initialMockJobs);
  const [searchQuery, setSearchQuery] = useState('');

  // 250ms debounce preserved specifically for Job Explorer search
  const debouncedQuery = useDebounce(searchQuery, 250);

  const [filters, setFilters] = useState({
    categories: [],
    seniorities: [],
    workModes: [],
    minSalary: 0,
    techStack: []
  });

  const [selectedJobId, setSelectedJobId] = useState(null);

  const resetFilters = () => {
    setFilters({
      categories: [],
      seniorities: [],
      workModes: [],
      minSalary: 0,
      techStack: []
    });
    setSearchQuery('');
  };

  const updateFilter = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const toggleArrayFilter = (filterKey, item) => {
    setFilters((prev) => {
      const currentList = prev[filterKey] || [];
      const exists = currentList.includes(item);
      const updated = exists
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      return {
        ...prev,
        [filterKey]: updated
      };
    });
  };

  const removeFilterItem = (filterKey, item) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: (prev[filterKey] || []).filter((i) => i !== item)
    }));
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Text Search across Title, Company, Location, Description, and Skills
      if (debouncedQuery && debouncedQuery.trim()) {
        const q = debouncedQuery.toLowerCase().trim();
        const matchesTitle = Boolean(job.title?.toLowerCase().includes(q));
        const matchesCompany = Boolean(job.company?.toLowerCase().includes(q));
        const matchesLocation = Boolean(job.location?.toLowerCase().includes(q));
        const descText = (job.description || job.overview || '').toLowerCase();
        const matchesDesc = Boolean(descText.includes(q));

        const allSkills = [
          ...(job.skillsRequired || []),
          ...(job.requiredSkills || []),
          ...(job.preferredSkills || []),
          ...(job.techStack || [])
        ];
        const matchesTech = allSkills.some((s) => s.toLowerCase().includes(q));

        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesDesc && !matchesTech) {
          return false;
        }
      }

      // 2. Category Dimension (OR within categories)
      if (filters.categories.length > 0 && !filters.categories.includes(job.category)) {
        return false;
      }

      // 3. Experience Level Dimension (OR within seniorities)
      const jobSeniority = job.experienceLevel || job.seniority;
      if (filters.seniorities.length > 0 && !filters.seniorities.includes(jobSeniority)) {
        return false;
      }

      // 4. Work Mode Dimension (OR within workModes)
      const jobWorkMode = job.type || job.workMode;
      if (filters.workModes.length > 0 && !filters.workModes.includes(jobWorkMode)) {
        return false;
      }

      // 5. Minimum Salary Dimension
      const jobMinSalary = job.salary?.min || 0;
      if (filters.minSalary > 0 && jobMinSalary < filters.minSalary) {
        return false;
      }

      // 6. Technology / Skills Dimension (OR within techStack)
      const allJobSkills = [
        ...(job.skillsRequired || []),
        ...(job.requiredSkills || []),
        ...(job.preferredSkills || []),
        ...(job.techStack || [])
      ];

      if (filters.techStack.length > 0) {
        const hasSkillMatch = filters.techStack.some((tech) =>
          allJobSkills.some((s) => s.toLowerCase() === tech.toLowerCase())
        );
        if (!hasSkillMatch) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, debouncedQuery, filters]);

  // Ensure selectedJob remains valid when filteredJobs updates
  useEffect(() => {
    if (!selectedJobId && filteredJobs.length > 0) {
      setSelectedJobId(filteredJobs[0].id);
    }
  }, [selectedJobId, filteredJobs]);

  const selectedJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || (filteredJobs.length > 0 ? filteredJobs[0] : null);
  }, [jobs, selectedJobId, filteredJobs]);

  // Compute active filter count for badges
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.categories.length;
    count += filters.seniorities.length;
    count += filters.workModes.length;
    count += filters.techStack.length;
    if (filters.minSalary > 0) count += 1;
    if (searchQuery.trim().length > 0) count += 1;
    return count;
  }, [filters, searchQuery]);

  const value = {
    jobs,
    filteredJobs,
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    filters,
    updateFilter,
    toggleArrayFilter,
    removeFilterItem,
    resetFilters,
    selectedJob,
    selectedJobId,
    setSelectedJobId,
    activeFilterCount
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

JobProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}

export default JobContext;
