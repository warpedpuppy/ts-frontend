import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
import Config from '../../animationsConfig'

export default function LevelComplete() {
  return {
    utils: Utils,
    init () {
      this.root = this.utils.root
      this.addButton = this.addButton.bind(this)
      this.uponNewBoardButtonPress = this.uponNewBoardButtonPress.bind(this)
      return this
    },
    boardComplete () {
      setTimeout(this.addButton, Config.boardCompleteButtonAppearDelay)
    },
    addButton () {
      this.utils.root.fullStop = true
      if (!this.nextMazeButton) {
        this.nextMazeButton = Assets.Sprite('nextMaze.png')
        this.nextMazeButton.anchor.set(0.5)
        this.nextMazeButton.x = this.utils.canvasWidth / 2
        this.nextMazeButton.y = this.utils.canvasHeight / 2

        this.nextMazeButton.on('pointerdown', this.uponNewBoardButtonPress)
      }
      this.nextMazeButton.interactive = this.nextMazeButton.buttonMode = true
      this.utils.app.stage.addChild(this.nextMazeButton)

      this.utils.root.activeAction.vx = this.utils.root.activeAction.vy = 0
      this.utils.root.keyHandler.removeFromStage()

      if (this.utils.root.activeMode === 'bounce') {
        this.utils.root.bounce.bouncePlatform.on(false)
      }
    },
    uponNewBoardButtonPress () {
      this.nextMazeButton.interactive = this.nextMazeButton.buttonMode = false
      this.utils.app.stage.removeChild(this.nextMazeButton)

      if (this.utils.root.activeMode === 'jump') {
        this.utils.root.grid.gridBuild.spaceShip.classRef.completeReturnHomeHandler()
      } else if (this.root.activeMode === 'bounce') {
        this.utils.root.endSpaceShipJourney()
      }

      this.utils.root.reset() // we make all tokens not placed
    }
  }
}
