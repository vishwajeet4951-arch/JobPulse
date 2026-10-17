import PropTypes from 'prop-types';
import {
  MapPin,
  DollarSign,
  Clock,
  Send,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  X,
  Briefcase,
  Sparkles,
  Building2,
  Check,
  Award
} from 'lucide-react';
import { formatSalaryRange, formatRelativeTime } from '../../utils/formatters.js';
import { useTracker } from '../../context/TrackerContext.jsx';

export function JobDetailPanel({
  job,
  onCloseMobile,
  onSendToATS,
  onSaveJob,
  isMobileModal = false
}) {
  const { isJobTracked, getApplicationByJobId, trackJob } = useTracker();

  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
        <Briefcase className="w-12 h-12 text-slate-600 mb-3" />
        <h3 className="text-base font-bold text-white">No Position Selected</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Select any job card from the results list to view its complete job description, required skills, and compensation details.
        </p>
      </div>
    );
  }

  const isTracked = isJobTracked(job.id);
  const applicationRecord = getApplicationByJobId(job.id);
  const isApplied = isTracked && applicationRecord?.status === 'applied';

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header Bar */}
      <div className="p-6 border-b border-slate-800/80 bg-slate-950/60 space-y-4">
        {/* Top Badges & Mobile Close Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {job.category}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {job.experienceLevel || job.seniority}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {job.type || job.workMode}
            </span>
            {job.experienceYearsRequired && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {job.experienceYearsRequired}+ yrs exp
              </span>
            )}
          </div>

          {isMobileModal && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close job details panel"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Title and Company */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {job.title}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-slate-300 font-semibold mt-1">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>{job.company}</span>
          </div>
        </div>

        {/* Meta Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase text-slate-500 font-semibold">Location</div>
              <div className="text-white font-medium truncate">{job.location}</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase text-slate-500 font-semibold">Compensation</div>
              <div className="text-emerald-400 font-bold truncate">{formatSalaryRange(job.salary)}</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase text-slate-500 font-semibold">Posted</div>
              <div className="text-slate-300 font-medium truncate">{formatRelativeTime(job.postedDate)}</div>
            </div>
          </div>
        </div>

        {/* Primary Functional Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onSendToATS(job)}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition ring-1 ring-indigo-400/40"
          >
            <Send className="w-4 h-4" />
            <span>Send to ATS Matcher</span>
          </button>

          <button
            type="button"
            onClick={() => onSaveJob(job)}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition ${
              isTracked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {isTracked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            <span>{isTracked ? 'Saved to Tracker' : 'Save Job'}</span>
          </button>

          <button
            type="button"
            onClick={() => trackJob(job, 'applied')}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition ${
              isApplied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isApplied ? 'Applied' : 'Mark Applied'}</span>
          </button>
        </div>
      </div>

      {/* Scrollable Description Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
        {/* Overview Section */}
        <section className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            About the Position
          </h4>
          <p className="leading-relaxed text-slate-200 text-sm">
            {job.description || job.overview}
          </p>
        </section>

        {/* Required Skills Section */}
        <section className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>Core Required Skills</span>
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {(job.skillsRequired || job.requiredSkills || []).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/25"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Preferred Skills Section */}
        {job.preferredSkills && job.preferredSkills.length > 0 && (
          <section className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Preferred Bonus Technologies</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {job.preferredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Key Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <section className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Primary Responsibilities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span className="leading-relaxed text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Qualifications */}
        {job.qualifications && job.qualifications.length > 0 && (
          <section className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Qualifications &amp; Experience
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {job.qualifications.map((item, index) => (
                <li key={index} className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className="leading-relaxed text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Benefits & Perks */}
        {job.benefits && job.benefits.length > 0 && (
          <section className="space-y-2.5 pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Benefits &amp; Culture Perks
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {job.benefits.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

JobDetailPanel.propTypes = {
  job: PropTypes.object,
  onCloseMobile: PropTypes.func,
  onSendToATS: PropTypes.func.isRequired,
  onSaveJob: PropTypes.func.isRequired,
  isMobileModal: PropTypes.bool
};

export default JobDetailPanel;
