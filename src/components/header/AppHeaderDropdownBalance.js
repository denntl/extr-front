import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import 'simplebar-react/dist/simplebar.min.css'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { doubleCircle, wallet } from 'src/assets/icons/icons'
import classNames from 'classnames'
import { useAuth } from 'src/providers/AuthProvider'
import { useTranslation } from 'react-i18next'

export const AppHeaderDropdownBalance = ({ visible = true }) => {
  const { t } = useTranslation('balance')
  const auth = useAuth()
  const display = useMemo(() => visible, [visible])
  const { balance, balanceBonus } = useMemo(() => {
    if (auth.params) {
      const { balance = 0, balance_bonus = 0 } = auth.params
      return { balance, balanceBonus: balance_bonus }
    }
    return { balance: 0, balanceBonus: 0 }
  }, [auth.params])
  const balanceSum = useMemo(() => (balance + balanceBonus).toFixed(2), [balance, balanceBonus])

  return (
    <CDropdown
      className={classNames('balance', {
        'd-none': !display,
        'd-block': display,
      })}
      variant="nav-item"
      placement="bottom-end"
    >
      <CDropdownToggle caret={false}>
        <span>{t('balance')}:</span>
        <span className="main-amount">{balanceSum}$</span>
        <span className="caret"></span>
      </CDropdownToggle>
      <CDropdownMenu className="box-shadow">
        <CDropdownItem className="d-flex align-items-center justify-content-between" as="div">
          <span>
            <CIcon icon={wallet} size="sm" className="mr-2" />
            {t('balance_main')}:
          </span>
          <span className="main-amount__drop-down">{balance}$</span>
        </CDropdownItem>
        <CDropdownItem className="d-flex align-items-center justify-content-between" as="div">
          <span>
            <CIcon icon={doubleCircle} size="sm" className="mr-2" />
            {t('balance_bonus')}:
          </span>
          <span className="bonus-amount">{balanceBonus}$</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

AppHeaderDropdownBalance.propTypes = {
  visible: PropTypes.bool,
}
