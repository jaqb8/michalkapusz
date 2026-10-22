export function formatDate(date: Date, month: "long" | "short" = "long") {
  return date.toLocaleDateString("pl-PL", { year: "numeric", month, day: "numeric", timeZone: "Europe/Warsaw" });
}
