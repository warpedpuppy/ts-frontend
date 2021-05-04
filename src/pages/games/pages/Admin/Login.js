import React from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SiteContext from '../../GamesContext'
import AuthApiService from '../../services/auth-api-services'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      errorMessage: '',
      showForm: false,
      codeEnter: '',
      codeFeedback: ''
    }
  }

    static contextType = SiteContext;

    logOutHandler = (e) => {
      e.preventDefault()
      this.context.loginHandler(false)
    }

    onSubmit = (e) => {
      e.preventDefault()
      this.setState({ errorMessage: '' })
      AuthApiService.postLogin(this.state.password)
        .then((result) => {
          this.setState({ password: '' })
          if (result.login === true) {
            this.context.loginHandler(true)
          } else {
            this.setState({ errorMessage: 'This was not correct.' })
          }
        })
    }

    buttonClicked = (e) => {
      this.setState({ codeFeedback: '' })
      if (this.state.codeEnter.length < 4) {
        this.setState({ codeEnter: this.state.codeEnter + e.target.innerHTML })
      } else {
        const removeLeftDigit = this.state.codeEnter.substr(1) + e.target.innerHTML
        this.setState({ codeEnter: removeLeftDigit })
      }
    }

    submitCode = async () => {
      const result = await AuthApiService.showLoginForm(this.state.codeEnter)

      if (result.success) {
        this.setState({ showForm: true })
      } else {
        this.setState({ codeFeedback: 'not the right code' })
      }
    }

    onChangeHandler = (e) => {
      this.setState({ password: e.target.value })
    }

    render () {
      const buttons = Array.from(Array(9).keys()).map((item) => {
        const buttonNum = item + 1
        return <span onClick={this.buttonClicked} key={buttonNum}>{buttonNum}</span>
      })
      if (this.context.loggedIn) {
        return (
          <div className="login-form">
            <Button variant="danger" onClick={this.logOutHandler}>log out</Button>
          </div>
        )
      } if (!this.state.showForm) {
        return (
          <div className="keyPad">
            <div>
              {buttons}
            </div>
            <div><Button onClick={this.submitCode}>submit code</Button></div>
            <div>{this.state.codeEnter}</div>
            <div className="feedback">{this.state.codeFeedback}</div>
          </div>
        )
      } if (!this.context.loggedIn) {
        return (
          <div className="login-form">
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col>
                  <Form.Control type="password" onChange={(e) => this.onChangeHandler(e)} value={this.state.password} />
                </Col>
                <Col>
                  <Form.Control type="submit" />
                </Col>
              </Row>
              <Row>
                <div className="feedback">{ this.state.errorMessage }</div>
              </Row>
            </Form>
          </div>
        )
      }
    }
}
