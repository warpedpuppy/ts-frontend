import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'

export default function HeroFly() {
  return {
    cont: Assets.Container(),
    dragon: [],
    pos: [],
    utils: Utils,
    segmentsQ: 10,
    dyeLot: [],
    timeoutHandler: undefined,
    init (parentCont) {
      this.parentCont = parentCont


      const head = Assets.Sprite('dragonHead.png');
      console.log("from hero fly", head, this.utils.spritesheet.textures, this.utils.spritesheet.textures['dragonHead.png'].baseTexture)
      this.dyeLot.push(head)
      head.anchor.x = 0.5
      head.anchor.y = 1
      this.headCont = Assets.Container()// putting this in a container so can put flames on it
      this.headCont.addChild(head)
      this.cont.addChild(this.headCont)
      this.dragon.push(head)
      let i
      for (i = 0; i < this.segmentsQ; i++) {
        const cont = Assets.Container()
        cont.vx = 0
        cont.vy = 0
        cont.xpos = 0
        cont.ypos = 0
        let segment

        if (i !== this.segmentsQ - 1) {
          segment = Assets.Sprite('dragonSegment.png', true)
          segment.y = i * (1 + 40)
          // segment.scale.y = -1;
        } else {
          segment = Assets.Sprite('dragonTail.png', true)
          segment.y = i * (segment.height - 40)
        }
        segment.anchor.x = 0.5
        segment.anchor.y = 0.2
        this.dyeLot.push(segment)
        cont.addChild(segment)
        this.dragon.push(cont)
        this.cont.addChild(cont)
      }

      this.rightWing = Assets.Container()
      this.rightWing1 = Assets.Sprite('wingPart1.png')
      this.rightWing1.anchor.x = 0
      this.rightWing1.anchor.y = 0.33
      this.dyeLot.push(this.rightWing1)

      this.rightWing2 = Assets.Sprite('wingPart2.png')
      this.rightWing2.x = 86
      this.rightWing2.y = -40
      this.rightWing2.anchor.x = 0
      this.rightWing2.pivot.y = 20
      this.dyeLot.push(this.rightWing2)

      this.rightWing3 = Assets.Sprite('dragonTriangle.png')
      this.rightWing3.anchor.x = 0.5
      this.rightWing3.anchor.y = 0
      this.rightWing3.x = 86
      this.rightWing3.rotation = this.utils.deg2rad(-30)
      this.rightWing3.y = -40
      this.dyeLot.push(this.rightWing3)

      this.rightWing.addChild(this.rightWing1)
      this.rightWing.addChild(this.rightWing2)
      this.rightWing.addChild(this.rightWing3)

      this.leftWing = Assets.Container()
      this.leftWing1 = Assets.Sprite('wingPart1.png')
      this.leftWing1.scale.x = -1
      this.leftWing1.anchor.x = 0
      this.leftWing1.anchor.y = 0.33
      this.dyeLot.push(this.leftWing1)

      this.leftWing2 = Assets.Sprite('wingPart2.png')
      this.leftWing2.scale.x = -1
      this.leftWing2.x = -88
      this.leftWing2.y = -40
      this.leftWing2.anchor.x = 0
      this.leftWing2.pivot.y = 20
      this.dyeLot.push(this.leftWing2)

      this.leftWing3 = Assets.Sprite('dragonTriangle.png')
      this.leftWing3.anchor.x = 0.5
      this.leftWing3.anchor.y = 0
      this.leftWing3.x = -80// -82;
      this.leftWing3.rotation = this.utils.deg2rad(30)
      this.leftWing3.y = -40
      this.dyeLot.push(this.leftWing3)

      this.leftWing.addChild(this.leftWing1)
      this.leftWing.addChild(this.leftWing2)
      this.leftWing.addChild(this.leftWing3)

      this.wingCont = Assets.Container()
      // this.wingCont.y = 30;
      this.wingCont.addChild(this.leftWing)
      this.wingCont.addChild(this.rightWing)

      this.eyeCont = Assets.Container()
      const rightEye = this.rightEye = Assets.Sprite('swimEye.png')
      rightEye.anchor.set(0.5)
      this.rightEye.x = 10
      this.rightEye.y = -30
      this.eyeCont.addChild(rightEye)
      const leftEye = this.leftEye = Assets.Sprite('swimEye.png')
      this.leftEye.x = -10
      this.leftEye.y = -30
      leftEye.anchor.set(0.5)
      this.eyeCont.addChild(leftEye)
      this.cont.addChild(this.eyeCont)

      this.cont.radius = 0
      this.cont.addChildAt(this.wingCont, 0)
      this.segments = this.dragon
      this.cont.scale.set(0.5)
      this.dye(0x000000)

      this.activeHero = this
    },
    dye (color) {
      for (const part of this.dyeLot) {
        part.tint = color
      }
    },
    hit () {
      if (!this.timeoutHandler) {
        this.dyeLot.forEach((seg) => {
          seg.tint = 0xFF0000
        })
        this.timeoutHandler = setTimeout(this.fadeToBlack.bind(this), 100)
      }
    },
    fadeToBlack () {
      this.dyeLot.forEach((seg) => {
        seg.tint = 0x000000
      })
      this.timeoutHandler = undefined
    },
    bodySegment (radius, color, yVal) {
      const cont = Assets.Container()
      cont.radius = radius
      cont.height = cont.radius * 4
      cont.vx = 0
      cont.vy = 0
      cont.xpos = 0
      cont.ypos = 0
      const b = Assets.Graphics()

      b.y = yVal
      const triangleWidth = 25
      const triangleHeight = triangleWidth
      const triangleHalfway = triangleWidth / 2

      // draw triangle
      b.beginFill(0xFF0000, 1)
      b.lineStyle(0, 0xFF0000, 1)
      b.moveTo(triangleWidth, 0)
      b.lineTo(triangleHalfway, triangleHeight)
      b.lineTo(0, 0)
      b.lineTo(triangleHalfway, 0)
      b.endFill()
      b.pivot.x = b.pivot.y = 12.5
      b.rotation = this.utils.deg2rad(180)
      cont.addChild(b)
      cont.body = b
      return cont
    },
    addToStage () {
      this.cont.x = this.utils.canvasWidth / 2
      this.cont.y = this.utils.canvasHeight / 2
      this.parentCont.addChild(this.cont)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.cont)
    },
    resize () {
      this.cont.x = this.utils.canvasWidth / 2
      this.cont.y = this.utils.canvasHeight / 2
    },
    animate () {

    }
  }
}
