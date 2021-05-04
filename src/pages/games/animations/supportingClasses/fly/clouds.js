import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'
// import Config from './animationsConfig';
export default function Clouds() {
  return {
    cloudQ: 10,
    clouds: [],
    utils: Utils,
    init (parentCont) {
      this.parentCont = parentCont
      if (this.utils.isMobileOnly) {
        this.cloudQ = 2
      }
      for (let i = 0; i < this.cloudQ; i++) {
        const c = Assets.Sprite('cloud.png')
        c.anchor.set(0.5)
        c.rotate = 0
        c.vx = this.utils.randomNumberBetween(-0.1, 0.1)
        c.vy = this.utils.randomNumberBetween(-0.1, 0.1)
        c.scale.set(this.utils.randomNumberBetween(0.1, 0.8))
        c.radius = c.r = c.width / 2
        c.x = this.utils.randomNumberBetween(0, this.utils.canvasWidth)
        c.y = this.utils.randomNumberBetween(0, this.utils.canvasHeight)
        this.clouds.push(c)
      }
    },
    addToStage () {
      for (let i = 0; i < this.cloudQ; i++) {
        const c = this.clouds[i]
        c.x = this.utils.randomNumberBetween(0, this.utils.canvasWidth)
        c.y = this.utils.randomNumberBetween(0, this.utils.canvasHeight)
        this.parentCont.addChild(c)
      }
    },
    removeFromStage () {
      for (let i = 0; i < this.cloudQ; i++) {
        const c = this.clouds[i]
        this.parentCont.removeChild(c)
      }
    },
    resize () {

    },
    animate () {
      for (const cloud of this.clouds) {
        // this.utils.update(cloud);
        cloud.x += cloud.vx
        cloud.y += cloud.vy

        if (cloud.x > this.canvasWidth - cloud.r) {
          cloud.x = this.canvasWidth - cloud.r
          cloud.vx *= -1
        } else if (cloud.x < cloud.r) {
          cloud.x = cloud.r
          cloud.vx *= -1
        }
        if (cloud.y > this.canvasHeight - cloud.r) {
          cloud.y = this.canvasHeight - cloud.r
          cloud.vy *= -1
        } else if (cloud.y < cloud.r) {
          cloud.y = cloud.r + 1
          cloud.vy *= -1
        }
      }
    }
  }
}
