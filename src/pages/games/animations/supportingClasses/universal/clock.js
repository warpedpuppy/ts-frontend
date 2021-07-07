import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
import Config from '../../animationsConfig'

export default function Clock() {
  return {
    hourToRadians: (1 / 12) * (2 * Math.PI),
    minutesToRadians: (1 / 60) * (2 * Math.PI),
    secondsToRadians: (1 / 60) * (2 * Math.PI),
    cont: Assets.Container(),
    counter: 0,
    demo: false,
    utils: Utils,
    init () {
      this.parentCont = this.utils.root.kingCont
      const hourhand = this.hourhand = Assets.Sprite('/hourhand.png')
      hourhand.anchor.set(0.5)
      // hourhand.tint = 0xFF0000;
      this.cont.addChild(hourhand)

      const minutehand = this.minutehand = Assets.Sprite('/minutehand.png')
      minutehand.anchor.set(0.5)
      // minutehand.tint = 0x000000;
      this.cont.addChild(minutehand)

      const secondhand = this.secondhand = Assets.Sprite('/secondhand.png')
      secondhand.anchor.set(0.5)
      // secondhand.tint = 0xFF00FF;
      this.cont.addChild(secondhand)

      const d = this.d = new Date()
      const h = d.getHours()
      const m = d.getMinutes()
      const s = d.getSeconds()

      hourhand.rotation = h * this.hourToRadians

      minutehand.rotation = m * this.minutesToRadians

      secondhand.rotation = s * this.secondsToRadians

      this.demoH = 12
      this.demoM = 0
      this.demoS = 0

      this.cont.alpha = 0.25
      this.cont.scale.set(0.5)
      this.cont.x = this.utils.canvasWidth / 2
      this.cont.y = this.utils.canvasHeight / 2
      if (this.utils.isMobileOnly) {
        const newScale = this.cont.scale.x * Config.mobileOnlyScaling
        this.cont.scale.set(newScale)
      }

      return this
    },
    addToStage () {
      this.parentCont.addChild(this.cont)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.cont)
    },
    resize () {
      this.cont.x = this.utils.canvasWidth / 2
      this.cont.y = this.utils.canvasHeight / 2
    },
    animate () {
      if (!this.demo) {
        this.counter++
        if (this.counter === 60) {
          const d = new Date()
          const h = d.getHours()
          const m = d.getMinutes()
          const s = d.getSeconds()
          this.hourhand.rotation = h * this.hourToRadians
          this.minutehand.rotation = m * this.minutesToRadians
          this.secondhand.rotation = s * this.secondsToRadians
          this.counter = 0
        }
      } else {
        this.counter++

        if (this.counter) {
          this.secondhand.alpha = 0
          const increment = 30
          this.demoS += increment
          this.hourhand.rotation = this.demoH * this.hourToRadians
          this.minutehand.rotation = this.demoM * this.minutesToRadians
          this.secondhand.rotation = this.demoS * this.secondsToRadians
          this.counter = 0
          if (this.demoS === 60) {
            this.demoS = 0
            this.demoM++
            if (this.demoM === 60) {
              this.demoM = 0
              if (this.demoH === 12) {
                this.demoH = 1
                // toggle day and night
              } else {
                this.demoH++
              }
            }
          }

          // if(this.demoS === 60)this.demoH = 0;
        }
      }
    }
  }
}
