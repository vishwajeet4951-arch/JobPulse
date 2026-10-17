import { useState } from 'react';
import { JobProvider } from './context/JobContext.jsx';
import { ATSProvider } from './context/ATSContext.jsx';
import { TrackerProvider } from './context/TrackerContext.jsx';
import Navbar from './components/common/Navbar.jsx';
import JobExplorer from './components/jobs/JobExplorer.jsx';
import ATSMatcher from './components/ats/ATSMatcher.jsx';
import ApplicationTracker from './components/tracker/ApplicationTracker.jsx';

function AppContent() {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'jobs' && (
          <JobExplorer onNavigateToATS={() => setActiveTab('ats')} />
        )}
        {activeTab === 'ats' && (
          <ATSMatcher onNavigateToTracker={() => setActiveTab('tracker')} />
        )}
        {activeTab === 'tracker' && (
          <ApplicationTracker
            onNavigateToExplorer={() => setActiveTab('jobs')}
            onNavigateToATS={() => setActiveTab('ats')}
          />
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>JobPulse • Real-Time Job Search &amp; Live ATS Matcher</div>
          <div>React 18 • Tailwind CSS • Native Web Worker Architecture</div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <TrackerProvider>
      <JobProvider>
        <ATSProvider>
          <AppContent />
        </ATSProvider>
      </JobProvider>
    </TrackerProvider>
  );
}

export default App;
