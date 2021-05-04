import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'
// import Castles from './castles';
// import Soldier from './soldiers';
import Clouds from './clouds'
// import Config from '../../animationsConfig';
export default function FlyBackground() {
  return {
    cont: Assets.Container(),
    grassTexture: 'grass.png',
    foreground: Assets.Graphics(),
    utils: Utils,
    colors: [0xFF00FF, 0xFF0000, 0xFFFF00, 0xFF9900, 0x33FF00],
    boltQ: 30,
    timer: undefined,
    flashCounter: 0,
    flashLimits: 10,
    gridIndex: 1,
    sizeIncrement: 1,
    clouds: Clouds(),
    init (parent) {
      this.parent = parent
      this.app = this.utils.app
      this.parentCont = parent.kingCont
      this.hero = this.utils.hero
      this.spritesheet = this.utils.spritesheet
      this.clouds.init(parent.kingCont)
    },
    lightningStorm () {
      this.foreground.visible = true
      this.boltCont.visible = true
      this.timer = setTimeout(this.clearLightening, 40)
    },
    clearLightening () {
      this.foreground.visible = false
      this.boltCont.visible = false
      this.flashCounter++
      if (this.flashCounter < this.flashLimits) {
        this.timer = setTimeout(this.lightningStorm, 40)
      } else {
        this.flashCounter = 0
        this.timer = setTimeout(this.lightningStorm, 1500)
      }
    },
    lightningBoltsBuild () {
      const boltCont = Assets.Container()
      for (let i = 0; i < this.boltQ; i++) {
        let widthStore = 0
        const startX = this.utils.randomNumberBetween(0, this.utils.canvasWidth)
        let storeRot
        let storeHeight
        let storeX
        let storeY
        while (widthStore < this.utils.canvasHeight) {
          const bolt = Assets.Sprite(this.spritesheet.textures['line.png'])
          bolt.height = 5
          bolt.x = storeX = (widthStore === 0) ? startX : storeX + (Math.cos(storeRot) * storeHeight)
          bolt.y = storeY = (widthStore === 0) ? 0 : storeY + (Math.sin(storeRot) * storeHeight)
          bolt.width = storeHeight = this.utils.randomNumberBetween(20, 200)
          bolt.rotation = storeRot = this.utils.deg2rad((this.utils.randomNumberBetween(180, 0)))
          boltCont.addChild(bolt)
          widthStore += storeHeight
        }
      }
      boltCont.visible = false
      this.cont.addChild(boltCont)
      this.boltCont = boltCont
    },
    addToStage () {
      // this.placeCastlesAndSoldiers();
      this.clouds.addToStage()
      this.parentCont.addChildAt(this.cont, 0)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.cont)
      this.clouds.removeFromStage()
      // this.removeCastlesAndSoldiers();
      // this.parentCont.removeChild(this.orbsCont);
    },
    resize () {
      // this.background.clear();
      // this.background.beginFill(0xFF00FF).drawRect(0,0,this.utils.canvasWidth, this.utils.canvasHeight).endFill();
    },
    animate () {

    }
  }
}
