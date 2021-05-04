import Utils from '../../utils/utils'

export default function GridResizeHandler () {
  return {
    utils: Utils,
    resize () {
      const { gridBuild } = this.utils.root.grid

      this.utils.root.grid.gridAction.pause = true
      this.utils.root.action = false

      if (!gridBuild.calcResize) {
        gridBuild.calcResize = true
        const block = this.utils.root.grid.gridAction.storeCurrent
        gridBuild.saveI = block.i
        gridBuild.saveJ = block.j
      }

      gridBuild.cont.alpha = 0
      window.clearTimeout(this.timeOut)
      this.timeOut = setTimeout(this.resized.bind(this), 200)
    },
    resized () {
      const { gridBuild } = this.utils.root.grid

      gridBuild.calcResize = false
      gridBuild.cont.alpha = 1
      gridBuild.saveI++
      gridBuild.saveJ++
      const halfWidth = this.utils.canvasWidth / 2
      const halfHeight = this.utils.canvasHeight / 2
      gridBuild.cont.x = halfWidth - (gridBuild.saveJ * gridBuild.blockWidth) + (gridBuild.blockWidth / 2)
      gridBuild.cont.y = halfHeight - (gridBuild.saveI * gridBuild.blockHeight) + (gridBuild.blockHeight / 2)

      this.utils.root.grid.gridAction.pause = false
      this.utils.root.action = true

      gridBuild.gridItems.placeItems(gridBuild[`${this.utils.root.activeMode}TreasureChests`])
      gridBuild.gridItems.placeItems(gridBuild.magicPillsArray)

      window.clearTimeout(this.timeOut)
    }

  }
}
