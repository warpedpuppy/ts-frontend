import Assets from '../../../utils/assetCreation'

export default function baddyWeapon(gridBuild) {
  return {
    counter: 0,
    counterLimit: 200,
    init (baddy) {
      this.baddy = baddy
      this.spear = Assets.Sprite('spear.png')
      this.spear.anchor.set(0.5)
      // this.spear.width = 50;
      // this.spear.height = 4;
      this.spear.vx = 0
      this.spear.vy = 0
      this.spear.classRef = this
      return this.spear
    },
    disable () {
      this.spear.visible = false
    },
    reenable () {
      this.spear.visible = true
      this.spear.x = this.baddy.x
      this.spear.y = this.baddy.y
      this.counter = 0
    },
    addToStage () {
      gridBuild.cont.addChild(this.spear)
    },
    removeFromStage () {
      gridBuild.cont.removeChild(this.spear)
    },
    reset () {
      this.spear.vx = 0
      this.spear.vy = 0
      this.counter = 0
      this.spear.x = this.spear.y = 0
      this.spear.rotation = 0
    },
    resize () {

    },
    animate () {

    }
  }
}
