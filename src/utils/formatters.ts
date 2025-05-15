/**
 * Format a date string into a human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // For dates within the last 24 hours, show relative time
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
  
  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const minutes = Math.round(diffInHours * 60);
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      const hours = Math.round(diffInHours);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }
  }
  
  // For dates older than 24 hours but in the current year
  const isCurrentYear = date.getFullYear() === now.getFullYear();
  
  if (isCurrentYear) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  // For dates in previous years
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}