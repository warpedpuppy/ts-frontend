import Assets from '../../../utils/assetCreation'
import Utils from '../../../utils/utils'
import Config from '../../../animationsConfig'
import Weapon from './baddyWeapon'

export default function Baddy(gridBuild) {
  return {
    utils: Utils,
    vx: 0,
    vy: 0,
    calcDest: true,
    buffer: 10,
    towardsDragon: true,
    alreadyBeenToAWall: false,
    spearThrowing: false,
    throw: false,
    spearCounter: 0,
    health: Config.baddyHealth,
    init () {
      this.cont = gridBuild.cont
      this.destPoint = { x: this.utils.canvasWidth / 2, y: this.utils.canvasHeight / 2 }
      this.root = this.utils.root

      // this.body = Assets.Sprite(str);
      const bodyTextures = [
        Assets.Texture('soldierWalking1.png'),
        Assets.Texture('soldierWalking2.png')
      ]
      this.body = Assets.AnimatedSprite(bodyTextures)
      this.body.animationSpeed = 0.1
      this.body.play()

      this.body.anchor.set(0.5)
      this.speed = this.utils.randomNumberBetween(0.1, 0.5)
      this.body.animationSpeed = this.speed * 0.25
      this.spearSpeed = this.utils.randomNumberBetween(0.6, 0.8)
      this.body.classRef = this
      this.body.radius = this.body.r = 11
      // this.startSquare = this.currentSquare();

      // spears
      this.spear = Weapon(gridBuild).init(this.body)

      return this.body
    },
    fireHit () {
      this.health--
      if (this.health < 0) {
        this.utils.root.grid.gridBuild.cont.removeChild(this.body)
        const index = this.utils.root.grid.gridBuild[`${this.utils.root.activeMode}Baddies`].soldiers.indexOf(this.body)
        this.utils.root.grid.gridBuild[`${this.utils.root.activeMode}Baddies`].soldiers.splice(index, 1)
      }
    },
    onScreen () {
      const currentSquare = this.currentSquare().block
      const grid = gridBuild.cont
      const leftEdge = -currentSquare.x - this.blockWidth
      const topEdge = -currentSquare.y - this.blockHeight
      const rightEdge = this.utils.canvasWidth - currentSquare.x
      const bottomEdge = this.utils.canvasHeight - currentSquare.y

      if (
        grid.x > leftEdge &&
                grid.x < rightEdge &&
                grid.y > topEdge &&
                grid.y < bottomEdge &&
                 this.body.alpha
      ) {
        if (!this.body.playing) this.body.play()
        return true
      }
      if (this.body.playing) this.body.stop()
      return false
    },
    currentSquare () {
      this.blockWidth = Config[`${this.utils.root.activeMode}BlockSize`][0]
      this.blockHeight = Config[`${this.utils.root.activeMode}BlockSize`][1]

      const globalPoint = this.cont.toGlobal(this.body)

      const iVal = Math.floor((globalPoint.y - gridBuild.cont.y) / this.blockHeight)
      const jVal = Math.floor((globalPoint.x - gridBuild.cont.x) / this.blockWidth)

      return { block: gridBuild.blocks[iVal][jVal], i: iVal, j: jVal }
    },
    getModifiedHeroPoint () {
      this.heroPoint = { x: this.utils.canvasWidth / 2, y: this.utils.canvasHeight / 2 }
      return gridBuild.cont.toLocal(this.heroPoint, this.utils.stage)
    },
    calculateDestPoint () {
      // dest point should be the dragon]
      const currentSquare = this.currentSquare()
      // let i = currentSquare.i;
      // let j = currentSquare.j;

      const rightEdge = currentSquare.block.x + this.blockWidth - this.buffer
      const leftEdge = currentSquare.block.x + this.buffer
      const bottomEdge = currentSquare.block.y + this.blockHeight - this.buffer
      const topEdge = currentSquare.block.y + this.buffer

      if (
        (currentSquare.block.right && currentSquare.block.right.covered && this.body.x > rightEdge) ||
                (currentSquare.block.left && currentSquare.block.left.covered && this.body.x < leftEdge) ||
                (currentSquare.block.above && currentSquare.block.above.covered && this.body.y < topEdge) ||
                (currentSquare.block.below && currentSquare.block.below.covered && this.body.y > bottomEdge)) {
        // console.log(' HIT');
        this.towardsDragon = false
        this.alreadyBeenToAWall = true
      }

      if (this.towardsDragon) {
        return this.getModifiedHeroPoint()
      }
      const xDiff = Math.floor(Math.abs(this.body.x - this.body.startX))
      const yDiff = Math.floor(Math.abs(this.body.y - this.body.startY))
      if (xDiff < this.buffer && yDiff < this.buffer && this.alreadyBeenToAWall) {
        this.towardsDragon = true
      }
      return { x: this.body.startX, y: this.body.startY }
    },
    addToStage () {
      this.startSquare = this.currentSquare()
      this.cont.addChild(this.body)
      this.cont.addChild(this.spear)
    },
    removeFromStage () {
      this.spearThrowing = false
      this.spearCounter = 0
      this.throw = false
      this.spear.classRef.reset()
      this.cont.removeChild(this.body)
      this.cont.removeChild(this.spear)
    },
    resize () {

    },
    resetSpear () {
      this.spearCounter = 0
      this.throw = false
      this.spearThrowing = false
    },
    animate () {
      if (this.onScreen()) {
        this.destPoint = this.calculateDestPoint()

        const dx = this.destPoint.x - this.body.x
        const dy = this.destPoint.y - this.body.y

        const angle = Math.atan2(dy, dx)
        this.vx = Math.cos(angle) * this.speed
        this.vy = Math.sin(angle) * this.speed
        // this only happen if it isn't touching a blocked box
        this.body.x += this.vx
        this.body.y += this.vy
        // console.log(Math.floor(this.body.x), Math.floor(this.body.y))

        if (this.spearCounter < 10) {
          this.spearCounter++
        } else {
          this.spearThrowing = true
          if (!this.throw) {
            this.throw = true
            this.spear.originalTarget = this.getModifiedHeroPoint()
            const dx2 = this.spear.dx2 = this.getModifiedHeroPoint().x - this.spear.x
            const dy2 = this.spear.dy2 = this.getModifiedHeroPoint().y - this.spear.y
            const angle2 = Math.atan2(dy2, dx2)
            this.spear.angle = angle2
          }
        }
        if (!this.spearThrowing) {
          this.spear.x = this.body.x
          this.spear.y = this.body.y
        } else {
          this.spear.vx = Math.cos(this.spear.angle) * this.spearSpeed
          this.spear.vy = Math.sin(this.spear.angle) * this.spearSpeed
          this.spear.x += this.spear.vx
          this.spear.y += this.spear.vy
          // console.log(Math.floor(this.spear.x), Math.floor(this.spear.y))
          this.spear.rotation = this.spear.angle

          const xDiff = Math.floor(Math.abs(this.spear.originalTarget.x - this.spear.x))
          const yDiff = Math.floor(Math.abs(this.spear.originalTarget.y - this.spear.y))

          if (xDiff < this.buffer && yDiff < this.buffer) {
            this.resetSpear()
            this.utils.hero.activeHero.hit()
          }
        }

        this.body.rotation = angle + this.utils.deg2rad(90)
        return this.onScreen()
        // return this.body; //this is so we have a count of who is on screen
      }
    }
  }
}
