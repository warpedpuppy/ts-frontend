import Utils from './utils'
import Config from '../animationsConfig'

export default function OrientationChange() {
  return {
    utils: Utils,
    testForHeight: false,
    iPadWidthAdjustment: 0.90,
    iPadHeightAdjustment: 0.90,
    init (parent) {
      this.parent = parent
      this.orientationChangeHandler = this.orientationChangeHandler.bind(this)
      window.addEventListener('orientationchange', this.orientationChangeHandler)
    },
    makeLandscape () {
      let val1; let
        val2
      if (this.utils.root.isMobileOnly) {
        val1 = Config.mobileOnlyDimensionsLandscape[0]
        val2 = Config.mobileOnlyDimensionsLandscape[1]
      } else {
        val1 = this.utils.returnCanvasWidth() * this.iPadWidthAdjustment
        val2 = this.utils.returnCanvasHeight() * this.iPadHeightAdjustment
      }

      this.canvasWidth = Math.max(val1, val2)
      this.canvasHeight = Math.min(val1, val2)
      this.utils.setWidthAndHeight(this.canvasWidth, this.canvasHeight)

      if (this.utils.isMobile && this.utils.root.mobileMask) {
        this.utils.root.mobileMask.setMask()
      }
    },
    makePortrait () {
      let val1; let
        val2
      if (this.utils.root.isMobileOnly) {
        val1 = Config.mobileOnlyDimensionsLandscape[0]
        val2 = Config.mobileOnlyDimensionsLandscape[1]
      } else {
        val1 = this.utils.returnCanvasWidth() * this.iPadWidthAdjustment
        val2 = this.utils.returnCanvasHeight() * this.iPadHeightAdjustment
      }

      this.canvasWidth = Math.min(val1, val2)
      this.canvasHeight = Math.max(val1, val2)
      this.utils.setWidthAndHeight(this.canvasWidth, this.canvasHeight)

      if (this.utils.isMobile && this.utils.root.mobileMask) {
        this.utils.root.mobileMask.setMask()
      }
    },
    determinePortraitOrLandscape () {
      this.testWidth = this.utils.returnCanvasWidth()
      this.testHeight = this.utils.returnCanvasHeight()

      if (this.testHeight < this.testWidth) {
        // landscape
        this.makeLandscape()
      } else {
        // portrait
        this.makePortrait()
      }
      this.utils.setWidthAndHeight(this.canvasWidth, this.canvasHeight)
      this.utils.root.resize.resizeBundle()
      this.utils.root.app.renderer.resize(this.canvasWidth, this.canvasHeight)
      this.utils.root.action = true
    },
    orientationChangeHandler () {
      this.testForHeight = true
    },
    animate () {
      if (this.testForHeight) {
        this.action = false
        this.determinePortraitOrLandscape()
        this.testForHeight = false
      }
    }
  }
}
