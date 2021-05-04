import Utils from '../utils'
import Tweens from '../Tweens'

export default function SpaceShipReturnHome() {
  return {
    utils: Utils,
    spaceShipReturnHome (background, maze, ship, onCompleteHandler) {
      this.utils.root.animations.circles({ start: true, expand: true })

      this.background = background
      this.maze = maze
      this.ship = ship
      this.onCompleteHandler = onCompleteHandler
      Tweens.tween(background.scale, 5,
        {
          x: [1, 10],
          y: [1, 10]
        },
        this.spaceShipReturnHome_2.bind(this),
        'linear')

      Tweens.tween(this.background, 5,
        {
          alpha: [1, 0]
        },
        undefined,
        'linear')
    },
    spaceShipReturnHome_2 () {
      Tweens.tween(this.maze.scale, 1,
        {
          x: [this.maze.scale.x, 1],
          y: [this.maze.scale.y, 1]
        },
        this.spaceShipReturnHome_3.bind(this),
        'linear')

      // Tweens.tween(this.maze, 1,
      // {
      // 	x: [this.maze.x, this.utils.root.grid.gridBuild.initialPoint.x],
      // 	y:  [this.maze.y, this.utils.root.grid.gridBuild.initialPoint.y]
      // },
      // this.spaceShipReturnHome_3.bind(this),
      // 'easeOutBounce'
      // )
    },
    spaceShipReturnHome_3 () {
      // Tweens.tween(this.maze.scale, 1,
      // {
      // 	x: [this.maze.scale.x,1],
      // 	y: [this.maze.scale.y, 1]
      // },
      // this.spaceShipReturnHome_4.bind(this),
      // 'easeOutBounce'
      // )
      Tweens.tween(this.ship, 1,
        {
          rotation: [this.ship.rotation, this.utils.deg2rad(0)]
        },
        this.onCompleteHandler,
        'easeOutBounce')
    }
    // spaceShipReturnHome_4: function () {
    // 	Tweens.tween(this.ship, 1,
    // 	{
    // 		rotation: [this.ship.rotation, this.utils.deg2rad(0)]
    // 	},
    // 	this.spaceShipReturnHome_5.bind(this),
    // 	'easeOutBounce'
    // 	)

    // },
    // spaceShipReturnHome_5: function () {
    // 	Tweens.tween(this.ship.scale, 1,
    // 	{
    // 		x: [this.ship.scale.x, Tweens.blastOff.storeShipScale],
    // 		y: [this.ship.scale.y, Tweens.blastOff.storeShipScale]
    // 	},
    // 	this.onCompleteHandler,
    // 	'easeOutBounce')
    // }
  }
}
