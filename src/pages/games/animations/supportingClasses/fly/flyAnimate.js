import Utils from '../../utils/utils'
import Tweens from '../../utils/Tweens'

export default function flyAnimate() {
  return {
    utils: Utils,
    animateMobile () {
      this.utils.root.orientationChange.animate()
      this.utils.root.flyAnimate.animate()
    },
    animateDesktopIpad () {
      this.utils.root.flyAnimate.animate()
    },
    animate () {
      Tweens.animate()

      if (this.fullStop) return
      if (this.action) {
        if (this.rotateLeftBoolean) {
          this.activeAction.rotate('left')
        } else if (this.rotateRightBoolean) {
          this.activeAction.rotate('right')
        }
        this.clock.animate()
        this.filterAnimation.animate()
        this.gears.animate()
        this.fly.animate()
        this.grid.animate(this.activeAction.vx, this.activeAction.vy)
      }
    }
  }
}
