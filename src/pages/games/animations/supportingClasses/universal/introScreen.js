import Assets from '../utils/assetCreation'
import Utils from '../utils/utils'
// import Config from './animationsConfig';
export default function () {
  return {
    cont: Assets.Container(),
    background: Assets.Graphics(),
    startButton: Assets.Graphics(),
    utils: Utils,
    startFunction: Function,
    init (parentCont, startFunction) {
      this.parentCont = parentCont
      this.startFunction = startFunction
      this.background.beginFill(0x000000).drawRect(0, 0, 500, 200).endFill()
      this.background.x = (this.utils.canvasWidth - this.background.width) / 2
      this.background.y = (this.utils.canvasHeight - this.background.height) / 2
      this.cont.addChild(this.background)

      this.startButton.beginFill(0xFF0000).drawRect(0, 0, 200, 50).endFill()
      this.startButton.x = (this.utils.canvasWidth - this.startButton.width) / 2
      this.startButton.y = (this.utils.canvasHeight - this.startButton.height) / 2
      this.cont.addChild(this.startButton)

      this.startButton.interactive = true
      this.startButton.mousedown = this.startButton.touchstart = this.startFunction

      return this
    },
    addToStage () {
      this.parentCont.addChild(this.cont)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.cont)
    },
    resize () {
      this.startButton.x = (this.utils.canvasWidth - this.startButton.width) / 2
      this.startButton.y = (this.utils.canvasHeight - this.startButton.height) / 2
      this.background.x = (this.utils.canvasWidth - this.background.width) / 2
      this.background.y = (this.utils.canvasHeight - this.background.height) / 2
    },
    animate () {

    }
  }
}
