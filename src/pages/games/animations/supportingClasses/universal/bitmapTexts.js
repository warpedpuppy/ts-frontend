import Assets from '../../utils/assetCreation'

export default function () {
  return {
    init () {
      const bitmapText = Assets.BitmapText(`score: ${this.score}`)
      this.stage.addChild(bitmapText)
    }
  }
}
