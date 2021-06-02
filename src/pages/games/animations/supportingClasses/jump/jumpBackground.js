import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'
import Config from '../../animationsConfig'
import RainbowSwirls from './rainbowSwirls'
import Tweens from '../../utils/Tweens'
import Planets from './jumpBackground/planets/planet'
import ThreeInARow from './threeInARow'

export default function Jump() {
  return {
    cont: Assets.Container(),
    background: Assets.Graphics(),
    foreground: Assets.Graphics(),
    orbsCont: Assets.Container(),
    ground: Assets.Graphics(),
    colQ: Config.spaceColQ,
    rowQ: Config.spaceRowQ,
    rainbowSwirlsQ: 4,
    rainbowSwirlInstances: [],
    transition: false,
    currentOrb: undefined,
    landingOrb: undefined,
    orbs: [],
    utils: Utils,
    pause: false,
    dotEatBoolean: true,
    spacer: 100,
    startScale: 0.1,
    orbListen: true,
    heroCollisionDetectObject: {},
    init (parentCont, action) {
      this.hero = this.utils.hero
      this.app = this.utils.app
      this.parentCont = parentCont
      this.wh = this.utils.wh
      this.spritesheet = this.utils.spritesheet
      this.action = action

      this.makeTransitionComplete = this.makeTransitionComplete.bind(this)

      const centerOrb = 2// this.test = Math.floor((this.rowQ * this.colQ) / 2) + 5;
      let counter = 0

      if (this.utils.isMobileOnly) {
        this.spacer = 100
      }

      // let totalPlanets = this.rowQ * this.colQ;

      for (let i = 0; i < this.rowQ; i++) {
        for (let j = 0; j < this.colQ; j++) {
          const planet = Planets().buildPlanet(counter, this.startScale)
          planet.x = j * this.spacer
          planet.y = planet.startY = i * this.spacer
          this.orbsCont.addChild(planet)
          this.orbs.push(planet)
          if (counter === centerOrb) {
            this.centerOrbIndex = centerOrb
            this.currentOrb = this.landingOrb = this.centralOrb = planet
          }
          counter++
        }
      }

      // let radius = (this.hero.activeHero.body.width / 2) * this.utils.root.hero.cont.scale.x;
      // this.heroCollisionDetectObject.radius = radius;

      this.threeInARow = ThreeInARow().init(this.orbs, this.spacer, this.colors, this.startScale, this.orbsCont, this.listeners)
      this.threeInARow.completeHandler1()

      this.background.beginFill(0x000066).drawRect(0, 0, this.wh.canvasWidth, this.wh.canvasHeight).endFill()
      this.cont.addChild(this.background)

      this.cont.addChild(this.orbsCont)

      this.startXs = ['TL', 'BL', 'TR', 'BR']
      for (let i = 0; i < this.rainbowSwirlsQ; i++) {
        this.tileColumn = RainbowSwirls()
        this.tileColumn.init(this.cont, this.startXs[i])
        this.tileColumn.addToStage()
        this.rainbowSwirlInstances.push(this.tileColumn)
      }

      this.loopingQ = Math.max(this.orbs.length)
    },
    buildBoard () {

    },
    listeners (boolean) {
      this.orbListen = boolean
      this.utils.root.keyHandler.onOff(boolean)
    },
    addToStage () {
      this.transition = false
      this.currentOrb = this.landingOrb
      this.orbsCont.pivot = Assets.Point(this.landingOrb.x, this.landingOrb.y)
      this.orbsCont.x = (this.utils.canvasWidth / 2)
      this.orbsCont.y = (this.utils.canvasHeight / 2)
      this.hero.cont.y = this.utils.canvasHeight / 2
      this.pause = false
      this.parentCont.addChildAt(this.cont, 1)
      this.utils.root.hero.heroJump.floor = (-(this.currentOrb.background.width / 2))// * this.currentOrb.background.scale.x;
      this.orbsCont.alpha = 1
    },
    addSpaceShip () {
      const spaceShipOrbIndex = this.currentOrb.index + 1
      this.spaceShipOrb = this.orbs[spaceShipOrbIndex]
      const { spaceShip } = this.utils.root.grid.gridBuild
      spaceShip.x = spaceShip.y = 0
      spaceShip.scale.set(this.currentOrb.background.scale.x)
      this.orbs[spaceShipOrbIndex].spaceShip = true
      this.orbs[spaceShipOrbIndex].addChild(spaceShip)

      // console.log("add space ship", this.utils.canvasWidth, this.orbsCont.x)
    },
    addToken () {
      if (!this.tokenTaken) {
        const tokenOrbIndex = this.currentOrb.index - 1
        this.tokenOrb = this.orbs[tokenOrbIndex]
        this.token = this.utils.root.grid.gridBuild.tokens[3]
        this.token.x = this.token.y = 0
        this.dotsContArray[tokenOrbIndex].addChild(this.token)
        this.tokenLock = Assets.Sprite('tokenLock.png')
        this.tokenLock.anchor.set(0.5)
        this.dotsContArray[tokenOrbIndex].addChild(this.tokenLock)
      }
    },
    removeFromStage () {
      Tweens.killAll()

      this.parentCont.removeChild(this.cont)
      // this.jumpPoints.removeFromStage();
      // this.parentCont.removeChild(this.orbsCont);
    },
    resize () {
      this.background.clear()
      this.background.beginFill(0x000066).drawRect(0, 0, this.utils.canvasWidth, this.utils.canvasHeight).endFill()

      this.orbsCont.x = (this.utils.canvasWidth / 2)
      this.orbsCont.y = (this.utils.canvasHeight / 2)

      this.cont.x = 0
      this.cont.y = 0
    },
    switchPlanets (newPlanet, i) {
      if (this.utils.root.all && newPlanet.spaceShip) {
        // this.hero.activeHero.cont.y = 0;
        this.pause = true
        this.utils.root.jump.jumpAction.pause = true
        this.utils.root.grid.gridBuild.spaceShip.classRef.returnHome()
        return
      }

      const oldPlanet = this.currentOrb

      this.pause = true

      this.currentOrb = newPlanet

      const color1 = oldPlanet.color
      const tint1 = oldPlanet.background.tint

      const color2 = this.currentOrb.color
      const tint2 = this.currentOrb.background.tint

      oldPlanet.color = color2
      oldPlanet.background.tint = tint2

      this.currentOrb.color = color1
      this.currentOrb.background.tint = tint1

      Tweens.tween(oldPlanet, 1.5, {
        x: [this.currentOrb.x, oldPlanet.x],
        y: [this.currentOrb.y, oldPlanet.y]
      }, undefined, 'easeOutBounce')

      Tweens.tween(this.currentOrb, 1.5, {
        x: [oldPlanet.x, this.currentOrb.x],
        y: [oldPlanet.y, this.currentOrb.y]
      }, undefined, 'easeOutBounce')

      Tweens.planetJump(this.orbsCont, this.hero.activeHero.cont, newPlanet, this.makeTransitionComplete.bind(this, i))

      // } else if (newPlanet === this.tokenOrb && this.jumpTokenUnlocked && !this.jumpTokenTaken) {

      // 	this.jumpTokenTaken = true;
      // 	this.utils.root.tokens.fillSlot(this.token);
      // }
    },
    makeTransitionComplete (i) {
      this.threeInARow.completeHandler1()
      this.centerOrbIndex = i
      this.pause = false
      this.transition = false
    }
  }
}
