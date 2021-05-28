export function fetchURL(url) {
  var host = process.env.API_DOMAIN

  return `${host}${url}`
}
