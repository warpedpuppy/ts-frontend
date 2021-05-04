import FlyBackground from './flyBackground'
import FlyAction from './flyAction'
import Utils from '../../utils/utils'
// import Config from '../../animationsConfig';
export default function IndexFly() {
  return {
    flyBackground: FlyBackground(),
    flyAction: FlyAction(),
    onGridCoins: [],
    utils: Utils,
    init (parent) {
      this.background = this.flyBackground
      this.flyBackground.init(parent)
      this.flyAction.init(parent, this.background)
    },
    addToStage () {
      this.utils.root.grid.changeGridSize()
      const index = this.utils.root.kingCont.getChildIndex(this.utils.root.clock.cont) + 1
      this.utils.root.grid.addToStage(index)

      this.flyBackground.addToStage()
      this.flyAction.createPool()

      this.flyAction.radius = this.flyAction.storeRadius = 0
      this.flyAction.vx = this.flyAction.vy = 0
      return this.flyAction
    },
    removeFromStage () {
      this.flyBackground.removeFromStage()
      // this.utils.root.grid.clearGrid();
      // this.utils.root.grid.removeFromStage();
    },
    resize () {
      this.flyBackground.resize()
      this.flyAction.resize()
    },
    addCoinToGrid () {

    },
    startSpaceShipJourney () {

    },
    endSpaceShipJourney () {

    },
    animate () {
      this.flyAction.animate()
    }
  }
}
