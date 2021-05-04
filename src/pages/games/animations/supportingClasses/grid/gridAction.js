import Utils from '../../utils/utils'
import Tweens from '../../utils/Tweens'
import Config from '../../animationsConfig'

export default function GridAction() {
  return {
    utils: Utils,
    colQ: 4,
    rowQ: 10,
    buffer: 10,
    pause: false,
    wallHit: 0,
    itemLoopingQ: 0,
    init () {
      this.blockWidth = Config[`${this.utils.root.activeMode}BlockSize`][0]
      this.blockHeight = Config[`${this.utils.root.activeMode}BlockSize`][1]

      this.magicPillsArray = this.utils.root.grid.magicPillsArray
      this.transitionItemsArray = this.utils.root.grid.transitionItemsArray
      this.flyTreasureChests = this.utils.root.grid.flyTreasureChests
      this.swimTreasureChests = this.utils.root.grid.swimTreasureChests
      this.treasure = this.utils.root.grid.treasure
      this.swimBaddies = this.utils.root.grid.gridBuild.swimBaddies
      this.flyBaddies = this.utils.root.grid.gridBuild.flyBaddies
      this.blocks = this.utils.root.grid.gridBuild.blocks
      this.gridBuild = this.utils.root.grid.gridBuild
      this.spaceShip = this.gridBuild.spaceShip
      this.microscope = this.gridBuild.microscope

      // this.omnibusArray = this.gridBuild.omnibusArray;

      this.itemLoopingQ = Math.max(
        this.magicPillsArray.length,
        this.transitionItemsArray.length,
        this.flyTreasureChests.length,
        this.swimTreasureChests.length
      )

      this.heroCollisionDetector = {
        x: this.utils.canvasWidth / 2,
        y: this.utils.canvasHeight / 2,
        radius: 10
      }

      this.setLimits()
    },
    currentSquare () {
      const halfCanvasWidth = (this.utils.canvasWidth / 2)
      const halfCanvasHeight = (this.utils.canvasHeight / 2)
      const iVal = Math.floor((halfCanvasHeight - this.gridBuild.cont.y) / this.blockHeight)
      const jVal = Math.floor((halfCanvasWidth - this.gridBuild.cont.x) / this.blockWidth)
      const { blocks } = this.utils.root.grid.gridBuild
      this.glow(iVal, jVal)
      return { block: blocks[iVal][jVal], i: iVal, j: jVal }
    },
    glow (i, j) {
      if (this.glow.obj === undefined) {
        this.glow.obj = { i: 1, j: 1 }
      }
      if (i !== this.glow.obj.i || j !== this.glow.obj.j) {
        const { blocks } = this.utils.root.grid.gridBuild
        const currentBlock = blocks[this.glow.obj.i][this.glow.obj.j]
        Tweens.tween(currentBlock, 0.15, { alpha: [0.75, 0.25] })
        const ninetyDegrees = this.utils.deg2rad(90)
        Tweens.tween(currentBlock.gridCircle, 3, { rotation: [ninetyDegrees, 0] },
          undefined, 'easeOutBounce')

        const newBlock = blocks[i][j]
        Tweens.tween(newBlock, 0.15, { alpha: [0.25, 0.75] })
        Tweens.tween(newBlock.gridCircle, 3, { rotation: [0, ninetyDegrees] },
          undefined, 'easeOutElastic')
        this.glow.obj = { i, j }
      }
    },
    createBoundaries (currentSquare) {
      const { i } = currentSquare
      const { j } = currentSquare

      const { above } = currentSquare.block
      const { right } = currentSquare.block
      const { below } = currentSquare.block
      const { left } = currentSquare.block

      // console.log(above.covered, right.covered, left.covered, below.covered)

      if (!above || above.covered) {
        this.topBorder = this.topEdge - (this.blockHeight * i)
      } else {
        this.topBorder = this.topEdge
      }
      if (!below || below.covered) {
        this.bottomBorder = ((i + 1) * this.blockHeight) - this.topEdge
      } else {
        this.bottomBorder = this.bottomEdge
      }
      if (!right || right.covered) {
        this.rightBorder = ((j + 1) * this.blockWidth) - this.leftEdge
      } else {
        this.rightBorder = this.rightEdge
      }
      if (!left || left.covered) {
        this.leftBorder = this.leftEdge - (j * this.blockWidth)
      } else {
        this.leftBorder = this.leftEdge
      }
    },
    setLimits () {
      // console.log("here = ", this.utils.root.grid.boards[this.utils.root.grid.gridBuild.currentBoard])
      this.blockWidth = Config[`${this.utils.root.activeMode}BlockSize`][0]
      this.blockHeight = Config[`${this.utils.root.activeMode}BlockSize`][1]

      this.colQ = this.utils.root.grid.gridBuild.currentBoard.c
      this.rowQ = this.utils.root.grid.gridBuild.currentBoard.r

      this.boardWidth = this.colQ * this.blockWidth
      this.boardHeight = this.rowQ * this.blockHeight
      this.leftBorder = this.leftEdge = (this.utils.canvasWidth / 2)
      this.topBorder = this.topEdge = (this.utils.canvasHeight / 2)

      this.rightBorder = this.rightEdge = this.boardWidth - this.leftEdge
      this.bottomBorder = this.bottomEdge = this.boardHeight - this.topBorder

      this.heroCollisionDetector = {
        x: this.utils.canvasWidth / 2,
        y: this.utils.canvasHeight / 2,
        radius: 10
      }
    },
    itemHitDetect (item) {
      const globalPoint = this.gridBuild.cont.toGlobal(item)
      const ballB = {
        x: globalPoint.x,
        y: globalPoint.y,
        radius: 30
      }
      const x = this.utils.circleToCircleCollisionDetection(this.heroCollisionDetector, ballB)
      return x[0]
    },
    animate (vx, vy) {
      if (this.treasure.animationHappening) {
        this.treasure.animateSpecial()
      } else {
        this.treasure.animate()
      }

      if (this.pause) return

      if (this.utils.root.all) {
        this.gridBuild.vortexes.vortexArray.forEach((v) => {
          v.vortex.rotation += v.vortex.rotationQ
          const gp = this.gridBuild.cont.toGlobal(v.item)
          const { x } = gp
          const { y } = gp
          const x2 = gp.x - this.gridBuild.blockWidth / 2
          const y2 = gp.y - this.gridBuild.blockHeight / 2
          v.vortex.x = x
          v.vortex.y = y
          v.mask.clear()
          v.mask.beginFill(0xFF3300).drawRect(x2, y2, this.blockWidth, this.blockHeight).endFill()
        })
      }

      this[`${this.utils.root.activeMode}Baddies`].animate()

      // keeping this out of the above loop because items will continue being added and subtracted from it
      this.gridBuild.coins.onGridCoins[this.utils.root.activeMode].forEach((item, index) => {
        item.x = this.utils.cosWave(item.startPointX, item.differential, item.speed)
        item.y = this.utils.cosWave(item.startPointY, item.differential, item.speed)

        if (this.itemHitDetect(item)) {
          if (item.hit !== true) {
            // console.log("COIN HIT")
            item.hit = true
            // remove item from stage
            item.parent.removeChild(item)

            // splice from array
            this.gridBuild.coins.onGridCoins[this.utils.root.activeMode].splice(index, 1)
          }
        }
      })

      this.gridBuild.omnibusArray.forEach((item, i) => {
        if (this.itemHitDetect(item)) {
          this.utils.root.filterAnimation.shutOff()
          if ((item.name === 'swim' || item.name === 'fly' || item.name === 'bounce') && !item.hit) {
            item.hit = true
            this.utils.root.switchPlayerWithAnimation(item.name)
          } else if (item.name === 'magicPill' && !this.utils.root.filterAnimation.enabled) {
            this.utils.root.filterTest()
          } else if (item.name === 'treasureChest' && !this.treasure.animationHappening) {
            this.treasure.activeChest = item
            this.treasure.playAnimation(this.treasure.activeChest)
            // this.treasure.removeChest(i);
            this.gridBuild.omnibusArray.splice(i, 1)
            const index = this[`${this.utils.root.activeMode}TreasureChests`].indexOf(item)
            this[`${this.utils.root.activeMode}TreasureChests`].splice(index, 1)
          } else if (item.name === 'token') {
            if (this.utils.root.all) {
              if (item.mode === this.utils.root.activeMode) {
                this.gridBuild.cont.removeChild(item)
                this.utils.root.tokens.earnToken(item)
              } else {
                this.utils.root.tokens.wrongTokenAnimation(item)
              }
            } else {
              this.gridBuild.cont.removeChild(item)
              this.utils.root.tokens.earnToken(item)
            }
          } else if (item.name === 'spaceship') {
            console.log('spaceshit hit')
            this.pause = true
            this.spaceShip.classRef.blastOff()
          }
        }

        if (item.name === 'magicPill' ||
                    item.name === 'swim' ||
                    item.name === 'fly' ||
                    item.name === 'treasureChest'
        ) {
          if (item.counter >= item.counterLimit && !item.isTweening) {
            item.isTweening = true
            this.gridBuild.gridItems.moveItem1(item)
          } else {
            if (item.name === 'treasureChest') {
              // console.log(item)
              item.classRef.animate()
            }
            item.counter++
          }
        }
      })

      this.storeCurrent = this.currentSquare()
      this.createBoundaries(this.storeCurrent)

      this.gridBuild.cont.x -= vx
      if (this.gridBuild.cont.x > this.leftBorder) {
        this.gridBuild.cont.x -= this.buffer
        this.utils.root.activeAction.vx *= this.gridBuild.wallHit
      }
      if (this.gridBuild.cont.x < -this.rightBorder) {
        this.gridBuild.cont.x += this.buffer
        this.utils.root.activeAction.vx *= this.gridBuild.wallHit
      }

      this.gridBuild.cont.y -= vy
      if (this.gridBuild.cont.y > this.topBorder) {
        this.gridBuild.cont.y = this.topBorder - this.buffer
        this.utils.root.activeAction.vy *= this.gridBuild.wallHit
      }

      if (this.gridBuild.cont.y < -this.bottomBorder + this.buffer) {
        this.gridBuild.cont.y = -this.bottomBorder + this.buffer
        this.utils.root.activeAction.vy *= this.gridBuild.wallHit
      }
    }
  }
}
