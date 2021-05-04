import React from 'react'
import './Cell.css'

export default class Cell extends React.Component {
    state = {
      activeColor: ''
    }

    removeCurrent (str) {
      const elem = document.querySelector(`.${str}`)
      if (elem)elem.classList.remove(str)
    }

    onMouseDownHandler = () => {
      if (this.props.activeItem === 'wall') {
        this.setState({ activeColor: 'wall' })
      } else if (this.props.activeItem === 'hero') {
        this.removeCurrent('hero')
        this.setState({ activeColor: 'hero' })
      } else if (this.props.activeItem === 'token1') {
        this.removeCurrent('token1')
        this.setState({ activeColor: 'token1' })
      } else if (this.props.activeItem === 'token2') {
        this.removeCurrent('token2')
        this.setState({ activeColor: 'token2' })
      } else if (this.props.activeItem === 'token3') {
        this.removeCurrent('token3')
        this.setState({ activeColor: 'token3' })
      } else if (this.props.activeItem === 'token4') {
        this.removeCurrent('token4')
        this.setState({ activeColor: 'token4' })
      } else if (this.props.activeItem === 'erase') {
        this.setState({ activeColor: '' })
      }
    }

    onMouseOverHandler = (e) => {
      e.stopPropagation()
      if (!this.props.drawing) return
      if (this.props.activeItem === 'wall') {
        this.setState({ activeColor: 'wall' })
      } else if (this.props.activeItem === 'erase') {
        this.setState({ activeColor: '' })
      }
    }

    render () {
      const {
        hero, token1, token2, token3, token4, rowval, cellval, wallBoolean
      } = this.props

      const heroClass = (hero && (hero[0] === rowval && hero[1] === cellval)) ? 'hero' : ''
      const token1Class = (token1 && (token1[0] === rowval && token1[1] === cellval)) ? 'token1' : ''
      const token2Class = (token2 && (token2[0] === rowval && token2[1] === cellval)) ? 'token2' : ''
      const token3Class = (token3 && (token3[0] === rowval && token3[1] === cellval)) ? 'token3' : ''
      const token4Class = (token4 && (token4[0] === rowval && token4[1] === cellval)) ? 'token4' : ''
      const wallClass = (wallBoolean) ? 'wall' : ''
      return (
        <div
          rowval={rowval}
          cellval={cellval}
          className={`cell ${this.state.activeColor}${heroClass}${token1Class}${token2Class}${token3Class}${token4Class}${wallClass}`}
          onMouseOver={this.onMouseOverHandler}
          onMouseDown={this.onMouseDownHandler}
        />
      )
    }
}
