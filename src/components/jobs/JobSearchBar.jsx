import PropTypes from 'prop-types';
import { Search, X, SlidersHorizontal, Filter } from 'lucide-react';
import { useJobs } from '../../context/JobContext.jsx';

export function JobSearchBar({ onToggleMobileFilters, isMobileFilterOpen }) {
  const {
    searchQuery,
    setSearchQuery,
    filteredJobs,
    jobs,
    activeFilterCount,
    resetFilters
  } = useJobs();

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input Container */}
        <div className="relative flex-1">
          <label htmlFor="job-search-input" className="sr-only">
            Search developer jobs by title, company, location, description, or tech stack
          </label>
          <Search
            className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="job-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles by title, company, city, skills (React, Go, AWS...), or keywords..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500 text-sm shadow-sm transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={onToggleMobileFilters}
            className={`lg:hidden flex items-center space-x-2 px-4 py-3 rounded-xl border text-sm font-medium transition ${
              isMobileFilterOpen || activeFilterCount > 0
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            aria-expanded={isMobileFilterOpen}
            aria-label="Toggle filter options"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-white text-indigo-700">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Reset Filters button */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center space-x-1.5 px-3.5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium transition"
              title="Reset all active filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Instant Result Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <span className="font-bold text-white">{filteredJobs.length}</span> of{' '}
          <span className="font-medium text-slate-300">{jobs.length}</span> developer positions
        </div>
        {activeFilterCount > 0 && (
          <span className="text-indigo-400 font-medium">
            {activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}
          </span>
        )}
      </div>
    </div>
  );
}

JobSearchBar.propTypes = {
  onToggleMobileFilters: PropTypes.func.isRequired,
  isMobileFilterOpen: PropTypes.bool.isRequired
};

export default JobSearchBar;
