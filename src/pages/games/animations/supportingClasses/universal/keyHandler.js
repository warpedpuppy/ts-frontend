import Utils from '../../utils/utils'
import Config from '../../animationsConfig'

export default function keyHandler() {
  return {
    utils: Utils,
    init (parent) {
      this.parent = parent
      this.upHit = this.upHit.bind(this)
      this.downHit = this.downHit.bind(this)
      this.rightHit = this.rightHit.bind(this)
      this.leftHit = this.leftHit.bind(this)
      this.spaceHit = this.spaceHit.bind(this)
      this.keyRelease = this.keyRelease.bind(this)
      this.keyDown = this.keyDown.bind(this)
      this.keyUp = this.keyUp.bind(this)
    },
    addToStage () {
      window.addEventListener('keydown', this.keyDown.bind(this))
      window.addEventListener('keyup', this.keyUp.bind(this))
    },
    removeFromStage () {
      window.removeEventListener('keydown', this.keyDown.bind(this))
      window.removeEventListener('keyup', this.keyUp.bind(this))
    },
    onOff (boolean) {
      if (boolean) {
        this.addToStage()
      } else {
        this.removeFromStage()
      }
    },
    spaceHit () {
      if (this.parent.activeAction.jump) {
        this.parent.activeAction.jump()
      }

      if (
        (this.parent.activeMode === 'fly' || this.parent.activeMode === 'swim') &&
                this.parent.activeAction.fire) {
        this.parent.activeAction.fire(true)
      }
    },
    upHit () {
      // this.parent.hero.heroJump.look('up');
      this.parent.activeAction.vx = this.parent.activeAction.vy = 0
    },
    downHit () {
      // this.vy = 0;
    },
    leftHit () {
      this.parent.activeAction.spinning = true
      this.parent.rotateLeftBoolean = true
    },
    rightHit () {
      this.parent.activeAction.spinning = true
      this.parent.rotateRightBoolean = true
    },
    keyRelease () {
      this.parent.activeAction.spinning = false
      this.parent.rotateLeftBoolean = false
      this.parent.rotateRightBoolean = false
      this.parent.idle = true

      if (
        (this.parent.activeMode === 'fly' || this.parent.activeMode === 'swim') &&
                this.parent.activeAction.fire) {
        if (this.parent.swim) this.parent.swim.swimAction.fire(true)
        this.parent.activeAction.fire(false)
      }
    },
    keyDown (e) {
      e.preventDefault()
      // console.log(e.keyCode)
      switch (e.keyCode) {
        case 84:
          // the letter t
          if (Config.testing) this.utils.root.levelCompleteHandler()
          break
        case 32:
          // space
          this.spaceHit()
          break
        case 37:
          // left
          this.leftHit()
          break
        case 38:
          // up
          this.upHit()
          break
        case 39:
          // right
          this.rightHit()
          break
        case 67:
          // the letter c for switch player
          if (Utils.root.activeMode !== 'jump' && Config.testing) this.parent.switchPlayerWithAnimation()
          break
        case 83:
          // letter s
          if (!Config.testing) return
          if (Utils.root.activeMode === 'jump') {
            this.utils.root.grid.gridBuild.spaceShip.classRef.blastOff()
          } else if (Utils.root.activeMode === 'bounce') {
            this.utils.root.bounce.tokenEarn()
          }
          break
        case 40:
          break
        default:
          this.downHit()
      }
    },
    keyUp (e) {
      e.preventDefault()
      this.keyRelease()
    },
    resize () {

    },
    animate () {

    }
  }
}
