import React from 'react'
import PropTypes from 'prop-types'

export default function Select (props) {
  const {
    array, title, currentValue, changeSize
  } = props
  let counter = 0
  const dropDowns = array.map((item) => {
    counter += 1
    return <option key={`op${counter}`} val={item}>{item}</option>
  })

  const select = (e) => {
    changeSize(props.title, e.target.value)
  }

  return (
    <span>
      <label htmlFor={title}>
        {title}
:
        {' '}
      </label>
      <select id={title} onChange={(e) => select(e)} value={currentValue}>
        { dropDowns }
      </select>
    </span>
  )
}
Select.propTypes = {
  array: PropTypes.instanceOf(Array),
  title: PropTypes.string,
  changeSize: PropTypes.func,
  currentValue: PropTypes.string
}
Select.defaultProps = {
  array: [],
  title: '',
  changeSize () {},
  currentValue: 0 || ''
}
