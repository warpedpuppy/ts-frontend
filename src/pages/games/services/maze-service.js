import config from '../../../config';
import TokenService from './token-service'
import axios from 'axios';
import DefaultMaze from '../defaults/DefaultMaze';
const MazeService = {
  async load_ids () {
    try {
      const res = await axios(`${config.API_URL}/api/tugtug/get-grid-ids`, {
        headers: {
          'content-type': 'application/json'
        }
      })
      return res.data.length === 0 ? DefaultMaze : res.data ;
    }
    catch (error) {
      return error
    }
  },
  async getOneMaze (id) {

	return DefaultMaze;
    // try {
    //   const res = await axios.post(`${config.API_URL}/api/tugtug/get-grid`, { id }, {
    //     headers: {
    //       'content-type': 'application/json'
    //     }
    //   })
    //   return res.data
    // }
    // catch (error) {
    //   return error
    // }
  },
  async loadAllMazes () {
    try {
      const res = await axios(`${config.API_URL}/api/tugtug/all-mazes`, {
        headers: {
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      })
      return res.data
    }
    catch (error) {
      return error
    }
  },
  async saveMaze (data) {
    try {
      const res = await axios.post(`${config.API_URL}/api/tugtug/new-maze`, { data }, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      })
      if (res.statusText === "OK") {
        return res.data
      }
      return false
    }
    catch (error) {
      return error
    }
  },
  async deleteMaze (id) {
    try {
      const res = await axios.delete(`${config.API_URL}/api/tugtug/delete-maze`, {data:{ id }}, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      })
      return res.data
    }
    catch (error) {
      return error
    }
  }
}
export default MazeService
