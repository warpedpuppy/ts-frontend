import Assets from '../../../utils/assetCreation'
import Utils from '../../../utils/utils'

export default function () {
  return {
    cont: Assets.ParticleContainer(1000),
    rings: [],
    expandingRings: [],
    ringQ: 10,
    utils: Utils,
    counter: 0,
    ringCounter: 0,
    maxRingSize: 0,
    expand: true,
    absValueRate: 0.025,
    init () {
      for (let i = 0; i < this.ringQ; i++) {
        const ring = Assets.Sprite('gear.png')
        ring.anchor.set(0.5)
        this.rings.push(ring)
        this.cont.addChild(ring)
      }
    },
    setMaxScaleHandler () {
      this.rings[0].width = this.rings[0].height = this.maxRingSize
      return this.rings[0].scale.x
    },
    addToStage (expand) {
      this.expand = expand
      this.maxRingSize = Math.max(this.utils.canvasWidth, this.utils.canvasHeight) * 1.2
      this.setMaxScale = this.setMaxScaleHandler()
      this.counter = 0
      this.rings.forEach((ring, index) => {
        // ring.scale.set(0)
        ring.x = this.utils.canvasWidth / 2
        ring.y = this.utils.canvasHeight / 2
        ring.width = ring.height = index * 100
      })
      if (!this.expand) {
        this.rate = -this.absValueRate
      } else {
        this.rate = this.absValueRate
      }
      const index = this.utils.app.stage.getChildIndex(this.utils.hero.cont) - 1
      this.utils.app.stage.addChildAt(this.cont, index)
    },
    removeFromStage () {
      this.utils.app.stage.removeChild(this.cont)
    },
    resize () {

    },
    animate () {
      this.rings.forEach((ring) => {
        ring.scale.x += this.rate
        ring.scale.y += this.rate

        if (!this.expand && ring.scale.x < 0) {
          ring.scale.set(1)
        } else if (this.expand && ring.scale.x > 1) {
          ring.scale.set(0)
          console.log(ring.scale.x)
        }
      })
    }
  }
}
