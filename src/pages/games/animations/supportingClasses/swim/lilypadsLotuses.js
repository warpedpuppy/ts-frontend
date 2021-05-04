import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'

export default function LilypadsLotuses() {
  return {
    array: [],
    utils: Utils,
    cont: Assets.Container(),
    buffer: 10,
    init (parentCont) {
      this.parentCont = parentCont
      this.wh = this.utils.wh
      this.strs = [
        ['lilyPad2.png', 178],
        ['lilypad1.png', 211]
      ]
      this.loopingQ = 6

      for (let i = 0; i < this.loopingQ; i++) {
        const t = this.utils.randomItemFromArray(this.strs)
        const s1 = Assets.Sprite(t[0])

        s1.anchor.set(0.5)
        s1.x = this.utils.randomNumberBetween(0, this.wh.canvasWidth)
        s1.y = this.utils.randomNumberBetween(0, this.wh.canvasHeight)

        s1.radius = s1.r = t[1] / 2
        s1.vx = this.utils.randomNumberBetween(-1, 1)
        s1.vy = this.utils.randomNumberBetween(-1, 1)
        s1.rotate = this.utils.randomNumberBetween(-1, 1)
        this.cont.addChild(s1)
        this.array.push(s1)
      }
      this.utils.setLilypads(this)
    },
    addToStage () {
      const index = 0// this.utils.app.kingCont.getChildIndex(this.utils.hero.cont)+1;
      this.parentCont.addChildAt(this.cont, index)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.cont)
    },

    animate () {
      for (const ball of this.array) {
        this.utils.updateLeaveScreen(ball)
        for (const ball2 of this.array) {
          if (ball !== ball2) {
            const collision = this.utils.circleToCircleCollisionDetection(ball, ball2)
            if (collision[0]) {
              this.utils.adjustPositions(ball, ball2, collision[1])
              this.utils.resolveCollision(ball, ball2)
            }
          }
        }
      }
    }

  }
}
