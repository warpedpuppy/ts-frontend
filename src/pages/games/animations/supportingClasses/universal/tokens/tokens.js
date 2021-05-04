import Assets from '../../../utils/assetCreation'
import Utils from '../../../utils/utils'
import Config from '../../../animationsConfig'

export default function Tokens() {
  return {
    utils: Utils,
    build () {
      let t
      const tokens = []
      for (let i = 1; i <= 4; i++) {
        t = Assets.Sprite(`token${i}.png`)
        if (i === 1) {
          t.mode = 'fly'
        } else if (i === 2) {
          t.mode = 'swim'
        }

        t.anchor.set(0.5)
        if (this.utils.root.isMobileOnly) {
          t.scale.set(Config.mobileOnlyScaling)
        }
        t.name = 'token'
        t.placed = false
        t.num = i
        t.id = i
        tokens.push(t)
      }
      return tokens
    },
    placeTokens () {
      const { gridBuild } = Utils.root.grid
      for (const key in gridBuild.tokenData) {
        const index = key - 1
        const t = gridBuild.tokens[index]
        if (t.placed) {
          continue
        }
        t.anchor.set(0.5)
        t.num = key
        t.x = gridBuild.tokenData[key].x + gridBuild.blockWidth / 2
        t.y = gridBuild.tokenData[key].y + gridBuild.blockHeight / 2
        // this.tokens.push(t);
        if (!this.utils.root.all) {
          gridBuild.cont.addChild(t)
        } else if (t.num < 3) {
          gridBuild.cont.addChild(t)
        }
      }
    }

  }
}
