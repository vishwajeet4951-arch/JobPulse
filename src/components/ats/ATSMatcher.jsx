import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FileText,
  Briefcase,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  Copy,
  Check,
  Upload,
  Trash2,
  Unlink,
  BookmarkPlus,
  Send,
  HelpCircle
} from 'lucide-react';
import { useATS } from '../../context/ATSContext.jsx';
import { useTracker } from '../../context/TrackerContext.jsx';
import sampleResumes from '../../data/sampleResumes.js';
import { formatSalaryRange } from '../../utils/formatters.js';
import ScoreGauge from './ScoreGauge.jsx';
import ScoreBreakdown from './ScoreBreakdown.jsx';
import SkillMatchSection from './SkillMatchSection.jsx';
import ReadabilityKeywordPanel from './ReadabilityKeywordPanel.jsx';
import SuggestionsChecklist from './SuggestionsChecklist.jsx';

/**
 * Module 2: Complete ATS Matcher UI
 * Orchestrates dual editors (resume and target job description), sample presets,
 * plain text .txt file upload, live Web Worker status, score gauge, skill taxonomy match,
 * readability metrics, and interactive checklist.
 */
export function ATSMatcher({ onNavigateToTracker }) {
  const {
    resumeText,
    setResumeText,
    selectedSampleKey,
    loadSampleResume,
    targetJob,
    setTargetJob,
    targetJobDescription,
    setTargetJobDescription,
    analysisResult,
    isAnalyzing,
    workerError,
    durationMs,
    clearAnalysis
  } = useATS();

  const { trackJob, isJobTracked, getApplicationByJobId } = useTracker();

  const [copied, setCopied] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [trackFeedback, setTrackFeedback] = useState(null);
  const fileInputRef = useRef(null);

  // Compute live character and word counts
  const resumeWordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;
  const jdWordCount = targetJobDescription.trim() ? targetJobDescription.trim().split(/\s+/).length : 0;

  const isResumeEmpty = !resumeText.trim();
  const isJdEmpty = !targetJobDescription.trim();

  // Track status for active job
  const existingApp = targetJob ? getApplicationByJobId(targetJob.id) : null;

  const handleCopy = () => {
    if (!resumeText) return;
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Plain .txt file upload handler with validation
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    // Reset input so same file can be re-selected if desired
    e.target.value = '';

    // Validate file type
    const isTxt = file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt');
    if (!isTxt) {
      setFileError('Only plain text (.txt) files are supported. For PDF or DOCX, please copy and paste the plain text directly.');
      return;
    }

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileError('File exceeds 2MB limit. Please upload a smaller plain text file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setResumeText(content);
        setFileError(null);
      }
    };
    reader.onerror = () => {
      setFileError('Failed to read the file. Please try pasting the text manually.');
    };
    reader.readAsText(file);
  };

  const handleTrackApplication = (status = 'applied') => {
    if (!targetJob) return;
    const score = analysisResult ? analysisResult.overallMatchScore : null;
    trackJob(targetJob, status, score);
    setTrackFeedback(`Job tracked as "${status}"${score !== null ? ` with score ${score}%` : ''}!`);
    setTimeout(() => setTrackFeedback(null), 3000);

    if (onNavigateToTracker) {
      setTimeout(() => onNavigateToTracker(), 600);
    }
  };

  const handleDetachJob = () => {
    setTargetJob(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/70 to-slate-900/40 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Native Web Worker ATS Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Live ATS Resume Matcher
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time applicant tracking system simulation offloaded to a dedicated Web Worker thread.
              Evaluates skill coverage, keyword relevance, and readability without blocking the UI.
            </p>
          </div>

          {/* Active Job Integration Card */}
          {targetJob ? (
            <div className="bg-slate-950/90 border border-emerald-500/30 rounded-xl p-4 shrink-0 lg:max-w-xs shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  Active Synced Job
                </span>
                <button
                  type="button"
                  onClick={handleDetachJob}
                  title="Detach job and edit custom description"
                  className="text-slate-400 hover:text-rose-400 text-xs flex items-center space-x-1 transition"
                >
                  <Unlink className="w-3 h-3" />
                  <span>Detach</span>
                </button>
              </div>
              <div className="font-bold text-white text-sm mt-1.5 truncate">{targetJob.title}</div>
              <div className="text-xs text-slate-400 truncate mt-0.5">
                {targetJob.company} • {targetJob.location}
              </div>
              {targetJob.salary && (
                <div className="text-xs font-mono text-emerald-400 mt-1">
                  {typeof targetJob.salary === 'object'
                    ? formatSalaryRange(targetJob.salary)
                    : targetJob.salary}
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleTrackApplication('applied')}
                  className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{existingApp ? 'Update Tracked' : 'Track Application'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTrackApplication('saved')}
                  title="Save job to tracker"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <BookmarkPlus className="w-4 h-4" />
                </button>
              </div>
              {trackFeedback && (
                <div className="mt-2 text-[11px] text-emerald-400 font-medium text-center animate-fade-in">
                  {trackFeedback}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 max-w-xs shrink-0">
              <span className="font-semibold text-slate-300 block mb-1">No Active Job Synced</span>
              Paste a custom job description below, or select any listing in the{' '}
              <strong className="text-white">Job Explorer</strong> and click "Send to ATS" to auto-sync.
            </div>
          )}
        </div>
      </div>

      {/* Editor Controls & Selectors Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        {/* Sample Resume Dropdown */}
        <div className="flex items-center space-x-3">
          <label htmlFor="sample-resume-select" className="text-xs font-medium text-slate-300">
            Sample Resume:
          </label>
          <select
            id="sample-resume-select"
            value={selectedSampleKey}
            onChange={(e) => loadSampleResume(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {Object.entries(sampleResumes).map(([key, resume]) => (
              <option key={key} value={key}>
                {resume.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* File Upload Trigger */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileUpload}
            className="hidden"
            aria-label="Upload plain text resume (.txt)"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
            title="Upload a .txt plain text resume"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span>Upload .txt</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={isResumeEmpty}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-medium transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={() => setResumeText('')}
            disabled={isResumeEmpty}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-medium transition"
            title="Clear resume text"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={clearAnalysis}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 text-xs font-medium transition"
            title="Reset both resume and job description"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      {/* File Upload Validation Error Message */}
      {fileError && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{fileError}</span>
        </div>
      )}

      {/* Dual Live Editors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Input Editor */}
        <div className="flex flex-col bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <label htmlFor="resume-editor-input" className="font-semibold text-white text-sm cursor-pointer">
                Resume Content
              </label>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {resumeWordCount} words • {resumeText.length} chars
            </div>
          </div>

          <textarea
            id="resume-editor-input"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your plain text resume here, upload a .txt file, or select a sample resume from the preset dropdown above..."
            className="w-full flex-1 min-h-[360px] mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          />

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>Supported: Plain text (.txt) format</span>
            {isResumeEmpty && (
              <span className="text-amber-400">Please enter resume text to analyze</span>
            )}
          </div>
        </div>

        {/* Job Description Editor */}
        <div className="flex flex-col bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <label htmlFor="jd-editor-input" className="font-semibold text-white text-sm cursor-pointer">
                Target Job Description
              </label>
              {targetJob && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                  Synced: {targetJob.company}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {jdWordCount} words • {targetJobDescription.length} chars
            </div>
          </div>

          <textarea
            id="jd-editor-input"
            value={targetJobDescription}
            onChange={(e) => setTargetJobDescription(e.target.value)}
            placeholder="Paste a target job description or click 'Send to ATS' on any listing in Job Explorer..."
            className="w-full flex-1 min-h-[360px] mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          />

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>Full job description or qualifications section</span>
            <button
              type="button"
              onClick={() => setTargetJobDescription('')}
              disabled={isJdEmpty}
              className="text-slate-400 hover:text-white disabled:opacity-40 transition"
            >
              Clear JD
            </button>
          </div>
        </div>
      </div>

      {/* Web Worker Live Status Indicator */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-300"
        aria-live="polite"
      >
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isAnalyzing
                ? 'bg-amber-400 animate-pulse'
                : workerError
                ? 'bg-rose-500'
                : analysisResult
                ? 'bg-emerald-400'
                : 'bg-slate-500'
            }`}
          />
          <span className="font-semibold text-white">Native Web Worker:</span>
          <span className="text-slate-400">
            {isAnalyzing
              ? 'Computing TF-IDF, skill taxonomy, and readability in background thread (350ms debounce)...'
              : workerError
              ? `Worker Error: ${workerError}`
              : analysisResult
              ? `Analysis complete in ${durationMs}ms (background thread)`
              : 'Standing by — ready to process resume'}
          </span>
        </div>

        {analysisResult && (
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs text-slate-400">Quick Match:</span>
            <span
              className={`text-sm font-bold px-2.5 py-0.5 rounded-full font-mono ${
                analysisResult.overallMatchScore >= 75
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                  : analysisResult.overallMatchScore >= 50
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                  : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
              }`}
            >
              {analysisResult.overallMatchScore}%
            </span>
          </div>
        )}
      </div>

      {/* RESULTS DASHBOARD */}
      {isResumeEmpty && isJdEmpty ? (
        /* Empty Guidance State */
        <div className="p-8 sm:p-12 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h2 className="text-base font-bold text-white">Ready for ATS Matching</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Select a preset sample resume above or paste your resume text on the left.
            Then paste a job description or send one from Job Explorer to trigger real-time evaluation.
          </p>
        </div>
      ) : isResumeEmpty ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-400">
          Enter or paste your resume content in the left editor to calculate the ATS match.
        </div>
      ) : isJdEmpty ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-400">
          Enter a target job description or click "Send to ATS" from Job Explorer to calculate match metrics.
        </div>
      ) : analysisResult ? (
        <div className="space-y-8 animate-fade-in">
          {/* Section 1: Match Score Gauge & 5-Part Score Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 flex flex-col">
              <ScoreGauge
                score={analysisResult.overallMatchScore}
                isAnalyzing={isAnalyzing}
              />

              {/* Action: Track with ATS Score */}
              {targetJob && (
                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Ready to Apply?</span>
                    <span className="text-slate-400">
                      Save this {analysisResult.overallMatchScore}% score with {targetJob.company}.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTrackApplication('applied')}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition flex items-center justify-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Application to Tracker</span>
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <ScoreBreakdown breakdown={analysisResult.scoreBreakdown} />
            </div>
          </div>

          {/* Section 2: Matched & Missing Skills with Educational Note */}
          <SkillMatchSection
            matchedSkills={analysisResult.matchedSkills}
            missingSkills={analysisResult.missingSkills}
          />

          {/* Section 3: Readability & Keyword Density Panel */}
          <ReadabilityKeywordPanel
            readability={analysisResult.atsReadabilityScore}
            keywords={analysisResult.highlightedKeywords}
          />

          {/* Section 4: Actionable Recommendations Interactive Checklist */}
          <SuggestionsChecklist suggestions={analysisResult.suggestions} />
        </div>
      ) : null}
    </div>
  );
}

ATSMatcher.propTypes = {
  onNavigateToTracker: PropTypes.func
};

export default ATSMatcher;
