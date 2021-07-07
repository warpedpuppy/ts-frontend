import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'
export default function RainbowSwirls() {
  return {
    cont: undefined,
    cols: {},
    bricks: [],
    utils: Utils,
    brickHeight: 0,
    curve: undefined,
    curveCounter: 0,
    curveQ: 0,
    testCounter: 0,
    curvedQs: [40, 80],
    curves: [45, -45, 135, -135],
    contObject: {},
    objectPool: [],
    objectPoolCounter: 0,
    interval: 0,
    colWidth: 5,
    customWidth: undefined,
    customHeight: undefined,
    colors: [0xfff0f5, 0xe6e6fa, 0xff7575, 0xffb775, 0xfff175, 0xc3ff76, 0x7bffb8, 0x7de8ff, 0x799fff, 0xff93f7],
    colorCounter: 0,
    init (parentCont, quadrant, cw, ch) {
      this.customHeight = ch;
      this.customWidth = cw;
      this.quadrant = quadrant
      this.curve = this.curves[Math.floor(Math.random() * 4)]
      this.app = this.utils.app;
      
      this.interval = this.utils.randomIntBetween(1,3);
      this.parentCont = parentCont

      this.tileQ =  150 ;
      this.cont = Assets.ParticleContainer(this.tileQ)

      for (let i = 0; i < this.tileQ; i++) {
        const s = this.brick()
        s.alpha = 0.5;
        s.tint = this.colors[this.colorCounter]
        this.colorCounter++
        if (this.colorCounter > this.colors.length - 1) this.colorCounter = 0
        this.objectPool.push(s)
      }

      const s = this.objectPool[this.objectPoolCounter];
      this.objectPoolCounter++;
      const newPos = this.newXY();
      s.x = newPos.x;
      s.y = newPos.y;
      this.cont.addChild(s);


      this.curveQ = this.utils.randomIntBetween(this.curvedQs[0], this.curvedQs[1])
    },
    brick () {
      const s = Assets.Sprite('tile.png')
      s.counter = 0
      s.curveCounter = 0;
      s.width = this.customWidth ? this.customWidth : s.width;
      s.height = this.customHeight ? this.customHeight : s.height;
      this.brickHeight = s.height
      s.anchor.x = 0.5
      s.anchor.y = 1
      return s
    },
    newBrick () {

    const s = this.objectPool[this.objectPoolCounter];
     
     
      this.objectPoolCounter++
      if (this.objectPoolCounter > this.objectPool.length - 1) {
        this.objectPoolCounter = 0
      }

      this.curveCounter++;
      this.curve *= 1.05
      const deg = this.utils.deg2rad(this.curve)
      s.rotation = deg
      if (this.curveCounter > this.curveQ) {
        this.curve = this.curves[Math.floor(Math.random() * 4)]
        this.curveCounter = 0
        this.curveQ = this.utils.randomIntBetween(this.curvedQs[0], this.curvedQs[1])
        const newPos = this.newXY()
        s.y = newPos.y
        s.x = newPos.x
      }
      const prevIndex = (this.objectPoolCounter > 1) ? this.objectPoolCounter - 2 : this.objectPool.length - 1
      const prevX = this.objectPool[prevIndex].x
      const prevY = this.objectPool[prevIndex].y
      const prevRotation = this.objectPool[prevIndex].rotation
      const newX = prevX + (s.height * Math.sin(prevRotation))
      const newY = prevY - (s.height * Math.cos(prevRotation))
      s.x = newX
      s.y = newY
      const buffer = 1
      if (this.objectPoolCounter === 0 ||
				s.y < -buffer ||
				s.x < -buffer ||
				s.x > this.utils.canvasWidth + buffer ||
				s.y > this.utils.canvasHeight + buffer
      ) {
        const newPos = this.newXY()
        s.x = newPos.x
        s.y = newPos.y
      }
      this.cont.addChild(s)
    },
    newXY () {
      if (this.quadrant === 'TL') {
        return {
          x: this.utils.canvasWidth * 0.25,
          y:  this.utils.canvasHeight * 0.25
        }
      } if (this.quadrant === 'TR') {
        return {
          x: this.utils.canvasWidth * 0.75,
          y:  this.utils.canvasHeight * 0.25
        }
      } if (this.quadrant === 'BL') {
        return {
          x: this.utils.canvasWidth * 0.75,
          y:  this.utils.canvasHeight * 0.75
        }
      } if (this.quadrant === 'BR') {
        return {
          x: this.utils.canvasWidth * 0.25,
          y:  this.utils.canvasHeight * 0.75
        }
      }
    },
    addToStage () {
      this.parentCont.addChild(this.cont)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.cont)
    },
    resize () {

    },
    animate () {
      this.testCounter++;
      if (this.testCounter % this.interval === 0) this.newBrick()
    }
  }
}
