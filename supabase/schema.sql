-- Запустите в Supabase → SQL Editor (отдельный проект для «Оляля»)

create type public.booking_status as enum ('pending', 'issued', 'cancelled');

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- номер ряда "1"…"14"
  row_letter text not null,
  -- сквозной номер места 1…172
  seat_number int not null check (seat_number between 1 and 172),
  price_eur int not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  receipt_path text,
  status public.booking_status not null default 'pending'
);

create unique index if not exists bookings_unique_active_seat
  on public.bookings (seat_number)
  where status in ('pending', 'issued');

alter table public.bookings enable row level security;

comment on table public.bookings is 'Заявки на билеты «Оляля или Скок в постель»';
