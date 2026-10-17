import PropTypes from 'prop-types';
import { Search, FileCheck2, Kanban, Sparkles, Briefcase } from 'lucide-react';
import { useJobs } from '../../context/JobContext.jsx';
import { useATS } from '../../context/ATSContext.jsx';
import { useTracker } from '../../context/TrackerContext.jsx';

export function Navbar({ activeTab, onTabChange }) {
  const { filteredJobs } = useJobs();
  const { targetJob } = useATS();
  const { applications } = useTracker();

  const tabs = [
    {
      id: 'jobs',
      label: 'Job Explorer',
      icon: Search,
      count: filteredJobs.length
    },
    {
      id: 'ats',
      label: 'ATS Matcher',
      icon: FileCheck2,
      badge: targetJob ? targetJob.company : null
    },
    {
      id: 'tracker',
      label: 'Application Tracker',
      icon: Kanban,
      count: applications.length
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('jobs')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  JobPulse
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live ATS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Search &amp; Live ATS Matcher</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2" aria-label="Main Navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>

                  {tab.count !== undefined && (
                    <span
                      className={`ml-1 text-xs px-1.5 py-0.2 rounded-full font-semibold ${
                        isActive
                          ? 'bg-indigo-700 text-indigo-100'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}

                  {tab.badge && (
                    <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium truncate max-w-[80px]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Status */}
          <div className="hidden md:flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>Native Worker Ready</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default Navbar;
