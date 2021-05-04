// import Assets from '../../utils/assetCreation';
// import Utils from '../../utils/utils';
// import Tweens from '../../utils/tweens';
// import Config from '../../animationsConfig';
// export default {
// 		utils: Utils,
// 		score: 0,
// 		tokenEarned: false,
// 		init: function (parent) {
// 			this.totalNeeded = Config.jumpPoints;
// 			this.parent = parent;
// 			this.text = Assets.BitmapText(`jump points: ${this.score} / ${this.totalNeeded}`);
// 			this.text.x = this.utils.canvasWidth / 2;
// 			this.text.y = this.utils.canvasHeight  - this.text.height;
// 			this.text.anchor.set(0.5);
// 			this.jumpTokenUnlocked = parent.jumpTokenUnlocked;
// 			this.jumpTokenUnlocked.init();
// 		},
// 		dotHit: function () {
// 			this.score ++;
// 			this.text.text = `jump points: ${this.score} / ${this.totalNeeded}`;

// 			if (!this.tokenEarned && this.score >= this.totalNeeded) {
// 				this.tokenEarned = true;
// 				this.jumpTokenUnlocked.addToStage();
// 				Tweens.tween(this.parent.tokenLock, 0.5, {alpha: [1,0], onComplete: this.removeLock.bind(this)});
// 				//this.utils.root.earnToken(this.utils.root.grid.gridBuild.tokens[2]);
// 			}
// 		},
// 		removeLock: function () {
// 			this.parent.tokenLock.removeChild(this.parent.tokenLock);
// 		},
// 		spikeHit: function () {
// 			//this.score -= 10;
// 			this.text.text = `jump points: ${this.score} / ${this.totalNeeded}`;
// 		},
// 		addToStage: function () {
// 			this.utils.app.stage.addChild(this.text);
// 		},
// 		removeFromStage: function () {
// 			this.utils.app.stage.removeChild(this.text);
// 		},
// 		resize: function () {
// 			this.text.x = this.utils.canvasWidth / 2;
// 			this.text.y = this.utils.canvasHeight  - this.text.height;
// 		},
// 		animate: function () {

// 		}

// }
