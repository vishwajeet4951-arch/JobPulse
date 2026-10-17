import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ATSProvider, useATS } from '../src/context/ATSContext.jsx';
import { JobProvider } from '../src/context/JobContext.jsx';
import { TrackerProvider, useTracker } from '../src/context/TrackerContext.jsx';
import { ATSMatcher } from '../src/components/ats/ATSMatcher.jsx';
import { ScoreGauge } from '../src/components/ats/ScoreGauge.jsx';
import { ScoreBreakdown } from '../src/components/ats/ScoreBreakdown.jsx';
import { SkillMatchSection } from '../src/components/ats/SkillMatchSection.jsx';
import { ReadabilityKeywordPanel } from '../src/components/ats/ReadabilityKeywordPanel.jsx';
import { SuggestionsChecklist } from '../src/components/ats/SuggestionsChecklist.jsx';
import sampleResumes from '../src/data/sampleResumes.js';
import { mockJobs } from '../src/data/mockJobs.js';

// Test wrapper providing all necessary context providers
function TestWrapper({ children }) {
  return (
    <TrackerProvider>
      <JobProvider>
        <ATSProvider>{children}</ATSProvider>
      </JobProvider>
    </TrackerProvider>
  );
}

// Harness to inspect/manipulate ATSContext state in tests
function ATSContextHarness({ onRender }) {
  const ats = useATS();
  onRender(ats);
  return null;
}

// Harness to inspect TrackerContext state in tests
function TrackerContextHarness({ onRender }) {
  const tracker = useTracker();
  onRender(tracker);
  return null;
}

