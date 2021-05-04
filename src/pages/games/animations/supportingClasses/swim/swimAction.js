import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'
import AirBubbles from './airBubbles'
import Rotate from '../action/rotate'
import TriangleOfCollision from '../action/triangleOfCollision'

export default function SwimAction() {
  return {
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
    percApply: true,
    airBubbles: AirBubbles(),
    increment: 5,
    triangleOfCollision: TriangleOfCollision(),
    flameOn: false,
    rotateFunction: Rotate(),
    init (stage) {
      this.hero = this.utils.hero
      this.wh = this.utils.wh
      this.stage = stage
      // this.vx = this.utils.randomNumberBetween(1,2);
      //          this.vy = this.utils.randomNumberBetween(1,2);
      this.airBubbles.setupBubbles(stage)
      this.triangleOfCollision.init()
      this.flames = Assets.ParticleContainer(this.flameQ)
    },
    start () {
      this.createPool()
      this.maxLength = this.increment * this.hero.activeHero.segmentsQ
    },
    createPool () {
      const obj = Assets.createPool(
        this.flames,
        'transparentRing.png',
        [0xadd8e6, 0xFFFF00],
        [0.095, 0.5]
      )

      this.flameArray = obj.flameArray
      this.flameQ = obj.flameQ
      this.flames.visible = false
      this.flames.y = -40
      this.hero.activeHero.headCont.addChildAt(this.flames, 0)
    },
    rotate (str) {
      const obj = this.rotateFunction.rotate(str, this)
      this.vx = -obj.vx
      this.vy = -obj.vy
    },
    resize () {
      this.airBubbles.resize()
    },
    fire (boolean) {
      this.flameOn = this.flames.visible = boolean
    },
    animate () {
      if (this.flameOn) {
        this.triangleOfCollision.fireHit()

        for (let i = 0; i < this.flameQ; i++) {
          const item = this.flameArray[i]
          const determineContinue = Math.floor(Math.random() * 10)
          if (determineContinue < 9) continue
          item.x += item.vx
          item.y += item.vy
          item.alpha -= item.fade
          if (Math.abs(item.y) > item.maxDistance) {
            item.x = 0
            item.y = 0
            item.alpha = 1
          }
        }
      }
      this.hero.activeHero.headCont.rotation = this.radius

      if (!this.spinning) {
        this.radius = this.utils.cosWave(this.storeRadius, 0.15, 0.01)
      }

      this.hero.activeHero.segments[0].rotation = this.radius
      this.hero.pos.push(this.radius)

      if (this.hero.pos.length > this.maxLength) {
        this.hero.pos = this.hero.pos.slice(-this.maxLength)
      }

      for (let i = 1; i < this.hero.activeHero.segmentsQ; i++) {
        const index = this.hero.pos.length - (i * this.increment)
        if (this.hero.pos.length >= index) {
          this.hero.activeHero.segments[i].rotation = this.hero.pos[index]
        }
      }

      this.airBubbles.animate()
      this.hero.activeHero.leftFin.rotation = this.utils.deg2rad(this.utils.cosWave(0, 20, 0.004))
      this.hero.activeHero.rightFin.rotation = this.utils.deg2rad(this.utils.cosWave(0, -20, 0.004))
      this.hero.activeHero.tail.rotation = this.utils.deg2rad(this.utils.cosWave(0, 60, 0.01))

      this.hero.activeHero.finCont.rotation = this.radius
      this.hero.activeHero.eyeCont.rotation = this.radius
      this.airBubbles.bubblesCont.rotation = this.storeRadius // this is why airbubbles needs to be in here
    }
  }
}
