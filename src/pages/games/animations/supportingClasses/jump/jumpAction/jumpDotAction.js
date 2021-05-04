// import Utils from '../../../utils/utils';
// import Assets from '../../../utils/assetCreation';
// import Config from '../../../animationsConfig';
// export default function () {
// 	return {
// 		utils: Utils,
// 		init: function () {
// 			this.currentOrb = this.utils.root.jump.jumpBackground.currentOrb
// 		}
// 		animate: function (currentOrb, i) {

// 					let dot = this.currentOrb.dots[i]
// 					let globalPoint2 = dot.toGlobal(this.app.stage, undefined, true);
// 					this.dotCollisionDetectObject.x = globalPoint2.x;
// 					this.dotCollisionDetectObject.y = globalPoint2.y;

// 					if(dot.visible &&
// 					   this.dotEatBoolean &&
// 						this.utils.circleToCircleCollisionDetection(this.heroCollisionDetectObject, this.dotCollisionDetectObject)[0]) {
// 						dot.visible = false;
// 						//dot.parent.removeChild(dot);
// 						//this.eatenDots.push(dot);
// 						//this.currentOrb.dots.splice(i, 1);
// 						//this.utils.root.score.jumpScore.jumpDotHit();
// 					}
// 				}

// 	}

// }
