import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { TrackerProvider, useTracker, validateImportPayload } from '../src/context/TrackerContext.jsx';
import { JobProvider } from '../src/context/JobContext.jsx';
import { ATSProvider } from '../src/context/ATSContext.jsx';
import { ApplicationTracker } from '../src/components/tracker/ApplicationTracker.jsx';
import { TrackerAnalytics } from '../src/components/tracker/TrackerAnalytics.jsx';
import { KanbanCard } from '../src/components/tracker/KanbanCard.jsx';
import { mockJobs } from '../src/data/mockJobs.js';

// Test wrapper
function TestWrapper({ children }) {
  return (
    <TrackerProvider>
      <JobProvider>
        <ATSProvider>{children}</ATSProvider>
      </JobProvider>
    </TrackerProvider>
  );
}

// Harness to manipulate TrackerContext directly in tests
function TrackerHarness({ onRender }) {
  const tracker = useTracker();
  onRender(tracker);
  return null;
}

describe('Module 3: Complete Application Tracker Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the four Kanban stages with titles and zero-state placeholder when empty', () => {
    render(
      <TestWrapper>
        <ApplicationTracker />
      </TestWrapper>
    );

    expect(screen.getByRole('heading', { name: /Application Tracker/i })).toBeDefined();
    expect(screen.getByText(/Your Pipeline is Empty/i)).toBeDefined();
    expect(screen.getByText(/Total Applications/i)).toBeDefined();
    expect(screen.getByText(/Active Pipeline/i)).toBeDefined();
    expect(screen.getByText(/Interview Rate/i)).toBeDefined();
  });

  it('tracks jobs and renders cards across Saved, Applied, Interviewing, and Offer stages', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    // Track 4 sample jobs into different stages
    await act(async () => {
      trackerContext.trackJob(mockJobs[0], 'saved', 82);
      trackerContext.trackJob(mockJobs[1], 'applied', 75);
      trackerContext.trackJob(mockJobs[2], 'interviewing', 90);
      trackerContext.trackJob(mockJobs[3], 'offer', 95);
    });

    expect(screen.getByText(mockJobs[0].title)).toBeDefined();
    expect(screen.getByText(mockJobs[1].title)).toBeDefined();
    expect(screen.getByText(mockJobs[2].title)).toBeDefined();
    expect(screen.getByText(mockJobs[3].title)).toBeDefined();

    // Verify ATS Match pills
    expect(screen.getByText(/ATS Match: 82%/i)).toBeDefined();
    expect(screen.getByText(/ATS Match: 75%/i)).toBeDefined();
    expect(screen.getByText(/ATS Match: 90%/i)).toBeDefined();
    expect(screen.getByText(/ATS Match: 95%/i)).toBeDefined();
  });

  it('moves an application between stages via quick-stage dropdown and updates timestamps', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    const testJob = mockJobs[0];

    await act(async () => {
      trackerContext.trackJob(testJob, 'saved', 80);
    });

    const app = trackerContext.getApplicationByJobId(testJob.id);
    expect(app.status).toBe('saved');
    expect(app.appliedDate).toBeNull();

    // Select the stage dropdown for this card
    const stageSelect = screen.getByLabelText(/Move application stage/i);
    await act(async () => {
      fireEvent.change(stageSelect, { target: { value: 'applied' } });
    });

    const updatedApp = trackerContext.getApplicationByJobId(testJob.id);
    expect(updatedApp.status).toBe('applied');
    expect(typeof updatedApp.appliedDate).toBe('string');
    expect(new Date(updatedApp.appliedDate).getTime()).toBeGreaterThan(0);
  });

  it('toggles between Kanban and List/Table view modes smoothly', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    await act(async () => {
      trackerContext.trackJob(mockJobs[0], 'applied', 85);
    });

    // Default view is Kanban
    expect(screen.getByRole('button', { name: /Kanban/i }).getAttribute('aria-pressed')).toBe('true');

    // Click List view button
    const listBtn = screen.getByRole('button', { name: /List/i });
    await act(async () => {
      fireEvent.click(listBtn);
    });

    expect(listBtn.getAttribute('aria-pressed')).toBe('true');
    // Table headers should now be in the DOM
    expect(screen.getByText('Role & Company')).toBeDefined();
    expect(screen.getByText('Stage')).toBeDefined();
  });

  it('searches applications by role title and company, and clears search', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    await act(async () => {
      trackerContext.trackJob(mockJobs[0], 'saved'); // Stripe
      trackerContext.trackJob(mockJobs[1], 'applied'); // Vercel
    });

    const searchInput = screen.getByPlaceholderText(/Search by role title or company/i);

    // Filter by "Stripe"
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Stripe' } });
    });

    expect(screen.getByText(mockJobs[0].title)).toBeDefined();
    expect(screen.queryByText(mockJobs[1].title)).toBeNull();

    // Clear search
    const clearBtn = screen.getByRole('button', { name: /Clear search/i });
    await act(async () => {
      fireEvent.click(clearBtn);
    });

    expect(screen.getByText(mockJobs[1].title)).toBeDefined();
  });

  it('filters applications by stage using multi-select chips and resets filters', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    await act(async () => {
      trackerContext.trackJob(mockJobs[0], 'saved');
      trackerContext.trackJob(mockJobs[1], 'applied');
      trackerContext.trackJob(mockJobs[2], 'interviewing');
    });

    // Unselect saved: click "Saved" stage filter button
    const savedFilterBtn = screen.getByRole('button', { name: 'Saved' });
    await act(async () => {
      fireEvent.click(savedFilterBtn);
    });

    expect(screen.queryByText(mockJobs[0].title)).toBeNull();
    expect(screen.getByText(mockJobs[1].title)).toBeDefined();
    expect(screen.getByText(mockJobs[2].title)).toBeDefined();

    // Click Reset Filters
    const resetFiltersBtn = screen.getByRole('button', { name: /Reset Filters/i });
    await act(async () => {
      fireEvent.click(resetFiltersBtn);
    });

    expect(screen.getByText(mockJobs[0].title)).toBeDefined();
  });

  it('sorts applications by title, applied date, and ATS match score', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    await act(async () => {
      trackerContext.trackJob({ ...mockJobs[0], title: 'Zebra Engineer' }, 'applied', 60);
      trackerContext.trackJob({ ...mockJobs[1], title: 'Alpha Engineer' }, 'applied', 95);
    });

    // Switch to List view to test sorted DOM order
    const listBtn = screen.getByRole('button', { name: /List/i });
    await act(async () => {
      fireEvent.click(listBtn);
    });

    const sortSelect = screen.getByLabelText(/Sort applications by/i);

    // Sort by Title A-Z
    await act(async () => {
      fireEvent.change(sortSelect, { target: { value: 'title-asc' } });
    });

    const rows = screen.getAllByRole('row');
    // First data row (index 1) should be Alpha
    expect(within(rows[1]).getByText('Alpha Engineer')).toBeDefined();

    // Sort by ATS Score (descending)
    await act(async () => {
      fireEvent.change(sortSelect, { target: { value: 'matchScore-desc' } });
    });

    const sortedRows = screen.getAllByRole('row');
    expect(within(sortedRows[1]).getByText('Alpha Engineer')).toBeDefined();
  });

  it('opens application detail modal, edits interview notes, and persists changes', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    const testJob = mockJobs[0];
    await act(async () => {
      trackerContext.trackJob(testJob, 'applied', 88);
    });

    // Click on job card title to open modal
    const cardTitle = screen.getByText(testJob.title);
    await act(async () => {
      fireEvent.click(cardTitle);
    });

    // Modal is opened
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/Interview Notes & Follow-Ups/i)).toBeDefined();

    // Edit notes textarea
    const notesTextarea = screen.getByPlaceholderText(/Record recruiter contacts/i);
    await act(async () => {
      fireEvent.change(notesTextarea, {
        target: { value: 'Screening call scheduled with Sarah on Tuesday at 2pm.' }
      });
    });

    // Click Save Notes
    const saveNotesBtn = screen.getByRole('button', { name: /Save Notes/i });
    await act(async () => {
      fireEvent.click(saveNotesBtn);
    });

    expect(screen.getByText(/Notes successfully saved!/i)).toBeDefined();

    // Verify persisted in context
    const updatedApp = trackerContext.getApplicationByJobId(testJob.id);
    expect(updatedApp.notes).toBe('Screening call scheduled with Sarah on Tuesday at 2pm.');

    // Close modal
    const closeBtn = screen.getByLabelText(/Close application details/i);
    await act(async () => {
      fireEvent.click(closeBtn);
    });

    // Note preview appears on card
    expect(screen.getByText(/"Screening call scheduled with Sarah on Tuesday at 2pm."/i)).toBeDefined();
  });

  it('removes an application with confirmation prompt and updates counts', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    const testJob = mockJobs[0];
    await act(async () => {
      trackerContext.trackJob(testJob, 'saved');
    });

    expect(screen.getByText(testJob.title)).toBeDefined();

    // Click delete icon on card
    const deleteBtn = screen.getByLabelText(new RegExp(`Delete application for ${testJob.title}`, 'i'));
    await act(async () => {
      fireEvent.click(deleteBtn);
    });

    // Confirmation modal appears
    expect(screen.getByText(/Confirm Deletion/i)).toBeDefined();

    // Click Delete confirm button
    const confirmBtn = screen.getByRole('button', { name: 'Delete' });
    await act(async () => {
      fireEvent.click(confirmBtn);
    });

    expect(screen.queryByText(testJob.title)).toBeNull();
    expect(trackerContext.applications.length).toBe(0);
  });

  it('handles missing optional fields (no salary, no ATS score, no notes) gracefully', () => {
    const minimalApp = {
      id: 'app_min_1',
      jobId: 'job_min_1',
      title: 'Minimalist Developer',
      company: 'Acme Corp',
      location: null,
      salary: null,
      workMode: null,
      seniority: null,
      status: 'saved',
      matchScore: null,
      notes: '',
      appliedDate: null,
      updatedAt: new Date().toISOString()
    };

    render(
      <KanbanCard
        application={minimalApp}
        onOpenDetails={() => {}}
        onStageChange={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Minimalist Developer')).toBeDefined();
    expect(screen.getByText('Acme Corp')).toBeDefined();
    expect(screen.queryByText(/ATS Match:/i)).toBeNull();
  });

  it('calculates analytics correctly with zero-denominator safety and documented rates', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <TrackerAnalytics />
      </TestWrapper>
    );

    // Initial state: 0 applications
    expect(screen.getAllByText('0%').length).toBeGreaterThan(0);

    // Add 4 applications:
    // 1 Saved, 1 Applied (score 70), 1 Interviewing (score 90), 1 Offer (score 95)
    await act(async () => {
      trackerContext.trackJob(mockJobs[0], 'saved', null);
      trackerContext.trackJob(mockJobs[1], 'applied', 70);
      trackerContext.trackJob(mockJobs[2], 'interviewing', 90);
      trackerContext.trackJob(mockJobs[3], 'offer', 95);
    });

    // Total = 4
    // Active Pipeline = Applied (1) + Interviewing (1) = 2
    // Scored = 3 (70 + 90 + 95 = 255 / 3 = 85%)
    // Application Rate = (1 applied + 1 interviewing + 1 offer) / 4 = 75%
    // Interview Rate = (1 interviewing + 1 offer) / 3 = 67%
    // Offer Rate = 1 offer / 2 (interviewing + offer) = 50%
    const analytics = trackerContext.analytics;
    expect(analytics.totalCount).toBe(4);
    expect(analytics.activeOpportunities).toBe(2);
    expect(analytics.avgMatchScore).toBe(85);
    expect(analytics.applicationRate).toBe(75);
    expect(analytics.interviewRate).toBe(67);
    expect(analytics.offerRate).toBe(50);
  });

  it('handles cross-tab synchronization through native storage events', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
        <ApplicationTracker />
      </TestWrapper>
    );

    expect(trackerContext.applications.length).toBe(0);

    // Simulate an external tab adding an application to localStorage and firing a storage event
    const externalApp = {
      id: 'app_external_1',
      jobId: 'job-999',
      title: 'External Remote Engineer',
      company: 'Distributed Labs',
      status: 'interviewing',
      matchScore: 92,
      notes: 'Added from tab 2',
      updatedAt: new Date().toISOString()
    };

    window.localStorage.setItem('jobpulse_applications_v1', JSON.stringify([externalApp]));

    // Dispatch StorageEvent
    await act(async () => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'jobpulse_applications_v1',
          newValue: JSON.stringify([externalApp])
        })
      );
    });

    expect(screen.getByText('External Remote Engineer')).toBeDefined();
    expect(trackerContext.applications.length).toBe(1);
  });

  it('exports versioned JSON schema (v1.0.0) with required metadata', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
      </TestWrapper>
    );

    await act(async () => {
      trackerContext.trackJob(mockJobs[0], 'applied', 85);
    });

    // Mock createObjectURL & revokeObjectURL
    const createObjectURLMock = vi.fn().mockReturnValue('blob:mock-url');
    const revokeObjectURLMock = vi.fn();
    window.URL.createObjectURL = createObjectURLMock;
    window.URL.revokeObjectURL = revokeObjectURLMock;

    act(() => {
      trackerContext.exportData();
    });

    expect(createObjectURLMock).toHaveBeenCalled();
  });

  it('validates import files, rejecting invalid JSON, unsupported versions, and malformed records', () => {
    // 1. Invalid syntax
    const res1 = validateImportPayload('{ malformed json');
    expect(res1.valid).toBe(false);
    expect(res1.error).toContain('Invalid JSON syntax');

    // 2. Unsupported version
    const res2 = validateImportPayload(
      JSON.stringify({ version: '2.5.0', applications: [] })
    );
    expect(res2.valid).toBe(false);
    expect(res2.error).toContain('Unsupported backup version');

    // 3. Missing applications array
    const res3 = validateImportPayload(
      JSON.stringify({ version: '1.0.0', data: [] })
    );
    expect(res3.valid).toBe(false);
    expect(res3.error).toContain('missing "applications" array');

    // 4. Empty valid records
    const res4 = validateImportPayload(
      JSON.stringify({ version: '1.0.0', applications: [{ invalid: 'no title or company' }] })
    );
    expect(res4.valid).toBe(false);
    expect(res4.error).toContain('No valid application records found');

    // 5. Valid schema payload
    const res5 = validateImportPayload(
      JSON.stringify({
        version: '1.0.0',
        applications: [
          { title: 'Frontend Lead', company: 'Linear', status: 'interviewing', matchScore: 91 }
        ]
      })
    );
    expect(res5.valid).toBe(true);
    expect(res5.count).toBe(1);
    expect(res5.records[0].title).toBe('Frontend Lead');
  });

  it('supports Merge mode with deduplication and field conflict resolution', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
      </TestWrapper>
    );

    // Initial state: tracked job with existing notes
    await act(async () => {
      trackerContext.trackJob(
        { id: 'job-100', title: 'Senior Staff Engineer', company: 'Google' },
        'saved',
        80
      );
    });

    const initialApp = trackerContext.getApplicationByJobId('job-100');
    await act(async () => {
      trackerContext.updateApplicationNotes(initialApp.id, 'Existing personal notes');
    });

    // Incoming record with same jobId: updated stage to interviewing, but empty notes
    const incomingRecords = [
      {
        id: 'app_incoming_1',
        jobId: 'job-100',
        title: 'Senior Staff Engineer',
        company: 'Google',
        status: 'interviewing',
        matchScore: 88,
        notes: '' // Blank incoming notes
      },
      {
        id: 'app_new_2',
        jobId: 'job-200',
        title: 'Cloud Architect',
        company: 'Amazon',
        status: 'applied',
        matchScore: 84
      }
    ];

    await act(async () => {
      trackerContext.applyImport(incomingRecords, 'merge');
    });

    // Should have 2 total applications
    expect(trackerContext.applications.length).toBe(2);

    // Conflict resolution: stage updated to interviewing, existing notes preserved
    const mergedJob100 = trackerContext.getApplicationByJobId('job-100');
    expect(mergedJob100.status).toBe('interviewing');
    expect(mergedJob100.matchScore).toBe(88);
    expect(mergedJob100.notes).toBe('Existing personal notes');

    // New record added
    const newJob200 = trackerContext.getApplicationByJobId('job-200');
    expect(newJob200).toBeDefined();
    expect(newJob200.company).toBe('Amazon');
  });

  it('supports Replace mode without corrupting state on failed imports', async () => {
    let trackerContext;
    render(
      <TestWrapper>
        <TrackerHarness onRender={(ctx) => { trackerContext = ctx; }} />
      </TestWrapper>
    );

    await act(async () => {
      trackerContext.trackJob(mockJobs[0], 'saved');
    });

    expect(trackerContext.applications.length).toBe(1);

    const replacementRecords = [
      {
        id: 'app_rep_1',
        jobId: 'job_rep_1',
        title: 'Replacement Engineer',
        company: 'Meta',
        status: 'offer',
        matchScore: 94
      }
    ];

    await act(async () => {
      trackerContext.applyImport(replacementRecords, 'replace');
    });

    expect(trackerContext.applications.length).toBe(1);
    expect(trackerContext.applications[0].title).toBe('Replacement Engineer');
    expect(trackerContext.applications[0].company).toBe('Meta');
  });

  it('falls back gracefully when localStorage contains corrupted or non-JSON data', () => {
    window.localStorage.setItem('jobpulse_applications_v1', 'corrupted { non json content');

    // Rendering should not crash and fall back to empty array
    render(
      <TestWrapper>
        <ApplicationTracker />
      </TestWrapper>
    );

    expect(screen.getByRole('heading', { name: /Application Tracker/i })).toBeDefined();
    expect(screen.getByText(/Your Pipeline is Empty/i)).toBeDefined();
  });
});
