import { CFormControlWrapper } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './scss/file-input-button.scss'
import useDebounce from 'src/hooks/useDebounce'

const FileInputButton = ({
  buttonText,
  onChange,
  className,
  text,
  feedback,
  feedbackInvalid,
  feedbackValid,
  floatingClassName,
  floatingLabel,
  tooltipFeedback,
  id,
  invalid,
  valid,
  plainText,
  size,
  ref,
  children,
  delay = false,
  ...rest
}) => {
  const [value, setValue] = useState()
  const debounce = useDebounce(typeof delay === 'number' ? delay : 500)

  useEffect(() => {
    debounce(() => value && onChange && onChange(value))
  }, [value])

  return (
    <CFormControlWrapper
      describedby={rest['aria-describedby']}
      feedback={feedback}
      feedbackInvalid={feedbackInvalid}
      feedbackValid={feedbackValid}
      floatingClassName={floatingClassName}
      floatingLabel={floatingLabel}
      id={id}
      invalid={invalid}
      text={text}
      tooltipFeedback={tooltipFeedback}
      valid={valid}
    >
      <label
        className={classNames('label-for-fileinput-button btn btn-primary rounded-pill', className)}
      >
        {buttonText ? buttonText : 'Upload File'}
        <input
          type="file"
          className={classNames(
            plainText ? 'form-control-plaintext' : 'form-control',
            {
              [`form-control-${size}`]: size,
              'is-invalid': invalid,
              'is-valid': valid,
            },
            className,
          )}
          id={id}
          onChange={(event) => (delay ? setValue(event) : onChange && onChange(event))}
          {...rest}
          ref={ref}
        >
          {children}
        </input>
      </label>
    </CFormControlWrapper>
  )
}

export default FileInputButton

FileInputButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  className: PropTypes.any,
  text: PropTypes.any,
  feedback: PropTypes.any,
  feedbackInvalid: PropTypes.any,
  feedbackValid: PropTypes.any,
  floatingClassName: PropTypes.any,
  floatingLabel: PropTypes.any,
  tooltipFeedback: PropTypes.any,
  id: PropTypes.any,
  invalid: PropTypes.any,
  valid: PropTypes.any,
  plainText: PropTypes.any,
  size: PropTypes.any,
  ref: PropTypes.any,
  children: PropTypes.any,
  delay: PropTypes.any,
}
