import Utils from '../utils/utils'
import Assets from '../utils/assetCreation'
import HeroFly from '../supportingClasses/fly/heroFly'
import HeroSwim from '../supportingClasses/swim/heroSwim'
import HeroJump from '../supportingClasses/jump/heroJump'
import Planets from '../supportingClasses/jump/jumpBackground/planets/planet'
import Tweens from '../utils/Tweens'

export default function HomeButtons(doneLoading) {
  return {
    heroFly: HeroFly(),
    heroSwim: HeroSwim(),
    heroJump: HeroJump(),
    loader: Assets.Loader(),
    utils: Utils,
    planet: Planets(),
    radius: 0,
    storeRadius: 0,
    increment: 5,
    loaded: false,
    init () {
      this.buildGame = this.buildGame.bind(this)
      let options = {width: 200, height: 200, transparent: true};
      this.flyApp = Assets.Application(options)
      document.getElementById('fly-home').appendChild(this.flyApp.view)
      this.flyStage = this.flyApp.stage
      this.flyStage.alpha = 0

      this.swimApp = Assets.Application(options)
      document.getElementById('swim-home').appendChild(this.swimApp.view)
      this.swimStage = this.swimApp.stage
      this.swimStage.alpha = 0

      this.jumpApp = Assets.Application(options)
      document.getElementById('jump-home').appendChild(this.jumpApp.view)
      this.jumpStage = this.jumpApp.stage
      this.jumpStage.alpha = 0

      //const { spritesheet } = this.loader.resources['/ss/ss.json']
      if (!this.loader.resources.spritesheet && !this.loader.resources['/ss/ss.json'] ) {
        this.loader
          .add('/ss/ss.json')
          .load(this.buildGame)
      } else {
        this.buildGame()
      }
    },
    buildGame () {
      this.loaded = true;
      const { spritesheet } = this.loader.resources['/ss/ss.json']

      if(!spritesheet) {
        this.loader = Assets.Loader();
        this.init();
        this.stop();
        
        return;
      }
      this.utils.setProperties({
        spritesheet,
        app: this.app,
        root: this
      })
      this.heroFly.init()
      this.heroFly.cont.scale.set(0.25)
      this.heroFly.cont.x = 100
      this.heroFly.cont.y = 50
      this.flyStage.addChild(this.heroFly.cont)

      this.heroSwim.init()
      this.heroSwim.cont.scale.set(0.75)
      this.heroSwim.cont.x = 100
      this.heroSwim.cont.y = 50
      this.swimStage.addChild(this.heroSwim.cont)

      this.heroJump.init()
      this.heroJump.cont.scale.set(0.5)
      this.heroCont = Assets.Container()
      this.heroCont.x = 100
      this.heroCont.y = 100
      this.heroJump.cont.y = -38
      this.heroCont.addChild(this.heroJump.cont)
      this.jumpStage.addChild(this.heroCont)
      this.planet = Planets().buildPlanet(1, 0.25)
      this.planet.x = this.planet.y = 100
      this.planet.gremlin.visible = false
      this.jumpStage.addChild(this.planet)

      this.flyApp.ticker.add(this.animate.bind(this))
      this.swimApp.ticker.add(this.animate.bind(this))
      this.jumpApp.ticker.add(this.animate.bind(this))

      this.maxLength = this.increment * this.heroFly.segmentsQ

      Tweens.tween(this.flyStage, 1, { alpha: [0, 1] }, undefined, 'linear')
      Tweens.tween(this.swimStage, 1, { alpha: [0, 1] }, undefined, 'linear')
      Tweens.tween(this.jumpStage, 1, { alpha: [0, 1] }, undefined, 'linear')

      doneLoading();
    },
    animate () {
      Tweens.animate()
      this.heroFly.eyeCont.rotation = this.radius
      this.heroFly.headCont.rotation = this.radius

      this.heroSwim.eyeCont.rotation = this.radius
      this.heroSwim.headCont.rotation = this.radius

      this.heroFly.pos.push(this.radius)
      this.heroSwim.pos.push(this.radius)

      if (this.heroFly.pos.length > this.maxLength) {
        this.heroFly.pos = this.heroFly.pos.slice(-this.maxLength)
      }
      if (this.heroSwim.pos.length > this.maxLength) {
        this.heroSwim.pos = this.heroSwim.pos.slice(-this.maxLength)
      }

      for (let i = 1; i <= this.heroFly.segmentsQ; i++) {
        const index = this.heroFly.pos.length - (i * this.increment)

        if (this.heroFly.pos.length >= index) {
          this.heroFly.segments[i].rotation = this.heroFly.pos[index]
        }
        if (this.heroSwim.segments[i] && this.heroSwim.pos.length >= index) {
          this.heroSwim.segments[i].rotation = this.heroSwim.pos[index]
        }
      }
      this.radius = this.utils.cosWave(this.storeRadius, 0.15, 0.01)
      this.heroFly.wingCont.rotation = this.storeRadius
      this.heroFly.leftWing.rotation = this.utils.deg2rad(this.utils.cosWave(0, 20, 0.004))
      this.heroFly.leftWing2.rotation = this.utils.deg2rad(this.utils.cosWave(0, 20, 0.004))
      this.heroFly.rightWing.rotation = this.utils.deg2rad(this.utils.cosWave(0, -20, 0.004))
      this.heroFly.rightWing2.rotation = this.utils.deg2rad(this.utils.cosWave(0, -20, 0.004))

      this.heroSwim.leftFin.rotation = this.utils.deg2rad(this.utils.cosWave(0, 20, 0.004))
      this.heroSwim.rightFin.rotation = this.utils.deg2rad(this.utils.cosWave(0, -20, 0.004))
      this.heroSwim.tail.rotation = this.utils.deg2rad(this.utils.cosWave(0, 60, 0.01))
      this.heroSwim.finCont.rotation = this.radius

      this.heroCont.rotation += this.utils.deg2rad(0.25)
      this.planet.foreground.rotation -= this.utils.deg2rad(0.5)
    },
    stop () {
     this.flyApp.destroy(true, false)
      this.swimApp.destroy(true, false)
      this.jumpApp.destroy(true, false)
    }
  }
}
