import { useState } from 'react'
import useApi from 'src/hooks/useApi'

const useUploadFile = () => {
  const { File } = useApi()
  const [fileLoading, setFileLoading] = useState(false)

  const upload = (files) =>
    new Promise((resolve, reject) => {
      if (files.length === 0) {
        resolve([])
      }
      const formData = new FormData()
      if (files) {
        const filesAsArray = [...files]
        filesAsArray.forEach((file) => {
          formData.append('files[]', file)
        })
      }
      setFileLoading(true)
      File.upload(formData)
        .then((response) => {
          setFileLoading(false)
          resolve(response.files)
        })
        .catch((response) => {
          setFileLoading(false)
          reject(response.getErrors())
        })
    })

  return { upload, fileLoading }
}

export default useUploadFile
