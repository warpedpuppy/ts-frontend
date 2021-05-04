import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'

export default function HeroJump() {
  return {
    cont: Assets.Container(),
    shell: Assets.Container(),
    w: 60,
    h: 14,
    spacer: 0,
    bounceQ: 10,
    blocks: [],
    utils: Utils,
    pos: {},
    counter: 0,
    counterLimit: 5,
    max: 0,
    contractBoolean: true,
    expandBoolean: false,
    trigger: 100,
    gravity: 1.01,
    bounceAllow: false,
    blockQ: 5,
    bounceBlockIndex: 4,
    doneCounter: 0,
    type: undefined,
    init (parentCont) {
      this.parentCont = parentCont
      this.spritesheet = this.utils.spritesheet
      this.activeHero = this.heroJump = this
      this.buildHero()
      this.shell.addChild(this.cont)
    },
    smileyEye () {
      const cont = Assets.Container()
      const eye = Assets.Sprite('jumpEye.png')
      eye.anchor.set(0.5)
      const pupil = Assets.Sprite('jumpPupil.png')
      pupil.anchor.set(0.5)
      cont.addChild(eye)
      cont.addChild(pupil)
      cont.pupil = pupil
      return cont
    },
    smileyMouth () {
      this.grimace = this.spritesheet.textures['grimace.png']
      const s = Assets.Sprite()
      s.texture = this.grimace;
      this.smile = this.spritesheet.textures['smile.png']
      s.anchor.set(0.5)
      s.scale.set(0.5)
      return s
    },
    jumpMouth () {
      this.mouth.texture = this.smile
    },
    grimaceMouth () {
      this.mouth.texture = this.grimace
    },
    look (str) {
      if (str === 'right') {
        this.leftEye.pupil.x = 5
        this.rightEye.pupil.x = 5
        this.leftEye.pupil.y = 0
        this.rightEye.pupil.y = 0
        this.feet.scale.x = 1
      } else if (str === 'left') {
        this.leftEye.pupil.x = -5
        this.rightEye.pupil.x = -5
        this.leftEye.pupil.y = 0
        this.rightEye.pupil.y = 0
        this.feet.scale.x = -1
      } else if (str === 'up') {
        this.leftEye.pupil.x = 0
        this.rightEye.pupil.x = 0
        this.leftEye.pupil.y = -5
        this.rightEye.pupil.y = -5
      } else if (str === 'down') {
        this.leftEye.pupil.x -= 0
        this.rightEye.pupil.x -= 0
        this.leftEye.pupil.y += 5
        this.rightEye.pupil.y += 5
      } else {
        this.leftEye.pupil.x = 0
        this.rightEye.pupil.x = 0
        this.leftEye.pupil.y = 0
        this.rightEye.pupil.y = 0
      }
    },
    buildHero () {
      const feet = [
        Assets.Texture('walk1.png'),
        Assets.Texture('walk2.png'),
        Assets.Texture('walk3.png'),
        Assets.Texture('walk2.png')
      ]
      const walking = Assets.AnimatedSprite(feet)
      walking.animationSpeed = 0.1
      walking.play()

      this.feet = walking
      this.feet.anchor.set(0.5)
      this.cont.addChild(this.feet)

      const body = Assets.Sprite('jumpBody.png')
      body.anchor.set(0.5)
      body.y = -40
      this.body = body
      this.cont.addChild(body)

      const leftEye = this.leftEye = this.smileyEye()
      const rightEye = this.rightEye = this.smileyEye()
      leftEye.x = -15
      leftEye.y = rightEye.y = -45
      rightEye.x = 15
      this.cont.addChild(leftEye)
      this.cont.addChild(rightEye)

      this.mouth = this.cont.mouth = this.smileyMouth()
      this.mouth.y = -25
      this.cont.addChild(this.mouth)
      this.cont.scale.set(0.5)
      this.grimaceMouth()
    },
    addToStage () {
      this.shell.x = this.utils.canvasWidth / 2
      this.shell.y = this.utils.canvasHeight / 2

      this.parentCont.addChild(this.shell)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.shell)
    },
    resize () {
      this.shell.x = this.utils.canvasWidth / 2
      this.shell.y = this.utils.canvasHeight / 2
    }
  }
}
