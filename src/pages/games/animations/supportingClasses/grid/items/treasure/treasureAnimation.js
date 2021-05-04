import Assets from '../../../../utils/assetCreation'
import Utils from '../../../../utils/utils'
import Config from '../../../../animationsConfig'

export default function TreasureAnimation() {
  return {
    ringQ: 0,
    chestQ: 0,
    coins: [],
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
    init () {
      this.parent = this.utils.root
      this.wh = this.utils.wh
      // this.hero = this.utils.hero.cont;
      this.coinQ = Config[`${this.utils.root.activeMode}CoinsPerTreasureChest`]
      this.chestQ = Assets.webgl ? 100 : 1
      this.radialQ = Assets.webgl ? 300 : 10
      this.halfWidth = this.wh.canvasWidth / 2
      this.halfHeight = this.wh.canvasHeight / 2

      const ringsPC = this.ringsPC = Assets.ParticleContainer(this.coinQ)
      this.ringCont.addChild(ringsPC)

      this.coins = [...Assets.coins]
      // for (let i = 0; i < this.ringQ; i ++) {
      // 	let r = Assets.rings[i];
      // 	this.rings.push(r);
      // }
      this.bottomEdge = this.utils.canvasHeight + this.edgeBuffer
      this.rightEdge = this.utils.canvasWidth + this.edgeBuffer

      this.radialCont.scale.set(0)
      for (let i = 0; i < this.radialQ; i++) {
        const r = Assets.Sprite('line.png')
        r.width = 0.25
        r.height = this.utils.randomNumberBetween(10, 50)
        // r.alpha = this.utils.randomNumberBetween(0.2, 0.8);
        r.anchor.x = 0
        r.anchor.y = 0
        r.storeHeight = r.height
        r.variance = this.utils.randomNumberBetween(10, 20)
        r.rotation = this.utils.deg2rad(i * (360 / this.radialQ))
        r.speed = this.utils.randomNumberBetween(0.0003, 0.003)
        r.tint = 0xFFFF00// this.utils.randomColor();
        r.alpha = this.utils.randomNumberBetween(0.1, 1)
        this.radials.push(r)
        this.radialCont.addChild(r)
      }
    },
    playAnimation (activeChest) {
      for (let i = 0; i < this.coinQ; i++) {
        const r = this.coins[i]
        const num = Math.ceil(Math.random() * 11)
        r.texture = this.utils.spritesheet.textures[`jewel${num}.png`]
        r.x = r.y = 0
        // r.scale.set(this.utils.randomNumberBetween(0.1, 0.5));
        r.vy = this.utils.randomNumberBetween(this.vys[0], this.vys[1])
        r.vx = this.utils.randomNumberBetween(this.vxs[0], this.vxs[1])
        r.rotate = this.utils.randomNumberBetween(-4, 4)
        r.floor = this.halfHeight - r.height

        if (this.utils.isMobileOnly) {
          r.scale.set(Config.mobileOnlyScaling)
        }
        this.ringsPC.addChild(r)
      }

      this.activeChest = activeChest
      this.activeChest.texture = this.utils.spritesheet.textures['openTreasureChest.png']
      // place chest in center and rock it back and forth;
      this.utils.root.grid.gridAction.pause = true
      // this.utils.root.action = false;
      // this.animationHappening = true;
      this.storeObject = {
        scale: this.activeChest.scale.x,
        x: this.activeChest.x,
        y: 0
      }
      this.activeChest.scale.set(1)

      this.activeChest.x = this.radialCont.x = this.utils.canvasWidth / 2
      this.activeChest.y = this.radialCont.y = this.utils.canvasHeight / 2

      this.utils.app.stage.addChild(this.radialCont)

      // explode coins
      this.ringCont.x = this.utils.canvasWidth / 2
      this.ringCont.y = this.utils.canvasHeight / 2
      this.utils.app.stage.addChild(this.activeChest)
      this.utils.app.stage.addChild(this.ringCont)

      // trigger animate special
      this.utils.root.grid.treasure.animationHappening = true

      // let test = Assets.Graphics();
      // test.beginFill(0xFFF00).drawCircle(0,0,100).endFill();
      // this.radialCont.addChild(test);
    },
    animateSpecial () {
      for (let i = 0; i < this.coinQ; i++) {
        const r = this.coins[i]
        r.vy += this.gravity
        r.y += r.vy
        r.x += r.vx
        r.rotation += this.utils.deg2rad(r.rotate)

        if (r.y >= r.floor) {
          r.vy *= -this.bounce
        }

        if (r.x < -this.halfWidth || r.x > this.halfWidth) {
          r.vx *= -this.bounce
        }
      }

      this.counter++
      if (this.counter === this.animationLimit) {
        this.reset()
      }

      if (this.radialCont.scale.x < 10) {
        this.radialCont.scale.x += 0.1
        this.radialCont.scale.y += 0.1
      }

      this.radialCont.rotation += this.utils.deg2rad(0.5)
      for (let i = 0; i < this.radialQ; i++) {
        const r = this.radials[i]
        r.height = this.utils.cosWave(r.storeHeight, r.variance, r.speed)
      }
    },
    reset () {
      for (let i = 0; i < this.coinQ; i++) {
        const r = this.coins[i]
        r.x = r.y = 0
        r.vy = this.utils.randomNumberBetween(this.vys[0], this.vys[1])
        r.vx = this.utils.randomNumberBetween(this.vxs[0], this.vxs[1])
      }
      this.counter = 0
      this.hit = false
      this.utils.app.stage.removeChild(this.ringCont)
      this.activeChest.scale.set(this.storeObject.scale)
      this.activeChest.x = this.storeObject.x
      this.activeChest.y = this.storeObject.y
      this.radialCont.scale.set(0)
      this.utils.app.stage.removeChild(this.radialCont)
      this.utils.root.grid.treasure.animationHappening = false
      this.utils.root.grid.gridAction.pause = false
      this.utils.app.stage.removeChild(this.activeChest)
    }
  }
}
