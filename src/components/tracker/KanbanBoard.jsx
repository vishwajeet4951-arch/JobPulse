import PropTypes from 'prop-types';
import { Bookmark, Send, Calendar, Award } from 'lucide-react';
import KanbanCard from './KanbanCard.jsx';
import { VALID_STAGES } from '../../context/TrackerContext.jsx';

/**
 * 4-Stage Kanban Board: Saved, Applied, Interviewing, Offer.
 * Horizontally scrollable on mobile without layout breaking, responsive grid on desktop.
 */
export function KanbanBoard({
  applications,
  onOpenDetails,
  onStageChange,
  onDelete,
  onOpenInExplorer,
  onSendToATS,
  isJobLinked
}) {
  const columns = [
    {
      id: 'saved',
      label: 'Saved',
      icon: Bookmark,
      headerBorder: 'border-slate-700',
      tagBg: 'bg-slate-800 text-slate-300',
      dotColor: 'bg-slate-400'
    },
    {
      id: 'applied',
      label: 'Applied',
      icon: Send,
      headerBorder: 'border-indigo-500/40',
      tagBg: 'bg-indigo-500/20 text-indigo-300',
      dotColor: 'bg-indigo-400'
    },
    {
      id: 'interviewing',
      label: 'Interviewing',
      icon: Calendar,
      headerBorder: 'border-amber-500/40',
      tagBg: 'bg-amber-500/20 text-amber-300',
      dotColor: 'bg-amber-400'
    },
    {
      id: 'offer',
      label: 'Offer',
      icon: Award,
      headerBorder: 'border-emerald-500/40',
      tagBg: 'bg-emerald-500/20 text-emerald-300',
      dotColor: 'bg-emerald-400'
    }
  ];

  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[300px] md:min-w-0">
        {columns.map((col) => {
          const colApps = applications.filter((app) => app.status === col.id);
          const Icon = col.icon;

          return (
            <div
              key={col.id}
              className="flex flex-col bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 min-h-[460px] shadow-sm"
              role="region"
              aria-label={`${col.label} stage, ${colApps.length} applications`}
            >
              {/* Column Header */}
              <div
                className={`flex items-center justify-between pb-3 border-b ${col.headerBorder} mb-3`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                  <span className="font-bold text-sm text-slate-100">{col.label}</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${col.tagBg}`}
                >
                  {colApps.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 flex flex-col">
                {colApps.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-800/80 rounded-xl text-xs text-slate-500 min-h-[160px]">
                    <Icon className="w-5 h-5 mb-1.5 opacity-40 text-slate-400" />
                    <span>No applications in {col.label.toLowerCase()}</span>
                  </div>
                ) : (
                  colApps.map((app) => (
                    <KanbanCard
                      key={app.id}
                      application={app}
                      onOpenDetails={onOpenDetails}
                      onStageChange={onStageChange}
                      onDelete={onDelete}
                      onOpenInExplorer={onOpenInExplorer}
                      onSendToATS={onSendToATS}
                      hasLinkedJob={isJobLinked ? isJobLinked(app.jobId) : false}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

KanbanBoard.propTypes = {
  applications: PropTypes.array.isRequired,
  onOpenDetails: PropTypes.func.isRequired,
  onStageChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenInExplorer: PropTypes.func,
  onSendToATS: PropTypes.func,
  isJobLinked: PropTypes.func
};

export default KanbanBoard;
