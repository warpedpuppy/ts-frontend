import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
// import Config from './animationsConfig';
export default function TriangleOfCollision() {
  return {
    utils: Utils,
    init () {
      this.testing = Assets.Graphics()
      const startX = 0
      const startY = 0
      const x1 = startX + Math.cos(this.utils.deg2rad(-110)) * this.utils.canvasWidth
      const y1 = startY + Math.sin(this.utils.deg2rad(-110)) * this.utils.canvasWidth
      const x2 = startX + Math.cos(this.utils.deg2rad(-70)) * this.utils.canvasWidth
      const y2 = startY + Math.sin(this.utils.deg2rad(-70)) * this.utils.canvasWidth

      this.testing.clear()
      this.testing.beginFill(0xFF0000)
        .moveTo(startX, startY)
        .lineTo(x1, y1)
        .lineTo(x2, y2)
        .lineTo(startX, startY)
        .endFill()

      this.point1 = Assets.Sprite('slot.png')
      this.point1.anchor.set(0.5)
      this.point1.x = this.point1.y = 0
      this.point1.alpha = 0
      this.utils.hero.activeHero.headCont.addChild(this.point1)

      this.point2 = Assets.Sprite('slot.png')
      this.point2.anchor.set(0.5)
      this.point2.alpha = 0
      this.point2.x = x1
      this.point2.y = y1
      this.utils.hero.activeHero.headCont.addChild(this.point2)

      this.point3 = Assets.Sprite('slot.png')
      this.point3.anchor.set(0.5)
      this.point3.alpha = 0
      this.point3.x = x2
      this.point3.y = y2
      this.utils.hero.activeHero.headCont.addChild(this.point3)

      // this.utils.hero.activeHero.headCont.addChild(this.testing);
      // this.utils.app.stage.addChild(this.testing);
      this.fireHit = this.fireHit.bind(this)
    },
    fireHit () {
      const { onScreenSoldiers } = this.utils.root.grid.gridBuild[`${this.utils.root.activeMode}Baddies`].baddyAction

      const globalPoint1 = this.utils.hero.activeHero.headCont.toGlobal(this.point1)
      const globalPoint2 = this.utils.hero.activeHero.headCont.toGlobal(this.point2)
      const globalPoint3 = this.utils.hero.activeHero.headCont.toGlobal(this.point3)

      if (onScreenSoldiers) {
        onScreenSoldiers.forEach((soldier) => {
          const soldierPoint = this.utils.root.grid.gridBuild.cont.toGlobal(soldier)
          const circle = {
            x: soldierPoint.x,
            y: soldierPoint.y,
            radius: soldier.radius
          }
          if (this.utils.triangleCircleCollision(circle, globalPoint1, globalPoint2, globalPoint3)) {
            // soldier.scale.set(2)
            soldier.classRef.fireHit()
          }
        })
      }
    },
    animateMobile () {

    },
    animateDesktopAndIpad () {

    }
  }
}
