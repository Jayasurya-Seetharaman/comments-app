/**
 * Returns the ordinal suffix for a given date.
 * @param {number} date - The date of the month.
 * @returns {string} The date with its ordinal suffix.
 */
export function getOrdinalSuffix(date: number) {
    const j = date % 10;
    const k = date % 100;
    if (j == 1 && k != 11) {
      return date + "st";
    }
    if (j == 2 && k != 12) {
      return date + "nd";
    }
    if (j == 3 && k != 13) {
      return date + "rd";
    }
    return date + "th";
}

/**
 * Formats a timestamp into a string of the form "3rd Nov 2023".
 * @param {string} timestamp - The timestamp to format.
 * @returns {string} The formatted date.
 */
export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const day = getOrdinalSuffix(date.getDate());
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  return `${day} ${month} ${year}`;
}