import Assets from '../../../utils/assetCreation'
import Utils from '../../../utils/utils'

export default function () {
  return {
    cont: Assets.Container(),
    items: [],
    itemQ: 100,
    utils: Utils,
    counter: 0,
    totalSeconds: 3,
    explosionBoolean: false,
    init () {
      for (let i = 0; i < this.itemQ; i++) {
        const item = Assets.Sprite('star.png')
        item.anchor.set(0.5)
        item.tint = 0xFFFF00
        item.scale.set(this.utils.randomNumberBetween(0.25, 0.75))
        item.rotateQ = this.utils.deg2rad(this.utils.randomNumberBetween(-5, 5))
        item.q = this.utils.randomNumberBetween(-50, 50)
        this.cont.addChild(item)
        this.items.push(item)
      }
    },
    setMaxScaleHandler () {

    },
    start () {
      this.items.forEach((item) => {
        item.x = item.y = 0
      })
      this.counter = 0
      this.timeLimit = this.totalSeconds * 60
      this.cont.x = this.utils.canvasWidth / 2
      this.cont.y = this.utils.canvasHeight / 2
      this.utils.app.stage.addChild(this.cont)
      this.explosionBoolean = true
    },
    removeFromStage () {
      this.utils.app.stage.removeChild(this.cont)
    },
    resize () {

    },
    animate () {
      this.counter++
      if (this.counter >= this.timeLimit) {
        this.explosionBoolean = false
      }
      this.items.forEach((item, i) => {
        item.alpha -= 0.01
        item.rotation += item.rotateQ
        item.x += item.q * Math.cos((2 * Math.PI) * i / this.itemQ)
        item.y += item.q * Math.sin((2 * Math.PI) * i / this.itemQ)
      })
    }
  }
}
