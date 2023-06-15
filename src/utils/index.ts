export const setLS = (name: string, token: string) => {
  localStorage.setItem(name, token);
};
export const getLS = (name: string) => {
  return localStorage.getItem(name);
};
export const clearLS = (name: string) => {
  localStorage.removeItem(name);
};
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("de-DE").format(value);
}
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}
