import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import sampleResumes from '../data/sampleResumes.js';
import useATSWorker from '../hooks/useATSWorker.js';

const ATSContext = createContext(null);

export function ATSProvider({ children }) {
  const [selectedSampleKey, setSelectedSampleKey] = useState('frontendSenior');
  const [resumeText, setResumeText] = useState(
    sampleResumes.frontendSenior?.text || ''
  );
  const [targetJob, setTargetJob] = useState(null);
  const [targetJobDescription, setTargetJobDescription] = useState('');

  // Connect to background Web Worker analysis engine (350ms debounce)
  const {
    analysisResult,
    isAnalyzing,
    workerError,
    durationMs
  } = useATSWorker(resumeText, targetJobDescription, targetJob, 350);

  const loadSampleResume = (sampleKey) => {
    if (sampleResumes[sampleKey]) {
      setSelectedSampleKey(sampleKey);
      setResumeText(sampleResumes[sampleKey].text);
    }
  };

  const loadJobIntoATS = (job) => {
    if (!job) return;
    setTargetJob(job);
    const formattedJD = `${job.title} - ${job.company} (${job.location})
Experience Required: ${job.experienceYearsRequired} years | Seniority: ${job.seniority}

OVERVIEW:
${job.overview}

REQUIRED SKILLS:
${job.requiredSkills.map((s) => `• ${s}`).join('\n')}

PREFERRED SKILLS:
${job.preferredSkills.map((s) => `• ${s}`).join('\n')}

RESPONSIBILITIES:
${job.responsibilities.map((r) => `• ${r}`).join('\n')}

QUALIFICATIONS:
${job.qualifications.map((q) => `• ${q}`).join('\n')}`;

    setTargetJobDescription(formattedJD);
  };

  const clearAnalysis = () => {
    setResumeText('');
    setTargetJobDescription('');
    setTargetJob(null);
  };

  const value = {
    resumeText,
    setResumeText,
    selectedSampleKey,
    loadSampleResume,
    targetJob,
    setTargetJob,
    targetJobDescription,
    setTargetJobDescription,
    loadJobIntoATS,
    analysisResult,
    isAnalyzing,
    workerError,
    durationMs,
    clearAnalysis
  };

  return <ATSContext.Provider value={value}>{children}</ATSContext.Provider>;
}

ATSProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useATS() {
  const context = useContext(ATSContext);
  if (!context) {
    throw new Error('useATS must be used within an ATSProvider');
  }
  return context;
}

export default ATSContext;
