import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import React, { useContext, useMemo } from 'react'
import { ApplicationCommentsContext, maxStartsValue, minStartsValue } from './ApplicationComments'
import { ApplicationCreateContext } from './Index'
import useUploadFile from 'src/hooks/useUploadFile'
import { useTranslation } from 'react-i18next'

const CommentsModal = () => {
  const { t } = useTranslation('application')
  const { upload, fileLoading } = useUploadFile()
  const { settings } = useContext(ApplicationCreateContext)

  const {
    modalVisible,
    setModalVisible,
    commentValidationErrors,
    commentValues,
    setCommentValues,
    handleOnSaveComment,
  } = useContext(ApplicationCommentsContext)

  const iconPreview = useMemo(() => {
    if (commentValues.icon) {
      return `${import.meta.env.VITE_API_SERVER_URL}/storage/${commentValues.icon}`
    }
  }, [commentValues.icon])

  const handleOnChange = ({ target }) => {
    setCommentValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleIconChange = (e) => {
    upload(e.target.files).then((files) => {
      if (files.length > 0) {
        setCommentValues((prev) => ({ ...prev, icon: files[0].path }))
      }
    })
  }

  return (
    <>
      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        backdrop="static"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>{t('modalAddCommentLabel')}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="needs-validation" noValidate validated={false}>
            <CFormLabel className="mt-2">{t('modalLangLabel')}</CFormLabel>
            <CFormSelect
              name="lang"
              aria-label={t('modalLangAreaLabel')}
              aria-describedby="validationComLanguage"
              options={settings.languages}
              feedbackInvalid={commentValidationErrors.lang}
              invalid={!!commentValidationErrors.lang}
              value={commentValues.lang}
              onChange={handleOnChange}
            />
            <label className="form-label mt-2">{t('modalAvatarLabel')}</label>
            <CFormInput
              className=""
              type="file"
              accept="image/*"
              name="avatar"
              aria-describedby="validationComIcon"
              feedbackInvalid={commentValidationErrors.icon}
              invalid={!!commentValidationErrors.icon}
              onChange={handleIconChange}
            ></CFormInput>
            {commentValues.icon && (
              <div>
                <img className="avatar-img" src={iconPreview}></img>
              </div>
            )}
            <CFormLabel className="mt-2">{t('modalAuthorLabel')}</CFormLabel>
            <CFormInput
              type="text"
              name="author_name"
              aria-describedby="validationAuthor"
              feedbackInvalid={commentValidationErrors.author_name}
              invalid={!!commentValidationErrors.author_name}
              value={commentValues.author_name}
              onChange={handleOnChange}
            ></CFormInput>
            <CFormLabel className="mt-2">{t('modaRaitingLabel')}</CFormLabel>
            <CFormInput
              type="number"
              name="stars"
              min={minStartsValue}
              max={maxStartsValue}
              aria-describedby="validationStars"
              feedbackInvalid={commentValidationErrors.stars}
              invalid={!!commentValidationErrors.stars}
              value={commentValues.stars}
              onChange={handleOnChange}
            ></CFormInput>
            <CFormLabel className="mt-2">{t('modalLikesLabel')}</CFormLabel>
            <CFormInput
              type="number"
              className="mb-2"
              name="likes"
              aria-describedby="validationLikes"
              feedbackInvalid={commentValidationErrors.likes}
              invalid={!!commentValidationErrors.likes}
              value={commentValues.likes}
              onChange={handleOnChange}
            ></CFormInput>
            <CFormTextarea
              className="mb-2"
              name="text"
              label={t('modalCommentLabel')}
              aria-describedby="validationText"
              feedbackInvalid={commentValidationErrors.text}
              invalid={!!commentValidationErrors.text}
              value={commentValues.text}
              onChange={handleOnChange}
            ></CFormTextarea>
            <hr />
            <CFormLabel className="mt-2">{t('modalAuthorOfAnswerLabel')}</CFormLabel>
            <CFormInput
              type="text"
              name="answer_author"
              aria-describedby="validationAnswerAuthor"
              feedbackInvalid={commentValidationErrors.answer_author}
              invalid={!!commentValidationErrors.answer_author}
              value={commentValues.answer_author}
              onChange={handleOnChange}
            ></CFormInput>
            <CFormTextarea
              className="mb-2"
              name="answer"
              label={t('modalCommentOfAnswer')}
              aria-describedby="validationText"
              feedbackInvalid={commentValidationErrors.answer}
              invalid={!!commentValidationErrors.answer}
              value={commentValues.answer}
              onChange={handleOnChange}
            ></CFormTextarea>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="cancel"
            className="px-4-5 rounded-pill"
            onClick={() => setModalVisible(false)}
          >
            {t('modalCancelButton')}
          </CButton>
          <CButton
            color="confirm"
            className="px-4-5 rounded-pill"
            onClick={handleOnSaveComment}
            disabled={fileLoading}
          >
            {t('modalSaveButton')}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default CommentsModal
