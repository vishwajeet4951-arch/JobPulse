import PropTypes from 'prop-types';
import { MapPin, DollarSign, Clock, Send, Bookmark, BookmarkCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { formatSalaryRange, formatRelativeTime } from '../../utils/formatters.js';
import { useTracker } from '../../context/TrackerContext.jsx';

export function JobCard({
  job,
  isSelected,
  onSelect,
  onSendToATS,
  onSaveJob
}) {
  const { isJobTracked, getApplicationByJobId } = useTracker();
  const isTracked = isJobTracked(job.id);
  const applicationRecord = getApplicationByJobId(job.id);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(job.id);
    }
  };

  const visibleSkills = (job.skillsRequired || job.techStack || []).slice(0, 4);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => onSelect(job.id)}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected}
      className={`group relative text-left rounded-2xl p-5 sm:p-5 transition-all cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isSelected
          ? 'bg-slate-900 border-indigo-500/80 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-950/40'
          : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/90 hover:border-slate-700 shadow-sm'
      }`}
    >
      {/* Top Badges Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {job.category}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80">
            {job.experienceLevel || job.seniority}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {job.type || job.workMode}
          </span>
        </div>

        {/* Tracking Status Badge */}
        {isTracked && (
          <span className="inline-flex items-center space-x-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span className="capitalize">{applicationRecord?.status || 'Tracked'}</span>
          </span>
        )}
      </div>

      {/* Title & Company */}
      <div className="space-y-1">
        <h3 className={`text-base font-bold leading-snug transition ${
          isSelected ? 'text-indigo-300' : 'text-white group-hover:text-indigo-400'
        }`}>
          {job.title}
        </h3>
        <div className="text-xs font-semibold text-slate-300 truncate">
          {job.company}
        </div>
      </div>

      {/* Meta Specs */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-slate-400">
        <span className="flex items-center space-x-1 truncate max-w-[170px]">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{job.location}</span>
        </span>
        <span className="flex items-center space-x-1 font-semibold text-emerald-400">
          <DollarSign className="w-3.5 h-3.5 shrink-0" />
          <span>{formatSalaryRange(job.salary)}</span>
        </span>
        <span className="flex items-center space-x-1 text-slate-500">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{formatRelativeTime(job.postedDate)}</span>
        </span>
      </div>

      {/* Skills Badges */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-2 py-0.5 rounded bg-slate-950/70 text-slate-300 border border-slate-800"
          >
            {skill}
          </span>
        ))}
        {(job.skillsRequired || job.techStack || []).length > 4 && (
          <span className="text-[10px] text-slate-500 font-mono">
            +{(job.skillsRequired || job.techStack || []).length - 4} more
          </span>
        )}
      </div>

      {/* Card Actions Bar */}
      <div
        className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2"
        onClick={(e) => e.stopPropagation()} // Prevent card selection click when tapping buttons
      >
        <button
          type="button"
          onClick={() => onSendToATS(job)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition"
          aria-label={`Send ${job.title} to ATS Matcher`}
        >
          <Send className="w-3 h-3" />
          <span>Send to ATS</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onSaveJob(job)}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
              isTracked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
            title={isTracked ? 'Saved to Application Tracker' : 'Save Job to Tracker'}
            aria-label={isTracked ? 'Job saved in tracker' : 'Save job to tracker'}
          >
            {isTracked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isTracked ? 'Saved' : 'Save'}</span>
          </button>

          <span className="text-slate-500 group-hover:text-slate-300 transition pl-1">
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSendToATS: PropTypes.func.isRequired,
  onSaveJob: PropTypes.func.isRequired
};

export default JobCard;
