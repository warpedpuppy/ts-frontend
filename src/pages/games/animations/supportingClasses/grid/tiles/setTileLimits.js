import Utils from '../../../utils/utils'

const SetTileLimits = {
  utils: Utils,
  returnAbove (i, j) {
    const newi = (i - 1 >= 0) ? (i - 1) : undefined
    const newj = j

    if (newi !== undefined && newj !== undefined) {
      return this.utils.root.grid.gridBuild.blocks[newi][newj]
    }
    return undefined
  },
  returnBelow (i, j) {
    const newi = (i + 1 < (this.utils.root.grid.gridBuild.rowQ)) ? (i + 1) : undefined
    const newj = j

    if (newi !== undefined && newj !== undefined) {
      return this.utils.root.grid.gridBuild.blocks[newi][newj]
    }
    return undefined
  },
  returnLeft (i, j) {
    const newi = i
    const newj = (j - 1 >= 0) ? (j - 1) : undefined
    if (newi !== undefined && newj !== undefined) {
      return this.utils.root.grid.gridBuild.blocks[newi][newj]
    }
    return undefined
  },
  returnRight (i, j) {
    const newi = i
    const newj = (j + 1 < (this.utils.root.grid.gridBuild.colQ)) ? (j + 1) : undefined

    if (newi !== undefined && newj !== undefined) {
      return this.utils.root.grid.gridBuild.blocks[newi][newj]
    }
    return undefined
  },
  assignAboveBelowRightLeftCovered () {
    for (let i = 0; i < this.utils.root.grid.gridBuild.rowQ; i++) {
      for (let j = 0; j < this.utils.root.grid.gridBuild.colQ; j++) {
        const above = this.returnAbove(i, j)
        if (!above) continue
        this.utils.root.grid.gridBuild.blocks[i][j].above = above
        this.utils.root.grid.gridBuild.blocks[i][j].aboveCovered = above.covered

        const below = this.returnBelow(i, j)
        if (!below) continue
        this.utils.root.grid.gridBuild.blocks[i][j].below = below
        this.utils.root.grid.gridBuild.blocks[i][j].belowCovered = below.covered

        const right = this.returnRight(i, j)
        if (!right) continue
        this.utils.root.grid.gridBuild.blocks[i][j].right = right
        this.utils.root.grid.gridBuild.blocks[i][j].rightCovered = right.covered

        const left = this.returnLeft(i, j)
        if (!left) continue
        this.utils.root.grid.gridBuild.blocks[i][j].left = left
        this.utils.root.grid.gridBuild.blocks[i][j].leftCovered = left.covered


      }
    }
  }

}
export default SetTileLimits;