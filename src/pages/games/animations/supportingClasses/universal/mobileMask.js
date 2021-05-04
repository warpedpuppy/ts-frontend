import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'

export default function MobileMask() {
  return {
    border: 25,
    frameWidth: 2.5,
    frame: Assets.Graphics(),
    kingContBackground: Assets.Graphics(),
    utils: Utils,
    setMask () {
      this.border = (this.utils.isMobileOnly) ? this.border : 100

      const containerToMask = this.utils.root.kingCont
      const containerToAddFrameTo = this.utils.root.stage
      const { backgroundColor } = this.utils.root
      containerToMask.mask = null

      const mask = Assets.Graphics()
      const halfBorder = this.border / 2
      const maskWidth = this.utils.canvasWidth - this.border
      const maskHeight = this.utils.canvasHeight - this.border
      mask.beginFill(0x000000).drawRect(halfBorder, halfBorder, maskWidth, maskHeight).endFill()
      containerToMask.mask = mask

      this.kingContBackground.clear()
      this.kingContBackground.beginFill(backgroundColor).drawRect(0, 0, this.utils.canvasWidth, this.utils.canvasHeight).endFill()
      containerToMask.addChildAt(this.kingContBackground, 0)

      this.frame.clear()
      const frameBoxWidth = maskWidth + (this.frameWidth * 2)
      const frameBoxHeight = maskHeight + (this.frameWidth * 2)
      const frameX = halfBorder - this.frameWidth
      const frameY = halfBorder - this.frameWidth
      this.frame.beginFill(0x000000).drawRoundedRect(frameX, frameY, frameBoxWidth, frameBoxHeight, 5).endFill()
      containerToAddFrameTo.addChildAt(this.frame, 0)
    }
  }
}
