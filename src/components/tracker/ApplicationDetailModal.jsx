import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  X,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Sparkles,
  Calendar,
  ExternalLink,
  Send,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { formatSalaryRange } from '../../utils/formatters.js';
import { VALID_STAGES } from '../../context/TrackerContext.jsx';
import { mockJobs } from '../../data/mockJobs.js';

/**
 * Full Application Detail & Notes Slide-Over Modal.
 * Provides complete job spec breakdown, stage timeline, ATS score rationale,
 * and a persistent notes editor.
 */
export function ApplicationDetailModal({
  application,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDelete,
  onOpenInExplorer,
  onSendToATS
}) {
  const [editedNotes, setEditedNotes] = useState('');
  const [isNotesDirty, setIsNotesDirty] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Sync state when application changes
  useEffect(() => {
    if (application) {
      setEditedNotes(application.notes || '');
      setIsNotesDirty(false);
      setSaveSuccess(false);
      setConfirmDelete(false);
    }
  }, [application?.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isNotesDirty) {
          if (window.confirm('You have unsaved notes. Are you sure you want to close?')) {
            onClose();
          }
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isNotesDirty, onClose]);

  if (!isOpen || !application) return null;

  // Look up matching job record in mockJobs if available
  const linkedJob = mockJobs.find((j) => j.id === application.jobId);

  const handleNotesChange = (e) => {
    setEditedNotes(e.target.value);
    setIsNotesDirty(true);
    setSaveSuccess(false);
  };

  const handleSaveNotes = () => {
    onUpdateNotes(application.id, editedNotes);
    setIsNotesDirty(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCancelNotes = () => {
    setEditedNotes(application.notes || '');
    setIsNotesDirty(false);
  };

  const handleModalClose = () => {
    if (isNotesDirty) {
      if (window.confirm('Discard unsaved note changes?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const stageOptions = [
    { id: 'saved', label: 'Saved for Later' },
    { id: 'applied', label: 'Application Submitted' },
    { id: 'interviewing', label: 'Interviewing Rounds' },
    { id: 'offer', label: 'Offer Received' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-detail-title"
    >
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-800 bg-slate-950/60">
          <div className="pr-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                {application.category || 'Engineering'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {application.seniority || 'Mid-Level'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {application.workMode || 'Remote'}
              </span>
            </div>

            <h2 id="app-detail-title" className="text-xl sm:text-2xl font-extrabold text-white">
              {application.title}
            </h2>
            <div className="text-sm text-slate-300 font-medium mt-0.5">
              {application.company} • {application.location || 'Remote'}
            </div>
          </div>

          <button
            type="button"
            onClick={handleModalClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close application details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
          {/* Stage & Salary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current Stage Selector */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <label htmlFor="stage-selector" className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                Current Pipeline Stage
              </label>
              <select
                id="stage-selector"
                value={application.status}
                onChange={(e) => onUpdateStatus(application.id, e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {stageOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Compensation & ATS Score Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                Compensation & ATS
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Salary Range</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {application.salary ? formatSalaryRange(application.salary) : 'Undisclosed'}
                  </span>
                </div>

                {typeof application.matchScore === 'number' && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">ATS Match</span>
                    <span className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      <span>{application.matchScore}%</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline & Dates */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <span className="text-[10px] uppercase text-slate-400 block">Tracked Since</span>
              <span className="text-xs font-mono text-white mt-1 block">
                {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : '—'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block">Applied Date</span>
              <span className="text-xs font-mono text-white mt-1 block">
                {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : 'Not applied'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block">Interview Date</span>
              <span className="text-xs font-mono text-amber-300 mt-1 block">
                {application.interviewDate ? new Date(application.interviewDate).toLocaleDateString() : '—'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block">Last Activity</span>
              <span className="text-xs font-mono text-slate-300 mt-1 block">
                {application.updatedAt ? new Date(application.updatedAt).toLocaleDateString() : '—'}
              </span>
            </div>
          </div>

          {/* ATS Score Explanation Note */}
          {typeof application.matchScore === 'number' && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/20 flex items-start space-x-2 text-[11px] text-slate-400">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p>
                Estimated match score calculated against your resume at the time of tracking.
                If your resume or skills have since been updated, click <strong>"Test in ATS Matcher"</strong> below to re-evaluate.
              </p>
            </div>
          )}

          {/* Notes & Interview Journal Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="app-notes-textarea" className="font-bold text-white text-xs flex items-center space-x-1.5 cursor-pointer">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Interview Notes &amp; Follow-Ups</span>
              </label>

              {isNotesDirty && (
                <span className="text-[10px] text-amber-400 font-medium">Unsaved edits</span>
              )}
            </div>

            <textarea
              id="app-notes-textarea"
              value={editedNotes}
              onChange={handleNotesChange}
              placeholder="Record recruiter contacts, interview questions asked, technical challenges, compensation discussions, or next step deadlines..."
              className="w-full min-h-[140px] p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <div className="flex items-center justify-between pt-1">
              <div className="text-[10px] text-slate-400">
                Notes persist in local storage and are included in JSON backups.
              </div>

              <div className="flex items-center space-x-2">
                {isNotesDirty && (
                  <button
                    type="button"
                    onClick={handleCancelNotes}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={!isNotesDirty}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>

            {saveSuccess && (
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-medium pt-1 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Notes successfully saved!</span>
              </div>
            )}
          </div>

          {/* Linked Job Overview (if exists in mockJobs) */}
          {linkedJob && (
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                Original Job Spec Summary
              </span>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {linkedJob.overview || linkedJob.description}
              </p>
              {linkedJob.skillsRequired && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {linkedJob.skillsRequired.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          {/* Left Actions: Explorer & ATS Matcher */}
          <div className="flex items-center space-x-2">
            {linkedJob && onOpenInExplorer && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInExplorer(application.jobId);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>View Job Spec</span>
              </button>
            )}

            {linkedJob && onSendToATS && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSendToATS(application.jobId);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Test in ATS Matcher</span>
              </button>
            )}
          </div>

          {/* Right Action: Delete with confirmation */}
          <div>
            {confirmDelete ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-rose-400 font-medium">Delete application?</span>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(application);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 transition text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Application</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ApplicationDetailModal.propTypes = {
  application: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onUpdateNotes: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpenInExplorer: PropTypes.func,
  onSendToATS: PropTypes.func
};

export default ApplicationDetailModal;
