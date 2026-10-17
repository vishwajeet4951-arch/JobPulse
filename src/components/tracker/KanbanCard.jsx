import PropTypes from 'prop-types';
import {
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  FileText,
  ExternalLink,
  Trash2,
  Send,
  MoreVertical
} from 'lucide-react';
import { formatSalaryRange, formatRelativeTime } from '../../utils/formatters.js';

/**
 * Interactive Kanban Card for individual job applications.
 * Displays meta information, ATS match score pill, notes preview,
 * quick-move stage selector, and action buttons.
 */
export function KanbanCard({
  application,
  onOpenDetails,
  onStageChange,
  onDelete,
  onOpenInExplorer,
  onSendToATS,
  hasLinkedJob = false
}) {
  const {
    id,
    title,
    company,
    location,
    salary,
    workMode,
    seniority,
    status,
    matchScore,
    notes,
    appliedDate,
    updatedAt
  } = application;

  const getScoreBadgeColor = (score) => {
    if (score >= 75) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  return (
    <div
      tabIndex={0}
      role="article"
      aria-label={`${title} at ${company}`}
      className="group bg-slate-950/90 hover:bg-slate-950 border border-slate-800/90 hover:border-slate-700 rounded-xl p-3.5 space-y-3 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* Title & Delete Header */}
      <div className="flex items-start justify-between gap-2">
        <div
          onClick={() => onOpenDetails(application)}
          className="cursor-pointer flex-1"
        >
          <h4 className="font-bold text-white text-xs leading-snug group-hover:text-indigo-300 transition line-clamp-2">
            {title}
          </h4>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
            {company}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(application)}
          className="text-slate-500 hover:text-rose-400 p-1 rounded transition shrink-0"
          title="Remove application"
          aria-label={`Delete application for ${title}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Meta Badges (Location, WorkMode, Salary) */}
      <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
        {location && (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
            <MapPin className="w-2.5 h-2.5 text-slate-400" />
            <span className="truncate max-w-[90px]">{location}</span>
          </span>
        )}
        {workMode && (
          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
            {workMode}
          </span>
        )}
        {salary && (
          <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            <DollarSign className="w-2.5 h-2.5" />
            <span>{formatSalaryRange(salary)}</span>
          </span>
        )}
      </div>

      {/* ATS Score & Notes Preview */}
      <div className="space-y-1.5">
        {typeof matchScore === 'number' && (
          <div
            className={`inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${getScoreBadgeColor(
              matchScore
            )}`}
            title="Estimated ATS match score against your resume"
          >
            <Sparkles className="w-3 h-3" />
            <span>ATS Match: {matchScore}%</span>
          </div>
        )}

        {notes && notes.trim() && (
          <div
            onClick={() => onOpenDetails(application)}
            className="cursor-pointer flex items-start space-x-1.5 p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 text-[11px] text-slate-300 hover:border-slate-700 transition"
            title="Click to view full notes"
          >
            <FileText className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2 italic leading-relaxed text-[10px]">
              "{notes.trim()}"
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Quick Move & Links */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <div className="text-[10px] text-slate-400 font-mono flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{formatRelativeTime(updatedAt)}</span>
        </div>

        <div className="flex items-center space-x-1.5">
          {hasLinkedJob && onOpenInExplorer && (
            <button
              type="button"
              onClick={() => onOpenInExplorer(application.jobId)}
              className="p-1 rounded text-slate-400 hover:text-white transition"
              title="View in Job Explorer"
              aria-label="View job in Job Explorer"
            >
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          {hasLinkedJob && onSendToATS && (
            <button
              type="button"
              onClick={() => onSendToATS(application.jobId)}
              className="p-1 rounded text-emerald-400 hover:text-emerald-300 transition"
              title="Test in ATS Matcher"
              aria-label="Test job in ATS Matcher"
            >
              <Send className="w-3 h-3" />
            </button>
          )}

          {/* Quick Stage Dropdown */}
          <label htmlFor={`quick-stage-${id}`} className="sr-only">
            Move application stage
          </label>
          <select
            id={`quick-stage-${id}`}
            value={status}
            onChange={(e) => onStageChange(id, e.target.value)}
            className="bg-slate-900 border border-slate-700 text-[10px] text-slate-300 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
          </select>
        </div>
      </div>
    </div>
  );
}

KanbanCard.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.string.isRequired,
    jobId: PropTypes.string,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string,
    salary: PropTypes.any,
    workMode: PropTypes.string,
    seniority: PropTypes.string,
    status: PropTypes.string.isRequired,
    matchScore: PropTypes.number,
    notes: PropTypes.string,
    appliedDate: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  onOpenDetails: PropTypes.func.isRequired,
  onStageChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenInExplorer: PropTypes.func,
  onSendToATS: PropTypes.func,
  hasLinkedJob: PropTypes.bool
};

export default KanbanCard;
