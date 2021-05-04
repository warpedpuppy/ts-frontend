import React from 'react'
import HeaderRing from '../svgs/HeaderRing'
import './LogoGraphic.css'
import SiteContext from '../GamesContext'

export default class LogoGraphic extends React.Component {
  render () {
    const className = (this.context.game !== '') ? 'logoGraphic hide' : 'logoGraphic'
    return (
      <div className={className}>
        <HeaderRing w={50} topOffset={50} rotate="clockwise" />
        <HeaderRing w={100} topOffset={25} rotate="counterClockwise" />
        <HeaderRing w={150} topOffset={0} rotate="clockwise" />
      </div>
    )
  }
}
LogoGraphic.contextType = SiteContext
