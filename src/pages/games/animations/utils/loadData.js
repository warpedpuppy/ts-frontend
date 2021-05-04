import MazeServices from '../../services/maze-service'

export default function () {
  return {
    getDatabaseData () {
      return MazeServices.getOneMaze(18)
    }
  }
}
