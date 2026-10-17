import PropTypes from 'prop-types';
import { Award, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

/**
 * Responsive circular SVG score gauge for ATS Match Score (0 - 100).
 * Supports accessible labels, smooth animations, color thresholds,
 * and prefers-reduced-motion.
 */
export function ScoreGauge({ score = 0, isAnalyzing = false, size = 180 }) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // SVG dimensions
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Threshold colors and rating
  let colorClass = 'text-rose-500';
  let strokeClass = 'stroke-rose-500';
  let bgGlowClass = 'from-rose-500/10 to-transparent';
  let ratingLabel = 'Low Match';
  let RatingIcon = AlertTriangle;

  if (normalizedScore >= 75) {
    colorClass = 'text-emerald-400';
    strokeClass = 'stroke-emerald-500';
    bgGlowClass = 'from-emerald-500/10 to-transparent';
    ratingLabel = 'Strong Match';
    RatingIcon = CheckCircle2;
  } else if (normalizedScore >= 50) {
    colorClass = 'text-amber-400';
    strokeClass = 'stroke-amber-500';
    bgGlowClass = 'from-amber-500/10 to-transparent';
    ratingLabel = 'Moderate Match';
    RatingIcon = TrendingUp;
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg transition-opacity duration-300 ${
        isAnalyzing ? 'opacity-70' : 'opacity-100'
      }`}
      role="region"
      aria-label="ATS Match Score Gauge"
    >
      {/* Background glow radial */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${bgGlowClass} pointer-events-none`}
      />

      {/* SVG Circular Progress Gauge */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          role="progressbar"
          aria-valuenow={normalizedScore}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Estimated ATS Match: ${normalizedScore} percent`}
        >
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-800"
          />

          {/* Foreground progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${strokeClass} transition-all duration-700 ease-out motion-reduce:transition-none`}
          />
        </svg>

        {/* Center Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Estimated Match
          </span>
          <div className="flex items-baseline justify-center">
            <span
              data-testid="score-value"
              className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${colorClass}`}
            >
              {normalizedScore}
            </span>
            <span className={`text-xl font-bold font-mono ml-0.5 ${colorClass}`}>%</span>
          </div>
          {isAnalyzing && (
            <span className="text-[10px] text-amber-400 font-medium animate-pulse mt-0.5">
              Recalculating...
            </span>
          )}
        </div>
      </div>

      {/* Match Quality Badge */}
      <div className="mt-4 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
        <RatingIcon className={`w-3.5 h-3.5 ${colorClass}`} />
        <span className="text-xs font-semibold text-slate-200">{ratingLabel}</span>
      </div>

      <p className="mt-2 text-center text-[11px] text-slate-400 max-w-[200px]">
        Calibrated against required skills, preferred bonuses, text relevance, and readability.
      </p>
    </div>
  );
}

ScoreGauge.propTypes = {
  score: PropTypes.number,
  isAnalyzing: PropTypes.bool,
  size: PropTypes.number
};

export default ScoreGauge;
