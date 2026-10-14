import { isValidSeat } from "./seats";

export const PRICE_GREEN_EUR = 15;
export const PRICE_BLUE_EUR = 20;

/** Синие (центральные) места 20€: A4–A13, B5–B14, C4–C13, D3–D12, E2–E11. */
const BLUE_SEATS = new Set<string>([
  ...keys("A", 4, 13),
  ...keys("B", 5, 14),
  ...keys("C", 4, 13),
  ...keys("D", 3, 12),
  ...keys("E", 2, 11),
]);

function keys(row: string, from: number, to: number): string[] {
  return Array.from({ length: to - from + 1 }, (_, i) => `${row}-${from + i}`);
}

export function isBlueSeat(row: string, seat: number): boolean {
  return BLUE_SEATS.has(`${row}-${seat}`);
}

export function priceEur(row: string, seat: number): number {
  if (!isValidSeat(row, seat)) return PRICE_GREEN_EUR;
  return isBlueSeat(row, seat) ? PRICE_BLUE_EUR : PRICE_GREEN_EUR;
}

export function formatPriceEUR(amount: number): string {
  return `${amount}€`;
}
