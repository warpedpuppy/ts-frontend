import PixiFps from 'pixi-fps'
import Utils from './utils/utils'
import Assets from './utils/assetCreation'
import Config from './animationsConfig'
import OrientationChange from './utils/orientationChange'
import Clock from './supportingClasses/universal/clock'
import Fly from './supportingClasses/fly/indexFly'
import FlyAnimate from './supportingClasses/fly/flyAnimate'
import FilterAnimation from './supportingClasses/grid/items/magic/filterAnimation'
import Gears from './supportingClasses/universal/gears'
import Hero from './supportingClasses/fly/heroFly'
import ControlPanel from './supportingClasses/universal/controlPanel'
import LevelComplete from './supportingClasses/universal/levelComplete'
import MobileMask from './supportingClasses/universal/mobileMask'
import Tokens from './supportingClasses/universal/tokens/tokenIndex'
import LoadingAnimation from './supportingClasses/universal/loadingAnimation'
import KeyHandler from './supportingClasses/universal/keyHandler'
import Grid from './supportingClasses/grid/gridIndex'
import Resize from './supportingClasses/fly/flyResize'
import MazeServices from '../services/maze-service'
import DefaultMaze from '../defaults/DefaultMaze'

export default function FlyAnimation() {
  return {
    mode: ['fly'],
    activeModeIndex: 0,
    activeMode: undefined,
    filterContainer: Assets.Container(),
    action: true,
    gears: Gears(),
    clock: Clock(),
    filterAnimation: FilterAnimation(),
    hero: Hero(),
    utils: Utils,
    loader: Assets.Loader(),
    activeAction: undefined,
    fly: Fly(),
    tokens: Tokens(),
    controlPanel: ControlPanel(),
    grid: Grid(),
    dbData: {},
    levelComplete: LevelComplete(),
    fullStop: false,
    orientationChange: OrientationChange(),
    kingCont: Assets.Container(),
    frame: Assets.Graphics(),
    kingContBackground: Assets.Graphics(),
    resize: Resize(),
    flyAnimate: FlyAnimate(),
    showFPS: false,
	id: 0,
    init (isMobile, isMobileOnly, parent) {
     

      this.utils.root = this
      this.activeMode = this.mode[this.activeModeIndex]
      this.isMobile = isMobile
      this.isMobileOnly = isMobileOnly

      this.levelComplete.init()

      if (!this.isMobile) {
        this.utils.getWidthAndHeight()
      } else {
        const test1 = this.utils.returnCanvasWidth()
        const test2 = this.utils.returnCanvasHeight()

        if (test1 > test2) {
          // landscape
          this.orientationChange.makeLandscape()
        } else {
          // portrait
          this.orientationChange.makePortrait()
        }
      }

      const app = this.app = Assets.Application({
        width: this.utils.canvasWidth,
        height: this.utils.canvasHeight,
        transparent: true
      })
      document.getElementById('homeCanvas').appendChild(app.view)
      this.stage = app.stage
      this.stage.addChild(this.kingCont)

      if (this.showFPS) {
        this.fpsCounter = new PixiFps()
        this.fpsCounter.x = this.utils.canvasWidth - 75
      }

      LoadingAnimation.start(this.kingCont)

      this.kingCont.addChild(this.filterContainer)

      this.loadDB = this.loadDB.bind(this)
      this.buildGame = this.buildGame.bind(this)
      this.startGame = this.startGame.bind(this)
      this.flyAnimate.animate = this.flyAnimate.animate.bind(this)
      this.flyAnimate.animateDesktopIpad = this.flyAnimate.animateDesktopIpad.bind(this)
      this.flyAnimate.animateMobile = this.flyAnimate.animateMobile.bind(this)

      if (!this.loader.resources['/ss/ss.json']) {
        this.loader
          .add('/ss/ss.json')
          .load(this.loadDB)
      } else {
        this.loadDB()
      }
    },
    async loadDB () {
      try {
        const res = await MazeServices.getOneMaze(this.id)
        this.grid.boards = [...this.grid.boards, ...res]
        this.buildGame()
      } catch (e) {
        this.grid.boards = [...this.grid.boards, ...DefaultMaze]
        this.buildGame()
      }
    },
    changeGrid (obj) {
      this.id = obj.id
      try {
        const test = this.grid.boards.find((item) => item.id === obj.id)
        if (test) {
          this.grid.nextBoard(obj.id)
        } else {
          this.grid.boards = [...this.grid.boards, obj]
          this.grid.nextBoard(obj.id)
        }
      } catch (e) {
        this.grid.boards = [...this.grid.boards, ...DefaultMaze]
        this.buildGame()
      }
    },
    pause (boolean) {
      this.action = boolean
    },
    buildGame () {
      const { spritesheet } = this.loader.resources['/ss/ss.json']

      this.utils.setProperties({
        isMobileOnly: this.isMobileOnly,
        isMobile: this.isMobile,
        spritesheet,
        canvasWidth: this.utils.canvasWidth,
        canvasHeight: this.utils.canvasHeight,
        app: this.app,
        root: this
      })

      if (this.isMobile) {
        this.mobileMask = MobileMask()
        this.backgroundColor = 0xDEDEDE
        this.mobileMask.setMask()
      }

     Assets.init()

      this.gears.init().addToStage()
      this.clock.init().addToStage()
      this.tokens.init()
      this.grid.init()
      this.hero.init(this.kingCont)

      if (this.isMobileOnly) {
        this.hero.cont.scale.set(Config.mobileOnlyScalingFly)
      }

      this.utils.setHero(this.hero)

      this.filterAnimation.init(this.filterContainer)

      this.fly.init(this)

      this.keyHandler = KeyHandler()

      this.keyHandler.init(this)

      this.activeAction = this.fly.addToStage()

      if (this.isMobile) {
        // ipad and mobile
        this.controlPanel.init(this)
        this.controlPanel.addToStage()
      }

      if (this.isMobile) {
        // mobile
        this.orientationChange.init(this)
      } else {
        window.onresize = this.resize.resizeHandler.bind(this.resize)
      }

      this.startGame()
    },
    startGame () {
      if (!this.isMobile) {
        this.app.ticker.add(this.flyAnimate.animateDesktopIpad)
        this.keyHandler.addToStage()
      } else {
        this.app.ticker.add(this.flyAnimate.animateMobile)
      }

      if (this.showFPS) this.app.stage.addChild(this.fpsCounter)

      this.hero.addToStage()
      LoadingAnimation.stop(this.kingCont)
    },
    stop () {
      window.onresize = undefined
      if (this.app) this.app.destroy(true)
      if (!this.isMobile && this.keyHandler) {
        this.keyHandler.removeFromStage()
      }
    },
    reset () {
      this.tokens.reset()
      this[this.activeMode].removeFromStage()
      this.grid.nextBoard()
      this.keyHandler.addToStage()
      this.fullStop = false
    },
    filterTest () {
      this.filterAnimation.filterToggle()
    },
    levelCompleteHandler () {
      this.levelComplete.boardComplete()
    }
  }
}
