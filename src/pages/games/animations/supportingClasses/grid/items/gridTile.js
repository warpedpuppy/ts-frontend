import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
import Tweens from '../../utils/tweens'
import SpaceShip from './items/spaceShip/spaceShip'
import Config from '../../animationsConfig'
import Baddies from './baddies/baddyIndex'
// import Tokens from '../tokens/levelTokens';
export default {
  cont: Assets.ParticleContainer(10000),
  blockWidth: 0,
  blockHeight: 0,
  blocks: {},
  utils: Utils,
  colQ: 4,
  rowQ: 10,
  buffer: 10,
  tokens: [],
  tokenData: {},
  freeSpaces: [],
  coveredSpaces: [],
  // boards: [],
  currentBoard: 0,
  blockPool: [],
  gridCirclePool: [],
  spaceShip: {},
  wallHit: 0,
  transitionItemsArray: [],
  treasureChests: [],
  magicPillsArray: [],
  itemLoopingQ: 0,
  // soldiers: [],
  // castles: [],
  // spears: [],
  // solderPerGridSquareQ: 1,
  flyBaddies: Baddies(),
  swimBaddies: Baddies(),
  onGridCoins: {},
  omnibusArray: [],
  flyColors: [0x5713B8, 0xFF0F59, 0x4A34FF, 0x60B800, 0x0122FA],
  init () {
    // this.moveItem = this.moveItem.bind(this);

    this.flyTexture = this.utils.spritesheet.textures['grassSquareSmall.png']
    this.whiteSquare = this.utils.spritesheet.textures['whiteTile.png']

    this.microscope = Assets.Sprite('microscope.png')
    this.microscope.anchor.set(0.5)
    this.microscope.scale.set(0.5)
    this.microscope.name = 'bounce'
    // items to be distributed around board
    this.spaceShip = SpaceShip().init()
    this.tokens = this.utils.root.tokens.tokens
    this.magicPillsArray = this.utils.root.grid.magicPillsArray
    this.flyTreasureChests = this.utils.root.grid.flyTreasureChests
    this.swimTreasureChests = this.utils.root.grid.swimTreasureChests
    this.transitionItemsArray = this.utils.root.grid.transitionItemsArray

    // this.omnibusArray = [
    // 	...this.magicPillsArray,
    // 	...this.flyTreasureChests,
    // 	...this.swimTreasureChests,
    // 	...this.transitionItemsArray,
    // 	...this.tokens,
    // 	this.spaceShip,
    // 	this.microscope
    // ];

    // this.boards = this.utils.root.dbData.boards;
    // console.log('this grid build init')
    // this.buildGrid(this.boards[this.currentBoard]);

    this.flyBaddies.init('fly')
    this.swimBaddies.init('swim')

    this.onGridCoins = {
      fly: [],
      swim: []
    }

    return this
  },
  resetBaddies () {
    this.flyBaddies.setArrays()
    this.swimBaddies.setArrays()
  },
  createObj (board) {
    const obj = {}
    for (const arr of board.grid) {
      obj[`${arr[0]}_${arr[1]}`] = 'covered'
    }
    obj[`${board.token1.i}_${board.token1.j}`] = 'token1'
    obj[`${board.token2.i}_${board.token2.j}`] = 'token2'
    // obj[`${board.token3.i}_${board.token3.j}`] = 'token3';
    // obj[`${board.token4.i}_${board.token4.j}`] = 'token4';
    return obj
  },
  addCoinToGrid () {
    const coinsInArray = this.onGridCoins[this.utils.root.activeMode].length
    const totalCoins = this.utils.root.score[`${this.utils.root.activeMode}Total`]

    if (coinsInArray < totalCoins) {
      const num = Math.ceil(Math.random() * 11)
      const coin = Assets.Sprite(`jewel${num}.png`)
      coin.hit = false

      coin.anchor.set(0.5)
      coin.tint = 0xB29700
      this.onGridCoins[this.utils.root.activeMode].push(coin)

      // add to stage
      this.placeCoin(coin)
    }
  },
  buildGrid (data) {
    const mode = this.utils.root.activeMode
    const obj = this.createObj(data)
    let counter = 0
    let b
    let gridCircle
    this.cont.scale.set(1)
    this.cont.pivot = Assets.Point(0, 0)
    this[`${mode}Baddies`].removeCastlesAndSoldiers()
    this.wallHit = Config[`${mode}WallHit`]
    this.buffer = Config[`${mode}Buffer`]
    this.blockWidth = Config[`${mode}BlockSize`][0]
    this.blockHeight = Config[`${mode}BlockSize`][1]
    this.rowQ = data.rows
    this.colQ = data.cols
    this.freeSpaces = []
    this.coveredSpaces = []
    this.coinSpaces = []

    this.omnibusArray = [
      ...this.magicPillsArray,
      ...this[`${mode}TreasureChests`],
      ...this.transitionItemsArray,
      ...this.tokens,
      this.spaceShip,
      this.microscope
    ]

    // if (mode === 'fly') {
    //     texture = this.flyTexture;
    // }

    for (let i = 0; i < data.rows; i++) {
      this.blocks[i] = []
      for (let j = 0; j < data.cols; j++) {
        const bool = obj[`${i}_${j}`] === 'covered'

        if (!this.blockPool[counter]) {
          b = Assets.Sprite()
          gridCircle = Assets.Sprite('gridCircle600.png')
          gridCircle.anchor.set(0.5)
          this.blockPool.push(b)
          this.gridCirclePool.push(gridCircle)
        } else {
          b = this.blockPool[counter]
          gridCircle = this.gridCirclePool[counter]
        }

        b.width = this.blockWidth
        b.height = this.blockHeight
        b.covered = bool
        b.x = j * this.blockWidth
        b.y = i * this.blockHeight

        this.cont.addChild(b)

        gridCircle.width = this.blockWidth
        gridCircle.height = this.blockHeight
        gridCircle.x = j * this.blockWidth + (this.blockWidth / 2)
        gridCircle.y = i * this.blockHeight + (this.blockHeight / 2)

        let token = false
        if (obj[`${i}_${j}`] && obj[`${i}_${j}`].includes('token')) {
          const num = obj[`${i}_${j}`].slice(-1)
          token = true
          this.tokenData[num] = { x: b.x, y: b.y }
        }

        // store free ones
        const heroSpace = !!((String(i) === data.hero.i && String(j) === data.hero.j))

        if (!bool && !token && !heroSpace) {
          this.freeSpaces.push([b.x, b.y, b, i, j])
        }

        if (bool) {
          b.texture = this.whiteSquare
          // b.tint = 0x003300;
          this.coveredSpaces.push(b)
        } else {
          b.texture = this.whiteSquare
          // b.tint = this.utils.randomItemFromArray(this.flyColors);
          b.alpha = 0.25
          b.gridCircle = gridCircle
          gridCircle.alpha = 0.25
          this.cont.addChild(gridCircle)
        }

        this.blocks[i][j] = b
        counter++
      }
    }

    this.placeShip()
    this.placeMircoscope()
    this.placeItems(this.transitionItemsArray, true)
    this.placeItems(this[`${mode}TreasureChests`])
    this.placeItems(this.magicPillsArray)

    this.placeCoins(this.onGridCoins[mode])

    this[`${mode}Baddies`].placeCastlesAndSoldiers(this)

    this.assignAboveBelowRightLeftCovered()

    this.placeTokens()
    this.heroJ = data.hero.j
    this.heroI = data.hero.i
    this.placeHero()

    this.initialPoint = { x: this.cont.x, y: this.cont.y }

    this.cont.calculatedWidth = data.cols * this.blockWidth
    this.cont.calculatedHeight = data.rows * this.blockHeight
    // this.changeBackground(this.utils.root.activeMode)
  },
  placeShip () {
    // for now just place space ship here
    const index = (!Config.testing) ? Math.floor(Math.random() * this.freeSpaces.length) : 0
    this.spaceShip.x = this.spaceShip.storeX = this.freeSpaces[index][0] + this.blockWidth / 2
    this.spaceShip.y = this.spaceShip.storeY = this.freeSpaces[index][1] + this.blockHeight / 2
    this.freeSpaces.splice(index, 1)
    this.cont.addChild(this.spaceShip)
  },
  placeMircoscope () {
    // for now just place space ship here
    const index = (!Config.testing) ? Math.floor(Math.random() * this.freeSpaces.length) : 1
    this.microscope.x = this.microscope.storeX = this.freeSpaces[index][0] + this.blockWidth / 2
    this.microscope.y = this.microscope.storeY = this.freeSpaces[index][1] + this.blockHeight / 2
    this.freeSpaces.splice(index, 1)
    this.microscope.hit = false
    this.cont.addChild(this.microscope)
  },
  placeCoin (coin) {
    // this needs its own function
    let coinSpacePossible = false
    if (this.coinSpaces.length) {
      coinSpacePossible = true
    }
    // if there are coinSpaces and random 10 < 5, use one of those spaces
    const coinSpaceUse = Math.floor(Math.random() * 10) < 5
    if (this.freeSpaces.length === 0 || (coinSpacePossible && coinSpaceUse)) {
      // add coin to space which currently has other coins
      // console.log('add coin to new already used coin space')
      const i = Math.floor(Math.random() * this.coinSpaces.length)
      coin.x = this.coinSpaces[i][0] + this.blockWidth / 2
      coin.y = this.coinSpaces[i][1] + this.blockHeight / 2
      coin.currentSpace = this.freeSpaces[i]
      this.cont.addChild(coin)
    } else {
      // console.log('add coin to new free space')
      // place it on a free space

      const i = Math.floor(Math.random() * this.freeSpaces.length)
      console.log(this.freeSpaces.length, i)

      coin.x = this.freeSpaces[i][0] + this.blockWidth / 2
      coin.y = this.freeSpaces[i][1] + this.blockHeight / 2

      coin.currentSpace = this.freeSpaces[i]
      this.coinSpaces.push(this.freeSpaces[i])
      this.freeSpaces.splice(i, 1)
      this.cont.addChild(coin)
    }

    // coin.scale.set(this.utils.randomNumberBetween(0.075, 0.25));

    coin.startPointX = coin.x
    coin.differential = this.utils.randomNumberBetween(10, 30)
    coin.speed = this.utils.randomNumberBetween(0.001, 0.005)

    coin.startPointY = coin.y
    coin.differential = this.utils.randomNumberBetween(10, 30)
    coin.speed = this.utils.randomNumberBetween(0.001, 0.005)
  },
  placeCoins (array) {
    // this needs its own function because coins can share spaces
    array.forEach((coin) => {
      this.placeCoin(coin)
    })
  },
  placeItems (array, isTransitionItem) {
    array.forEach((item) => {
      if (!this.freeSpaces.length) return

      if (isTransitionItem) {
        if (item.name === this.utils.root.activeMode) {
          if (this.utils.root.activeMode === 'fly') {
            item.texture = this.utils.spritesheet.textures['swimTrans.png']
            item.name = 'swim'
          } else if (this.utils.root.activeMode === 'swim') {
            item.texture = this.utils.spritesheet.textures['flyTrans.png']
            item.name = 'fly'
          }
        }
      }
      item.hit = false
      const i = Math.floor(Math.random() * this.freeSpaces.length)
      item.x = this.freeSpaces[i][0] + this.blockWidth / 2
      item.y = this.freeSpaces[i][1] + this.blockHeight / 2
      item.storeScaleX = item.scale.x
      item.storeScaleY = item.scale.y
      item.counter = 0
      item.counterLimit = this.utils.randomIntBetween(Config.itemLifeSpan[0], Config.itemLifeSpan[1])
      // item.isTweening = false;
      // this.freeSpaces.push([b.x, b.y, b, i, j]);
      item.currentSpace = this.freeSpaces[i]
      this.freeSpaces.splice(i, 1)
      this.cont.addChild(item)
    })
  },
  moveItem1 (item) {
    //	alert("shrink")
    item.hit = true

    // this.moveItem2 = this.moveItem2.bind(this);
    // let onCompleteHandler = ;
    Tweens.tween(item.scale, 1,
      {
        x: [item.scale.x, 0],
        y: [item.scale.y, 0]
      },
      this.moveItem2.bind(this, item),
      'easeOutBounce')
  },
  moveItem2 (item) {
    // alert("grow")
    // console.log("two hit")
    // let onCompleteHandler = ;
    Tweens.tween(item.scale, 1,
      {
        x: [0, item.storeScaleX],
        y: [0, item.storeScaleY]
      },
      this.moveItem3.bind(this, item),
      'easeOutBounce')

    this.freeSpaces.push(item.currentSpace)

    // get new space for item
    const i = Math.floor(Math.random() * this.freeSpaces.length)
    item.x = this.freeSpaces[i][0] + this.blockWidth / 2
    item.y = this.freeSpaces[i][1] + this.blockHeight / 2
    item.currentSpace = this.freeSpaces[i]
    this.freeSpaces.splice(i, 1)
    // this.cont.addChild(item);
  },
  moveItem3 (item) {
    // alert("reset")
    item.hit = false
    item.counter = 0
    item.isTweening = false
  },
  placeTokens () {
    for (const key in this.tokenData) {
      const index = key - 1
      const t = this.tokens[index]
      if (t.placed) {
        continue
      }
      t.anchor.set(0.5)
      t.num = key
      t.x = this.tokenData[key].x + this.blockWidth / 2
      t.y = this.tokenData[key].y + this.blockHeight / 2
      // this.tokens.push(t);
      if (t.num < 4) this.cont.addChild(t)
    }
  },
  placeHero () {
    let i = this.heroI
    let j = this.heroJ
    // we know 1,1 is free, so place that beneath the hero
    i++
    j++
    const halfWidth = this.utils.canvasWidth / 2
    const halfHeight = this.utils.canvasHeight / 2
    this.cont.x = halfWidth - (j * this.blockWidth) + (this.blockWidth / 2)
    this.cont.y = halfHeight - (i * this.blockHeight) + (this.blockHeight / 2)
  },
  returnAbove (i, j) {
    const newi = (i - 1 >= 0) ? (i - 1) : undefined
    const newj = j

    if (newi !== undefined && newj !== undefined) {
      return this.blocks[newi][newj]
    }
    return undefined
  },
  returnBelow (i, j) {
    const newi = (i + 1 < (this.rowQ)) ? (i + 1) : undefined
    const newj = j

    if (newi !== undefined && newj !== undefined) {
      return this.blocks[newi][newj]
    }
    return undefined
  },
  returnLeft (i, j) {
    const newi = i
    const newj = (j - 1 >= 0) ? (j - 1) : undefined
    if (newi !== undefined && newj !== undefined) {
      return this.blocks[newi][newj]
    }
    return undefined
  },
  returnRight (i, j) {
    const newi = i
    const newj = (j + 1 < (this.colQ)) ? (j + 1) : undefined

    if (newi !== undefined && newj !== undefined) {
      return this.blocks[newi][newj]
    }
    return undefined
  },
  resize () {
    this.utils.root.grid.gridAction.pause = true
    this.utils.root.action = false

    if (!this.calcResize) {
      this.calcResize = true
      const block = this.utils.root.grid.gridAction.storeCurrent
      this.saveI = block.i
      this.saveJ = block.j
    }

    this.cont.alpha = 0
    window.clearTimeout(this.timeOut)
    this.timeOut = setTimeout(this.resized.bind(this), 200)
  },
  resized () {
    this.calcResize = false
    this.cont.alpha = 1
    this.saveI++
    this.saveJ++
    const halfWidth = this.utils.canvasWidth / 2
    const halfHeight = this.utils.canvasHeight / 2
    this.cont.x = halfWidth - (this.saveJ * this.blockWidth) + (this.blockWidth / 2)
    this.cont.y = halfHeight - (this.saveI * this.blockHeight) + (this.blockHeight / 2)

    this.utils.root.grid.gridAction.pause = false
    this.utils.root.action = true
    window.clearTimeout(this.timeOut)
  },
  assignAboveBelowRightLeftCovered () {
    for (let i = 0; i < this.rowQ; i++) {
      for (let j = 0; j < this.colQ; j++) {
        const above = this.returnAbove(i, j)
        if (!above) continue
        this.blocks[i][j].above = above
        this.blocks[i][j].aboveCovered = above.covered

        const below = this.returnBelow(i, j)
        if (!below) continue
        this.blocks[i][j].below = below
        this.blocks[i][j].belowCovered = below.covered

        const right = this.returnRight(i, j)
        if (!right) continue
        this.blocks[i][j].right = right
        this.blocks[i][j].rightCovered = right.covered

        const left = this.returnLeft(i, j)
        if (!left) continue
        this.blocks[i][j].left = left
        this.blocks[i][j].leftCovered = left.covered

        // console.log(above, right, left, below)
      }
    }
  }

}
