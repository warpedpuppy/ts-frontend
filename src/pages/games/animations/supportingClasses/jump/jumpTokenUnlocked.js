import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
import Tweens from '../../utils/Tweens'
// import Config from './animationsConfig';
export default JumpTokenUnlocked = {
  utils: Utils,
  init () {
    this.textCont = Assets.Container()
    this.token = Assets.Sprite('token.png')
    this.token.anchor.set(0.5)
    this.token.y = -100
    this.unlocked = Assets.Sprite('unlocked.png')

    this.unlocked.anchor.set(0.5)
    // this.earned.y = this.earned.height / 2
    this.textCont.addChild(this.unlocked)
    this.textCont.addChild(this.token)

    this.addToStage = this.addToStage.bind(this)
  },
  addToStage () {
    this.textCont.x = this.utils.canvasWidth / 2
    this.textCont.y = this.utils.canvasHeight / 2
    this.utils.app.stage.addChild(this.textCont)
    Tweens.tween(this.textCont, 1, { alpha: [1, 0], onComplete: this.removeFromStage.bind(this) })
  },
  removeFromStage () {
    this.utils.app.stage.removeChild(this.textCont)
  },
  resize () {

  },
  animate () {

  }

}
