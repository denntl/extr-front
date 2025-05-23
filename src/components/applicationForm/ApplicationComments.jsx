import {
  CButton,
  CButtonGroup,
  CCol,
  CMultiSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ApplicationCreateContext } from './Index'
import { RequiredRule } from 'src/services/validation/rules/RequiredRule'
import { StringRule } from 'src/services/validation/rules/StringRule'
import { Validation } from 'src/services/validation/Validation'
import useApi from 'src/hooks/useApi'
import CIcon from '@coreui/icons-react'
import { Pagination } from 'src/components/custom/Pagination'
import { ConfirmModal } from 'src/components/custom/ConfirmModal'
import './scss/comments.scss'
import CommentsModal from './CommentsModal'
import { OPERATOR_EQUAL } from 'src/components/listing/constants'
import { pen, trashBin } from 'src/assets/icons/icons'
import { useTranslation } from 'react-i18next'
import { NumberRule } from 'src/services/validation/rules/NumberRule'

export const ApplicationCommentsContext = createContext()

const defaultCommentValidationErrors = {
  lang: null,
  author_name: null,
  stars: null,
  likes: null,
  text: null,
  answer_author: null,
  answer: null,
  icon: null,
}

const defaultCommentValues = {
  id: '',
  lang: '',
  author_name: '',
  stars: '0',
  likes: '0',
  text: '',
  answer_author: '',
  answer: '',
  icon: '',
}
export const minStartsValue = 0
export const maxStartsValue = 5

const commentValidationRules = {
  lang: [new RequiredRule()],
  author_name: [new StringRule(3, 255)],
  answer_author: [new StringRule(3, 255)],
  stars: [new NumberRule(minStartsValue, maxStartsValue)],
}

const maxComments = 10

