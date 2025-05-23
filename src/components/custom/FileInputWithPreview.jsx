import { CFormInput } from '@coreui/react-pro'
import ImagePreview from 'src/components/custom/ImagePreview'
import React from 'react'
import useUploadFile from 'src/hooks/useUploadFile'
import PropTypes from 'prop-types'

const FileInputWithPreview = ({ value, name, onChange, ...rest }) => {
  const { upload, fileLoading } = useUploadFile()

  const handleIconChange = (e) => {
    upload(e.target.files)
      .then((files) => {
        if (files.length > 0) {
          onChange(files, name)
        }
      })
      .catch((response) => {
        onChange(null, name, response.getErrors())
      })
  }

  return (
    <>
      <CFormInput {...rest} name={name} onChange={handleIconChange}></CFormInput>
      {Boolean(value) && <ImagePreview className="mb-2" url={value} />}
    </>
  )
}

FileInputWithPreview.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        path: PropTypes.string,
      }),
    ),
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
}

export default FileInputWithPreview
