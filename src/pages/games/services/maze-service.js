import config from '../config'
import TokenService from './token-service'

const MazeService = {
  async load_ids () {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/tugtug/get-grid-ids`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      const res_1 = await res.json()
      return res_1
    }
    catch (error) {
      return error
    }
  },
  async getOneMaze (id) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/tugtug/get-grid`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const res_1 = await res.json()
      return res_1
    }
    catch (error) {
      return error
    }
  },
  async loadAllMazes () {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/tugtug/all-mazes`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      })
      const res_1 = await res.json()
      return res_1
    }
    catch (error) {
      return error
    }
  },
  async saveMaze (data) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/tugtug/new-maze`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify({ data })
      })
      const res_1 = await res.json()
      if (res_1.success) {
        return res_1
      }
      return false
    }
    catch (error) {
      return error
    }
  },
  async deleteMaze (id) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/tugtug/delete-maze`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify({ id })
      })
      const res_1 = await res.json()
      return res_1
    }
    catch (error) {
      return error
    }
  }
}
export default MazeService
