import React from 'react'
import PropTypes from 'prop-types'
import 'simplebar-react/dist/simplebar.min.css'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { telegram } from 'src/assets/icons/icons'
import useApi from 'src/hooks/useApi'

export const AppHeaderDropdownTelegram = () => {
  const { Telegram } = useApi()

  const handleInviteClick = () => {
    Telegram.getInviteLink().then((response) => {
      window.open(response.data.link, '_blank')
    })
  }

  return (
    <CDropdown variant="nav-item" placement="bottom-end" className="align-content-center">
      <CDropdownToggle caret={false}>
        <CIcon icon={telegram} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="box-shadow">
        <CDropdownItem
          className="d-flex align-items-center"
          as="button"
          type="button"
          onClick={handleInviteClick}
        >
          <CIcon className="icon-sm nav-icon mr-1" icon={telegram} />
          Telegram
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

AppHeaderDropdownTelegram.propTypes = {}