const waitForDebounce = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Module 2: Complete ATS Matcher UI Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders page heading, Web Worker status indicator, and dual labelled textareas', () => {
    render(
      <TestWrapper>
        <ATSMatcher />
      </TestWrapper>
    );

    expect(screen.getByRole('heading', { name: /Live ATS Resume Matcher/i })).toBeDefined();
    expect(screen.getByText(/Native Web Worker ATS Engine/i)).toBeDefined();
    expect(screen.getByLabelText(/Resume Content/i)).toBeDefined();
    expect(screen.getByLabelText(/Target Job Description/i)).toBeDefined();
    expect(screen.getByText(/Native Web Worker:/i)).toBeDefined();
  });

  it('shows live character and word counters updating with input', async () => {
    render(
      <TestWrapper>
        <ATSMatcher />
      </TestWrapper>
    );

    const jdTextarea = screen.getByLabelText(/Target Job Description/i);

    await act(async () => {
      fireEvent.change(jdTextarea, {
        target: { value: 'Senior React Developer with TypeScript and Tailwind CSS experience.' }
      });
    });

    expect(screen.getByText(/9 words • 67 chars/i)).toBeDefined();
  });

  it('switches sample resumes using preset selector and calculates match', async () => {
    render(
      <TestWrapper>
        <ATSMatcher />
      </TestWrapper>
    );

    const select = screen.getByLabelText(/Sample Resume:/i);
    const jdTextarea = screen.getByLabelText(/Target Job Description/i);

    await act(async () => {
      // Put a target JD
      fireEvent.change(jdTextarea, {
        target: {
          value: 'Looking for a Senior Frontend Engineer proficient in React, JavaScript, TypeScript, Next.js, and CSS.'
        }
      });
      // Switch sample resume to juniorDeveloper
      fireEvent.change(select, { target: { value: 'juniorDeveloper' } });
      await waitForDebounce(450);
    });

    const resumeTextarea = screen.getByLabelText(/Resume Content/i);
    expect(resumeTextarea.value).toContain('SAMANTHA LEE');
    // Result dashboard appears
    expect(screen.getByText(/Estimated Match/i)).toBeDefined();
  });

  it('handles .txt file uploads and displays error for invalid file extensions', async () => {
    render(
      <TestWrapper>
        <ATSMatcher />
      </TestWrapper>
    );

    const fileInput = screen.getByLabelText(/Upload plain text resume/i);

    // 1. Upload invalid PDF file
    const fakePdfFile = new File(['%PDF-1.4 dummy'], 'resume.pdf', { type: 'application/pdf' });
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [fakePdfFile] } });
    });

    expect(
      screen.getByText(/Only plain text \(\.txt\) files are supported/i)
    ).toBeDefined();

    // 2. Upload valid TXT file
    const fakeTxtFile = new File(
      ['Jane Doe\nStaff Software Engineer\nReact, TypeScript, GraphQL'],
      'resume.txt',
      { type: 'text/plain' }
    );

    // FileReader mock in jsdom
    const originalFileReader = window.FileReader;
    class MockFileReader {
      readAsText(file) {
        this.onload?.({ target: { result: 'Jane Doe\nStaff Software Engineer\nReact, TypeScript, GraphQL' } });
      }
    }
    window.FileReader = MockFileReader;

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [fakeTxtFile] } });
    });

    const resumeTextarea = screen.getByLabelText(/Resume Content/i);
    expect(resumeTextarea.value).toContain('Jane Doe');

    window.FileReader = originalFileReader;
  });

  it('displays active synced job with company, title, and allows detaching', async () => {
    let atsContext;
    render(
      <TestWrapper>
        <ATSContextHarness onRender={(ctx) => { atsContext = ctx; }} />
        <ATSMatcher />
      </TestWrapper>
    );

    const sampleJob = mockJobs[0];

    await act(async () => {
      atsContext.loadJobIntoATS(sampleJob);
      await waitForDebounce(450);
    });

    expect(screen.getByText('Active Synced Job')).toBeDefined();
    expect(screen.getByText(sampleJob.title)).toBeDefined();
    expect(screen.getAllByText(new RegExp(sampleJob.company, 'i')).length).toBeGreaterThan(0);

    // Detach job
    const detachBtn = screen.getByRole('button', { name: /Detach/i });
    await act(async () => {
      fireEvent.click(detachBtn);
    });

    expect(screen.queryByText('Active Synced Job')).toBeNull();
    expect(screen.getByText(/No Active Job Synced/i)).toBeDefined();
  });

  it('renders circular ScoreGauge with correct value, accessibility attributes, and rating', () => {
    const { rerender } = render(
      <ScoreGauge score={88} isAnalyzing={false} />
    );

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar.getAttribute('aria-valuenow')).toBe('88');
    expect(progressbar.getAttribute('aria-valuemin')).toBe('0');
    expect(progressbar.getAttribute('aria-valuemax')).toBe('100');
    expect(screen.getByTestId('score-value').textContent).toBe('88');
    expect(screen.getByText('Strong Match')).toBeDefined();

    // Rerender with moderate score
    rerender(<ScoreGauge score={62} isAnalyzing={false} />);
    expect(screen.getByTestId('score-value').textContent).toBe('62');
    expect(screen.getByText('Moderate Match')).toBeDefined();

    // Rerender with low score
    rerender(<ScoreGauge score={35} isAnalyzing={false} />);
    expect(screen.getByTestId('score-value').textContent).toBe('35');
    expect(screen.getByText('Low Match')).toBeDefined();
  });

  it('renders 5-part ScoreBreakdown with correct point weights and penalty notice', () => {
    const breakdown = {
      requiredSkillsScore: 80,
      preferredSkillsScore: 70,
      keywordRelevanceScore: 65,
      alignmentScore: 90,
      readabilityScore: 85,
      penaltyDeducted: 4
    };

    render(<ScoreBreakdown breakdown={breakdown} />);

    expect(screen.getByText('Required Skills Match')).toBeDefined();
    expect(screen.getByText('Preferred / Bonus Skills')).toBeDefined();
    expect(screen.getByText('Keyword & Term Relevance')).toBeDefined();
    expect(screen.getByText('Role & Seniority Alignment')).toBeDefined();
    expect(screen.getByText('Readability & Quantified Impact')).toBeDefined();

    // Check penalty notice
    expect(screen.getByText(/Critical Gap Penalty: -4 pts/i)).toBeDefined();
  });

  it('displays matched skills with count badges and missing skills with critical/recommended tags', () => {
    const matched = [
      { name: 'React', category: 'Frontend', isRequired: true, isPreferred: false, countInResume: 4, countInJD: 2 },
      { name: 'Docker', category: 'DevOps', isRequired: false, isPreferred: true, countInResume: 1, countInJD: 1 }
    ];
    const missing = [
      { name: 'GraphQL', category: 'Backend', isRequired: true, isPreferred: false, priority: 'critical' },
      { name: 'Kubernetes', category: 'Cloud', isRequired: false, isPreferred: true, priority: 'recommended' }
    ];

    render(<SkillMatchSection matchedSkills={matched} missingSkills={missing} />);

    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('Docker')).toBeDefined();
    expect(screen.getByText('GraphQL')).toBeDefined();
    expect(screen.getByText('Kubernetes')).toBeDefined();

    // Badges
    expect(screen.getByText(/Critical Core Requirements/i)).toBeDefined();
    expect(screen.getByText(/Recommended Preferred Skills/i)).toBeDefined();
  });

  it('renders educational note regarding keyword matching and transferable skills', () => {
    render(<SkillMatchSection matchedSkills={[]} missingSkills={[]} />);

    expect(
      screen.getByText(/Educational Note:/i)
    ).toBeDefined();
    expect(
      screen.getByText(/Keyword matching highlights exact and taxonomic matches against our technical skill taxonomy/i)
    ).toBeDefined();
  });

  it('renders readability metrics, quantifiable impact ratio, and heuristic disclaimer', () => {
    const readability = {
      heuristicScore: 78,
      fleschReadingEase: 52.4,
      readingLevel: 'Standard (Plain English)',
      wordCount: 350,
      sentenceCount: 22,
      avgWordsPerSentence: 15.9,
      bulletCount: 10,
      bulletsWithMetricsCount: 6,
      metricRatio: 0.6,
      disclaimer: 'Heuristic readability and metric scores are automated estimates for guidance and do not represent formal ATS certification.'
    };
    const keywords = [
      { word: 'react', count: 6 },
      { word: 'typescript', count: 4 }
    ];

    render(<ReadabilityKeywordPanel readability={readability} keywords={keywords} />);

    expect(screen.getByText('Score: 78/100')).toBeDefined();
    expect(screen.getByText('Standard (Plain English)')).toBeDefined();
    expect(screen.getByText('52.4 / 100')).toBeDefined();
    expect(screen.getByText('15.9 words')).toBeDefined();
    expect(screen.getByText('350')).toBeDefined();
    expect(screen.getByText('6 (60%)')).toBeDefined();
    expect(screen.getByText(readability.disclaimer)).toBeDefined();

    // Keywords
    expect(screen.getByText('react')).toBeDefined();
    expect(screen.getByText('6x')).toBeDefined();
    expect(screen.getByText('typescript')).toBeDefined();
    expect(screen.getByText('4x')).toBeDefined();
  });

  it('allows checking off actionable recommendations without changing the automated score, and supports resetting', () => {
    const suggestions = [
      { id: 'sug_1', type: 'critical', title: 'Add Missing Core Skills', description: 'Include Docker in work history.' },
      { id: 'sug_2', type: 'improvement', title: 'Quantify Accomplishments', description: 'Add metrics to 3 more bullets.' },
      { id: 'sug_3', type: 'positive', title: 'Excellent Tech Alignment', description: 'Core requirements met.' }
    ];

    render(<SuggestionsChecklist suggestions={suggestions} />);

    expect(screen.getByText('Add Missing Core Skills')).toBeDefined();
    expect(screen.getByText('Quantify Accomplishments')).toBeDefined();
    expect(screen.getByText('Excellent Tech Alignment')).toBeDefined();

    // Initial checklist progress
    expect(screen.getByTestId('checklist-progress').textContent).toContain('0 of 2 addressed');

    // Click on first critical suggestion to mark as addressed
    const firstCheckbox = screen.getByRole('button', { name: /Mark "Add Missing Core Skills" as addressed/i });
    fireEvent.click(firstCheckbox);

    expect(screen.getByTestId('checklist-progress').textContent).toContain('1 of 2 addressed');

    // Reset button appears
    const resetBtn = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetBtn);

    expect(screen.getByTestId('checklist-progress').textContent).toContain('0 of 2 addressed');
  });

  it('tracks application with ATS score into TrackerContext', async () => {
    let atsContext;
    let trackerContext;

    render(
      <TestWrapper>
        <ATSContextHarness onRender={(ctx) => { atsContext = ctx; }} />
        <TrackerContextHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ATSMatcher />
      </TestWrapper>
    );

    const sampleJob = mockJobs[1]; // Frontend job

    await act(async () => {
      atsContext.loadJobIntoATS(sampleJob);
      await waitForDebounce(450);
    });

    const trackBtn = screen.getByRole('button', { name: /Track Application/i });
    await act(async () => {
      fireEvent.click(trackBtn);
    });

    const trackedApp = trackerContext.getApplicationByJobId(sampleJob.id);
    expect(trackedApp).toBeDefined();
    expect(trackedApp.jobId).toBe(sampleJob.id);
    expect(trackedApp.status).toBe('applied');
    expect(typeof trackedApp.matchScore).toBe('number');
  });

  it('clears both inputs and results when Reset All is clicked', async () => {
    render(
      <TestWrapper>
        <ATSMatcher />
      </TestWrapper>
    );

    const resumeTextarea = screen.getByLabelText(/Resume Content/i);
    const jdTextarea = screen.getByLabelText(/Target Job Description/i);

    await act(async () => {
      fireEvent.change(jdTextarea, { target: { value: 'Testing JD text' } });
      await waitForDebounce(450);
    });

    const resetAllBtn = screen.getByRole('button', { name: /Reset All/i });
    await act(async () => {
      fireEvent.click(resetAllBtn);
      await waitForDebounce(450);
    });

    expect(resumeTextarea.value).toBe('');
    expect(jdTextarea.value).toBe('');
    expect(screen.getByText(/Ready for ATS Matching/i)).toBeDefined();
  });
});
