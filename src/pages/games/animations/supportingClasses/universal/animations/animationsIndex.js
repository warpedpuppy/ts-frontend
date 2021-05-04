import ConcentricCircles from './concentricCircles'
import Explosion from './explosion'

export default function () {
  return {
    circlesBoolean: false,
    explosionBoolean: false,
    explosion: Explosion(),
    concentricCircles: ConcentricCircles(),
    init () {
      this.explosion.init()
      this.animateFunction = function () {}
      this.concentricCircles.init()
    },
    circles (obj) {
      if (obj.start) {
        this.circlesBoolean = true
        this.concentricCircles.addToStage(obj.expand)
      } else {
        this.circlesBoolean = false
        this.concentricCircles.removeFromStage()
      }
    },
    explosionStart () {
      this.explosion.start()
      this.explosionBoolean = true
    },
    addToStage () {

    },
    removeFromStage () {

    },
    resize () {

    },
    animate () {
      if (this.circlesBoolean) {
        this.concentricCircles.animate()
      }
      if (this.explosionBoolean) {
        if (!this.explosion.explosionBoolean) {
          this.explosionBoolean = false
          this.explosion.removeFromStage()
        }
        this.explosion.animate()
      }
    }
  }
}
