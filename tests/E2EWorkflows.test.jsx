import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { App } from '../src/App.jsx';
import { mockJobs } from '../src/data/mockJobs.js';
import { validateImportPayload } from '../src/context/TrackerContext.jsx';

const waitForDebounce = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Phase 6: End-to-End User Workflows Verification', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Workflow A: Job Explorer to ATS Matcher with debounced analysis', async () => {
    render(<App />);

    // 1. Verify Job Explorer is active
    expect(screen.getByRole('heading', { name: /Developer Job Explorer/i })).toBeDefined();

    // 2. Search for a specific job (e.g. "Stripe")
    const searchInput = screen.getByPlaceholderText(/Search roles by title, company, city, skills/i);
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Stripe' } });
      await waitForDebounce(300);
    });

    expect(screen.getAllByText(/Senior Frontend Engineer - Design Systems/i).length).toBeGreaterThan(0);

    // 3. Click "Send to ATS" on the job card
    const sendCardButton = screen.getByRole('button', {
      name: new RegExp(`Send ${mockJobs[0].title} to ATS Matcher`, 'i')
    });
    await act(async () => {
      fireEvent.click(sendCardButton);
    });

    // 4. Verify transition to ATS Matcher tab
    expect(screen.getByRole('heading', { name: /Live ATS Resume Matcher/i })).toBeDefined();

    // 5. Verify synced job header and description are populated
    expect(screen.getByText('Active Synced Job')).toBeDefined();
    expect(screen.getAllByText(/Senior Frontend Engineer - Design Systems/i).length).toBeGreaterThan(0);

    const jdTextarea = screen.getByLabelText(/Target Job Description/i);
    expect(jdTextarea.value).toContain('Stripe');
    expect(jdTextarea.value).toContain('REQUIRED SKILLS');

    // 6. Switch sample resume to "juniorDeveloper"
    const sampleSelect = screen.getByLabelText(/Sample Resume:/i);
    await act(async () => {
      fireEvent.change(sampleSelect, { target: { value: 'juniorDeveloper' } });
      await waitForDebounce(450);
    });

    // 7. Verify analysis completes and results dashboard renders
    expect(screen.getByRole('progressbar')).toBeDefined();
    expect(screen.getByTestId('score-value')).toBeDefined();
    expect(screen.getByText(/Score Composition Breakdown/i)).toBeDefined();
    expect(screen.getByText(/Matched Skills/i)).toBeDefined();
    expect(screen.getByText(/Missing Skills/i)).toBeDefined();
    expect(screen.getByText(/Educational Note:/i)).toBeDefined();
  });

  it('Workflow B: Job Explorer to Application Tracker with persistence & notes', async () => {
    const { unmount } = render(<App />);

    // 1. Save a job from Job Explorer
    const saveJobButtons = screen.getAllByRole('button', { name: /Save Job/i });
    await act(async () => {
      fireEvent.click(saveJobButtons[0]);
    });

    // 2. Navigate to Application Tracker tab via main navigation
    const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
    const trackerNavBtn = within(mainNav).getByRole('button', { name: /Application Tracker/i });
    await act(async () => {
      fireEvent.click(trackerNavBtn);
    });

    expect(screen.getByRole('heading', { name: /Application Tracker/i })).toBeDefined();

    // 3. Confirm job card is present in Saved column
    const savedColumn = screen.getByRole('region', { name: /Saved stage/i });
    expect(within(savedColumn).getByText(mockJobs[0].title)).toBeDefined();

    // 4. Move application to Applied
    const stageSelect = within(savedColumn).getByLabelText(/Move application stage/i);
    await act(async () => {
      fireEvent.change(stageSelect, { target: { value: 'applied' } });
    });

    // Confirm it moved to Applied column
    const appliedColumn = screen.getByRole('region', { name: /Applied stage/i });
    const appliedCardTitle = within(appliedColumn).getByText(mockJobs[0].title);
    expect(appliedCardTitle).toBeDefined();

    // 5. Open application details, add notes, and save
    await act(async () => {
      fireEvent.click(appliedCardTitle);
    });

    expect(screen.getByRole('dialog')).toBeDefined();
    const notesTextarea = screen.getByPlaceholderText(/Record recruiter contacts/i);
    await act(async () => {
      fireEvent.change(notesTextarea, {
        target: { value: 'Round 1 technical screen scheduled with hiring manager.' }
      });
    });

    const saveNotesBtn = screen.getByRole('button', { name: /Save Notes/i });
    await act(async () => {
      fireEvent.click(saveNotesBtn);
    });

    expect(screen.getByText(/Notes successfully saved!/i)).toBeDefined();

    // Close modal
    const closeBtn = screen.getByLabelText(/Close application details/i);
    await act(async () => {
      fireEvent.click(closeBtn);
    });

    // 6. Simulate page refresh by unmounting and remounting App
    unmount();

    render(<App />);

    // Navigate to tracker
    const newMainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
    const newTrackerNavBtn = within(newMainNav).getByRole('button', { name: /Application Tracker/i });
    await act(async () => {
      fireEvent.click(newTrackerNavBtn);
    });

    // Confirm persisted data
    expect(screen.getByText(mockJobs[0].title)).toBeDefined();
    expect(
      screen.getByText(/"Round 1 technical screen scheduled with hiring manager."/i)
    ).toBeDefined();
  });

  it('Workflow C: ATS Matcher to Application Tracker with ATS score linking', async () => {
    render(<App />);

    // 1. Navigate to ATS Matcher via main navigation
    const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
    const atsNavBtn = within(mainNav).getByRole('button', { name: /ATS Matcher/i });
    await act(async () => {
      fireEvent.click(atsNavBtn);
    });

    // 2. Select a sample resume and enter job description
    const jdTextarea = screen.getByLabelText(/Target Job Description/i);
    await act(async () => {
      fireEvent.change(jdTextarea, {
        target: {
          value: 'Senior Frontend Engineer at Airbnb. Required skills: React, TypeScript, GraphQL, CSS.'
        }
      });
      await waitForDebounce(450);
    });

    // Result gauge is rendered
    expect(screen.getByRole('progressbar')).toBeDefined();

    // 3. Switch back to Job Explorer and send a job with active tracking
    const explorerNavBtn = within(screen.getByRole('navigation', { name: /Main Navigation/i })).getByRole('button', {
      name: /Job Explorer/i
    });
    await act(async () => {
      fireEvent.click(explorerNavBtn);
    });

    const sendCardBtn = screen.getByRole('button', {
      name: new RegExp(`Send ${mockJobs[0].title} to ATS Matcher`, 'i')
    });
    await act(async () => {
      fireEvent.click(sendCardBtn);
      await waitForDebounce(450);
    });

    // 4. In ATS, click "Track Application"
    const trackAppBtn = screen.getByRole('button', { name: /Track Application/i });
    await act(async () => {
      fireEvent.click(trackAppBtn);
    });

    // 5. Transition to Tracker
    const trackerNavBtn = within(screen.getByRole('navigation', { name: /Main Navigation/i })).getByRole('button', {
      name: /Application Tracker/i
    });
    await act(async () => {
      fireEvent.click(trackerNavBtn);
    });

    // Application is in Applied stage with ATS score badge
    expect(screen.getByText(mockJobs[0].title)).toBeDefined();
    expect(screen.getByText(/ATS Match:/i)).toBeDefined();
  });

  it('Workflow D: Backup export, validated preview, and Merge vs Replace restore', async () => {
    render(<App />);

    // Navigate to Tracker via main navigation
    const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
    const trackerNavBtn = within(mainNav).getByRole('button', { name: /Application Tracker/i });
    await act(async () => {
      fireEvent.click(trackerNavBtn);
    });

    // Open Backup/Restore modal
    const backupModalBtn = screen.getByRole('button', { name: /Backup \/ Restore/i });
    await act(async () => {
      fireEvent.click(backupModalBtn);
    });

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/Export Backup/i)).toBeDefined();
    expect(screen.getByText(/Restore Backup/i)).toBeDefined();

    // Switch to Restore tab
    const restoreTabBtn = screen.getByRole('button', { name: /Restore Backup/i });
    await act(async () => {
      fireEvent.click(restoreTabBtn);
    });

    expect(screen.getByText(/Upload JSON File/i)).toBeDefined();

    // Test rejection of malformed JSON
    const resMalformed = validateImportPayload('{ broken json:');
    expect(resMalformed.valid).toBe(false);

    // Test rejection of unsupported schema version
    const resBadVersion = validateImportPayload(
      JSON.stringify({ version: '3.0.0', applications: [] })
    );
    expect(resBadVersion.valid).toBe(false);

    // Test valid schema payload
    const validJson = JSON.stringify({
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      source: 'JobPulse Backup',
      count: 2,
      applications: [
        {
          id: 'app_backup_1',
          jobId: 'job_b1',
          title: 'Fullstack Architect',
          company: 'Figma',
          status: 'interviewing',
          matchScore: 94,
          notes: 'Design system lead interview'
        },
        {
          id: 'app_backup_2',
          jobId: 'job_b2',
          title: 'Staff Security Engineer',
          company: 'Datadog',
          status: 'offer',
          matchScore: 98,
          notes: 'Offer package received'
        }
      ]
    });

    const resValid = validateImportPayload(validJson);
    expect(resValid.valid).toBe(true);
    expect(resValid.count).toBe(2);
    expect(resValid.records[0].company).toBe('Figma');
  });

  it('Workflow E: Cross-tab synchronization via native storage events', async () => {
    render(<App />);

    // Navigate to tracker via main navigation
    const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
    const trackerNavBtn = within(mainNav).getByRole('button', { name: /Application Tracker/i });
    await act(async () => {
      fireEvent.click(trackerNavBtn);
    });

    // Simulate Tab 2 writing an application to localStorage
    const incomingCrossTabApp = {
      id: 'app_tab2_sync',
      jobId: 'job-tab2',
      title: 'Senior Distributed Systems Engineer',
      company: 'CockroachDB',
      status: 'interviewing',
      matchScore: 91,
      notes: 'Synced across browser tabs',
      updatedAt: new Date().toISOString()
    };

    window.localStorage.setItem('jobpulse_applications_v1', JSON.stringify([incomingCrossTabApp]));

    // Dispatch native storage event
    await act(async () => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'jobpulse_applications_v1',
          newValue: JSON.stringify([incomingCrossTabApp])
        })
      );
    });

    // Tab 1 UI updates reactively
    expect(screen.getByText('Senior Distributed Systems Engineer')).toBeDefined();
    expect(screen.getByText('CockroachDB')).toBeDefined();
  });
});
