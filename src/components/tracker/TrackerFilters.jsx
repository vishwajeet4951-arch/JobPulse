import PropTypes from 'prop-types';
import { Search, X, LayoutGrid, List, ArrowDownAZ, Filter, RotateCcw } from 'lucide-react';
import { VALID_STAGES } from '../../context/TrackerContext.jsx';

/**
 * Filter and view control bar for Application Tracker:
 * - Search query (title and company)
 * - Stage multi-select chips
 * - Sort options
 * - Kanban / List view mode switcher
 * - Clear filters action
 */
export function TrackerFilters({
  searchQuery,
  onSearchChange,
  selectedStages,
  onStageToggle,
  onSelectAllStages,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalMatching,
  totalApplications,
  onClearFilters
}) {
  const isFiltered =
    Boolean(searchQuery.trim()) ||
    selectedStages.length !== VALID_STAGES.length ||
    sortBy !== 'updatedAt-desc';

  const stageLabels = {
    saved: 'Saved',
    applied: 'Applied',
    interviewing: 'Interviewing',
    offer: 'Offer'
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="tracker-search-input" className="sr-only">
            Search tracked applications
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="tracker-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by role title or company..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Switcher & Sort Selector */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Sort Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <ArrowDownAZ className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <label htmlFor="tracker-sort-select" className="sr-only">
              Sort applications by
            </label>
            <select
              id="tracker-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-1"
            >
              <option value="updatedAt-desc" className="bg-slate-900">
                Recently Updated
              </option>
              <option value="appliedDate-desc" className="bg-slate-900">
                Newest Applied
              </option>
              <option value="title-asc" className="bg-slate-900">
                Job Title (A–Z)
              </option>
              <option value="matchScore-desc" className="bg-slate-900">
                Highest ATS Score
              </option>
              <option value="matchScore-asc" className="bg-slate-900">
                Lowest ATS Score
              </option>
            </select>
          </div>

          {/* Kanban vs List Mode Toggle */}
          <div
            role="group"
            aria-label="View layout toggle"
            className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs"
          >
            <button
              type="button"
              onClick={() => onViewModeChange('kanban')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition ${
                viewMode === 'kanban'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Kanban Board View"
              aria-pressed={viewMode === 'kanban'}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
              aria-pressed={viewMode === 'list'}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Multi-Select Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-slate-400 mr-1 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Filter Stage:</span>
          </span>

          <button
            type="button"
            onClick={onSelectAllStages}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              selectedStages.length === VALID_STAGES.length
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Stages
          </button>

          {VALID_STAGES.map((stg) => {
            const isSelected = selectedStages.includes(stg);
            return (
              <button
                key={stg}
                type="button"
                onClick={() => onStageToggle(stg)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  isSelected
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'bg-slate-950 text-slate-500 hover:text-slate-300 border border-slate-800/80 opacity-60'
                }`}
                aria-pressed={isSelected}
              >
                {stageLabels[stg]}
              </button>
            );
          })}
        </div>

        {/* Results Count & Clear All */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-mono">
            Showing <strong className="text-white">{totalMatching}</strong> of {totalApplications}
          </span>

          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

TrackerFilters.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedStages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onStageToggle: PropTypes.func.isRequired,
  onSelectAllStages: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  viewMode: PropTypes.oneOf(['kanban', 'list']).isRequired,
  onViewModeChange: PropTypes.func.isRequired,
  totalMatching: PropTypes.number.isRequired,
  totalApplications: PropTypes.number.isRequired,
  onClearFilters: PropTypes.func.isRequired
};

export default TrackerFilters;
