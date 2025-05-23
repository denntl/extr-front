import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { remove } from 'src/tools/localStorage'
import { useAuth, Auth } from 'src/providers/AuthProvider'
import Response from 'src/api/Response'

const BASE_URI = '/api'

function useApi() {
  const navigate = useNavigate()
  const auth = useAuth()

  const getUrl = useCallback((path) => `${import.meta.env.VITE_API_SERVER_URL}${BASE_URI}${path}`)

  const handleResponse = useCallback((response) => {
    if (!response.ok && response.status === 401) {
      remove('token')
      if (auth && auth.signout) {
        auth.signout(() => {
          navigate('/login')
        })
      } else {
        navigate('/login')
      }
    }

    if (!response.ok && response.status === 403) {
      navigate('/not-allowed')
    }

    if (!response.ok && response.status === undefined && import.meta.env.MODE !== 'development') {
      navigate('/error')
    }

    return new Promise((resolve, reject) => {
      response
        .json()
        .then((data) => {
          const res = new Response(response.status, data)
          if (response.status === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          console.error(error)
          reject(new Response(500, { error: 'Unexpected error' }))
        })
    })
  })

  const makePostRequest = async (path, params = {}) => {
    const config = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.token}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(params),
    }

    return handleResponse(await fetch(getUrl(path), config))
  }

  const makePutRequest = async (path, params = {}) => {
    const config = {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.token}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(params),
    }

    return handleResponse(await fetch(getUrl(path), config))
  }

  const makeDeleteRequest = async (path, params = {}) => {
    const config = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.token}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(params),
    }

    return handleResponse(await fetch(getUrl(path), config))
  }

  const makeGetRequest = async (path, params = {}) => {
    const config = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.token}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }

    const queryString = new URLSearchParams(params) ? `?${new URLSearchParams(params)}` : ''
    return handleResponse(await fetch(`${getUrl(path)}${queryString}`, config))
  }

  const makeMultipartPostRequest = async (path, data) => {
    const config = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${Auth.token}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: data,
    }

    return handleResponse(await fetch(getUrl(path), config))
  }

  return {
    Auth: {
      login: (params) => makePostRequest('/common/auth/login', params),
      register: (params) => makePostRequest('/common/auth/register', params),
      getUser: () => makeGetRequest('/common/auth/user'),
      getInvite: (key) => makeGetRequest(`/common/auth/${key}/invite`),
      telegram: {
        register: (key, params) => makePostRequest(`/common/auth/telegram/${key}/register`, params),
        login: (params) => makePostRequest('/common/auth/telegram/login', params),
      },
    },
    File: {
      upload: (data) => makeMultipartPostRequest('/common/file/upload', data),
    },
    Application: {
      getApplicationSettings: () => makeGetRequest('/common/listing/application/settings'),
      getApplications: (params) => makePostRequest('/common/listing/application/data', params),
      create: () => makeGetRequest('/client/application/create'),
      edit: (id) => makeGetRequest(`/client/application/${id}/edit`),
      store: (params) => makePostRequest('/client/application/store', params),
      update: (params) => makePostRequest('/client/application/update', params),
      clone: (id) => makePostRequest(`/client/application/${id}/clone`),
      deactivate: (id) => makePostRequest(`/client/application/${id}/deactivate`),
      delete: (id) => makePostRequest(`/client/application/${id}/delete`),
      comment: {
        list: (params) => makePostRequest('/common/listing/application-comments/data', params),
        search: (query) => makeGetRequest('/client/application/comment/search', { query }),
        clone: (params) => makePostRequest('/client/application/comment/clone', params),
        destroy: (id) => makeDeleteRequest(`/client/application/comment/${id}/destroy`),
        edit: (id) => makeGetRequest(`/client/application/comment/${id}/edit`),
        update: (id, params) => makePutRequest(`/client/application/comment/${id}/update`, params),
        store: (id, params) => makePostRequest(`/client/application/comment/${id}/store`, params),
      },
    },
    // dashboard: () => makeGetRequest('/dashboard'),

    // applicationDisable: (id) => makePostRequest(`/client/applications/disable/${id}`),
    // applicationClone: (id) => makePostRequest(`/client/applications/clone/${id}`),
    // createApplication: (params) => makePostRequest('/client/applications/create', params),
    // updateApplication: (id, params) => makePostRequest(`/client/applications/update/${id}`, params),
    // uploadApplicationImages: (id, data) =>
    //   makeMultipartPostRequest(`/client/applications/upload-images/${id}`, data),
    // getApplication: (id) => makeGetRequest(`/client/applications/view/${id}`),
    // applicationPageSettings: () => makeGetRequest('/client/applications/get-page-settings'),

    // createComment: (params, id) =>
    //   makePostRequest(`/client/application-comments/create/${id}`, params),
    // updateComment: (params, id) =>
    //   makePostRequest(`/client/application-comments/update/${id}`, params),
    // uploadComment: (id, data) =>
    //   makeMultipartPostRequest(`/client/application-comments/upload-icon/${id}`, data),
    // listComments: (id, params) => makeGetRequest(`/client/application-comments/list/${id}`, params),
    // viewComment: (id) => makeGetRequest(`/client/application-comments/view/${id}`),
    // deleteComment: (id) => makePostRequest(`/client/application-comments/delete/${id}`),
    // searchComments: (search) =>
    //   makeGetRequest('/client/application-comments/comments-search', { search: search }),
    // cloneComment: (appId, commentId) =>
    //   makePostRequest('/client/application-comments/clone', {
    //     applicationId: appId,
    //     commentId: commentId,
    //   }),
    // permissions: () => makeGetRequest('/permissions/get-permissions'),

    userEnums: () => makeGetRequest('/admin/users/enums'),
    updateUser: (id, data) => makePostRequest(`/admin/users/update/${id}`, data),
    viewUser: (id) => makeGetRequest(`/admin/users/view/${id}`),
    getUsers: (params) => makePostRequest('/admin/users/list', params),
    getUserSettings: (params) => makeGetRequest('/admin/users/list-settings'),

    Permissions: {
      getPermissions: (params) => makePostRequest('/common/listing/permissions/data', params),
      getPermissionSettings: (params) => makeGetRequest('/common/listing/permissions/settings'),
    },

    User: {
      getListingSettings: () => makeGetRequest('/common/listing/all-users/settings'),
      getListingData: (params) => makePostRequest('/common/listing/all-users/data', params),
      edit: (id) => makeGetRequest(`/manage/user/${id}/edit`),
      update: (id, params) => makePostRequest(`/manage/user/${id}/update`, params),
      loginAsUser: (id) => makePostRequest(`/manage/user/${id}/login`),
      changeStatus: (id, data) => makePutRequest(`/manage/user/${id}/change-status`, data),

      // invite: () => makeGetRequest('/client/user/invite'),
    },

    MyCompany: {
      edit: () => makeGetRequest('/client/company/edit'),
      update: (data) => makePostRequest('/client/company/update', data),
      invite: () => makeGetRequest('/client/company/invite'),
    },
    MyUser: {
      getListingSettings: () => makeGetRequest('/client/listing/user/settings'),
      getListingData: (params) => makePostRequest('/client/listing/user/data', params),
      edit: () => makeGetRequest('/client/user/edit'),
      update: (id, data) => makePostRequest(`/client/user/update/${id}`, data),
      canChangeStatus: (id, params) => makeGetRequest(`/client/user/${id}/change-status`, params),
      changeStatus: (id, data) => makePutRequest(`/client/user/${id}/change-status`, data),
    },

    Roles: {
      getListingSettings: () => makeGetRequest('/common/listing/roles/settings'),
      getListingData: (params) => makePostRequest('/common/listing/roles/data', params),
      edit: (id) => makeGetRequest(`/manage/roles/${id}/edit`),
      update: (id, data) => makePutRequest(`/manage/roles/${id}/update`, data),
      create: () => makeGetRequest('/manage/roles/create'),
      store: (data) => makePostRequest('/manage/roles/store', data),
      delete: (id) => makeGetRequest(`/manage/roles/${id}/delete`),
      destroy: (id, data) => makeDeleteRequest(`/manage/roles/${id}/destroy`, data),
    },

    // admin
    Company: {
      getListingSettings: () => makeGetRequest('/common/listing/company/settings'),
      getListingData: (params) => makePostRequest('/common/listing/company/data', params),
      getListingCompanyBalanceTransactionsSettings: () =>
        makeGetRequest('/common/listing/manage-company-balance-transactions/settings'),
      getListingCompanyBalanceTransactionsData: (params) =>
        makePostRequest('/common/listing/manage-company-balance-transactions/data', params),
      update: (id, params) => makePostRequest(`/manage/company/${id}/update`, params),
      manualBalanceDeposit: (id, params) =>
        makePostRequest(`/manage/company/${id}/manual-balance-deposit`, params),
      edit: (id) => makeGetRequest(`/manage/company/${id}/edit`),
      invite: () => makeGetRequest('/client/company/invite'),
      inviteTeam: (id) => makeGetRequest(`/client/team/${id}/invite`),
    },

    Team: {
      getListingSettings: () => makeGetRequest('/client/listing/team/settings'),
      getListingData: (params) => makePostRequest('/client/listing/team/data', params),
      update: (id, data) => makePostRequest(`/client/team/${id}/update`, data),
      edit: (id = null) => makePostRequest(`/client/team/${id}/edit`),
      create: () => makePostRequest('/client/team/create'),
      store: (data) => makePostRequest('/client/team/store', data),
      invite: (id) => makeGetRequest(`/client/team/${id}/invite`),
      destroy: (id) => makeDeleteRequest(`/client/team/${id}/destroy`),
    },

    Statistic: {
      getDailyStatistic: () => makeGetRequest('/client/statistic/get-daily'),
      getDetailedStatisticSettings: () =>
        makeGetRequest('/common/listing/detailed-statistics/settings'),
      getDetailedStatisticData: (params) =>
        makePostRequest('/common/listing/detailed-statistics/data', params),
      getListingSettings: () => makeGetRequest('/common/listing/statistics/settings'),
      getListingAggregations: (params) =>
        makePostRequest('/common/listing/statistics/aggregations', params),
      getListingData: (params) => makePostRequest('/common/listing/statistics/data', params),
    },

    Domains: {
      getDomains: (params) => makePostRequest('/client/listing/domains/data', params),
      getDomainsSettings: () => makeGetRequest('/client/listing/domains/settings'),
      store: (data) => makePostRequest('/manage/domain/store', data),
      changeStatus: (id, data) => makePutRequest(`/manage/domain/${id}/change-status`, data),
    },

    Tariff: {
      show: () => makeGetRequest('/client/tariff/show'),
    },

    Tariffs: {
      delete: (id) => makeGetRequest(`/manage/tariff/${id}/delete`),
      getListInstall: (typeId) => makeGetRequest(`/manage/tariff/${typeId}/list`),
      edit: (id) => makeGetRequest(`/manage/tariff/${id}/edit`),
      update: (id, data) => makePostRequest(`/manage/tariff/${id}/update`, data),
      create: (typeId) => makeGetRequest(`/manage/tariff/${typeId}/create`),
      store: (typeId, data) => makePostRequest(`/manage/tariff/${typeId}/store`, data),
      getSubscriptionTiersListingSettings: () =>
        makeGetRequest('/common/listing/tariff-subscription-tiers/settings'),
      getSubscriptionTiersListingData: (params) =>
        makePostRequest('/common/listing/tariff-subscription-tiers/data', params),
    },

    PushTemplates: {
      getListingSettings: () => makeGetRequest('/common/listing/push-templates/settings'),
      getListingData: (params) => makePostRequest('/common/listing/push-templates/data', params),
      create: () => makeGetRequest('/manage/push-template/create'),
      store: (data) => makePostRequest('/manage/push-template/store', data),
      edit: (id) => makeGetRequest(`/manage/push-template/edit/${id}`),
      update: (id, data) => makePostRequest(`/manage/push-template/update/${id}`, data),
    },

    PushNotifications: {
      getSingleListingSettings: () =>
        makeGetRequest('/common/listing/push-single-notifications/settings'),
      getSingleListingData: (params) =>
        makePostRequest('/common/listing/push-single-notifications/data', params),
      getRegularListingSettings: () =>
        makeGetRequest('/common/listing/push-regular-notifications/settings'),
      getRegularListingData: (params) =>
        makePostRequest('/common/listing/push-regular-notifications/data', params),
      create: () => makeGetRequest('/manage/push-notification/create'),
      templateInfo: (id) => makeGetRequest(`/manage/push-notification/${id}/template-info`),
      store: (data) => makePostRequest('/manage/push-notification/store', data),
      edit: (id) => makeGetRequest(`/manage/push-notification/${id}/edit`),
      update: (id, data) => makePostRequest(`/manage/push-notification/${id}/update`, data),
      delete: (id) => makePostRequest(`/manage/push-notification/${id}/delete`),
      copy: (id) => makePostRequest(`/manage/push-notification/${id}/copy/`),
    },
    PushNotificationsStatistic: {
      getListingSettings: () =>
        makeGetRequest('/common/listing/push-notifications-statistic/settings'),
      getListingData: (params) =>
        makePostRequest('/common/listing/push-notifications-statistic/data', params),
    },

    Telegram: {
      edit: () => makeGetRequest('/client/notifications/telegram-bot/edit'),
      update: (data) => makePutRequest('/client/notifications/telegram-bot/update', data),
      changeStatus: (isActive) =>
        makePostRequest('/client/notifications/telegram-bot/change-status', { isActive }),
      getListingSettings: () => makeGetRequest('/common/listing/bots/settings'),
      getListingData: (params) => makePostRequest('/common/listing/bots/data', params),
      changeStatusByAdmin: (id, params) =>
        makePostRequest(`/manage/telegram-bot/${id}/change-status`, params),
      getActiveBot: () => makeGetRequest('/client/notifications/telegram-bot/get-active-bot'),
      getInviteLink: () => makeGetRequest('/client/notifications/telegram-bot/get-invite-link'),
    },

    SystemNotifications: {
      getListingSettings: () => makeGetRequest('/common/listing/template-notifications/settings'),
      getListingData: (params) =>
        makePostRequest('/common/listing/template-notifications/data', params),
      create: () => makeGetRequest('/manage/notification-template/create'),
      store: (params) => makePostRequest('/manage/notification-template/store', params),
      sendMessage: (params) =>
        makePostRequest('/manage/notification-template/send-message', params),
      edit: (id) => makeGetRequest(`/manage/notification-template/${id}/edit`),
      update: (id, params) => makePutRequest(`/manage/notification-template/${id}/update`, params),
      delete: (id) => makeDeleteRequest(`/manage/notification-template/${id}/destroy`),
    },
    Notifications: {
      getListingSettings: () => makeGetRequest('/common/listing/notifications/settings'),
      getListingData: (params) => makePostRequest('/common/listing/notifications/data', params),
      setActive: (id, active) =>
        makePutRequest(`/client/notifications/${id}/activate`, { isActive: active }),
    },

    AllApplications: {
      getApplicationSettings: () => makeGetRequest('/common/listing/manage-application/settings'),
      getApplications: (params) =>
        makePostRequest('/common/listing/manage-application/data', params),
      edit: (id) => makeGetRequest(`/manage/application/${id}/edit`),
      update: (params) => makePostRequest('/manage/application/update', params),
      clone: (id) => makePostRequest(`/manage/application/${id}/clone`),
      deactivate: (id) => makePostRequest(`/manage/application/${id}/deactivate`),
      delete: (id) => makePostRequest(`/manage/application/${id}/delete`),
      restore: (id) => makePostRequest(`/manage/application/${id}/restore`),
      comment: {
        list: (params) =>
          makePostRequest('/common/listing/manage-application-comment/data', params),
        search: (query) => makeGetRequest('/manage/application/comment/search', { query }),
        clone: (params) => makePostRequest('/manage/application/comment/clone', params),
        destroy: (id) => makeDeleteRequest(`/manage/application/comment/${id}/destroy`),
        edit: (id) => makeGetRequest(`/manage/application/comment/${id}/edit`),
        update: (id, params) => makePutRequest(`/manage/application/comment/${id}/update`, params),
        store: (id, params) => makePostRequest(`/manage/application/comment/${id}/store`, params),
      },
    },
  }
}

export default useApi
