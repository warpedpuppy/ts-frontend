import config from '../config'
import TokenService from './token-service'

const AuthApiService = {
  async showLoginForm (code) {
    const result = await fetch(`${config.API_ENDPOINT}/auth/show-login-form`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ code })
    })
    const resultJson = await result.json()
    return resultJson
  },
  async postLogin (password) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ password })
      })
      const res_1 = await ((!res.ok)
        ? res.json().then((e) => Promise.reject(e))
        : res.json())
      if (res_1.authToken) {
        TokenService.saveAuthToken(res_1.authToken)
        return { login: true }
      }
      return { login: false }
    }
    catch (error) {
      return error
    }
  }

}

export default AuthApiService
