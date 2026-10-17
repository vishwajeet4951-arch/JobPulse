import PropTypes from 'prop-types';
import { X, RotateCcw, DollarSign, Briefcase, MapPin, Award, Code2 } from 'lucide-react';
import { useJobs } from '../../context/JobContext.jsx';
import { formatSalary } from '../../utils/formatters.js';

export function JobFilters({ isMobile = false, onCloseMobile }) {
  const {
    filters,
    updateFilter,
    toggleArrayFilter,
    removeFilterItem,
    resetFilters,
    activeFilterCount
  } = useJobs();

  const CATEGORIES = [
    'Frontend',
    'Full-Stack',
    'Backend',
    'Mobile',
    'Cloud/DevOps',
    'AI/ML',
    'Security',
    'QA'
  ];

  const WORK_MODES = ['Remote', 'Hybrid', 'Onsite'];

  const SENIORITIES = ['Junior', 'Mid', 'Senior', 'Lead', 'Staff'];

  const POPULAR_SKILLS = [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Python',
    'Go',
    'Kubernetes',
    'Docker',
    'AWS',
    'PostgreSQL',
    'Tailwind CSS',
    'Rust',
    'Swift',
    'Kotlin',
    'CI/CD'
  ];

  const SALARY_THRESHOLDS = [0, 80000, 120000, 150000, 180000, 200000];

  return (
    <div className="space-y-6">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-white">Filter Positions</h2>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close filters drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Active Filter Chips Container */}
      {activeFilterCount > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Active Filters:</span>
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 text-xs font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {/* Category chips */}
            {filters.categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
              >
                <span>{cat}</span>
                <button
                  type="button"
                  onClick={() => removeFilterItem('categories', cat)}
                  className="hover:text-white"
                  aria-label={`Remove ${cat} category filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Seniority chips */}
            {filters.seniorities.map((sen) => (
              <span
                key={sen}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
              >
                <span>{sen}</span>
                <button
                  type="button"
                  onClick={() => removeFilterItem('seniorities', sen)}
                  className="hover:text-white"
                  aria-label={`Remove ${sen} experience filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Work mode chips */}
            {filters.workModes.map((mode) => (
              <span
                key={mode}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
              >
                <span>{mode}</span>
                <button
                  type="button"
                  onClick={() => removeFilterItem('workModes', mode)}
                  className="hover:text-white"
                  aria-label={`Remove ${mode} work mode filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Tech stack chips */}
            {filters.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-950 text-indigo-300 border border-indigo-700/60"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => removeFilterItem('techStack', tech)}
                  className="hover:text-white"
                  aria-label={`Remove ${tech} skill filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Minimum salary chip */}
            {filters.minSalary > 0 && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <span>Min: {formatSalary(filters.minSalary)}</span>
                <button
                  type="button"
                  onClick={() => updateFilter('minSalary', 0)}
                  className="hover:text-white"
                  aria-label="Remove minimum salary filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* 1. Category Filter Section */}
      <div className="space-y-2.5">
        <label className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
          <span>Role Category</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleArrayFilter('categories', cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/40'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Work Mode Section */}
      <div className="space-y-2.5">
        <label className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Work Arrangement</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {WORK_MODES.map((mode) => {
            const isSelected = filters.workModes.includes(mode);
            return (
              <button
                key={mode}
                type="button"
                onClick={() => toggleArrayFilter('workModes', mode)}
                className={`text-xs py-2 px-2.5 text-center rounded-lg font-medium transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/40'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Experience Level Section */}
      <div className="space-y-2.5">
        <label className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Experience Level</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SENIORITIES.map((lvl) => {
            const isSelected = filters.seniorities.includes(lvl);
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => toggleArrayFilter('seniorities', lvl)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400/40'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Minimum Salary Threshold Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Minimum Base Salary</span>
          </label>
          <span className="text-xs font-bold text-white font-mono">
            {filters.minSalary > 0 ? `${formatSalary(filters.minSalary)}+` : 'Any'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {SALARY_THRESHOLDS.map((val) => {
            const isSelected = filters.minSalary === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => updateFilter('minSalary', val)}
                className={`text-xs py-1.5 px-2 rounded-lg font-medium transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {val === 0 ? 'All' : `${formatSalary(val)}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Key Technologies & Skills Section */}
      <div className="space-y-2.5">
        <label className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Technologies &amp; Skills</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILLS.map((tech) => {
            const isSelected = filters.techStack.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleArrayFilter('techStack', tech)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

JobFilters.propTypes = {
  isMobile: PropTypes.bool,
  onCloseMobile: PropTypes.func
};

export default JobFilters;
