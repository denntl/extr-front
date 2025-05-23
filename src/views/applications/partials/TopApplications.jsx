import React, { useEffect, useState } from 'react'
import { CButton, CFormLabel, CInputGroup } from '@coreui/react-pro'
import SingleSelect from 'src/components/custom/SingleSelect'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import PropTypes from 'prop-types'

const TopApplications = ({ items, onChange, applications }) => {
  const [data, setData] = useState([])

  const { t } = useTranslation('application')

  useEffect(() => {
    setData([...items])
  }, [items])

  const handelSelectChange = (selected, name, index) => {
    setData((prev) => {
      prev[index] = selected
      return prev
    })
    onChange(data, 'topApplicationIds')
  }

  const handleAdd = () => {
    if (data.length < 10) {
      let _data = [...data]
      _data.push(null)
      setData(_data)
    }
  }

  const handleRemove = (index) => {
    let _data = [...data]
    _data.splice(index, 1)
    onChange(_data, 'topApplicationIds')
  }

  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <CFormLabel className="mt-2">
              {t('applicationLabel')} {index + 1}
            </CFormLabel>
            <CInputGroup>
              <div className="form-control">
                <SingleSelect
                  options={applications.filter((app) => {
                    return !data.includes(app.value) || app.value === item
                  })}
                  value={item}
                  name={`top_application[${index}]`}
                  onChange={(selected, name) => handelSelectChange(selected, name, index)}
                  placeholder={t('selectApplication')}
                  virtualScroller
                  visibleItems={5}
                  cleaner={false}
                />
              </div>
              <CButton color="danger" onClick={() => handleRemove(index)}>
                <CIcon icon={cilTrash}></CIcon>
              </CButton>
            </CInputGroup>
          </div>
        )
      })}
      <div className="mt-2 text-end">
        <CButton
          color="primary"
          className="rounded-pill"
          disabled={data.length >= 10 || applications.length === data.length}
          onClick={handleAdd}
        >
          {t('addApplication')}
        </CButton>
      </div>
    </>
  )
}

TopApplications.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
}
export default TopApplications
