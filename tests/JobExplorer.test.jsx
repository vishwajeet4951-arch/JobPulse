import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { JobProvider, useJobs } from '../src/context/JobContext.jsx';
import { ATSProvider, useATS } from '../src/context/ATSContext.jsx';
import { TrackerProvider, useTracker } from '../src/context/TrackerContext.jsx';
import { JobExplorer } from '../src/components/jobs/JobExplorer.jsx';
import { JobCard } from '../src/components/jobs/JobCard.jsx';
import { JobDetailPanel } from '../src/components/jobs/JobDetailPanel.jsx';
import { mockJobs } from '../src/data/mockJobs.js';

// Custom wrapper to mount all providers
function TestAppWrapper({ children }) {
  return (
    <TrackerProvider>
      <JobProvider>
        <ATSProvider>{children}</ATSProvider>
      </JobProvider>
    </TrackerProvider>
  );
}

// Helper to wait for 250ms debounce
const waitForDebounce = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Test harness to directly inspect and manipulate JobContext state
function JobContextHarness({ onRender }) {
  const context = useJobs();
  onRender(context);
  return null;
}

describe('Module 1: Complete Job Explorer Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders page heading, description, and search input with accessible label', () => {
    render(
      <TestAppWrapper>
        <JobExplorer />
      </TestAppWrapper>
    );

    expect(screen.getByRole('heading', { name: /Developer Job Explorer/i })).toBeDefined();
    expect(screen.getByPlaceholderText(/Search roles by title, company, city, skills/i)).toBeDefined();
    expect(screen.getByLabelText(/Search developer jobs by title, company, location, description, or tech stack/i)).toBeDefined();
  });

  it('searches correctly by title, company, location, and relevant skills', async () => {
    let ctx;
    render(
      <TestAppWrapper>
        <JobContextHarness onRender={(val) => { ctx = val; }} />
      </TestAppWrapper>
    );

    // 1. Search by title
    act(() => {
      ctx.setSearchQuery('Design Systems');
    });
    await waitForDebounce(300);

    expect(ctx.filteredJobs.length).toBeGreaterThan(0);
    expect(ctx.filteredJobs.every((j) => {
      const q = 'design systems';
      const allSkills = [...(j.skillsRequired || []), ...(j.preferredSkills || []), ...(j.techStack || [])];
      return (
        j.title.toLowerCase().includes(q) ||
        (j.description || j.overview || '').toLowerCase().includes(q) ||
        allSkills.some((s) => s.toLowerCase().includes(q))
      );
    })).toBe(true);

    // 2. Search by company / keyword
    act(() => {
      ctx.setSearchQuery('Stripe');
    });
    await waitForDebounce(300);
    expect(ctx.filteredJobs.length).toBeGreaterThanOrEqual(4);
    expect(ctx.filteredJobs.every((j) => {
      const q = 'stripe';
      const allSkills = [...(j.skillsRequired || []), ...(j.preferredSkills || []), ...(j.techStack || [])];
      return (
        j.company.toLowerCase().includes(q) ||
        j.title.toLowerCase().includes(q) ||
        (j.description || j.overview || '').toLowerCase().includes(q) ||
        allSkills.some((s) => s.toLowerCase().includes(q))
      );
    })).toBe(true);
    expect(ctx.filteredJobs.filter((j) => j.company.toLowerCase().includes('stripe')).length).toBeGreaterThanOrEqual(4);

    // 3. Search by location / keyword
    act(() => {
      ctx.setSearchQuery('Austin');
    });
    await waitForDebounce(300);
    expect(ctx.filteredJobs.length).toBeGreaterThanOrEqual(2);
    expect(ctx.filteredJobs.every((j) => {
      const q = 'austin';
      return (
        j.location.toLowerCase().includes(q) ||
        (j.description || j.overview || '').toLowerCase().includes(q)
      );
    })).toBe(true);
    expect(ctx.filteredJobs.filter((j) => j.location.toLowerCase().includes('austin')).length).toBeGreaterThanOrEqual(2);

    // 4. Search by skill
    act(() => {
      ctx.setSearchQuery('Kubernetes');
    });
    await waitForDebounce(300);
    expect(ctx.filteredJobs.length).toBeGreaterThan(0);
    expect(ctx.filteredJobs.every((j) => {
      const q = 'kubernetes';
      const allSkills = [...(j.skillsRequired || []), ...(j.preferredSkills || []), ...(j.techStack || [])];
      return (
        allSkills.some((s) => s.toLowerCase().includes(q)) ||
        j.title.toLowerCase().includes(q) ||
        (j.description || j.overview || '').toLowerCase().includes(q)
      );
    })).toBe(true);
  });

  it('applies combined filters with documented AND/OR semantics', () => {
    let ctx;
    render(
      <TestAppWrapper>
        <JobContextHarness onRender={(val) => { ctx = val; }} />
      </TestAppWrapper>
    );

    // Filter by Category = 'Frontend' AND WorkMode = 'Remote' AND Seniority = 'Senior'
    act(() => {
      ctx.updateFilter('categories', ['Frontend']);
      ctx.updateFilter('workModes', ['Remote']);
      ctx.updateFilter('seniorities', ['Senior']);
    });

    expect(ctx.filteredJobs.length).toBeGreaterThan(0);
    for (const job of ctx.filteredJobs) {
      expect(job.category).toBe('Frontend');
      expect(job.type || job.workMode).toBe('Remote');
      expect(job.experienceLevel || job.seniority).toBe('Senior');
    }
  });

  it('filters by each work mode and experience level', () => {
    let ctx;
    render(
      <TestAppWrapper>
        <JobContextHarness onRender={(val) => { ctx = val; }} />
      </TestAppWrapper>
    );

    // Test Work Modes individually
    for (const mode of ['Remote', 'Hybrid', 'Onsite']) {
      act(() => {
        ctx.updateFilter('workModes', [mode]);
      });
      expect(ctx.filteredJobs.length).toBeGreaterThan(0);
      expect(ctx.filteredJobs.every((j) => (j.type || j.workMode) === mode)).toBe(true);
    }

    // Reset and test Experience Levels individually
    act(() => {
      ctx.updateFilter('workModes', []);
    });

    for (const level of ['Junior', 'Mid', 'Senior', 'Lead', 'Staff']) {
      act(() => {
        ctx.updateFilter('seniorities', [level]);
      });
      expect(ctx.filteredJobs.length).toBeGreaterThan(0);
      expect(ctx.filteredJobs.every((j) => (j.experienceLevel || j.seniority) === level)).toBe(true);
    }
  });

  it('supports multiple selected skills with OR semantics within skills', () => {
    let ctx;
    render(
      <TestAppWrapper>
        <JobContextHarness onRender={(val) => { ctx = val; }} />
      </TestAppWrapper>
    );

    act(() => {
      ctx.updateFilter('techStack', ['Rust', 'Swift']);
    });

    expect(ctx.filteredJobs.length).toBeGreaterThan(0);
    for (const job of ctx.filteredJobs) {
      const allSkills = [
        ...(job.skillsRequired || []),
        ...(job.preferredSkills || []),
        ...(job.techStack || [])
      ].map((s) => s.toLowerCase());

      const matchesRustOrSwift = allSkills.includes('rust') || allSkills.includes('swift');
      expect(matchesRustOrSwift).toBe(true);
    }
  });

  it('handles active filter chips and Clear All action', () => {
    let ctx;
    render(
      <TestAppWrapper>
        <JobContextHarness onRender={(val) => { ctx = val; }} />
      </TestAppWrapper>
    );

    act(() => {
      ctx.toggleArrayFilter('categories', 'Frontend');
      ctx.toggleArrayFilter('categories', 'Backend');
      ctx.updateFilter('minSalary', 150000);
    });

    expect(ctx.filters.categories).toEqual(['Frontend', 'Backend']);
    expect(ctx.filters.minSalary).toBe(150000);

    // Remove single chip
    act(() => {
      ctx.removeFilterItem('categories', 'Frontend');
    });
    expect(ctx.filters.categories).toEqual(['Backend']);
    expect(ctx.filters.minSalary).toBe(150000);

    // Reset all
    act(() => {
      ctx.resetFilters();
    });
    expect(ctx.filters.categories).toEqual([]);
    expect(ctx.filters.minSalary).toBe(0);
    expect(ctx.filteredJobs.length).toBe(mockJobs.length);
  });

  it('renders helpful empty state when 0 results match and restores on reset', async () => {
    let ctx;
    render(
      <TestAppWrapper>
        <JobExplorer />
        <JobContextHarness onRender={(val) => { ctx = val; }} />
      </TestAppWrapper>
    );

    // Enter query that produces 0 matches and wait for debounce
    act(() => {
      ctx.setSearchQuery('XYZImpossibleNonExistentDeveloperRole999');
    });
    await waitForDebounce(300);

    expect(ctx.filteredJobs.length).toBe(0);
    expect(screen.getByText(/No Matching Positions Found/i)).toBeDefined();

    // Click Reset
    const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
    act(() => {
      fireEvent.click(resetBtn);
    });
    await waitForDebounce(300);

    expect(ctx.filteredJobs.length).toBe(mockJobs.length);
  });

  it('selects a job card and updates the JobDetailPanel with full specs', () => {
    const job = mockJobs[0];
    const onSelect = vi.fn();
    const onSendToATS = vi.fn();
    const onSaveJob = vi.fn();

    render(
      <TestAppWrapper>
        <JobCard
          job={job}
          isSelected={true}
          onSelect={onSelect}
          onSendToATS={onSendToATS}
          onSaveJob={onSaveJob}
        />
        <JobDetailPanel
          job={job}
          onSendToATS={onSendToATS}
          onSaveJob={onSaveJob}
        />
      </TestAppWrapper>
    );

    // Card should be rendered with title
    expect(screen.getAllByText(job.title).length).toBeGreaterThanOrEqual(1);

    // Detail panel should render company, overview, and skills
    expect(screen.getByText(/About the Position/i)).toBeDefined();
    expect(screen.getByText(/Core Required Skills/i)).toBeDefined();
    expect(screen.getByText(job.description)).toBeDefined();
  });

  it('sends selected job to ATSContext and triggers navigation', () => {
    const job = mockJobs.find((j) => j.id === 'job-001');
    const onNavigateToATS = vi.fn();
    let latestATS;

    function ATSMonitor() {
      latestATS = useATS();
      return null;
    }

    render(
      <TestAppWrapper>
        <ATSMonitor />
        <JobExplorer onNavigateToATS={onNavigateToATS} />
      </TestAppWrapper>
    );

    // Find and click the "Send to ATS" button for job-001
    const sendButton = screen.getByRole('button', { name: `Send ${job.title} to ATS Matcher` });
    act(() => {
      fireEvent.click(sendButton);
    });

    // Verify ATSContext received the target job and navigation occurred
    expect(latestATS.targetJob).toBeDefined();
    expect(latestATS.targetJob.id).toBe(job.id);
    expect(latestATS.targetJobDescription).toContain(job.title);
    expect(onNavigateToATS).toHaveBeenCalled();
  });

  it('saves job to ApplicationTracker without creating duplicates', () => {
    let trackerState;

    function TrackerHarness() {
      trackerState = useTracker();
      return null;
    }

    render(
      <TestAppWrapper>
        <TrackerHarness />
      </TestAppWrapper>
    );

    const job = mockJobs[0];

    // First save
    act(() => {
      trackerState.trackJob(job, 'saved');
    });

    expect(trackerState.applications.length).toBe(1);
    expect(trackerState.applications[0].jobId).toBe(job.id);
    expect(trackerState.isJobTracked(job.id)).toBe(true);

    // Second save on same job (idempotent / no duplicate entries)
    act(() => {
      trackerState.trackJob(job, 'saved');
    });

    expect(trackerState.applications.length).toBe(1);
  });

  it('safely handles missing optional fields without throwing errors', () => {
    const minimalJob = {
      id: 'job-minimal-test',
      title: 'Minimal Developer',
      company: 'Test Corp',
      location: 'Remote',
      type: 'Remote',
      experienceLevel: 'Mid',
      skillsRequired: ['JavaScript'],
      description: 'Minimal job description without optional perks or salary.',
      salary: null,
      preferredSkills: null,
      responsibilities: null,
      qualifications: null,
      benefits: null
    };

    expect(() => {
      render(
        <TestAppWrapper>
          <JobCard
            job={minimalJob}
            isSelected={false}
            onSelect={() => {}}
            onSendToATS={() => {}}
            onSaveJob={() => {}}
          />
          <JobDetailPanel
            job={minimalJob}
            onSendToATS={() => {}}
            onSaveJob={() => {}}
          />
        </TestAppWrapper>
      );
    }).not.toThrow();

    expect(screen.getAllByText('Minimal Developer').length).toBe(2);
    expect(screen.getAllByText(/Salary undisclosed/i).length).toBeGreaterThanOrEqual(1);
  });
});
