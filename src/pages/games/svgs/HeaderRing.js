import React from 'react'
import './HeaderRing.css'
import PropTypes from 'prop-types'

export default function HeaderRing (props) {
  const { topOffset, w, rotate } = props
  const logoStyle = { top: `${topOffset}px`, width: `${w}px` }
  const classes = `headerRing ${rotate}`
  return (
    <div className="svgDiv">
      <svg style={logoStyle} viewBox="0 0 199 199" className={classes}>
        <defs>
          <radialGradient id="radial-gradient" cx="20" cy="41.5" r="10.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fcee21" />
          </radialGradient>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path className="cls-1" d="M99.5.5a99,99,0,1,0,99,99A99,99,0,0,0,99.5.5Zm0,193a94,94,0,1,1,94-94A94,94,0,0,1,99.5,193.5Z" />
            <circle className="cls-2" cx="21.5" cy="43.5" r="10.5" />
          </g>
        </g>
      </svg>
    </div>
  )
}
HeaderRing.defaultProps = {
  topOffset: undefined,
  w: undefined,
  rotate: undefined
}
HeaderRing.propTypes = {
  topOffset: PropTypes.number,
  w: PropTypes.number,
  rotate: PropTypes.string
}
