import SwimAction from './swimAction'
import SwimBackground from './swimBackground'
import Ripples from './ripples'
import Utils from '../../utils/utils'

export default function IndexSwim() {
  return {
    ripples: Ripples(),
    swimAction: SwimAction(),
    swimBackground: SwimBackground(),
    onGridCoins: [],
    utils: Utils,
    init (cont) {
      this.background = this.swimBackground
      this.swimBackground.init(cont)
      if (!this.utils.isMobile) this.ripples.init()
      this.swimAction.init(cont)
    },
    addToStage () {
      this.utils.root.grid.changeGridSize()
      const index = this.utils.root.kingCont.getChildIndex(this.utils.root.clock.cont) + 1
      this.utils.root.grid.addToStage(index)

      if (!this.utils.isMobile) this.ripples.on(true)
      this.swimBackground.addToStage()
      this.swimAction.start()

      this.swimAction.vx = this.swimAction.vy = 0

      return this.swimAction
    },
    removeFromStage () {
      if (!this.utils.isMobile) this.ripples.on(false)
      // this.swimBackground.removeFromStage();
      // this.swimAction.airBubbles.resetAirBubbles();

      // this.utils.root.grid.clearGrid();
      // this.utils.root.grid.removeFromStage();
    },
    resize () {
      this.swimAction.resize()
      this.swimBackground.resize()
    },
    addCoinToGrid () {

    },
    startSpaceShipJourney () {
      if (!this.utils.isMobile) this.ripples.on(false)
      this.swimBackground.startSpaceShipJourney()
    },
    endSpaceShipJourney () {
      if (!this.utils.isMobile) this.ripples.on(true)
      this.swimBackground.endSpaceShipJourney()
    },
    animate () {
      if (!this.utils.isMobile) this.ripples.animate()
      this.swimBackground.animate()
      this.swimAction.animate()
    }
  }
}
