import PixiFps from 'pixi-fps'
import Utils from './utils/utils'
import Assets from './utils/assetCreation'
import Tweens from './utils/Tweens'
import OrientationChange from './utils/orientationChange'
import Clock from './supportingClasses/universal/clock'
import MobileMask from './supportingClasses/universal/mobileMask'
import LoadingAnimation from './supportingClasses/universal/loadingAnimation'
import Jump from './supportingClasses/jump/indexJump'
import FilterAnimation from './supportingClasses/grid/items/magic/filterAnimation'
import Gears from './supportingClasses/universal/gears'
import Hero from './supportingClasses/jump/heroJump'
import ControlPanel from './supportingClasses/universal/controlPanel'
import LevelComplete from './supportingClasses/universal/levelComplete'
import Tokens from './supportingClasses/universal/tokens/tokenIndex'
import Config from './animationsConfig'
import KeyHandler from './supportingClasses/universal/keyHandler'
import Resize from './supportingClasses/jump/jumpResize'

export default function JumpAnimation() {
  return {
    activeModeIndex: 0,
    activeMode: undefined,
    filterContainer: Assets.Container(),
    action: true,
    gears: Gears(),
    clock: Clock(),
    filterAnimation: FilterAnimation(),
    hero: Hero(),
    transitionAnimationPlaying: false,
    utils: Utils,
    loader: Assets.Loader(),
    activeAction: undefined,
    jump: Jump(),
    tokens: Tokens(),
    controlPanel: ControlPanel(),
    dbData: {},
    storeAction: true,
    timeOut: undefined,
    levelComplete: LevelComplete(),
    fullStop: false,
    keyHandler: KeyHandler(),
    kingCont: Assets.Container(),
    frame: Assets.Graphics(),
    kingContBackground: Assets.Graphics(),
    orientationChange: OrientationChange(),
    resize: Resize(),
    init (isMobile, isMobileOnly) {
      Tweens.killAll()
      this.activeAction = this.jump.jumpAction

      this.utils.root = this
      this.activeMode = this.jump
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

      LoadingAnimation.start(this.kingCont)

      this.fpsCounter = new PixiFps()
      this.fpsCounter.x = this.utils.canvasWidth - 75
      this.stage.addChild(this.filterContainer)

      this.buildGame = this.buildGame.bind(this)
      this.startGame = this.startGame.bind(this)
      this.animate = this.animate.bind(this)
      this.animateDesktopIpad = this.animateDesktopIpad.bind(this)
      this.animateMobile = this.animateMobile.bind(this)

      if (!this.loader.resources['/ss/ss.json']) {
        this.loader
          .add('/ss/ss.json')
          .add('Hobo', '/fonts/hobostd.xml')
          .load(this.buildGame)
      } else {
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
        this.backgroundColor = 0x000000
        this.mobileMask.setMask()
      }
      Assets.init()

      this.hero.init(this.stage)

      if (this.isMobileOnly) {
        this.hero.cont.scale.set(Config.mobileOnlyScalingJump)
      }

      this.utils.setHero(this.hero)

      this.jump.init(this.kingCont)

      this.gears.init().addToStage()

      this.clock.init().addToStage()

      this.keyHandler.init(this)
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
        this.app.ticker.add(this.animateDesktopIpad)
        this.keyHandler.addToStage()
      } else {
        this.app.ticker.add(this.animateMobile)
      }

      this.makeJumpActive()
      this.hero.addToStage()
      LoadingAnimation.stop(this.kingCont)
      // this.animations.circles({start: true, expand: true});
    },
    stop () {
      window.onresize = undefined
      if (this.app) this.app.destroy(true)
      if (!this.isMobile && this.keyHandler) {
        this.keyHandler.removeFromStage()
      }
    },
    makeJumpActive () {
      this.jump.addToStage()
      this.jump.jumpBackground.pause = false
      this.jump.jumpAction.pause = false
      this.hero.cont.visible = true

      if (Config.testingJump) {
        const background = this.utils.root.jump.jumpBackground.orbsCont
        background.scale.set(1)
        this.jump.addToStage()
      }
    //   this.app.stage.addChild(this.fpsCounter)
    },
    reset () {
      this.tokens.reset()
      this.jump.reset()
      this.bounce.reset()

      this[this.activeMode].removeFromStage()
      this.switchPlayer(this.mode[0])

      this.keyHandler.addToStage()
      this.getDatabaseData()

      this.fullStop = false
    },
    filterTest () {
      this.filterAnimation.filterToggle()
    },
    animateMobile () {
      this.orientationChange.animate()
      this.animate()
    },
    animateDesktopIpad () {
      this.animate()
    },
    levelCompleteHandler () {
      this.levelComplete.boardComplete()
    },
    animate () {
      Tweens.animate()

      if (this.fullStop) return

      if (this.action) {
        if (this.rotateLeftBoolean) {
          this.activeAction.rotate('left')
        } else if (this.rotateRightBoolean) {
          this.activeAction.rotate('right')
        }
        this.clock.animate()
        this.filterAnimation.animate()
        this.gears.animate()
        this.jump.animate()
      }
    }
  }
}
