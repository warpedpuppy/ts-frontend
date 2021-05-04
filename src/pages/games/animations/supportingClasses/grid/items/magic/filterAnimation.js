import Assets from '../../../../utils/assetCreation'
import Utils from '../../../../utils/utils'

export default function FilterAnimation() {
  return {
    app: undefined,
    count: 0,
    enabled: false,
    utils: Utils,
    init (container) {
      this.app = this.utils.app
      const filter = this.filter = Assets.ColorFilter()
      this.wh = this.utils.wh

      container.x = this.wh.canvasWidth / 2
      container.y = this.wh.canvasHeight / 2

      const light2 = this.light2 = Assets.Sprite('/radial_1.png')
      light2.visible = false
      light2.anchor.set(0.5)
      container.addChild(light2)

      const light1 = this.light1 = Assets.Sprite('/radial_2.png')
      light1.visible = false
      light1.anchor.set(0.5)
      container.addChild(light1)

      const light3 = this.light3 = Assets.Sprite('/radial_3.png')
      light3.visible = false
      light3.anchor.set(0.5)
      container.addChild(light3)

      this.utils.app.stage.addChild(container)
      this.utils.app.stage.filters = [filter]

      this.container = container
    },
    resize (wh) {
      this.wh = wh
      this.container.x = this.wh.canvasWidth / 2
      this.container.y = this.wh.canvasHeight / 2
    },
    filterToggle () {
      this.enabled = !this.enabled
      this.app.stage.filters = this.enabled ? [this.filter] : null
      this.light1.visible = !this.light1.visible
      this.light2.visible = !this.light2.visible
      this.light3.visible = !this.light3.visible
    },
    shutOff () {
      this.enabled = false
      this.app.stage.filters = null
      this.light1.visible = false
      this.light2.visible = false
      this.light3.visible = false
      this.count = 0
    },
    animate () {
      if (this.enabled) {
        this.light1.rotation += 0.02
        this.light2.rotation += 0.01
        this.light3.rotation += 0.03

        this.count += 0.1

        const { matrix } = this.filter

        matrix[1] = Math.sin(this.count) * 3
        matrix[2] = Math.cos(this.count)
        matrix[3] = Math.cos(this.count) * 1.5
        matrix[4] = Math.sin(this.count / 3) * 2
        matrix[5] = Math.sin(this.count / 2)
        matrix[6] = Math.sin(this.count / 4)
        if (this.count > 20) {
          this.shutOff()
        }
      }
    }
  }
}
