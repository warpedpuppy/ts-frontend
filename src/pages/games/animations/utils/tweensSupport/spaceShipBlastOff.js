import Assets from '../assetCreation'
import Utils from '../utils'
import Tweens from '../Tweens'

export default function SpaceShipBlastOff() {
  return {
    utils: Utils,
    spaceShipBlastOff (ship, maze, background, onCompleteHandler) {
      this.utils.root.animations.circles({ start: true, expand: false })
      this.utils.root.fly.flyBackground.clouds.removeFromStage()
      this.storeX = maze.x
      this.storeY = maze.y
      this.storeShipScale = ship.scale.x
      this.mazeWidth = maze.calculatedWidth
      this.ship = ship
      this.maze = maze
      this.background = background
      this.blastOffComplete = onCompleteHandler

      Tweens.tween(this.ship, 1,
        {
          rotation: [this.ship.rotation, this.utils.deg2rad(90)]
        },
        this.spaceShipBlastOff_2.bind(this),
        'easeOutBounce')
    },
    spaceShipBlastOff_2 () {
      this.utils.root.grid.gridBuild.vortexes.addRemoveVortexes(false)

      const { shipSpace } = this.utils.root.grid.gridBuild
      this.utils.root.grid.gridBuild.cont.pivot = Assets.Point(shipSpace[0], shipSpace[1])

      this.maze.x = this.utils.canvasWidth / 2
      this.maze.y = this.utils.canvasHeight / 2

      Tweens.tween(this.maze.scale, 1, {
        x: [this.maze.scale.x, 0],
        y: [this.maze.scale.y, 0]
      },
      this.spaceShipBlastOff_3.bind(this),
      'easeInOutQuad')

      Tweens.tween(this.ship.scale, 1, {
        x: [this.ship.scale.x, 1],
        y: [this.ship.scale.y, 1]
      },
      undefined,
      'easeInOutQuad')
    },
    spaceShipBlastOff_3 () {
      this.background.alpha = 0
      this.background.isTweening = false
      Tweens.tween(this.background.scale, 5,
        {
          x: [10, 1],
          y: [10, 1]
        },
        this.blastOffComplete,
        'linear')

      Tweens.tween(this.background, 5,
        {
          alpha: [0, 1]
        },
        undefined,
        'linear')
    }

  }
}
