const MONTHS_PT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Converte datas no formato "MM/YYYY" para "Mês YYYY" com suporte a idiomas.
 * Se o formato não for reconhecido (ex: "Em desenvolvimento"), repassa como está.
 */
export function formatProjectDate(raw: string, lang: "en" | "pt"): string {
  const match = raw.match(/^(\d{1,2})\/(\d{4})$/);
  if (!match) return raw; // ex: "Em desenvolvimento" — passará pelo tTag normalmente

  const monthIndex = parseInt(match[1], 10) - 1;
  const year = match[2];
  const months = lang === "pt" ? MONTHS_PT : MONTHS_EN;

  return `${months[monthIndex]} ${year}`;
}
