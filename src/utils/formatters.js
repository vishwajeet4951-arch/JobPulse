/**
 * Format salary numbers into readable currency strings.
 * @param {number} amount
 * @param {string} currency
 * @returns {string} e.g. "$165k" or "$165,000"
 */
export function formatSalary(amount, currency = 'USD') {
  if (!amount) return 'Negotiable';
  if (amount >= 1000) {
    return `$${Math.round(amount / 1000)}k`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format salary range into e.g. "$140k - $180k / yr"
 * @param {{min: number, max: number, currency: string, period: string}} salary
 * @returns {string}
 */
export function formatSalaryRange(salary) {
  if (!salary) return 'Salary undisclosed';
  const min = formatSalary(salary.min, salary.currency);
  const max = formatSalary(salary.max, salary.currency);
  const period = salary.period === 'yearly' ? 'yr' : 'mo';
  return `${min} – ${max} / ${period}`;
}

/**
 * Format ISO date string into human-readable relative time (e.g. "2h ago", "Yesterday")
 * @param {string} dateString
 * @returns {string}
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 30) return `${diffInDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
