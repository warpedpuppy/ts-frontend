import Utils from '../../utils/utils'
import Config from '../../animationsConfig'
import TransitionItems from './items/transition/transitionItems'
import Treasure from './items/treasure/treasure'
import MagicPills from './items/magic/magicPills'
import GridBuild from './gridBuild'
import GridAction from './gridAction'

export default function GridIndex() {
  return {
    blocks: {},
    utils: Utils,
    boards: [],
    currentBoard: 0,
    transitionItems: TransitionItems(),
    magicPills: MagicPills(),
    treasure: Treasure(),
    transitionItemsArray: [],
    flyTreasureChests: [],
    swimTreasureChests: [],
    magicPillsArray: [],
    gridAction: GridAction(),
    gridBuild: GridBuild(),
    init () {
      this.parent = this.utils.root

      this.parentCont = this.parent.kingCont

      // this.boards = this.parent.dbData.boards;

      this.magicPillsArray = this.magicPills.init()

      this.treasure.init()

      this.flyTreasureChests = this.treasure.createAndReturnChests(Config.flyTreasureChestQ)

      this.swimTreasureChests = this.treasure.createAndReturnChests(Config.swimTreasureChestQ)

      this.transitionItemsArray = this.transitionItems.init().build()

      this.gridBuild.init()

      this.gridAction.init()

      // this.gridComplete = GridComplete.init();

      this.nextBoard = this.nextBoard.bind(this)
    },
    clearGrid () {
      this.gridBuild[`${this.utils.root.activeMode}Baddies`].removeCastlesAndSoldiers()
    },
    changeGridSize () {
      const w = Config[`${this.parent.activeMode}BlockSize`][0]
      const h = Config[`${this.parent.activeMode}BlockSize`][1]

      this.gridBuild.blockWidth = w
      this.gridBuild.blockHeight = h

      this.gridBuild.buildGrid(this.boards[this.gridBuild.currentBoard])

      this.gridAction.setLimits()
    },
    nextBoard (id) {
      this.gridBuild.tokens.forEach((item) => {
        item.placed = false
      })

      if (!id) {
        this.gridBuild.currentBoard = this.boards[this.boards.length - 1]
      } else {
        this.gridBuild.currentBoard = this.boards.find((board) => board.id === id)
      }
      this.gridBuild.cont.removeChildren()
      this.gridBuild.blocks = {}
      this.gridBuild.buildGrid(this.gridBuild.currentBoard)
      this.gridBuild.resetBaddies()
      this.gridAction.setLimits()

      this.utils.root.activeAction.vx = this.utils.root.activeAction.vy = 0
    },
    addToStage (index) {
      this.gridAction.pause = false
      this.parentCont.addChildAt(this.gridBuild.cont, index)
      if (this.utils.root.all) {
        this.gridBuild.vortexes.addRemoveVortexes(true)
      }
    },
    removeFromStage () {
      this.gridAction.pause = true
      this.parentCont.removeChild(this.gridBuild.cont)
      if (this.utils.root.all) {
        this.gridBuild.vortexes.addRemoveVortexes(false)
      }
    },
    resize () {
      this.gridBuild.gridResizeHandler.resize()
      this.gridAction.setLimits()
    },
    animate () {
      this.gridAction.animate(this.utils.root.activeAction.vx, this.utils.root.activeAction.vy)
    }
  }
}
