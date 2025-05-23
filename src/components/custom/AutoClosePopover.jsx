import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function AutoClosePopover({
  content,
  children,
  onHide = () => {},
  onDisplay = () => {},
}) {
  const handleToggle = (nextShow) => {
    if (!nextShow) {
      onHide()
    }
    onDisplay()
  }

  return (
    <OverlayTrigger
      placement="bottom"
      trigger="click"
      rootClose
      onToggle={handleToggle}
      overlay={<Popover style={{ boxShadow: '-1px 2px 5px rgba(0,0,0,0.1)' }}>{content}</Popover>}
    >
      {children}
    </OverlayTrigger>
  )
}

AutoClosePopover.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node,
  onHide: PropTypes.func,
  onDisplay: PropTypes.func,
}
