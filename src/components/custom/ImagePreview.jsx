import PropTypes from 'prop-types'
import { getStorageUrl } from 'src/tools/tools'
import React, { useMemo } from 'react'
import './scss/image-preview.scss'

const ImagePreview = ({ url, ...rest }) => {
  const values = useMemo(() => {
    if (Array.isArray(url)) {
      return url.map((item) =>
        item.url ? item.url : item.path ? getStorageUrl(item.path) : getStorageUrl(item),
      )
    } else {
      return url ? [getStorageUrl(url)] : []
    }
  }, [url])

  return (
    <>
      {url && (
        <div {...rest}>
          {values.map((value) => (
            <img key={value} className="image-preview mr-1" src={value}></img>
          ))}
        </div>
      )}
    </>
  )
}

ImagePreview.propTypes = {
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]).isRequired,
}

export default ImagePreview
