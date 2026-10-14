/** Ряд зала: места в каждом ряду с 1, правый край выровнен. */
export type RowMeta = {
  /** Латинская буква ряда от сцены (A = ближайший) */
  row: string;
  /** Номера мест в ряду слева направо, начиная с 1 */
  seats: number[];
  /** Пустые клетки слева, чтобы правый край совпадал с самой широкой полосой */
  leftPad: number;
};

export type SeatRef = {
  row: string;
  seat: number;
};

const MAX_COLS = 17;
const ROW_LENGTHS = [16, 17, 16, 15, 14, 14, 14, 13, 10, 11, 10, 9, 7, 6] as const;

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

/**
 * План зала Centro Cultural de Carnide / Teatro Be artist.
 * 14 рядов A–N, в каждом ряду места с 1.
 */
export const ROWS: RowMeta[] = ROW_LENGTHS.map((len, i) => ({
  row: String.fromCharCode(65 + i),
  seats: range(1, len),
  leftPad: MAX_COLS - len,
}));

export const TOTAL_SEATS = ROW_LENGTHS.reduce((sum, n) => sum + n, 0);
export const GRID_COLS = MAX_COLS;

export function seatKey(row: string, seat: number): string {
  return `${row}-${seat}`;
}

export function isValidSeat(row: string, seat: number): boolean {
  const meta = ROWS.find((r) => r.row === row);
  return Boolean(meta && Number.isInteger(seat) && meta.seats.includes(seat));
}

export function seatLabel(row: string, seat: number): string {
  return `ряд ${row}, место ${seat}`;
}
