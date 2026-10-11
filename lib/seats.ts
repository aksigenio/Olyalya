/** Ряд зала: сквозная нумерация мест 1–172, правый край выровнен. */
export type RowMeta = {
  /** Номер ряда от сцены (1 = ближайший) */
  row: number;
  /** Номера мест слева направо */
  seats: number[];
  /** Пустые клетки слева, чтобы правый край совпадал с самой широкой полосой */
  leftPad: number;
};

const MAX_COLS = 17;

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

/**
 * План зала Centro Cultural de Carnide / Teatro Be artist.
 * Места 1–172, как на схеме «Купить билет — план зала».
 */
export const ROWS: RowMeta[] = [
  { row: 1, seats: range(1, 16), leftPad: MAX_COLS - 16 },
  { row: 2, seats: range(17, 33), leftPad: MAX_COLS - 17 },
  { row: 3, seats: range(34, 49), leftPad: MAX_COLS - 16 },
  { row: 4, seats: range(50, 64), leftPad: MAX_COLS - 15 },
  { row: 5, seats: range(65, 78), leftPad: MAX_COLS - 14 },
  { row: 6, seats: range(79, 92), leftPad: MAX_COLS - 14 },
  { row: 7, seats: range(93, 106), leftPad: MAX_COLS - 14 },
  { row: 8, seats: range(107, 119), leftPad: MAX_COLS - 13 },
  { row: 9, seats: range(120, 129), leftPad: MAX_COLS - 10 },
  { row: 10, seats: range(130, 140), leftPad: MAX_COLS - 11 },
  { row: 11, seats: range(141, 150), leftPad: MAX_COLS - 10 },
  { row: 12, seats: range(151, 159), leftPad: MAX_COLS - 9 },
  { row: 13, seats: range(160, 166), leftPad: MAX_COLS - 7 },
  { row: 14, seats: range(167, 172), leftPad: MAX_COLS - 6 },
];

export const TOTAL_SEATS = 172;
export const GRID_COLS = MAX_COLS;

/** В БД row_letter хранит номер ряда ("1"…"14"). */
export function rowLetter(row: number): string {
  return String(row);
}

export function findRowForSeat(seat: number): number | null {
  for (const r of ROWS) {
    if (r.seats.includes(seat)) return r.row;
  }
  return null;
}

export function isValidSeat(seat: number): boolean {
  return Number.isInteger(seat) && seat >= 1 && seat <= TOTAL_SEATS && findRowForSeat(seat) !== null;
}

export function seatKey(seat: number): string {
  return String(seat);
}

export function seatLabel(seat: number): string {
  const row = findRowForSeat(seat);
  return row ? `ряд ${row}, место ${seat}` : `место ${seat}`;
}
