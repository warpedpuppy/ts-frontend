import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'

export default function Ripples() {
  return {
    ripples: [],
    growing: [],
    action: true,
    utils: Utils,
    init () {
      this.wh = this.utils.wh

      this.parent = Assets.Container()
      this.parent.width = this.wh.canvasWidth
      this.parent.height = this.wh.canvasHeight

      this.app = this.utils.app

      this.totalSprites = Assets.webgl ? 10 : 10

      const sprites = this.sprites = Assets.ParticleContainer(this.totalSprites)

      this.parent.addChild(sprites)

      for (let i = 0; i < this.totalSprites; i++) {
        const ring = Assets.Sprite('gradientRing.png')
        ring.anchor.x = ring.anchor.y = 0.5
        ring.startScale = 0.1
        ring.scale.set(ring.startScale)
        ring.counter = 0
        this.ripples.push(ring)
        sprites.addChild(ring)
      }
      // create a bounding box box for the little maggots
      const ringBoundsPadding = 100
      this.ringBounds = {
        x: -ringBoundsPadding,
        y: -ringBoundsPadding,
        width: this.canvasWidth + ringBoundsPadding * 2,
        height: this.canvasHeight + ringBoundsPadding * 2
      }

      this.tick = 0
      this.utils.app.stage.interactive = true
      this.mouseMove = this.mouseMove.bind(this)

      this.counter = 0
      this.opc = 0

      this.gradient = Assets.Sprite('/gradient.png')
      this.gradient.alpha = 0.5
      this.gradient.anchor.set(0.5)
    },
    on (boolean) {
      if (boolean) {
        // start ripples
        this.app.stage.interactive = true
        this.app.stage.addChild(this.parent)
        this.app.stage.pointermove = this.mouseMove
        this.app.stage.addChild(this.gradient)
      } else {
        // end ripples
        this.app.stage.interactive = false
        this.app.stage.removeChild(this.parent)
        this.app.stage.pointermove = null
        this.app.stage.removeChild(this.gradient)
      }
    },
    pause (boolean) {
      if (boolean) {
        this.action = !boolean
      } else {
        this.action = !boolean
      }
    },
    grow (ripple) {
      ripple.scale.x += 0.0075
      ripple.scale.y += 0.0075
      ripple.counter++
      if (ripple.alpha > 0)ripple.alpha -= 0.01

      if (ripple.counter >= 100) {
        this.reset(ripple)
        ripple.scale.x = 0.01
        ripple.scale.y = 0.01
        this.growing.splice(this.growing.indexOf(ripple), 1)
      }
    },
    reset (ripple) {
      ripple.counter = 0
      ripple.alpha = 1
    },
    animate () {
      for (let i = 0; i < this.growing.length; i++) {
        this.grow(this.growing[i], i)
      }
    },
    mouseMove (e) {
      if (!this.action) return
      this.counter++
      const pos = e.data.global
      if (this.counter % 10 === 0) {
        if (this.growing.indexOf(this.ripples[this.opc]) !== -1) return

        // this.ripples[this.opc].tint = Math.random() * 0xE8D4CD;
        this.ripples[this.opc].x = pos.x
        this.ripples[this.opc].y = pos.y
        this.ripples[this.opc].alpha = 0.75
        this.growing.push(this.ripples[this.opc])
        this.opc++
        if (this.opc > this.totalSprites - 1) {
          this.opc = 0
        }
        this.counter = 0
      }

      this.gradient.x = pos.x
      this.gradient.y = pos.y
    }
  }
}
