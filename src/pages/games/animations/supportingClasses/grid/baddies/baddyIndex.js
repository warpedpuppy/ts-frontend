import Utils from '../../../utils/utils'
import Config from '../../../animationsConfig'
import Baddy from './baddy'
import BaddyAction from './baddyAction'
import BaddyHouse from './baddyHouse'

export default function BaddyIndex() {
  return {
    utils: Utils,
    spears: [],
    castles: [],
    soldiers: [],
    solderPerGridSquareQ: 1,
    baddiesPool: [],
    castlePool: [],
    spearsPool: [],
    baddy: Baddy(),
    baddyAction: BaddyAction(),
    init (mode) {
      this.animate = this.animate.bind(this)
      this.loopingQ = Config[`${mode}BaddyQ`]
      // this.baddyAction = BaddyAction(this.soldiers, this.spears, gridBuild);

      for (let i = 0; i < this.loopingQ; i++) {
        // make castle array
        let c
        // if (!this.castles[i]) {
        c = BaddyHouse(this.utils.root.grid.gridBuild).init()
        this.castlePool.push(c)
        // } else {
        //	c = this.castles[i];
        // }

        // make baddy array

        for (let j = 0; j < this.solderPerGridSquareQ; j++) {
          let s
          // if (!this.soldiers[soldierCounter]) {
          s = Baddy(this.utils.root.grid.gridBuild).init('soldier.png')
          this.spearsPool.push(s.classRef.spear)
          s.classRef.spear.classRef.counter = 0
          this.baddiesPool.push(s)
          // } else {
          //	s = this.soldiers[soldierCounter];

          // }
          // soldierCounter ++;
          s.castle = c
        }
      }

      this.setArrays()
    },
    setArrays () {
      this.castles = [...this.castlePool]
      this.soldiers = [...this.baddiesPool]
      this.spears = [...this.spearsPool]
    },
    placeCastlesAndSoldiers (gridBuild) {

      const { freeSpaces } = gridBuild

      const bw = Config[`${this.utils.root.activeMode}BlockSize`][0]
      const bh = Config[`${this.utils.root.activeMode}BlockSize`][1]

      for (let i = 0; i < this.castles.length; i++) {
        const freeSpacesIndex = Math.floor(Math.random() * freeSpaces.length)

        const block = freeSpaces[freeSpacesIndex]
        const c = this.castles[i]

        c.x = block[0] + bw / 2
        c.y = block[1] + bh / 2
        c.block = block

        c.classRef.addToStage()

        this.utils.root.grid.gridBuild.freeSpaces.splice(freeSpacesIndex, 1)
      }

      this.soldiers.forEach((soldier) => {
        const block = soldier.block = soldier.castle.block
        soldier.x = soldier.startX = soldier.classRef.spear.x = block[0] + bw / 2
        soldier.y = soldier.startY = soldier.classRef.spear.y = block[1] + bh / 2
        soldier.classRef.addToStage()
      })

      this.baddyAction.setVars(this.soldiers, this.spears, gridBuild)
    },
    removeCastlesAndSoldiers () {
      this.soldiers.forEach((s) => {
        s.classRef.removeFromStage()
      })
      this.castles.forEach((c) => {
        c.classRef.removeFromStage()
      })
      this.castles.length = 0
      this.soldiers.length = 0
    },
    animate () {
      if (this.pause) return
      this.baddyAction.animate()
    }

  }
}
