import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useDebounce from 'src/hooks/useDebounce'
import './scss/appPreview.scss'
import { useAuth } from 'src/providers/AuthProvider'

const ApplicationPreview = ({ data, reload }) => {
  const { params } = useAuth()
  const debounce = useDebounce(500)

  useEffect(() => {
    if (data) {
      const form = document.getElementById('app-preview-form')
      if (form) {
        debounce(() => {
          form.submit()
        })
      }
    }
  }, [data, reload])

  if (!params || !data) {
    return null
  }

  return (
    <>
      <form
        style={{ display: 'none' }}
        method="POST"
        target={'preview'}
        action={`${import.meta.env.VITE_API_SERVER_URL}/preview`}
        id="app-preview-form"
      >
        <input name="status" value={data.status ?? ''} readOnly={true} />
        <input name="name" value={data.name ?? ''} readOnly={true} />
        <input name="domain_id" value={data.domain_id ?? ''} readOnly={true} />
        <input name="subdomain" value={data.subdomain ?? ''} readOnly={true} />
        <input name="pixel_id" value={data.pixel_id ?? ''} readOnly={true} />
        <input name="pixel_key" value={data.pixel_key ?? ''} readOnly={true} />
        <input name="link" value={data.link ?? ''} readOnly={true} />
        <input name="geo" value={data.geo ?? ''} readOnly={true} />
        <input name="platform_type" value={data.platform_type ?? ''} readOnly={true} />
        <input name="landing_type" value={data.landing_type ? '1' : '0'} readOnly={true} />
        <input name="white_type" value={data.white_type ?? ''} readOnly={true} />
        <input name="language" value={data.language ?? ''} readOnly={true} />
        <input name="category" value={data.category ?? ''} readOnly={true} />
        <input name="app_name" value={data.app_name ?? ''} readOnly={true} />
        <input name="developer_name" value={data.developer_name ?? ''} readOnly={true} />
        <input name="uuid" value={data.uuid ?? ''} readOnly={true} />
        <input name="icon" value={data.icon ?? ''} readOnly={true} />
        <textarea name="description" value={data.description ?? ''} readOnly={true} />
        <input name="downloads_count" value={data.downloads_count ?? ''} readOnly={true} />
        <input name="rating" value={data.rating ?? ''} readOnly={true} />
        <input name="onesignal_id" value={data.onesignal_id ?? ''} readOnly={true} />
        <input name="onesignal_name" value={data.onesignal_name ?? ''} readOnly={true} />
        <input name="onesignal_auth_key" value={data.onesignal_auth_key ?? ''} readOnly={true} />
        <input name="owner_id" value={data.owner_id ?? ''} readOnly={true} />
        <input name="company_id" value={params?.companyId ?? ''} readOnly={true} />
        {(data.files || []).map((file) => (
          <input key={file.id} name="files[]" value={file.id} readOnly={true} />
        ))}

        <input name="display_top_bar" value={data.display_top_bar ? '1' : '0'} readOnly={true} />
        <input name="display_app_bar" value={data.display_app_bar ? '1' : '0'} readOnly={true} />
        {(data.topApplicationIds || [])
          .filter((item) => Boolean(item))
          .map((value) => (
            <input
              key={`ta-${value}`}
              name="topApplicationIds[]"
              value={value ?? ''}
              readOnly={true}
            />
          ))}
      </form>
      <div className="pwa_preview mt-4">
        <div className="pwa_preview_iframe">
          <iframe name={'preview'} className="iframe w-100 h-100"></iframe>
        </div>
      </div>
    </>
  )
}

ApplicationPreview.propTypes = {
  data: PropTypes.object,
  reload: PropTypes.number,
}

export default ApplicationPreview
