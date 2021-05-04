import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'

const LoadingAnimation = {
  interval: undefined,
  shapes: [],
  counter: 0,
  testInterval (stage) {
    this.counter++
    const testShape = (this.counter % 2 === 0)
      ? Assets.Sprite('swimVortex.png')
      : Assets.Sprite('fireSpiral.png')
    const size = Utils.randomNumberBetween(0.05, 0.5)
    const alpha = Utils.randomNumberBetween(0.1, 1)
    testShape.x = Utils.randomNumberBetween(0, Utils.canvasWidth)
    testShape.y = Utils.randomNumberBetween(0, Utils.canvasHeight)
    testShape.scale.set(size)
    testShape.alpha = alpha
    this.shapes.push(testShape)
    stage.addChild(testShape)
    testShape.anchor.set(0.5)
    this.shapes.forEach((item) => {
      item.rotation += 0.05
    })
  },
  start (stage) {
    this.interval = setInterval(this.testInterval.bind(this, stage), 1)
  },
  stop (stage) {
    this.shapes.forEach((item) => {
      stage.removeChild(item)
    })
    this.shapes = []
    clearInterval(this.interval)
  }
}
export default LoadingAnimation;