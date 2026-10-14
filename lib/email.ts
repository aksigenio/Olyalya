const VENUE_BLOCK = `Teatro Be artist
Centro Cultural de Carnide
Rua do Rio Cávado 3, 1600-997 Lisboa, Portugal`;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function adminNewBookingEmail(opts: {
  bookingId: string;
  seat: number;
  row: string;
  priceEur: number;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const subject = `Заявка на билет, О-Ля-Ля, ряд ${opts.row}, место ${opts.seat}`;
  const text = [
    `ID заявки: ${opts.bookingId}`,
    `Место: ${opts.seat} (ряд ${opts.row})`,
    `Цена: ${opts.priceEur}€`,
    `Имя: ${opts.firstName}`,
    `Фамилия: ${opts.lastName}`,
    `Email покупателя: ${opts.email}`,
    "",
    'Проверьте оплату (IBAN или Revolut @a_khudiakov), потом в админке нажмите "Отправить билет".',
  ].join("\n");
  return { subject, text };
}

export function customerTicketEmail(opts: { seat: number; row: string }) {
  const subject = `Билет, "О-Ля-Ля или Скок в постель", ряд ${opts.row}, место ${opts.seat}`;
  const text = [
    "Спасибо, что купили билет.",
    "",
    'Спектакль "О-Ля-Ля или Скок в постель".',
    `Место: ${opts.seat} (ряд ${opts.row}).`,
    "",
    "Дата: 29 ноября 2026, время: 19:00",
    "",
    "Адрес:",
    VENUE_BLOCK,
    "",
    "До встречи!",
  ].join("\n");
  return { subject, text };
}

export function customerTicketEmailHtml(opts: {
  seat: number;
  row: string;
  posterCid: string;
  hasPoster: boolean;
}): string {
  const venueHtml = VENUE_BLOCK.split("\n")
    .map((line) => esc(line))
    .join("<br/>");
  const posterBlock = opts.hasPoster
    ? `<p style="margin:20px 0 0"><img src="cid:${opts.posterCid}" alt="О-Ля-Ля" width="560" style="max-width:100%;height:auto;border-radius:10px;display:block" /></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.55;color:#1a1814;background:#f7efe8;">
  <p>Спасибо, что купили билет.</p>
  <p><strong>"О-Ля-Ля или Скок в постель"</strong><br/>
  Место: <strong>${opts.seat}</strong> (ряд <strong>${opts.row}</strong>).</p>
  <p>Дата: <strong>29 ноября 2026</strong>, время: <strong>19:00</strong></p>
  <p style="margin-top:12px">Адрес:<br/>${venueHtml}</p>
  ${posterBlock}
  <p style="margin-top:20px">До встречи!</p>
</body>
</html>`;
}
