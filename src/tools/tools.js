export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export const redirectTo = (url) => {
  window.location.href = `${import.meta.env.VITE_APP_URL_PREVIFX}${url}`
}

export const getStorageUrl = (uri) => {
  return `${import.meta.env.VITE_API_SERVER_URL}/storage/${uri}`
}
