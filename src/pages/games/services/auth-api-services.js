import config from '../config'
import TokenService from './token-service'
import axios from 'axios';
const AuthApiService = {
  async showLoginForm (code) {
    const result = await axios.post(`${config.API_ENDPOINT}/auth/show-login-form`, { code }, {
      headers: {
        'content-type': 'application/json'
      }
    })
    return result.data
  },
  async postLogin (password) {
    try {
      const res = await axios.post(`${config.API_ENDPOINT}/auth/login`, { password }, {
        headers: {
          'content-type': 'application/json'
        }
      })
     
      if (res.data.authToken) {
        TokenService.saveAuthToken(res.data.authToken)
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
