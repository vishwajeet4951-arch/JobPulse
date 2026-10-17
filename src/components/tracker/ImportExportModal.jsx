import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  X,
  Download,
  Upload,
  FileCheck2,
  AlertTriangle,
  Layers,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useTracker } from '../../context/TrackerContext.jsx';

/**
 * Modal dialog for JSON Backup Export & Validated Restore.
 * Provides export download and robust validation preview with Merge vs Replace choices.
 */
export function ImportExportModal({ isOpen, onClose }) {
  const { applications, exportData, validateImport, applyImport } = useTracker();

  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'
  const [importMode, setImportMode] = useState('merge'); // 'merge' | 'replace'
  const [fileError, setFileError] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [appliedStatus, setAppliedStatus] = useState(null);
  const [confirmReplace, setConfirmReplace] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    setFileError(null);
    setValidationResult(null);
    setAppliedStatus(null);
    setConfirmReplace(false);

    if (!file) return;

    // Reset value so file can be re-selected
    e.target.value = '';

    // Size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File exceeds 5MB limit. Please upload a valid JobPulse JSON backup file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = validateImport(content);
        if (!result.valid) {
          setFileError(result.error || 'Failed to parse JSON backup.');
          setValidationResult(null);
        } else {
          setValidationResult(result);
          setFileError(null);
        }
      }
    };
    reader.onerror = () => {
      setFileError('Could not read file from disk. Please try again.');
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = () => {
    if (!validationResult || !validationResult.records) return;

    if (importMode === 'replace' && !confirmReplace) {
      setConfirmReplace(true);
      return;
    }

    const res = applyImport(validationResult.records, importMode);
    if (res.success) {
      setAppliedStatus(
        `Successfully ${importMode === 'replace' ? 'replaced tracker with' : 'merged'} ${res.count} applications!`
      );
      setValidationResult(null);
      setConfirmReplace(false);
      setTimeout(() => {
        onClose();
        setAppliedStatus(null);
      }, 1500);
    } else {
      setFileError(res.error || 'Failed to apply import.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="backup-modal-title"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <h2 id="backup-modal-title" className="text-base font-extrabold text-white">
              Backup &amp; Restore Applications
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('export');
              setFileError(null);
              setValidationResult(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
              activeTab === 'export'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export Backup</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('import');
              setAppliedStatus(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
              activeTab === 'import'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Restore Backup</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          {activeTab === 'export' ? (
            /* EXPORT SECTION */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold text-white block text-xs">
                  Export Local Applications ({applications.length})
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Downloads a versioned (<code className="text-indigo-400 font-mono">1.0.0</code>) JSON backup of your current pipeline stages, ATS match scores, and interview notes.
                </p>
                <div className="text-[11px] text-slate-500 font-mono pt-1">
                  Schema: ID, Title, Company, Salary, Stage, MatchScore, Notes, Dates.
                </div>
              </div>

              <button
                type="button"
                onClick={exportData}
                disabled={applications.length === 0}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg transition"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON Backup ({applications.length} Records)</span>
              </button>

              {applications.length === 0 && (
                <p className="text-[11px] text-slate-500 text-center">
                  Track or save at least one application to export data.
                </p>
              )}
            </div>
          ) : (
            /* IMPORT SECTION */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="font-bold text-white block text-xs">Upload JSON File</span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Select a valid JobPulse JSON backup file. Uploaded records are strictly validated before making any changes.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload JSON backup file"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 w-full flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-medium transition"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Choose JSON Backup File</span>
                </button>
              </div>

              {/* Error Callout */}
              {fileError && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Success Callout */}
              {appliedStatus && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{appliedStatus}</span>
                </div>
              )}

              {/* Validation Preview Card */}
              {validationResult && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold">
                      <FileCheck2 className="w-4 h-4" />
                      <span>Valid Backup Detected</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      v{validationResult.version}
                    </span>
                  </div>

                  <div className="text-xs text-white">
                    Found <strong className="text-emerald-400 font-mono">{validationResult.count}</strong> valid application records.
                  </div>

                  {/* Mode Selector: Merge vs Replace */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-300 block">
                      Choose Restore Strategy:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setImportMode('merge');
                          setConfirmReplace(false);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          importMode === 'merge'
                            ? 'bg-indigo-950/40 border-indigo-500/60 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 font-bold text-xs">
                          <Layers className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Merge</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Combine with existing, deduplicating by job ID.
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImportMode('replace')}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          importMode === 'replace'
                            ? 'bg-rose-950/40 border-rose-500/60 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 font-bold text-xs">
                          <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                          <span>Replace</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Overwrite all current tracker records completely.
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Replace Warning */}
                  {confirmReplace && importMode === 'replace' && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-200 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Warning:</strong> This will delete all current applications and replace them with the {validationResult.count} imported records. Click again to confirm.
                      </div>
                    </div>
                  )}

                  {/* Apply Action Button */}
                  <button
                    type="button"
                    onClick={handleExecuteImport}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold shadow-md transition flex items-center justify-center space-x-1.5 ${
                      confirmReplace && importMode === 'replace'
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <span>
                      {confirmReplace && importMode === 'replace'
                        ? 'Yes, Overwrite & Replace All'
                        : `Apply ${importMode === 'merge' ? 'Merge' : 'Replace'} (${validationResult.count} Records)`}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ImportExportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImportExportModal;
