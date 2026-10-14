"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { ROWS, seatKey, type SeatRef } from "@/lib/seats";
import {
  PRICE_BLUE_EUR,
  PRICE_GREEN_EUR,
  formatPriceEUR,
  isBlueSeat,
  priceEur,
} from "@/lib/pricing";
import { BookingDialog } from "./BookingDialog";

type SeatStatus = "free" | "pending" | "sold";

export function HomePage() {
  const [statusMap, setStatusMap] = useState<Map<string, SeatStatus>>(new Map());
  const [loadingMap, setLoadingMap] = useState(true);
  const [selection, setSelection] = useState<SeatRef | null>(null);

  const refreshOccupied = useCallback(async () => {
    setLoadingMap(true);
    try {
      const res = await fetch("/api/seats", { cache: "no-store" });
      const data = await res.json();
      const next = new Map<string, SeatStatus>();
      const list: { row: string; seat: number; status: string }[] = Array.isArray(data.seats)
        ? data.seats
        : [];
      for (const item of list) {
        const key = seatKey(item.row, item.seat);
        if (item.status === "issued") next.set(key, "sold");
        else if (item.status === "pending") next.set(key, "pending");
      }
      setStatusMap(next);
    } catch {
      setStatusMap(new Map());
    } finally {
      setLoadingMap(false);
    }
  }, []);

  useEffect(() => {
    void refreshOccupied();
  }, [refreshOccupied]);

  const dialogPrice = useMemo(() => {
    if (!selection) return 0;
    return priceEur(selection.row, selection.seat);
  }, [selection]);

  return (
    <main className="mx-auto max-w-6xl px-3 py-8 pb-16 sm:px-6 sm:py-10">
      <div className="paper-texture rounded-2xl border border-rose-200/80 p-4 shadow-2xl shadow-black/40 sm:p-10">
        <header className="border-b border-rose-200/80 pb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-red)]">
            Teatro Be artist
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold italic tracking-tight text-[var(--accent-red)] sm:text-5xl">
            О-Ля-Ля
          </h1>
          <p className="mt-1 text-lg font-semibold uppercase tracking-wide text-stone-900">
            или Скок в постель
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-stone-700">
            <span className="rounded-full bg-white/80 px-3 py-1">29 ноября 2026, 19:00</span>
            <span className="rounded-full bg-white/80 px-3 py-1">Лиссабон</span>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-600">
            Centro Cultural de Carnide - Rua do Rio Cávado 3, 1600-997 Lisboa
          </p>
        </header>

        <div className="mt-6 rounded-xl border border-rose-200/70 bg-stone-100/50 p-2 sm:p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/poster.jpg"
            alt="Афиша спектакля О-Ля-Ля или Скок в постель"
            className="mx-auto h-auto w-full max-w-2xl object-contain"
          />
        </div>

        <section className="mt-8 space-y-3">
          <h2 className="text-center font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900">
            Купить билет - план зала
          </h2>

          <div className="stage mx-auto max-w-3xl rounded-lg px-4 py-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-200">
              PALCO / Сцена
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone-700 sm:gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-sky-500" /> {PRICE_BLUE_EUR} €
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-emerald-500" /> {PRICE_GREEN_EUR} €
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-red-500" /> pending
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-stone-700" /> sold
            </span>
          </div>

          <p className="px-1 text-center text-sm text-stone-600">
            Нажмите свободное место (синее или зелёное). На телефоне схему можно сдвинуть пальцем.
          </p>
          <p className="mx-auto max-w-xl rounded-lg border border-rose-200 bg-rose-50/90 px-3 py-2.5 text-center text-sm text-stone-800">
            Подтверждение билета придёт на e-mail после проверки оплаты - обычно в течение суток.
          </p>

          {loadingMap ? (
            <p className="py-8 text-center text-sm text-stone-500">Загрузка...</p>
          ) : (
            <div className="relative -mx-1 mt-2 sm:mx-0">
              <div className="overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch]">
                <div className="inline-block min-w-full px-1">
                  <div className="mx-auto flex w-max flex-col items-end gap-1">
                    {ROWS.map((row) => (
                      <div key={row.row} className="flex items-center gap-1">
                        <div className="mr-1 w-7 shrink-0 text-right text-[10px] font-semibold text-stone-500">
                          {row.row}
                        </div>
                        {Array.from({ length: row.leftPad }).map((_, i) => (
                          <div
                            key={`pad-${row.row}-${i}`}
                            className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
                            aria-hidden
                          />
                        ))}
                        {row.seats.map((n) => (
                          <Fragment key={seatKey(row.row, n)}>
                            <SeatButton
                              row={row.row}
                              seat={n}
                              status={statusMap.get(seatKey(row.row, n)) ?? "free"}
                              onPick={() => setSelection({ row: row.row, seat: n })}
                            />
                          </Fragment>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mt-10 grid gap-4 border-t border-rose-200/80 pt-8 text-sm text-stone-800">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
              Адрес
            </h2>
            <p className="mt-1 leading-relaxed">
              Teatro Be artist - Centro Cultural de Carnide
              <br />
              Rua do Rio Cávado 3, 1600-997 Lisboa, Portugal
            </p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
              Цены
            </h2>
            <ul className="mt-1 list-inside list-disc space-y-1 text-stone-700">
              <li>Синие места (центр ближе к сцене): {PRICE_BLUE_EUR} €</li>
              <li>Зелёные места: {PRICE_GREEN_EUR} €</li>
            </ul>
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-stone-500">
          <a className="underline decoration-stone-400 underline-offset-2" href="/admin">
            Вход для администратора
          </a>
        </p>
      </div>

      {selection ? (
        <BookingDialog
          seat={selection.seat}
          row={selection.row}
          priceLabel={formatPriceEUR(dialogPrice)}
          onClose={() => setSelection(null)}
          onBooked={() => {
            setSelection(null);
            void refreshOccupied();
          }}
        />
      ) : null}
    </main>
  );
}

function SeatButton({
  row,
  seat,
  status,
  onPick,
}: {
  row: string;
  seat: number;
  status: SeatStatus;
  onPick: () => void;
}) {
  const busy = status !== "free";
  const price = priceEur(row, seat);
  const blue = isBlueSeat(row, seat);
  const base =
    "shrink-0 flex items-center justify-center rounded-sm border font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-1 " +
    "h-7 min-w-7 px-0.5 text-[10px] sm:h-8 sm:min-w-8 sm:text-[11px]";

  const tone =
    status === "sold"
      ? "cursor-not-allowed border-stone-800 bg-stone-700 text-stone-200"
      : status === "pending"
        ? "cursor-not-allowed border-red-700 bg-red-500 text-white"
        : blue
          ? "border-sky-700 bg-sky-500 text-white shadow-sm hover:bg-sky-400"
          : "border-emerald-700 bg-emerald-500 text-white shadow-sm hover:bg-emerald-400";

  return (
    <button
      type="button"
      disabled={busy}
      title={
        busy
          ? status === "sold"
            ? "Продано"
            : "Ожидает оплаты"
          : `${formatPriceEUR(price)}, ряд ${row}, место ${seat}${blue ? " (синее)" : ""}`
      }
      onClick={() => {
        if (!busy) onPick();
      }}
      className={`${base} ${tone}`}
    >
      {seat}
    </button>
  );
}
