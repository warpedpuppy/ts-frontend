import Assets from '../../../utils/assetCreation'

export default function BaddyHouse(gridBuild) {
  return {
    init () {
      this.c = Assets.Sprite('castle.png')
      this.c.anchor.set(0.5)
      // this.c.scale.set(0.25);
      this.c.classRef = this
      return this.c
    },
    addToStage () {
      gridBuild.cont.addChild(this.c)
    },
    removeFromStage () {
      gridBuild.cont.removeChild(this.c)
    },
    resize () {
    },
    animate () {
    }
  }
}
