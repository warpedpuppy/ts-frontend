import Assets from '../../../../utils/assetCreation'
import Utils from '../../../../utils/utils'
import Config from '../../../../animationsConfig'
import TreasureAnimation from './treasureAnimation'
import TreasureChest from './treasureChest'

export default function Treasure() {
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
    treasureAnimation: TreasureAnimation(),
    init () {
      this.treasureAnimation.init()
    },
    createAndReturnChests (q) {
      this.chestQ = q
      const arr = []
      for (let i = 0; i < this.chestQ; i++) {
        const chest = TreasureChest().build()
        if (this.utils.root.isMobileOnly) {
          chest.scale.set(Config.mobileOnlyScaling)
        }
        arr.push(chest)
      }
      return arr
    },
    playAnimation (activeChest) {
      // this.animationHappening = true;
      this.treasureAnimation.playAnimation(activeChest)
    },
    animateSpecial () {
      this.treasureAnimation.animateSpecial()
    },
    animate () {
      for (let i = 0; i < this.utils.root.grid[`${this.utils.root.activeMode}TreasureChests`]; i++) {
        const c = this.utils.root.grid[`${this.utils.root.activeMode}TreasureChests`][i]
        c.rotation = this.utils.cosWave(this.utils.deg2rad(0), this.utils.deg2rad(c.variance), c.rotateSpeed)
      }
    }
  }
}
