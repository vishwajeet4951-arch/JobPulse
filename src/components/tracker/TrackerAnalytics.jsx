import PropTypes from 'prop-types';
import {
  TrendingUp,
  Bookmark,
  Send,
  Calendar,
  Award,
  Sparkles,
  HelpCircle,
  Briefcase,
  PieChart
} from 'lucide-react';
import { useTracker } from '../../context/TrackerContext.jsx';

/**
 * Compact Tracker Analytics Dashboard
 * Visualizes pipeline volume, stage distribution, conversion rates, and ATS average.
 * Formulated with documented, zero-denominator safe metrics.
 */
export function TrackerAnalytics() {
  const { analytics, countsByStatus } = useTracker();

  const {
    totalCount = 0,
    activeOpportunities = 0,
    applicationRate = 0,
    interviewRate = 0,
    offerRate = 0,
    avgMatchScore = null,
    scoredCount = 0
  } = analytics;

  const stages = [
    {
      id: 'saved',
      label: 'Saved',
      count: countsByStatus.saved || 0,
      color: 'bg-slate-700',
      textColor: 'text-slate-300',
      badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
      icon: Bookmark
    },
    {
      id: 'applied',
      label: 'Applied',
      count: countsByStatus.applied || 0,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      icon: Send
    },
    {
      id: 'interviewing',
      label: 'Interviewing',
      count: countsByStatus.interviewing || 0,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      icon: Calendar
    },
    {
      id: 'offer',
      label: 'Offer',
      count: countsByStatus.offer || 0,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      icon: Award
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Top Header & Core Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tracked */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Total Applications
            </span>
            <Briefcase className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-white">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Across all pipeline stages</div>
        </div>

        {/* Active Opportunities */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-indigo-400 tracking-wider">
              Active Pipeline
            </span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-indigo-300">
            {activeOpportunities}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Applied + Interviewing (in active review)
          </div>
        </div>

        {/* Average ATS Score */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
              Avg ATS Score
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
            {avgMatchScore !== null ? `${avgMatchScore}%` : 'N/A'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {scoredCount > 0
              ? `Based on ${scoredCount} scored applications`
              : 'No applications with ATS score yet'}
          </div>
        </div>

        {/* Interview Rate */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
              Interview Rate
            </span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
            {interviewRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Submitted applications advancing to interview
          </div>
        </div>
      </div>

      {/* Stage Distribution Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Stage Distribution</span>
          <span className="text-slate-400 font-mono text-[11px]">
            {totalCount} total jobs tracked
          </span>
        </div>

        {totalCount > 0 ? (
          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden flex p-0.5 space-x-0.5 border border-slate-800">
            {stages.map((stg) => {
              const pct = (stg.count / totalCount) * 100;
              if (pct === 0) return null;
              return (
                <div
                  key={stg.id}
                  title={`${stg.label}: ${stg.count} (${Math.round(pct)}%)`}
                  className={`h-full ${stg.color} first:rounded-l-full last:rounded-r-full transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800" />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {stages.map((stg) => {
            const Icon = stg.icon;
            const pct = totalCount > 0 ? Math.round((stg.count / totalCount) * 100) : 0;
            return (
              <div
                key={stg.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center space-x-1.5">
                  <Icon className={`w-3.5 h-3.5 ${stg.textColor}`} />
                  <span className="text-slate-300 text-[11px]">{stg.label}</span>
                </div>
                <div className="font-mono">
                  <span className="font-bold text-white">{stg.count}</span>
                  <span className="text-slate-400 text-[10px] ml-1">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Funnel Rates */}
      <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Application Rate */}
        <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Application Rate</span>
            <span className="font-mono font-bold text-white">{applicationRate}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${applicationRate}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">
            {totalCount > 0
              ? `${countsByStatus.applied + countsByStatus.interviewing + countsByStatus.offer} of ${totalCount} saved jobs submitted`
              : 'No tracked applications yet'}
          </p>
        </div>

        {/* Interview Rate */}
        <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Interview Conversion</span>
            <span className="font-mono font-bold text-amber-400">{interviewRate}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${interviewRate}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">
            {countsByStatus.applied + countsByStatus.interviewing + countsByStatus.offer > 0
              ? `${countsByStatus.interviewing + countsByStatus.offer} of ${countsByStatus.applied + countsByStatus.interviewing + countsByStatus.offer} applications interviewed`
              : 'Submit applications to compute rate'}
          </p>
        </div>

        {/* Offer Rate */}
        <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Offer Conversion</span>
            <span className="font-mono font-bold text-emerald-400">{offerRate}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${offerRate}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">
            {countsByStatus.interviewing + countsByStatus.offer > 0
              ? `${countsByStatus.offer} of ${countsByStatus.interviewing + countsByStatus.offer} interviews converted to offer`
              : 'Complete interviews to compute rate'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrackerAnalytics;
