import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import {
  CBadge,
  CButton,
  CDropdownMenu,
  CNavbarNav,
  CNavLink,
  CSidebarNav,
} from '@coreui/react-pro'
import { useAuth } from 'src/providers/AuthProvider'
import classNames from 'classnames'

export const AppSidebarNav = ({ items }) => {
  const auth = useAuth()
  const [dropdownVisibility, setDropdownVisibility] = useState({})

  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, access, ...rest } = item
    const Component = component
    if (access !== undefined) {
      if (Array.isArray(access)) {
        let allowed = false
        access.forEach((permission) => {
          if (auth.can(permission)) {
            allowed = true
          }
        })
        if (!allowed) {
          return null
        }
      } else if (!auth.can(access)) {
        return null
      }
    }

    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }

  const toggleDropdown = (event, index) => {
    event.stopPropagation()
    setDropdownVisibility((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  const navDropdown = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component
        className={!dropdownVisibility[index] ? 'show' : 'close'}
        as="div"
        visible={
          typeof dropdownVisibility[index] === 'undefined' ? true : !dropdownVisibility[index]
        }
        autoClose={false}
        key={index}
        variant="nav-item"
        popper={false}
        {...rest}
      >
        <CButton
          color="nav-link-pwa"
          className={classNames('dropdown-toggle', {
            show: !dropdownVisibility[index],
          })}
          onClick={(event) => toggleDropdown(event, index)}
        >
          {navLink(name, icon)}
        </CButton>
        <CDropdownMenu>
          {item.items?.map((item, index) =>
            item.items ? navGroup(item, index) : navItem(item, index, true),
          )}
        </CDropdownMenu>
      </Component>
    )
  }

  const map = (item, index) => {
    if (item.access !== undefined) {
      if (Array.isArray(item.access)) {
        let allowed = false
        item.access.forEach((permission) => {
          if (auth.can(permission)) {
            allowed = true
          }
        })
        if (!allowed) {
          return null
        }
      } else if (!auth.can(item.access)) {
        return null
      }
    }
    return item.items
      ? item.component.displayName === 'CDropdown'
        ? navDropdown(item, index)
        : navGroup(item, index)
      : navItem(item, index)
  }

  return (
    <CSidebarNav as={SimpleBar}>
      <CNavbarNav as="div" className="me-auto">
        {items && items.map(map)}
      </CNavbarNav>
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
