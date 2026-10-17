import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Sparkles, Filter, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { useJobs } from '../../context/JobContext.jsx';
import { useATS } from '../../context/ATSContext.jsx';
import { useTracker } from '../../context/TrackerContext.jsx';
import JobSearchBar from './JobSearchBar.jsx';
import JobFilters from './JobFilters.jsx';
import JobCard from './JobCard.jsx';
import JobDetailPanel from './JobDetailPanel.jsx';

export function JobExplorer({ onNavigateToATS }) {
  const {
    filteredJobs,
    selectedJob,
    selectedJobId,
    setSelectedJobId,
    resetFilters,
    activeFilterCount
  } = useJobs();

  const { loadJobIntoATS } = useATS();
  const { trackJob } = useTracker();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(true);

  const handleSendToATS = (job) => {
    if (!job) return;
    loadJobIntoATS(job);
    if (onNavigateToATS) {
      onNavigateToATS();
    }
  };

  const handleSaveJob = (job) => {
    if (!job) return;
    trackJob(job, 'saved');
  };

  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
    // On mobile viewports, open full detail modal
    if (window.innerWidth < 1024) {
      setIsMobileDetailOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Explorer Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-slate-900/60 border border-indigo-500/20 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Module 1: Real-Time Job Discovery</span>
            <span>•</span>
            <span>250ms Debounce</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Developer Job Explorer
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Browse 146 verified engineering roles across Frontend, Full-Stack, Backend, Mobile, Cloud, AI, Security, and QA. Filter by tech stack and work arrangement, or send any description directly to the live ATS matcher.
          </p>
        </div>
      </div>

      {/* 2. Search Bar & Global Filter Triggers */}
      <JobSearchBar
        onToggleMobileFilters={() => setIsMobileFilterOpen(true)}
        isMobileFilterOpen={isMobileFilterOpen}
      />

      {/* 3. Desktop Filter Toggle & Panel */}
      <div className="hidden lg:block bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span>Search Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300">
                {activeFilterCount} active
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {showFilterDrawer ? 'Collapse Filters' : 'Expand Advanced Filters'}
          </button>
        </div>

        {/* Collapsible desktop filters (default open for quick access) */}
        {showFilterDrawer && (
          <JobFilters />
        )}
      </div>

      {/* 4. Results & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Job Cards Feed (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40 space-y-3">
              <Search className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Matching Positions Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No developer jobs matched your active search query or filter criteria. Try adjusting your keywords or clearing filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-2 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSelected={job.id === selectedJobId}
                onSelect={handleSelectJob}
                onSendToATS={handleSendToATS}
                onSaveJob={handleSaveJob}
              />
            ))
          )}
        </div>

        {/* Right Column: Sticky Job Detail Panel (5 cols on desktop) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-20 h-[calc(100vh-6rem)]">
          <JobDetailPanel
            job={selectedJob}
            onSendToATS={handleSendToATS}
            onSaveJob={handleSaveJob}
            isMobileModal={false}
          />
        </div>
      </div>

      {/* 5. Mobile Slide-Over Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 p-6 overflow-y-auto">
              <JobFilters
                isMobile={true}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
              />
              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-md transition"
                >
                  View {filteredJobs.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Mobile Job Detail Modal Sheet */}
      {isMobileDetailOpen && selectedJob && (
        <div
          className="lg:hidden fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-job-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileDetailOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-lg bg-slate-950 border-l border-slate-800 overflow-y-auto">
              <JobDetailPanel
                job={selectedJob}
                onCloseMobile={() => setIsMobileDetailOpen(false)}
                onSendToATS={handleSendToATS}
                onSaveJob={handleSaveJob}
                isMobileModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

JobExplorer.propTypes = {
  onNavigateToATS: PropTypes.func
};

export default JobExplorer;
