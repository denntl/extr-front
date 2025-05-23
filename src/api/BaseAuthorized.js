import AuthService from 'src/services/AuthService'
import { redirectTo } from 'src/tools/tools'

const BASE_URI = '/api'

export const makePostRequest = async (path, params = {}) => {
  const url = `${import.meta.env.VITE_API_SERVER_URL}${BASE_URI}${path}`
  const config = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.accessToken}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(params),
  }
  const response = await fetch(url, config)
  if (!response.ok && response.status === 401) {
    if (await AuthService.refresh()) {
      config.headers.Authorization = `Bearer ${AuthService.accessToken}`
      return fetch(url, config)
    }
    redirectTo('/login')
  }
  if (!response.ok && response.status === undefined && import.meta.env.MODE !== 'development') {
    redirectTo('/error')
  }
  return response
}

export const makeGetRequest = async (path, params = {}) => {
  const url = `${import.meta.env.VITE_API_SERVER_URL}${BASE_URI}${path}`
  const config = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.accessToken}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }
  const response = await fetch(url, config)
  if (!response.ok && response.status === 401) {
    if (await AuthService.refresh()) {
      config.headers.Authorization = `Bearer ${AuthService.accessToken}`
      return await fetch(url, config)
    }
    redirectTo('/admin/login')
  }
  if (!response.ok && response.status === undefined && import.meta.env.MODE !== 'development') {
    redirectTo('/error')
  }
  return response
}

export const makeMultipartPostRequest = async (path, data) => {
  const url = `${import.meta.env.VITE_API_SERVER_URL}${BASE_URI}${path}`
  const config = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${AuthService.accessToken}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data,
  }

  const response = await fetch(url, config)
  if (!response.ok && response.status === 401) {
    if (await AuthService.refresh()) {
      config.headers.Authorization = `Bearer ${AuthService.accessToken}`
      return fetch(url, config)
    }
    redirectTo('/admin/login')
  }
  if (!response.ok && response.status === undefined && import.meta.env.MODE !== 'development') {
    redirectTo('/error')
  }
  return response
}
