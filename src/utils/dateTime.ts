
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

export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  const day = getOrdinalSuffix(date.getDate());
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  return `${day} ${month} ${year}`;
}