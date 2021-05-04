import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
import Config from '../../animationsConfig'

export default function Gears() {
  return {
    gears: [],
    utils: Utils,
    init () {
      let gear
      const corners = this.corners = [
        [0, 0],
        [this.utils.wh.canvasWidth, 0],
        [this.utils.wh.canvasWidth, this.utils.wh.canvasHeight],
        [0, this.utils.wh.canvasHeight]
      ]
      for (let i = 0; i < 4; i++) {
        gear = Assets.Sprite('/gear.png')
        gear.anchor.x = gear.anchor.y = 0.5
        gear.x = corners[i][0]
        gear.y = corners[i][1]
        gear.alpha = 0.15
        gear.rotate = (Math.random() * 0.01) + 0.01
        if (this.utils.isMobileOnly) {
          gear.scale.set(Config.mobileOnlyScaling)
        }
        this.gears.push(gear)
      }
      return this
    },
    addToStage () {
      for (let i = 0; i < 4; i++) {
        this.utils.root.kingCont.addChild(this.gears[i])
      }
    },
    removeFromStage () {
      for (let i = 0; i < 4; i++) {
        this.utils.app.stage.removeChild(this.gears[i])
      }
    },
    resize () {
      const corners = this.corners = [
        [0, 0],
        [this.utils.wh.canvasWidth, 0],
        [this.utils.wh.canvasWidth, this.utils.wh.canvasHeight],
        [0, this.utils.wh.canvasHeight]
      ]
      for (let i = 0; i < this.gears.length; i++) {
        const gear = this.gears[i]
        gear.x = corners[i][0]
        gear.y = corners[i][1]
      }
    },
    animate () {
      for (let i = 0; i < 4; i++) {
        this.gears[i].rotation += this.gears[i].rotate
      }
    }
  }
}
