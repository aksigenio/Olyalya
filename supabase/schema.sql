-- Запустите в Supabase → SQL Editor (отдельный проект для О-Ля-Ля)

create type public.booking_status as enum ('pending', 'issued', 'cancelled');

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- латинская буква ряда A…N
  row_letter text not null,
  -- номер места в ряду, с 1
  seat_number int not null check (seat_number between 1 and 17),
  price_eur int not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  receipt_path text,
  status public.booking_status not null default 'pending'
);

create unique index if not exists bookings_unique_active_seat
  on public.bookings (row_letter, seat_number)
  where status in ('pending', 'issued');

alter table public.bookings enable row level security;

comment on table public.bookings is 'Заявки на билеты О-Ля-Ля или Скок в постель';

-- Если таблица уже создана со сквозной нумерацией 1–172, выполните отдельно:
-- drop index if exists public.bookings_unique_active_seat;
-- alter table public.bookings drop constraint if exists bookings_seat_number_check;
-- alter table public.bookings add constraint bookings_seat_number_check check (seat_number between 1 and 17);
-- create unique index bookings_unique_active_seat
--   on public.bookings (row_letter, seat_number)
--   where status in ('pending', 'issued');
