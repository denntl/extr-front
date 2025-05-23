import useUploadFile from 'src/hooks/useUploadFile'
import React from 'react'
import FileInputButton from 'src/components/custom/FileInputButton'
import PropTypes from 'prop-types'

const FileInputButtonWithUpload = ({ name, onChange, ...rest }) => {
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
      <FileInputButton {...rest} name={name} onChange={handleIconChange}></FileInputButton>
    </>
  )
}

FileInputButtonWithUpload.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
}

export default FileInputButtonWithUpload
