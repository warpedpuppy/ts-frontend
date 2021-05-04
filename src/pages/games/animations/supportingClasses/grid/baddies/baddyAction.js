import Utils from '../../../utils/utils'

export default function BaddyAction() {
  return {
    utils: Utils,
    hit () {
      if (this.health < 0) {
        this.body.alpha = 0
        this.spear.alpha = 0
      } else {
        this.health--
      }
    },
    setVars (soldiers, spears, gridBuild) {
      this.soldiers = soldiers
      this.spears = spears
      this.grid = gridBuild
    },
    animate () {
      this.onScreenSoldiers = []
      for (let i = 0; i < this.soldiers.length; i++) {
        const s = this.soldiers[i]

        const onScreen = s.classRef.animate()
        if (onScreen) {
          this.onScreenSoldiers.push(s)

          // prevent overlap
          for (let j = 0; j < this.soldiers.length; j++) {
            const s2 = this.soldiers[j]
            if (s2.classRef.onScreen()) {
              const hit = this.utils.circleToCircleCollisionDetection(s, s2)
              if (hit[0]) {
                this.utils.adjustPositions(s, s2, hit[1])
              }
            }
          }
        }
      }
    }
  }
}
