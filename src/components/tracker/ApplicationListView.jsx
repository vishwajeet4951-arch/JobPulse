import PropTypes from 'prop-types';
import {
  Sparkles,
  MapPin,
  DollarSign,
  Clock,
  Trash2,
  ExternalLink,
  Send,
  FileText,
  ChevronRight
} from 'lucide-react';
import { formatSalaryRange, formatRelativeTime } from '../../utils/formatters.js';

/**
 * List / Table view for job applications.
 * Provides tabular layout on desktop and responsive stacked cards on mobile.
 */
export function ApplicationListView({
  applications,
  onOpenDetails,
  onStageChange,
  onDelete,
  onOpenInExplorer,
  onSendToATS,
  isJobLinked
}) {
  const getScoreBadgeColor = (score) => {
    if (score >= 75) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  const getStageColor = (stg) => {
    switch (stg) {
      case 'offer':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'interviewing':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'applied':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  if (applications.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-xs text-slate-500">
        No applications match the current search or filters.
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
              <th className="py-3 px-4">Role & Company</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Salary</th>
              <th className="py-3 px-4">ATS Match</th>
              <th className="py-3 px-4">Stage</th>
              <th className="py-3 px-4">Updated</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {applications.map((app) => {
              const hasLinked = isJobLinked ? isJobLinked(app.jobId) : false;
              return (
                <tr
                  key={app.id}
                  className="hover:bg-slate-950/60 transition group cursor-pointer"
                  onClick={() => onOpenDetails(app)}
                >
                  {/* Role & Company */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-white group-hover:text-indigo-300 transition text-xs">
                      {app.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{app.company}</div>
                    {app.notes && (
                      <div className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-1 max-w-xs">
                        "{app.notes}"
                      </div>
                    )}
                  </td>

                  {/* Location & WorkMode */}
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                    <div>{app.location || 'Remote'}</div>
                    {app.workMode && (
                      <span className="text-[10px] text-slate-500">{app.workMode}</span>
                    )}
                  </td>

                  {/* Salary */}
                  <td className="py-3 px-4 text-emerald-400 font-mono whitespace-nowrap">
                    {app.salary ? formatSalaryRange(app.salary) : '—'}
                  </td>

                  {/* ATS Match */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {typeof app.matchScore === 'number' ? (
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${getScoreBadgeColor(
                          app.matchScore
                        )}`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{app.matchScore}%</span>
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Unscored</span>
                    )}
                  </td>

                  {/* Stage Dropdown */}
                  <td
                    className="py-3 px-4 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={app.status}
                      onChange={(e) => onStageChange(app.id, e.target.value)}
                      className={`text-[11px] font-semibold rounded-lg px-2 py-1 border focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-950 cursor-pointer ${getStageColor(
                        app.status
                      )}`}
                    >
                      <option value="saved" className="bg-slate-900 text-white">
                        Saved
                      </option>
                      <option value="applied" className="bg-slate-900 text-white">
                        Applied
                      </option>
                      <option value="interviewing" className="bg-slate-900 text-white">
                        Interviewing
                      </option>
                      <option value="offer" className="bg-slate-900 text-white">
                        Offer
                      </option>
                    </select>
                  </td>

                  {/* Updated */}
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {formatRelativeTime(app.updatedAt)}
                  </td>

                  {/* Actions */}
                  <td
                    className="py-3 px-4 text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      {hasLinked && onOpenInExplorer && (
                        <button
                          type="button"
                          onClick={() => onOpenInExplorer(app.jobId)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                          title="View in Job Explorer"
                          aria-label={`View ${app.title} in Job Explorer`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {hasLinked && onSendToATS && (
                        <button
                          type="button"
                          onClick={() => onSendToATS(app.jobId)}
                          className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-slate-800 transition"
                          title="Analyze in ATS Matcher"
                          aria-label={`Analyze ${app.title} in ATS Matcher`}
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onOpenDetails(app)}
                        className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 transition"
                        title="View Details & Notes"
                        aria-label={`View details for ${app.title}`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(app)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                        title="Delete application"
                        aria-label={`Delete ${app.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (stacked) */}
      <div className="md:hidden divide-y divide-slate-800">
        {applications.map((app) => (
          <div
            key={app.id}
            onClick={() => onOpenDetails(app)}
            className="p-4 space-y-2.5 active:bg-slate-950/60"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-white text-xs leading-snug">{app.title}</h4>
                <div className="text-[11px] text-slate-400 mt-0.5">{app.company}</div>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold capitalize ${getStageColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
              <span>{app.location || 'Remote'}</span>
              {app.salary && (
                <span className="text-emerald-400 font-mono">
                  {formatSalaryRange(app.salary)}
                </span>
              )}
              {typeof app.matchScore === 'number' && (
                <span className="text-indigo-300 font-mono font-bold">
                  ATS: {app.matchScore}%
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-500 text-[10px] font-mono">
                Updated {formatRelativeTime(app.updatedAt)}
              </span>
              <span className="text-indigo-400 flex items-center space-x-0.5 font-medium">
                <span>Details & Notes</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ApplicationListView.propTypes = {
  applications: PropTypes.array.isRequired,
  onOpenDetails: PropTypes.func.isRequired,
  onStageChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenInExplorer: PropTypes.func,
  onSendToATS: PropTypes.func,
  isJobLinked: PropTypes.func
};

export default ApplicationListView;
