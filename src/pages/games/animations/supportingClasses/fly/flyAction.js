import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'
import Rotate from '../action/rotate'
import TriangleOfCollision from '../action/triangleOfCollision'

export default function FlyAction() {
  return {
    radius: 0,
    storeRadius: 0,
    spinning: false,
    vx: 0,
    vy: 0,
    airBubbleCounter: 0,
    airBubbleStart: 0,
    countAllow: true,
    expand: [],
    percApply: true,
    increment: 5,
    colors: [0xFF0000, 0xFFFF00, 0xFF9900],
    flameArray: [],
    shootingFlames: [],
    flameCounter: 0,
    flameOn: false,
    utils: Utils,
    triangleOfCollision: TriangleOfCollision(),
    rotateFunction: Rotate(),
    init (parent, background) {
      this.parent = parent
      this.grid = parent.grid
      this.background = background
      this.clouds = background.clouds
      this.hero = this.utils.hero
      this.wh = this.utils.wh
      this.stage = this.utils.app.stage
      this.flames = Assets.ParticleContainer(this.flameQ)
      this.triangleOfCollision.init()
    },
    createPool () {
      const obj = Assets.createPool(this.flames, 'star.png', this.colors, [0.25, 0.5])
      this.flameArray = obj.flameArray
      this.flameQ = obj.flameQ
      this.flames.visible = false
      this.flames.y = -100
      this.hero.activeHero.headCont.addChildAt(this.flames, 0)
    },
    resize () {
      // if (this.flames) {
      // 	this.flames.x = this.utils.canvasWidth / 2;
      //     this.flames.y = this.utils.canvasHeight / 2;
      // }

    },
    switchMode (mode) {
      this.mode = mode
      this.maxLength = this.increment * this.hero.activeHero.segmentsQ
    },
    rotate (str) {
      const obj = this.rotateFunction.rotate(str, this)
      this.vx = -obj.vx
      this.vy = -obj.vy
    },
    fire (boolean) {
      this.flameOn = this.flames.visible = boolean
    },
    animate () {
      this.clouds.animate()

      this.hero.activeHero.eyeCont.rotation = this.radius
      this.hero.activeHero.headCont.rotation = this.radius

      this.hero.pos.push(this.radius)

      if (this.hero.pos.length > this.maxLength) {
        this.hero.pos = this.hero.pos.slice(-this.maxLength)
      }

      for (let i = 1; i <= this.hero.activeHero.segmentsQ; i++) {
        const index = this.hero.pos.length - (i * this.increment)
        if (this.hero.pos.length >= index) {
          this.hero.activeHero.segments[i].rotation = this.hero.pos[index]
        }
      }

      if (this.flameOn) {
        this.triangleOfCollision.fireHit()

        for (let i = 0; i < this.flameQ; i++) {
          const item = this.flameArray[i]
          const determineContinue = Math.floor(Math.random() * 10)
          if (determineContinue < 9) continue
          item.x += item.vx
          item.y += item.vy
          item.rotation += 0.5
          item.alpha -= item.fade
          if (Math.abs(item.y) > item.maxDistance) {
            item.x = 0
            item.y = 0
            item.alpha = 1
          }
        }
      } else if (!this.spinning) {
        this.radius = this.utils.cosWave(this.storeRadius, 0.15, 0.01)
      }

      if (!this.flameOn) {
        this.hero.activeHero.wingCont.rotation = this.storeRadius
        this.hero.activeHero.leftWing.rotation = this.utils.deg2rad(this.utils.cosWave(0, 20, 0.004))
        this.hero.activeHero.leftWing2.rotation = this.utils.deg2rad(this.utils.cosWave(0, 20, 0.004))

        this.hero.activeHero.rightWing.rotation = this.utils.deg2rad(this.utils.cosWave(0, -20, 0.004))
        this.hero.activeHero.rightWing2.rotation = this.utils.deg2rad(this.utils.cosWave(0, -20, 0.004))
      } else {
        this.hero.activeHero.wingCont.rotation = this.radius
        this.hero.activeHero.leftWing.rotation = this.utils.deg2rad(-30)
        this.hero.activeHero.leftWing2.rotation = this.utils.deg2rad(-30)
        this.hero.activeHero.rightWing.rotation = this.utils.deg2rad(30)
        this.hero.activeHero.rightWing2.rotation = this.utils.deg2rad(30)
      }
    }
  }
}
