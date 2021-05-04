import Assets from '../../../utils/assetCreation'
import Utils from '../../../utils/utils'
import Config from '../../../animationsConfig'
import Tweens from '../../../utils/Tweens'

export default function TokenAnimations() {
  return {
    textCont: Assets.Container(),
    utils: Utils,
    build () {
      this.token = Assets.Sprite('token.png')
      this.token.anchor.set(0.5)
      this.token.y = -100

      this.earned = Assets.Sprite('earned.png')
      this.earned.anchor.set(0.5)
      this.textCont.addChild(this.earned)
      this.textCont.addChild(this.token)
      this.textCont.x = this.utils.canvasWidth / 2
      this.textCont.y = this.utils.canvasHeight / 2

      if (this.utils.isMobileOnly) {
        this.textCont.scale.set(Config.mobileOnlyScaling)
      }

      this.mustBeFish = Assets.Sprite('mustBeFish.png')
      this.mustBeFish.anchor.set(0.5)
      this.mustbeDragon = Assets.Sprite('mustBeDragon.png')
      this.mustbeDragon.anchor.set(0.5)
    },
    playEarnedTokenAnimation () {
      this.utils.app.stage.addChild(this.textCont)
      Tweens.tween(this.textCont, 2, { alpha: [1, 0] }, this.removeText.bind(this, this.textCont))
    },
    wrongTokenAnimation (token) {
      const text = (this.utils.root.activeMode === 'swim') ? this.mustbeDragon : this.mustBeFish
      text.alpha = 1
      text.x = token.x
      text.y = token.y
      this.utils.root.grid.gridBuild.cont.addChild(text)
      Tweens.tween(text, 2, { alpha: [1, 0] }, this.removeText.bind(this, text))
    },
    removeText (cont) {
      this.utils.app.stage.removeChild(cont)
    }
  }
}
