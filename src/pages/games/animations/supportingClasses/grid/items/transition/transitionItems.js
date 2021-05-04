
import Assets from '../../../../utils/assetCreation'
import Utils from '../../../../utils/utils'
import TransitionAnimation from './transitionAnimation'
import Config from '../../../../animationsConfig'

export default function TransitionItems() {
  return {
    textures: [],
    currentItem: undefined,
    wh: undefined,
    speed: 5,
    textureCounter: 1,
    hit: false,
    utils: Utils,
    transitionAnimation: TransitionAnimation,
    itemQ: 0,
    items: [],
    edgeBuffer: 200,
    init () {
      this.itemQ = Assets.webgl ? Config.transitionItemsQ : 1
      this.switchPlayer = this.utils.root.switchPlayer
      this.app = this.utils.app
      this.itemStrings = this.utils.root.mode
      this.wh = this.utils.wh
      this.cont = this.utils.app.stage
      this.spritesheet = this.utils.spritesheet
      this.hero = this.utils.hero
      // this.transitionAnimation = this.transitionAnimation.init();
      // this.transitionAnimation.start(this.cont);
      this.bottomEdge = this.utils.wh.canvasHeight + this.edgeBuffer
      this.rightEdge = this.utils.wh.canvasWidth + this.edgeBuffer
      return this
    },
    changeItem () {
      this.textureCounter++
      if (this.textureCounter >= this.textures.length) {
        this.textureCounter = 0
      }
      this.currentItem.name = this.itemStrings[this.textureCounter]
      this.currentItem.texture = this.textures[this.textureCounter]
    },
    build () {
      for (const item of this.itemStrings) {
        const s = `${item}Trans.png`
        this.textures.push(s)
      }

      this.vx = this.utils.randomNumberBetween(1, 5)
      this.vy = this.utils.randomNumberBetween(1, 5)

      for (let i = 0; i < this.itemQ; i++) {
        const c = Assets.Sprite(this.textures[this.textureCounter])
        c.name = this.itemStrings[this.textureCounter]
        c.anchor.set(0.5)
        c.hit = false
        this.items.push(c)
        this.textureCounter++
        if (this.textureCounter >= this.textures.length) {
          this.textureCounter = 0
        }
      }
      return this.items
    },
    rotate (obj) {
      this.vx = -obj.vx
      this.vy = -obj.vy
    },
    returnItem (currentItem) {
      return {
        x: currentItem.x,
        y: currentItem.y,
        height: currentItem.height,
        width: currentItem.width
      }
    },
    resize (wh) {
      this.wh = wh
      this.transitionAnimation.resize(wh)
    },
    animate (vx, vy) {
      for (let i = 0; i < this.itemQ; i++) {
        const c = this.items[i]
        c.x -= vx// || this.vx;
        c.y -= vy// || this.vy;

        if (c.y > this.bottomEdge) {
          c.y = this.utils.randomNumberBetween(-this.edgeBuffer, 0)
        } else if (c.y < -this.edgeBuffer) {
          c.y = this.utils.randomNumberBetween(this.wh.canvasHeight, this.bottomEdge)
        }

        if (c.x > this.rightEdge) {
          c.x = this.utils.randomNumberBetween(-this.edgeBuffer, 0)
        } else if (c.x < -this.edgeBuffer) {
          c.x = this.utils.randomNumberBetween(this.wh.canvasWidth, this.rightEdge)
        }

        //      	if (this.utils.circleRectangleCollisionRegPointCenter(this.hero, this.returnItem(c))) {
        //      		this.currentItem = c;
        // 	this.hit = true;
        // }
      }
    },
    animateSpecial () {
      this.transitionAnimation.animate()
      if (this.transitionAnimation.done) {
        this.transitionAnimation.reset()
        this.currentItem.y = 0
        this.switchPlayer(this.currentItem.name)
        this.changeItem()
        this.hit = false
      }
    }
  }
}
