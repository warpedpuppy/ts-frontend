import Utils from '../../utils/utils'

export default function JumpResize() {
  return {
    utils: Utils,
    timeOut: undefined,
    resizeBundle () {
      const { root } = this.utils
      root.clock.resize()
      root.gears.resize()
      root.hero.resize()
      root.jump.resize()
      // root.fpsCounter.x = root.utils.canvasWidth - 75;
      if (root.isMobile) {
        root.controlPanel.resize()
      }
    },
    resizeHandler () {
      const { root } = this.utils

      this.canvasWidth = this.utils.returnCanvasWidth()
      this.canvasHeight = this.utils.returnCanvasHeight()

      this.utils.resize(this.canvasWidth, this.canvasHeight)

      this.resizeBundle()

      root.app.renderer.resize(this.canvasWidth, this.canvasHeight)

      root.action = false

      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
      this.timeOut = setTimeout(this.resized.bind(this), 200)
    },
    resized () {
      const { root } = this.utils
      root.action = true
      clearTimeout(this.timeOut)
    }
  }
}
