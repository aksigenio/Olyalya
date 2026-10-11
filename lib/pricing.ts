import { findRowForSeat } from "./seats";

export const PRICE_GREEN_EUR = 15;
export const PRICE_BLUE_EUR = 20;

/**
 * Синие (центральные) места 20€ — как на схеме A4–A13, B5–B14, C4–C13, D3–D12, E2–E11.
 * У нас сквозная нумерация 1–172 (ряд 1 = A, ряд 2 = B, …).
 */
const BLUE_SEATS = new Set<number>([
  // ряд 1 (A): A4–A13 → 4–13
  ...range(4, 13),
  // ряд 2 (B): B5–B14 → 21–30
  ...range(21, 30),
  // ряд 3 (C): C4–C13 → 37–46
  ...range(37, 46),
  // ряд 4 (D): D3–D12 → 52–61
  ...range(52, 61),
  // ряд 5 (E): E2–E11 → 66–75
  ...range(66, 75),
]);

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

export function isBlueSeat(seat: number): boolean {
  return BLUE_SEATS.has(seat);
}

export function priceEur(seat: number): number {
  if (findRowForSeat(seat) === null) return PRICE_GREEN_EUR;
  return isBlueSeat(seat) ? PRICE_BLUE_EUR : PRICE_GREEN_EUR;
}

export function formatPriceEUR(amount: number): string {
  return `${amount}€`;
}
