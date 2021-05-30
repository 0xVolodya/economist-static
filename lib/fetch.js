export function fetchURL(url) {
  const host = process.env.API_DOMAIN

  return `${host}${url}`
}
