import Assets from '../../../../utils/assetCreation'
import Utils from '../../../../utils/utils'
import Config from '../../../../animationsConfig'

export default function Dots() {
  return {
    utils: Utils,
    radius: 1,
    collisionDetect: {},
    build (planetWidth) {
      const dotsCont = Assets.Container()
      const dotsArray = []
      const dotQ = this.dotQ = Config.spaceDotsPerPlanet
      const dist = this.dist = (planetWidth / 2) + 10

      dotsCont.dist = dist

      for (let k = 0; k < dotQ; k++) {
        const dot = this.dot()
        dot.radius = this.radius
        dot.dist = this.dist
        dot.x = dot.startX = this.dist * Math.cos((2 * Math.PI) * k / this.dotQ)
        dot.y = dot.startY = this.dist * Math.sin((2 * Math.PI) * k / this.dotQ)
        // cont.dots.push(dot);
        dotsCont.addChild(dot)
        // this.dotOP.push(dot);
        dotsArray.push(dot)
      }
      dotsCont.dots = dotsArray
      dotsCont.rotate = 0.02
      // dotsCont.x = cont.x;
      // dotsCont.y = cont.y;
      // this.orbsCont.addChild(dotsCont);
      // this.dotsContArray.push(dotsCont);

      return dotsCont
    },
    dot () {
      const dot = Assets.Graphics()
      dot.beginFill(0xFFFF00).drawCircle(0, 0, this.radius).endFill()
      return dot
    },
    addToStage () {

    },
    removeFromStage () {

    },
    resize () {

    },
    animate () {

    }
  }
}
