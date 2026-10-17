import PropTypes from 'prop-types';
import { BookOpen, Hash, Tag, Percent, BarChart3, AlertCircle } from 'lucide-react';

/**
 * Displays ATS Readability metrics (Flesch score, reading level, sentence metrics,
 * quantifiable impact density) and top shared keyword frequencies.
 */
export function ReadabilityKeywordPanel({ readability = {}, keywords = [] }) {
  const {
    heuristicScore = 0,
    fleschReadingEase = 0,
    readingLevel = 'N/A',
    wordCount = 0,
    sentenceCount = 0,
    avgWordsPerSentence = 0,
    bulletCount = 0,
    bulletsWithMetricsCount = 0,
    metricRatio = 0,
    disclaimer = 'Heuristic readability and metric scores are automated estimates for guidance and do not represent formal ATS certification.'
  } = readability;

  const metricPercentage = Math.round(metricRatio * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Readability & Content Structure Panel */}
      <div className="flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Readability & Impact Metrics</h3>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            <span>Score: {heuristicScore}/100</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Reading Level
            </span>
            <span className="text-xs font-bold text-white mt-1 block truncate">
              {readingLevel}
            </span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Flesch Ease
            </span>
            <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">
              {fleschReadingEase} / 100
            </span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Avg Sentence
            </span>
            <span className="text-sm font-bold font-mono text-white mt-1 block">
              {avgWordsPerSentence} words
            </span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Word Count
            </span>
            <span className="text-sm font-bold font-mono text-white mt-1 block">
              {wordCount}
            </span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Bullet Points
            </span>
            <span className="text-sm font-bold font-mono text-white mt-1 block">
              {bulletCount}
            </span>
          </div>

          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              With Metrics
            </span>
            <span className="text-sm font-bold font-mono text-indigo-400 mt-1 block">
              {bulletsWithMetricsCount} ({metricPercentage}%)
            </span>
          </div>
        </div>

        {/* Quantifiable Impact Progress Bar */}
        <div className="mt-4 p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Quantifiable Impact Density</span>
            <span className="font-mono font-bold text-emerald-400">{metricPercentage}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, metricPercentage))}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">
            {bulletCount > 0
              ? `${bulletsWithMetricsCount} of ${bulletCount} bullets contain numbers, percentages, or measurable ROI.`
              : 'Add bullet points with measurable accomplishments to demonstrate credibility.'}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 flex items-start space-x-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p>{disclaimer}</p>
        </div>
      </div>

      {/* Shared Keyword Density Panel */}
      <div className="flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-sm">Top Matched Keywords</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {keywords.length} shared terms
          </span>
        </div>

        <div className="mt-4 flex-1">
          {keywords.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400 text-xs">
              <Hash className="w-6 h-6 mb-2 text-slate-400" />
              <span>No shared vocabulary or keywords detected yet.</span>
              <span className="text-[11px] text-slate-400 mt-1">
                Provide both a resume and job description to extract common terminology.
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                Frequently occurring industry and domain keywords detected in both your resume and the target job description:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {keywords.map((kw) => (
                  <span
                    key={kw.word}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs text-slate-200 shadow-sm"
                  >
                    <span className="font-medium text-white">{kw.word}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-indigo-500/20 text-indigo-300 font-bold">
                      {kw.count}x
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
          Tip: Ensure high-frequency job keywords appear naturally in context within your project descriptions.
        </div>
      </div>
    </div>
  );
}

ReadabilityKeywordPanel.propTypes = {
  readability: PropTypes.shape({
    heuristicScore: PropTypes.number,
    fleschReadingEase: PropTypes.number,
    readingLevel: PropTypes.string,
    wordCount: PropTypes.number,
    sentenceCount: PropTypes.number,
    avgWordsPerSentence: PropTypes.number,
    bulletCount: PropTypes.number,
    bulletsWithMetricsCount: PropTypes.number,
    metricRatio: PropTypes.number,
    disclaimer: PropTypes.string
  }),
  keywords: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  )
};

export default ReadabilityKeywordPanel;
