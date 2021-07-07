import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'
import Tweens from '../../utils/Tweens'
import Config from '../../animationsConfig'

export default function ThreeInARow() {
  return {
    cont: Assets.Container(),
    utils: Utils,
    dots: [],
    colQ: Config.spaceColQ,
    rowQ: Config.spaceRowQ,
    temp: [],
    tempCounter: 0,
    delayTimes: 0,
    activeDelayTimes: 500,
    setUp: true,
    dot1: undefined,
    dot2: undefined,
    init (arr, spacer, colors, startScale, cont, listeners) {
      this.done = this.done.bind(this)
      this.completeHandler1 = this.completeHandler1.bind(this)
      this.completeHandler2 = this.completeHandler2.bind(this)
      this.mainArr = arr
      this.spacer = spacer
      this.rainbowColors = Config.colors
      this.startScale = startScale
      this.cont = cont
      this.cont.visible = false
      this.listeners = listeners
      return this
    },
    completeHandler1 () {
      const result = this.lookForThreeOfAKind() || [[], '']

      const arr = result[0]
      const direction = result[1]
      // if(this.dot1)this.dot1.scale.set(this.startScale);

      // if(this.dot2)this.dot2.scale.set(this.startScale);
      this.listeners(false)
      if (!arr.length) {
        // this.touchPower(true);
        this.listeners(true)
        if (this.setUp) {
          this.setUp = false
          this.delayTimes = this.activeDelayTimes
          this.cont.visible = true
        }
      } else {
        this.temp = []
        this.tempCounter = 0

        if (!this.setUp) {
          arr.forEach((item) => {
            item.scaleIt('big')
          })
        }

        const obj = { arr, direction }
        setTimeout(this.completeHandler2.bind(this, obj), this.delayTimes)
      }
    },
    completeHandler2 (obj) {
      const { arr } = obj
      const { direction } = obj
      const { mainArr } = this

      arr.forEach((item) => {
        item.scaleIt()
      })

      if (direction === 'horiz') {
        arr.forEach((item) => {
          let index = mainArr.indexOf(item)
          while (mainArr[index]) {
            const dot = mainArr[index]
            this.temp.push(dot)

            const targetIndex = index - this.colQ

            if (targetIndex >= 0) {
              dot.background.tint = mainArr[targetIndex].background.tint
              dot.color = mainArr[targetIndex].color
            } else {
              const item = this.utils.randomItemFromArray(this.rainbowColors)
              dot.background.tint = item
              dot.color = item
            }

            if (!this.setUp) {
              mainArr[index].startY = mainArr[index].y
              mainArr[index].y -= this.spacer
            }

            index = targetIndex
          }
        })
      } else if (direction === 'vert') {
        let index = mainArr.indexOf(arr.pop())
        const firstIndex = mainArr.indexOf(arr[0])
        let firstNonComboIndex = firstIndex - this.colQ
        const riseAmount = (arr.length + 1) * this.spacer

        while (mainArr[index]) {
          const dot = mainArr[index]
          if (!this.setUp) {
            dot.y -= riseAmount
          }
          this.temp.push(dot)

          if (firstNonComboIndex >= 0) {
            dot.background.tint = mainArr[firstNonComboIndex].background.tint
            dot.color = mainArr[firstNonComboIndex].color
          } else {
            const item = this.utils.randomItemFromArray(this.rainbowColors)

            dot.background.tint = item// [0];
            dot.color = item// 1];
          }

          firstNonComboIndex -= this.colQ
          index -= this.colQ
        }
      }
      if (!this.setUp) {
        this.temp.forEach((item) => {
          Tweens.tween(item, 0.5, { y: [item.y, item.startY] }, this.done, 'easeOutBounce')
        })
      } else {
        this.completeHandler1()
      }
    },
    done () {
      this.tempCounter++

      if (this.tempCounter === this.temp.length) {
        this.temp.forEach((item) => {
          item.y = item.startY
        })

        setTimeout(this.completeHandler1, this.delayTimes)
        this.tempCounter = 0
      }
    },
    lookForThreeOfAKind () {
      let horiz = []
      let vert = []
      let counter = 0
      let testVerts = true
      const arr = this.mainArr

      // there are two events that prompt the returning of the array:
      // 1) the end of a row if it found three of a kind
      // 2) the introduction of a new color after three or more had been put into an array

      for (let i = 0; i < arr.length; i++) {
        const dot = arr[i]
        const lastHorizItem = horiz[horiz.length - 1]

        if (lastHorizItem && dot.color === lastHorizItem.color) {
          horiz.push(dot)
          if (counter === this.colQ - 1 && horiz.length >= 3) {
            return [horiz, 'horiz']
          }
        } else {
          if (horiz.length >= 3) {
            return [horiz, 'horiz']
          }

          horiz = [dot]
        }

        if (testVerts) {
          let loopQ = 0
          while (loopQ < this.rowQ) {
            const x = i + (this.colQ * loopQ)

            const lastVertItem = vert[vert.length - 1]
            if (lastVertItem && arr[x].color === lastVertItem.color) {
              vert.push(arr[x])
              if (loopQ === (this.rowQ - 1) && vert.length >= 3) {
                return [vert, 'vert']
              }
            } else {
              if (vert.length >= 3) {
                return [vert, 'vert']
              }
              vert = [arr[x]]
            }
            loopQ++
          }
          vert = []
        }

        counter++
        if (counter === this.colQ) {
          testVerts = false
          counter = 0
          horiz = []
        }
      }
    }
  }
}
