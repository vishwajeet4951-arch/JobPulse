import PropTypes from 'prop-types';
import { Layers, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Renders the 5-part scoring breakdown for the ATS algorithm:
 * - Required Skills (40%)
 * - Preferred Skills (20%)
 * - Keyword Relevance (20%)
 * - Role & Seniority Alignment (10%)
 * - Readability & Metrics (10%)
 * Along with missing-critical-skill penalty accounting.
 */
export function ScoreBreakdown({ breakdown = {} }) {
  const {
    requiredSkillsScore = 0,
    preferredSkillsScore = 0,
    keywordRelevanceScore = 0,
    alignmentScore = 0,
    readabilityScore = 0,
    penaltyDeducted = 0
  } = breakdown;

  const categories = [
    {
      id: 'required',
      label: 'Required Skills Match',
      weight: 40,
      score: requiredSkillsScore,
      points: Math.round(requiredSkillsScore * 0.4 * 10) / 10,
      description: 'Coverage of must-have technical qualifications'
    },
    {
      id: 'preferred',
      label: 'Preferred / Bonus Skills',
      weight: 20,
      score: preferredSkillsScore,
      points: Math.round(preferredSkillsScore * 0.2 * 10) / 10,
      description: 'Nice-to-have tools and secondary technologies'
    },
    {
      id: 'keywords',
      label: 'Keyword & Term Relevance',
      weight: 20,
      score: keywordRelevanceScore,
      points: Math.round(keywordRelevanceScore * 0.2 * 10) / 10,
      description: 'Cosine similarity and shared industry vocabulary'
    },
    {
      id: 'alignment',
      label: 'Role & Seniority Alignment',
      weight: 10,
      score: alignmentScore,
      points: Math.round(alignmentScore * 0.1 * 10) / 10,
      description: 'Title matching and experience-level phrasing'
    },
    {
      id: 'readability',
      label: 'Readability & Quantified Impact',
      weight: 10,
      score: readabilityScore,
      points: Math.round(readabilityScore * 0.1 * 10) / 10,
      description: 'Flesch clarity and bullet point metric density'
    }
  ];

  const getBarColor = (score) => {
    if (score >= 75) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-sm">Score Composition Breakdown</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Weighted Max: 100 pts</span>
        </div>

        <div className="mt-4 space-y-3.5">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="font-semibold text-slate-200">{cat.label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {cat.weight}%
                  </span>
                </div>
                <div className="flex items-center space-x-2 font-mono">
                  <span className="text-slate-400">{cat.score}%</span>
                  <span className="font-bold text-white">
                    {cat.points} / {cat.weight} pts
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
                <div
                  className={`h-full rounded-full ${getBarColor(cat.score)} transition-all duration-500`}
                  style={{ width: `${Math.min(100, Math.max(0, cat.score))}%` }}
                />
              </div>

              <div className="text-[10px] text-slate-400">{cat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Penalty Notice (if penalty > 0) */}
      {penaltyDeducted > 0 && (
        <div className="mt-4 p-3 rounded-xl bg-rose-950/30 border border-rose-800/30 flex items-start space-x-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-rose-300">
              Critical Gap Penalty: -{penaltyDeducted} pts
            </span>
            <p className="text-[11px] text-rose-300/80 mt-0.5">
              Applied consistently for missing core required skills without double-counting against coverage.
            </p>
          </div>
        </div>
      )}

      {penaltyDeducted === 0 && (
        <div className="mt-4 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-800/20 flex items-center space-x-2 text-xs text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Zero critical skill penalties deducted. Full coverage achieved!</span>
        </div>
      )}
    </div>
  );
}

ScoreBreakdown.propTypes = {
  breakdown: PropTypes.shape({
    requiredSkillsScore: PropTypes.number,
    preferredSkillsScore: PropTypes.number,
    keywordRelevanceScore: PropTypes.number,
    alignmentScore: PropTypes.number,
    readabilityScore: PropTypes.number,
    penaltyDeducted: PropTypes.number
  })
};

export default ScoreBreakdown;
