import Assets from '../../../../utils/assetCreation'
import Utils from '../../../../utils/utils'
import Config from '../../../../animationsConfig'

export default function MagicPills() {
  return {
    pills: [],
    edgeBuffer: 200,
    effect: false,
    lifeSpan: 100,
    counter: 0,
    utils: Utils,
    init () {
      this.pillQ = Assets.webgl ? Config.magicPillsQ : 1
      // var pills = Assets.ParticleContainer(this.pillQ);

      // cont.addChild(pills);

      this.vx = this.utils.randomNumberBetween(1, 5)
      this.vy = this.utils.randomNumberBetween(1, 5)

      for (let i = 0; i < this.pillQ; i++) {
        const s = Assets.Sprite('star.png')
        s.anchor.set(0.5)
        s.name = 'magicPill'
        s.tint = Math.random() * 0xFFFFFF

        s.scale.set(this.utils.randomNumberBetween(0.5, 0.6))
        s.rotate = this.utils.randomNumberBetween(-4, 4)
        s.radius = s.width

        if (this.utils.isMobileOnly) {
          const newScale = s.scale.x * Config.mobileOnlyScaling
          s.scale.set(newScale)
        }
        this.pills.push(s)
      }
      this.bottomEdge = this.utils.wh.canvasHeight + this.edgeBuffer
      this.rightEdge = this.utils.wh.canvasWidth + this.edgeBuffer
      this.wh = this.utils.wh

      return this.pills
    },
    rotate (obj) {
      this.vx = obj.vx
      this.vy = obj.vy
    },
    resize (wh) {
      this.wh = wh
      this.bottomEdge = this.wh.canvasHeight + this.edgeBuffer
      this.rightEdge = this.wh.canvasWidth + this.edgeBuffer
      for (let i = 0; i < this.pelletQ; i++) {
        this.pills[i].x = this.utils.randomNumberBetween(0, wh.canvasWidth)
        this.pills[i].y = this.utils.randomNumberBetween(0, wh.canvasHeight)
      }
    },
    animate (vx, vy) {
      for (let i = 0; i < this.pillQ; i++) {
        const p = this.pills[i]
        p.x -= vx// / || this.vx;
        p.y -= vy// || this.vy;
        p.rotation += this.utils.deg2rad(p.rotate)

        if (p.y > this.bottomEdge) {
          p.y = this.utils.randomNumberBetween(-this.edgeBuffer, 0)
        } else if (p.y < -this.edgeBuffer) {
          p.y = this.utils.randomNumberBetween(this.wh.canvasHeight, this.bottomEdge)
        }

        if (p.x > this.rightEdge) {
          p.x = this.utils.randomNumberBetween(-this.edgeBuffer, 0)
        } else if (p.x < -this.edgeBuffer) {
          p.x = this.utils.randomNumberBetween(this.wh.canvasWidth, this.rightEdge)
        }
        // let c1 = {radius: 20, x: (this.wh.canvasWidth / 2), y: (this.wh.canvasHeight / 2)};

        // if(!this.effect && this.utils.circleToCircleCollisionDetection(c1, this.pills[i])) {
        // 	this.playEffect();
        // } else if(this.effect === true){
        // 	this.counter ++;

        // 	if (this.counter >= this.lifeSpan){
        // 		this.effectFunction();
        // 		this.effect = false;
        // 		this.counter = 0;
        // 	}
        // }
      }
    }
  }
}
