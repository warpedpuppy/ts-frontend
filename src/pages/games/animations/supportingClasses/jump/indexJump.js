import JumpAction from './jumpAction'
import JumpBackground from './jumpBackground'
import Utils from '../../utils/utils'
// import Config from '../../animationsConfig';
export default function IndexJump() {
  return {
    jumpAction: JumpAction(),
    jumpBackground: JumpBackground(),

    init (stage) {
      this.removeFromStage = this.removeFromStage.bind(this)
      this.background = this.jumpBackground
      this.jumpAction.init(stage)
      this.jumpBackground.init(stage, this.jumpAction)

      Utils.hero.activeHero.cont.y = this.jumpBackground.currentOrb.background.width / 2
      Utils.hero.activeHero.floor = -this.jumpBackground.currentOrb.background.width / 2
    },
    reset () {
      this.jumpBackground.reset()
    },
    addToStage () {
      this.jumpBackground.addToStage()
      return this.jumpAction
    },
    removeFromStage () {
      this.jumpBackground.removeFromStage()
    },
    resize () {
      this.jumpBackground.resize()
    },
    animate () {
      this.jumpAction.animate()
    }

  }
}
