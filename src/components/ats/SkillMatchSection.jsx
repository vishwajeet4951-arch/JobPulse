import { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, XCircle, Info, ShieldAlert, Sparkles, Filter } from 'lucide-react';

/**
 * Matched and Missing Skills section with taxonomy details,
 * required vs preferred categorization, and an educational note on ATS parsing.
 */
export function SkillMatchSection({ matchedSkills = [], missingSkills = [] }) {
  const [matchedFilter, setMatchedFilter] = useState('all'); // 'all' | 'required' | 'preferred'

  const requiredMatched = matchedSkills.filter((s) => s.isRequired);
  const preferredMatched = matchedSkills.filter((s) => s.isPreferred);

  const filteredMatched =
    matchedFilter === 'required'
      ? requiredMatched
      : matchedFilter === 'preferred'
      ? preferredMatched
      : matchedSkills;

  const criticalMissing = missingSkills.filter((s) => s.priority === 'critical');
  const recommendedMissing = missingSkills.filter((s) => s.priority === 'recommended');

  return (
    <div className="space-y-6">
      {/* Skill Comparison Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Skills Panel */}
        <div className="flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Matched Skills</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold">
                {matchedSkills.length}
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                type="button"
                onClick={() => setMatchedFilter('all')}
                className={`px-2 py-0.5 rounded transition ${
                  matchedFilter === 'all'
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({matchedSkills.length})
              </button>
              <button
                type="button"
                onClick={() => setMatchedFilter('required')}
                className={`px-2 py-0.5 rounded transition ${
                  matchedFilter === 'required'
                    ? 'bg-slate-800 text-emerald-300 font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Required ({requiredMatched.length})
              </button>
              <button
                type="button"
                onClick={() => setMatchedFilter('preferred')}
                className={`px-2 py-0.5 rounded transition ${
                  matchedFilter === 'preferred'
                    ? 'bg-slate-800 text-indigo-300 font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bonus ({preferredMatched.length})
              </button>
            </div>
          </div>

          <div className="mt-4 flex-1">
            {filteredMatched.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center text-slate-400 text-xs">
                <span>No matched skills in this filter category.</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredMatched.map((skill) => (
                  <div
                    key={skill.name}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs shadow-sm hover:border-emerald-500/60 transition"
                  >
                    <span className="font-semibold text-emerald-300">{skill.name}</span>
                    <span className="text-[10px] text-slate-400">({skill.category})</span>
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-mono font-bold ${
                        skill.isRequired
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-indigo-500/20 text-indigo-300'
                      }`}
                    >
                      {skill.isRequired ? 'Req' : 'Bonus'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1 py-0.5 rounded">
                      {skill.countInResume}x
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Missing Skills Panel */}
        <div className="flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-rose-400" />
              <h3 className="font-bold text-white text-sm">Missing Skills</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-semibold">
                {missingSkills.length}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px] font-mono">
              <span className="text-rose-400">Critical: {criticalMissing.length}</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400">Bonus: {recommendedMissing.length}</span>
            </div>
          </div>

          <div className="mt-4 flex-1">
            {missingSkills.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center text-emerald-400 text-xs">
                <Sparkles className="w-6 h-6 mb-2" />
                <span className="font-semibold">Complete Technical Skill Alignment!</span>
                <span className="text-slate-400 text-[11px] mt-0.5">
                  No missing skills detected against the target job profile.
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Critical Gaps */}
                {criticalMissing.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Critical Core Requirements ({criticalMissing.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {criticalMissing.map((skill) => (
                        <div
                          key={skill.name}
                          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs"
                        >
                          <span className="font-semibold text-rose-200">{skill.name}</span>
                          <span className="text-[10px] text-rose-400/80">({skill.category})</span>
                          <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono">
                            Critical
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Bonuses */}
                {recommendedMissing.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Preferred Skills ({recommendedMissing.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recommendedMissing.map((skill) => (
                        <div
                          key={skill.name}
                          className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs"
                        >
                          <span className="font-medium text-amber-200">{skill.name}</span>
                          <span className="text-[10px] text-amber-400/80">({skill.category})</span>
                          <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                            Bonus
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Note Callout */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-500/20 flex items-start space-x-3 text-xs">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Educational Note: </strong>
          Keyword matching highlights exact and taxonomic matches against our technical skill taxonomy. Domain experience and transferable skills expressed in different terminology may not be detected by automated scanners. We recommend aligning your phrasing with the job description where truthful.
        </div>
      </div>
    </div>
  );
}

SkillMatchSection.propTypes = {
  matchedSkills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      isRequired: PropTypes.bool,
      isPreferred: PropTypes.bool,
      countInResume: PropTypes.number,
      countInJD: PropTypes.number
    })
  ),
  missingSkills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      isRequired: PropTypes.bool,
      isPreferred: PropTypes.bool,
      priority: PropTypes.string
    })
  )
};

export default SkillMatchSection;
