# Оляля или Скок в постель — сайт продажи билетов

Спектакль **29 ноября 2026, 19:00**  
**Teatro Be artist** · Centro Cultural de Carnide  
Rua do Rio Cávado 3, 1600-997 Lisboa

Отдельный проект от «Мир Дверь Мяч» — своя папка `olyala-bilet`, своя база Supabase.

## Возможности

- План зала **172 места** (нумерация 1–172), зелёный / оранжевый / красный статус.
- Клик по свободному месту → форма: имя, фамилия, email, чек; IBAN и Revolut.
- Данные в **Supabase**, чеки в Storage `receipts`.
- Письма по **SMTP**; админка `/admin` — кнопка «Отправить билет».

## Цены

- **Синие** (центр рядов 1–5): **20€**
- **Зелёные** (остальные): **15€**

Список синих мест и цены — в `lib/pricing.ts`.

## Запуск

```bash
cd olyala-bilet
npm install
cp .env.example .env.local
# заполните SMTP_*, ADMIN_*, Supabase
npm run dev
```

Откройте http://localhost:3000

## Supabase (новый проект!)

1. Создайте **отдельный** проект Supabase (не тот же, что для «Мир Дверь Мяч»).
2. SQL Editor → выполните `supabase/schema.sql`.
3. Storage → bucket **`receipts`**, Private.
4. Ключи в `.env.local` / Vercel.

## Деплой

Vercel: новый проект из папки `olyala-bilet`, те же типы переменных, что в `.env.example`.
