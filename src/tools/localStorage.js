export const getObject = (key, defaultValue = null) => {
  const storedValue = get(key)
  if (storedValue) {
    try {
      return JSON.parse(storedValue)
    } catch (e) {
      console.error('Error parsing JSON from localStorage', e)
      return defaultValue
    }
  }
  return defaultValue
}

export const setObject = (key, value = null) => {
  if (typeof value !== 'object' && !Array.isArray(value)) {
    throw new Error('Value must be an object or array')
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export const set = (key, value) => {
  localStorage.setItem(key, value)
}

export const remove = (key) => {
  localStorage.removeItem(key)
}

export const get = (key) => {
  return localStorage.getItem(key)
}
