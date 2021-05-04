import Utils from '../../utils/utils'

export default function JumpAction() {
  return {
    gravity: 0.3,
    speedLimit: 20,
    speed: 1,
    vy: 0,
    vx: 0.5,
    jumpTimer: 0,
    jumpTimeLimit: 21,
    utils: Utils,
    pause: false,
    heroCollisionDetectObject: {},
    init (stage) {
      this.bkgd = this.utils.root.jump.jumpBackground
      this.hero = this.utils.hero
      this.canvasWidth = this.utils.canvasWidth
      this.canvasHeight = this.utils.canvasHeight
      this.stage = stage
      this.vx = this.speed
      const radius = (this.utils.hero.heroJump.cont.width / 2) * this.utils.root.hero.cont.scale.x
      this.heroCollisionDetectObject.radius = radius
    },
    rotate (str) {
      this.move(str)
    },
    jump () {
      this.vy = -6
      this.jumpTimer = 1
      // this.hero.heroJump.bounce();
      this.hero.heroJump.jumpMouth()
    },
    resize (wh) {
      this.canvasWidth = wh.canvasWidth
      this.canvasHeight = wh.canvasHeight
    },
    move (str) {
      if (str === 'left') {
        this.vx = -this.speed
        this.hero.heroJump.look('left')
      } else if (str === 'right') {
        this.vx = this.speed
        this.hero.heroJump.look('right')
      } else {
        this.vx = 0
      }
    },
    animate () {
      if (this.pause) return

      for (let i = 0; i < this.bkgd.rainbowSwirlsQ; i++) {
        this.bkgd.rainbowSwirlInstances[i].animate()
      }

      const globalPoint = this.utils.hero.activeHero.body.toGlobal(this.utils.app.stage)
      this.heroCollisionDetectObject.x = globalPoint.x
      this.heroCollisionDetectObject.y = globalPoint.y

      this.bkgd.currentOrb.classRef.dotsAndGremlinCollision(this.heroCollisionDetectObject)

      for (let i = 0; i < this.bkgd.loopingQ; i++) {
        this.bkgd.orbs[i].classRef.animate(this.bkgd, this.heroCollisionDetectObject)
      }

      this.hero.shell.rotation += this.utils.deg2rad(this.vx)
      this.hero.activeHero.cont.y += this.vy
      if (this.hero.activeHero.cont.y > this.hero.activeHero.floor) {
        this.hero.activeHero.cont.y = this.hero.activeHero.floor
        this.vy = 0
        this.hero.activeHero.grimaceMouth()
      } else if (this.hero.activeHero.cont.y < this.hero.activeHero.floor) {
        this.vy += this.gravity
      }
    }
  }
}
