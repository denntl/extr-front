import React from 'react'
import { CCard, CNav, CNavItem, CNavLink } from '@coreui/react-pro'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/providers/AuthProvider'

export default function PageContainerWithTabs({ tabs, active, children }) {
  const navigate = useNavigate()
  const { t } = useTranslation('common')
  const auth = useAuth()

  return (
    <>
      <CNav variant="underline">
        {tabs.map(
          (item) =>
            auth.can(item.permission) && (
              <CNavItem key={item.value}>
                <CNavLink
                  as="button"
                  active={item.value === active}
                  onClick={() => {
                    navigate(item.link)
                  }}
                >
                  {t(item.label)}
                </CNavLink>
              </CNavItem>
            ),
        )}
      </CNav>
      <CCard className="border-top-0 rounded-top-0">{children}</CCard>
    </>
  )
}

PageContainerWithTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  active: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
