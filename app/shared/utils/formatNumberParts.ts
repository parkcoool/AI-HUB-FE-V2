export function formatNumberParts(value: number) {
  const formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  });
  const parts = formatter.formatToParts(value);

  const integerPart = parts
    .filter((part) => part.type === "integer" || part.type === "group")
    .map((part) => part.value)
    .join("");
  const decimalPart = parts.find((part) => part.type === "fraction")?.value;

  return { integerPart, decimalPart };
}
