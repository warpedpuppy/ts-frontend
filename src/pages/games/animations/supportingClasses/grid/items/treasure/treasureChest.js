import Assets from '../../../../utils/assetCreation'
import Utils from '../../../../utils/utils'
import TreasureAnimation from './treasureAnimation'

export default function TreasureChest() {
  return {
    chests: [],
    utils: Utils,
    hit: false,
    activeChest: undefined,
    line: undefined,
    radialQ: undefined,
    radialCont: Assets.Container(),
    ringCont: Assets.Container(),
    radials: [],
    gravity: 0.3,
    counter: 0,
    bounce: 0.8,
    animationLimit: 200,
    vys: [-10, -1],
    vxs: [-8, 8],
    fallSpeeds: [2, 4],
    edgeBuffer: 200,
    animationHappening: false,
    treasureAnimation: TreasureAnimation,
    init () {
      this.build()
    },
    build () {
      const c = this.c = Assets.Sprite('treasureChest.png')
      c.scale.set(this.utils.randomNumberBetween(0.75, 0.85))
      c.anchor.set(0.5)
      c.name = 'treasureChest'
      c.fallSpeed = this.utils.randomNumberBetween(this.fallSpeeds[0], this.fallSpeeds[1])
      c.classRef = this
      c.variance = this.utils.deg2rad(this.utils.randomNumberBetween(5, 20))
      c.rotateSpeed = this.utils.randomNumberBetween(0.006, 0.0075)
      return c
    },
    playAnimation (activeChest) {
      // this.animationHappening = true;
      this.treasureAnimation.playAnimation(activeChest)
    },
    animateSpecial () {
      this.treasureAnimation.animateSpecial()
    },
    animate () {
      this.c.rotation = this.utils.cosWave(0, this.c.variance, this.c.rotateSpeed)
    }
  }
}
