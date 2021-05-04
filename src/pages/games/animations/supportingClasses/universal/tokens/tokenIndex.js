import Utils from '../../../utils/utils'
import Tokens from './tokens'
import TokenSlots from './tokenSlots'
import TokenAnimations from './tokenAnimations'

export default function TokenIndex() {
  return {
    utils: Utils,
    tokens: [],
    init () {
      this.tokenSlots = TokenSlots()
      this.tokenAnimations = TokenAnimations()
      this.tokensClass = Tokens()
      this.tokens = this.tokensClass.build()
      this.slotsCont = this.tokenSlots.build()
      this.tokenSlots.addToStage()
      this.tokenAnimations.build()
    },
    reset () {
      this.tokenCounter = 0
      for (let i = 0; i < 4; i++) {
        const t = this.utils.root.grid.gridBuild.tokens[i]
        if (t.parent)t.parent.removeChild(t)
        t.placed = false
      }
    },
    fillSlot (token) {
      this.tokenSlots.fillSlot(token)
      this.tokenAnimations.playEarnedTokenAnimation()
    },
    wrongTokenAnimation (token) {
      this.tokenAnimations.wrongTokenAnimation(token)
    },
    removeFromStage () {

    },
    resize () {
      this.tokenSlots.resize()
      this.tokenAnimations.textCont.x = this.utils.canvasWidth / 2
      this.tokenAnimations.textCont.y = this.utils.canvasHeight / 2
    },
    earnToken (t) {
      this.utils.root.action = false
      this.utils.root.tokens.fillSlot(t)
      setTimeout(this.resumePlayAfterEarnToken.bind(this), 2000)
    },
    resumePlayAfterEarnToken () {
      this.utils.root.action = true
    },
    animate () {

    }
  }
}
