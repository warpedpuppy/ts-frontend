import { isMobileOnly } from 'react-device-detect'
import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'

export default function ControlPanel() {
  return {
    utils: Utils,
    height: 35,
    borderWidth: 2,
    buffer: 10,
    init (parent) {
      this.height = (!isMobileOnly) ? this.height : 30
      this.leftRightWidth = this.height * 2
      this.halfLeftRightWidth = this.leftRightWidth / 2

      this.halfHeight = this.height / 2
      this.parent = parent
      this.parentCont = parent.stage
      this.uiCont = Assets.Container()

      this.leftButton = Assets.Graphics()
      this.leftButton.lineStyle(this.borderWidth, 0xFFFFFF, 1).beginFill(0xFFFF00).drawRoundedRect(
        -this.halfLeftRightWidth,
        -this.halfHeight,
        this.leftRightWidth,
        this.height, 10
      ).endFill()
      this.leftButton.interactive = true
      this.leftButton.buttonMode = true
      // dthis.leftButton.x = 10;
      this.leftButton.pointerdown = parent.keyHandler.leftHit
      this.leftButton.pointerup = parent.keyHandler.keyRelease
      this.uiCont.addChild(this.leftButton)

      this.rightButton = Assets.Graphics()
      this.rightButton.lineStyle(this.borderWidth, 0xFFFFFF, 1).beginFill(0xFFFF00).drawRoundedRect(
        -this.halfLeftRightWidth,
        -this.halfHeight,
        this.leftRightWidth,
        this.height, 10
      ).endFill()
      this.rightButton.interactive = true
      this.rightButton.buttonMode = true
      this.rightButton.pointerdown = parent.keyHandler.rightHit
      this.rightButton.pointerup = parent.keyHandler.keyRelease
      this.uiCont.addChild(this.rightButton)

      this.spaceButton = Assets.Graphics()
      const width = this.utils.canvasWidth - (this.leftRightWidth * 4)
      const halfWidth = width / 2

      this.spaceButton.lineStyle(this.borderWidth, 0xFFFFFF, 1).beginFill(0xFF0000).drawRoundedRect(
        -halfWidth,
        -this.halfHeight,
        width,
        this.height,
        10
      ).endFill()
      this.spaceButton.interactive = true
      this.spaceButton.buttonMode = true
      this.spaceButton.pointerdown = parent.keyHandler.spaceHit
      this.spaceButton.pointerup = parent.keyHandler.keyRelease

      this.leftButton.x = -halfWidth - this.halfHeight - 30
      this.rightButton.x = halfWidth + this.halfHeight + 30

      this.uiCont.addChild(this.spaceButton)
      this.place()
    },
    place () {
      this.uiCont.x = this.utils.canvasWidth / 2

      if (isMobileOnly) {
        this.uiCont.y = this.utils.canvasHeight - (this.height / 2) - 1

        const width = this.utils.canvasWidth - (this.leftRightWidth * 3)
        const halfWidth = width / 2

        this.spaceButton.clear()
        this.spaceButton.lineStyle(this.borderWidth, 0xFFFFFF, 1).beginFill(0xFF0000).drawRoundedRect(
          -halfWidth,
          -this.halfHeight,
          width,
          this.height,
          10
        ).endFill()

        this.leftButton.x = -(this.utils.canvasWidth / 2) + this.leftRightWidth / 2 + 1
        this.rightButton.x = (this.utils.canvasWidth / 2) - this.leftRightWidth / 2 - 1
      } else {
        this.uiCont.y = this.utils.canvasHeight - this.height - this.buffer

        const width = this.utils.canvasWidth - (this.leftRightWidth * 4)
        const halfWidth = width / 2

        this.spaceButton.clear()
        this.spaceButton.lineStyle(this.borderWidth, 0xFFFFFF, 1).beginFill(0xFF0000).drawRoundedRect(
          -halfWidth,
          -this.halfHeight,
          width,
          this.height,
          10
        ).endFill()

        this.leftButton.x = -halfWidth - this.halfHeight - 30
        this.rightButton.x = halfWidth + this.halfHeight + 30
      }
    },
    addToStage () {
      this.parentCont.addChild(this.uiCont)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.uiCont)
    },
    resize () {
      this.place()
    },
    animate () {

    }
  }
}
