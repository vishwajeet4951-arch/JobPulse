import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListChecks,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  CheckSquare,
  Square,
  RotateCcw,
  Info
} from 'lucide-react';

/**
 * Interactive recommendations checklist categorized by priority:
 * - Critical Fixes
 * - Profile Improvements
 * - Positive Signals
 * Features UI-only checkboxes allowing applicants to track their editing progress
 * without artificially modifying the automated ATS score.
 */
export function SuggestionsChecklist({ suggestions = [] }) {
  // Store IDs of checked items
  const [checkedIds, setCheckedIds] = useState(new Set());

  const toggleCheck = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleReset = () => {
    setCheckedIds(new Set());
  };

  const criticalItems = suggestions.filter((s) => s.type === 'critical');
  const improvementItems = suggestions.filter((s) => s.type === 'improvement');
  const positiveItems = suggestions.filter((s) => s.type === 'positive');

  const totalActionable = criticalItems.length + improvementItems.length;
  const checkedActionableCount = suggestions.filter(
    (s) => (s.type === 'critical' || s.type === 'improvement') && checkedIds.has(s.id)
  ).length;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <ListChecks className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Actionable ATS Recommendations</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Targeted enhancements to boost parser coverage and recruiter impression.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {totalActionable > 0 && (
            <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              Checklist:{' '}
              <span data-testid="checklist-progress">
                <strong className="text-emerald-400">{checkedActionableCount}</strong> of{' '}
                {totalActionable} addressed
              </span>
            </div>
          )}

          {checkedIds.size > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 text-xs">
          <CheckCircle2 className="w-8 h-8 mb-2 text-emerald-400" />
          <span className="text-sm font-semibold text-white">No Issues Detected</span>
          <p className="mt-1 max-w-md text-slate-400">
            Paste both your resume and job description to generate targeted recommendations.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Critical Fixes */}
          {criticalItems.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Fixes Required ({criticalItems.length})</span>
              </div>
              <div className="space-y-2">
                {criticalItems.map((item) => {
                  const isChecked = checkedIds.has(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`cursor-pointer flex items-start space-x-3 p-3.5 rounded-xl border transition ${
                        isChecked
                          ? 'bg-slate-950/40 border-slate-800 opacity-60'
                          : 'bg-rose-950/20 border-rose-800/40 hover:border-rose-700'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={`Mark "${item.title}" as addressed`}
                        className="mt-0.5 text-rose-400 hover:text-rose-300 focus:outline-none"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div
                          className={`text-xs font-bold ${
                            isChecked ? 'line-through text-slate-400' : 'text-rose-200'
                          }`}
                        >
                          {item.title}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Profile Improvements */}
          {improvementItems.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Profile Improvements ({improvementItems.length})</span>
              </div>
              <div className="space-y-2">
                {improvementItems.map((item) => {
                  const isChecked = checkedIds.has(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`cursor-pointer flex items-start space-x-3 p-3.5 rounded-xl border transition ${
                        isChecked
                          ? 'bg-slate-950/40 border-slate-800 opacity-60'
                          : 'bg-amber-950/20 border-amber-800/40 hover:border-amber-700'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={`Mark "${item.title}" as addressed`}
                        className="mt-0.5 text-amber-400 hover:text-amber-300 focus:outline-none"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div
                          className={`text-xs font-bold ${
                            isChecked ? 'line-through text-slate-400' : 'text-amber-200'
                          }`}
                        >
                          {item.title}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Positive Signals */}
          {positiveItems.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Positive Signals ({positiveItems.length})</span>
              </div>
              <div className="space-y-2">
                {positiveItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-emerald-200">{item.title}</div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Editing Guidance Note */}
      <div className="flex items-start space-x-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          Checkboxes serve as your personal editing checklist. To update the real-time ATS match score, modify your resume text in the editor above.
        </p>
      </div>
    </div>
  );
}

SuggestionsChecklist.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['critical', 'improvement', 'positive']).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

export default SuggestionsChecklist;