const ApplicationComments = () => {
  const { t } = useTranslation('application')
  const { Application } = useApi()

  const { application, updatePreview } = useContext(ApplicationCreateContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [commentValues, setCommentValues] = useState(defaultCommentValues)

  const [commentValidationErrors, setCommentValidationErrors] = useState(
    defaultCommentValidationErrors,
  )

  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [maxPages, setMaxPages] = useState(1)
  const [totalComments, setTotalComments] = useState(0)

  const [selectedComment, setSelectedComment] = useState(0)
  const [comments, setComments] = useState([])

  const [selectCommentLoading, setSelectCommentLoading] = useState(false)
  const [commentsOptions, setCommentsOptions] = useState([])

  const getComments = useCallback(async (search = '') => {
    setSelectCommentLoading(true)
    const response = await Application.comment.search(search)
    if (response.isSuccess()) {
      setCommentsOptions(response.comments)
    } else {
      setCommentsOptions([])
    }
    setSelectCommentLoading(false)
  }, [])

  useEffect(() => {
    if (application.language) {
      setCommentValues((prev) => ({ ...prev, lang: application.language }))
    }

    if (application.public_id) {
      loadComments()
    }
  }, [application.language, application.public_id, currentPage])

  useEffect(() => {
    getComments()
  }, [])

  const loadComments = async () => {
    const response = await Application.comment.list({
      page: currentPage,
      filters: {
        public_id: {
          name: 'public_id',
          operator: OPERATOR_EQUAL,
          value: application.public_id,
        },
      },
    })

    if (response.isSuccess()) {
      setComments(response.data)
      setMaxPages(response.pages)
      setTotalComments(response.total)
    }
  }

  const loadComment = async (id) => {
    /** @type {Response} */
    const response = await Application.comment.edit(id)

    setCommentValues(defaultCommentValues)
    if (response.isSuccess()) {
      setCommentValues((prev) => ({ ...prev, ...response.comment }))
    }
  }

  const onPageChange = async (page) => {
    setCurrentPage(page)
  }

  const onDeleteComment = (event) => {
    const dataset = event.currentTarget.dataset
    if (dataset.id) {
      setDeleteId(dataset.id)
      setDeleteModal(true)
    }
  }

  const onConfirmDelete = async () => {
    if (deleteId) {
      const response = await Application.comment.destroy(deleteId)
      if (response.isSuccess()) {
        await loadComments()
        updatePreview()
      }
    }
    setDeleteId(0)
    setDeleteModal(false)
  }

  const onCancelDelete = () => {
    setDeleteId(0)
    setDeleteModal(false)
  }

  const validateComment = () => {
    setCommentValidationErrors(defaultCommentValidationErrors)
    const validation = new Validation(commentValidationRules)
    const result = validation.validate(commentValues)
    if (!result) {
      setCommentValidationErrors((prev) => ({ ...prev, ...validation.errors }))
    }
    return result
  }

  const saveComment = async () => {
    /** @type {Response} */
    const response = commentValues.id
      ? await Application.comment.update(commentValues.id, commentValues)
      : await Application.comment.store(application.public_id, commentValues)

    if (response.hasValidationErrors()) {
      setCommentValidationErrors(response.getErrors())
      return false
    } else if (response.isSuccess()) {
      setCommentValues((prev) => ({ ...prev, ...response.comment }))
      await loadComments()
      return true
    }
    return false
  }

  const handleOnSaveComment = async () => {
    if (!validateComment()) {
      return
    }
    saveComment()
      .then((res) => {
        loadComments().then(() => {
          setModalVisible(false)
          updatePreview()
        })
      })
      .catch((err) => {
        setCommentValidationErrors(err.getErrors())
      })
  }

  const onEditComment = async (event) => {
    const dataset = event.currentTarget.dataset
    if (dataset.id) {
      await loadComment(dataset.id)
      setModalVisible(true)
    }
  }

  const onCreateComment = () => {
    setCommentValues(defaultCommentValues)
    if (application.language) {
      setCommentValues((prev) => ({ ...prev, lang: application.language }))
    }
    setModalVisible(true)
  }

  const onSelectCommentChange = (selected) => {
    if (selected) {
      setSelectedComment(selected[0]?.value ? selected[0].value : 0)
    } else {
      setSelectedComment(0)
    }
  }

  const handleAddComment = async () => {
    if (selectedComment) {
      const response = await Application.comment.clone({
        id: selectedComment,
        public_id: application.public_id,
      })
      if (response.isSuccess()) {
        setCommentValues(defaultCommentValues)
        setCommentValues(response.comment)
        setModalVisible(true)
        await loadComments()
        updatePreview()
      }
    }
  }

  const handleCloseModal = (visible) => {
    setModalVisible(visible)
    setCommentValidationErrors(defaultCommentValidationErrors)
  }

  const optionTemplate = (option) => {
    return <div className="d-flex comment-select">{option.label}</div>
  }

  return (
    <>
      <CRow>
        <CCol xxl={12}>
          <CRow>
            <CCol xs={2}>
              <CButton
                color="success"
                onClick={onCreateComment}
                disabled={totalComments >= maxComments}
              >
                {t('applicationCommentCreate')}
              </CButton>
            </CCol>
            <CCol xs={8}>
              <CMultiSelect
                multiple={false}
                options={commentsOptions}
                loading={selectCommentLoading}
                onFilterChange={(value) => getComments(value)}
                onChange={onSelectCommentChange}
                virtualScroller
                visibleItems={5}
                optionsTemplate={optionTemplate}
              />
            </CCol>
            <CCol xs={2}>
              <CButton
                color="success"
                disabled={!selectedComment || totalComments >= maxComments}
                onClick={handleAddComment}
              >
                Добавить
              </CButton>
            </CCol>
          </CRow>
          {totalComments >= maxComments && (
            <div className="text-center mt-3">
              <span className="text-danger">{t('applicationCommentLimitMessage')}</span>
            </div>
          )}
          <CTable className="mt-4" hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>{t('applicationCommentRating')}</CTableHeaderCell>
                <CTableHeaderCell>{t('applicationCommentAuthor')}</CTableHeaderCell>
                <CTableHeaderCell>{t('applicationCommentComment')}</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {comments.map((item) => {
                return (
                  <CTableRow key={`comment-row-${item.id}`}>
                    <CTableDataCell>{item.stars}</CTableDataCell>
                    <CTableDataCell>{item.author_name}</CTableDataCell>
                    <CTableDataCell>{item.text}</CTableDataCell>
                    <CTableDataCell>
                      <CButtonGroup className="listing-actions">
                        <CButton
                          color="primary-pwa"
                          className="btn-action"
                          size="sm"
                          onClick={onEditComment}
                          data-id={item.id}
                        >
                          <CIcon icon={pen}></CIcon>
                        </CButton>
                        <CButton
                          className="btn-action"
                          color="danger"
                          onClick={onDeleteComment}
                          data-id={item.id}
                          size="sm"
                        >
                          <CIcon icon={trashBin}></CIcon>
                        </CButton>
                      </CButtonGroup>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <Pagination
            currentPage={currentPage}
            maxPages={maxPages}
            onPageChange={onPageChange}
          ></Pagination>
        </CCol>
      </CRow>
      <ApplicationCommentsContext.Provider
        value={{
          modalVisible,
          setModalVisible: handleCloseModal,
          commentValidationErrors,
          commentValues,
          setCommentValues,
          handleOnSaveComment,
        }}
      >
        <CommentsModal modalVisible={modalVisible}></CommentsModal>
      </ApplicationCommentsContext.Provider>
      <ConfirmModal
        visible={deleteModal}
        title={t('applicationCommentApprove')}
        text={t('applicationCommentRemoveQuestion')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
        onClose={onCancelDelete}
      />
    </>
  )
}

export default ApplicationComments
