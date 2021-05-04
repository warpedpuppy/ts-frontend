import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'

export default function AirBubbles() {
  return {
    mode: undefined,
    radius: 0,
    storeRadius: 0,
    spinning: false,
    utils: Utils,
    vx: 0,
    vy: 0,
    airBubbleCounter: 0,
    airBubbleStart: 0,
    countAllow: true,
    expand: [],
    bubblesCont: Assets.Container(),
    times: [50, 100],
    setupBubbles (cont) {
      this.wh = this.utils.wh
      const hero = this.hero = this.utils.hero
      const startTimes = [0, 10, 20, 30]
      this.bubblesCont.x = this.wh.canvasWidth / 2
      this.bubblesCont.y = this.wh.canvasHeight / 2
      for (let i = 0; i < hero.airBubbles.length; i++) {
        const ab = this.hero.airBubbles[i]
        ab.y = -this.hero.fishRadius
        ab.counter = 0
        ab.startTime = startTimes[i]
        this.expand.push(ab)
        this.bubblesCont.addChild(ab)
      }
      this.airBubbleStart = this.utils.randomIntBetween(this.times[0], this.times[1])
      cont.addChild(this.bubblesCont)
      this.lilypads = this.utils.lilypads.array
    },
    fishExhale () {
      // console.log(this.lilypads)
      if (!this.lilypads) return
      for (let j = 0; j < this.lilypads.length; j++) {
        const ab = this.expand[0]
        ab.radius = ab.r = ab.width / 2
        const tempCicle = {
          x: this.utils.canvasWidth / 2,
          y: this.utils.canvasHeight / 2,
          radius: ab.radius,
          r: ab.radius,
          vx: 0,
          vy: 0
        }

        const collision = this.utils.circleToCircleCollisionDetection(tempCicle, this.lilypads[j])
        if (collision[0]) {
          this.utils.adjustPositions(tempCicle, this.lilypads[j], collision[1])
        }
      }

      for (let i = 0; i < this.expand.length; i++) {
        const ab = this.expand[i]
        if (ab.counter >= ab.startTime) {
          ab.scale.x += 0.01
          ab.scale.y += 0.01
          if (ab.alpha > 0)ab.alpha -= 0.01
        }
        ab.counter++
      }
      if (this.expand[this.expand.length - 1].alpha < 0) {
        this.resetAirBubbles()
      }
    },
    resize () {
      this.bubblesCont.x = this.utils.canvasWidth / 2
      this.bubblesCont.y = this.utils.canvasHeight / 2
    },
    resetAirBubbles () {
      for (let i = 0; i < this.expand.length; i++) {
        const ab = this.expand[i]
        ab.counter = 0
        ab.scale.set(0)
        ab.alpha = 1
      }
      this.airBubbleCounter = 0
      this.airBubbleStart = this.utils.randomIntBetween(this.times[0], this.times[1])
      this.countAllow = true
    },
    animate () {
      if (this.countAllow) {
        this.airBubbleCounter++
        if (this.airBubbleCounter === this.airBubbleStart) {
          this.countAllow = false
        }
      } else {
        this.fishExhale()
      }
    }
  }
}
