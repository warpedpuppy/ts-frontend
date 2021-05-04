// import Assets from '../../utils/assetCreation';
// import Utils from '../../utils/utils';
// import Tweens from '../../utils/tweens';
// import Config from '../../animationsConfig';
// export default function () {
// 	return {
// 	cont: Assets.Container(),
// 	startScore: 0,
// 	score: 0,
// 	scoreText: undefined,
// 	changeAllow: false,
// 	targetNumber: undefined,
// 	counter: 0,
// 	utils: Utils,
// 	flyTotal: 0,
// 	swimTotal: 0,
// 	jumpTotal: 0,
// 	bounceTotal: 0,
// 	flyPoints: 0,
// 	swimPoints: 0,
// 	jumpPoints: 0,
// 	bouncePoints: 0,
// 	grandTotal: 0,
// 	storeTotal: 0,
// 	bounceTokenEarned: false,
// 	jumpTokenEarned: false,
// 	init: function (optionalStartScore) {

// 		this.flyTreasureChestQ = Config.flyTreasureChestQ;
// 		this.flyCoinsPerTreasureChest = Config.flyCoinsPerTreasureChest;
// 		this.swimTreasureChestQ = Config.swimTreasureChestQ;
// 		this.swimCoinsPerTreasureChest = Config.swimCoinsPerTreasureChest;
// 		this.jumpTokenUnlockPoints = Config.jumpTokenUnlockPoints;

// 		this.createTotals();
// 		//this.cont = this.utils.app.stage;
// 		this.seeScores = this.seeScores.bind(this);
// 		this.spin = this.spin.bind(this);

// 		if(optionalStartScore)this.startScore = optionalStartScore;

// 		this.scoreTexts = this.stringCreate();

// 		//TOP BAR
// 		this.topBackground = Assets.Sprite('scoreBackground.png');
// 		this.button = Assets.Sprite('arrow.png');
// 		this.button.anchor.set(0.5);
// 		this.button.buttonMode = this.button.interactive = true;
// 		this.button.on('pointerdown',this.seeScores);
// 		this.button.on('pointerover',this.spin);
// 		this.button.rotateDest = this.utils.deg2rad(360);
// 		this.button.finalDest = 0;
// 		this.button.rotateSpeed = 0.5;
// 		this.utils.app.stage.addChild(this.cont);

// 		this.popUp = Assets.Container();
// 		this.popUpBackground1 = Assets.Graphics();
// 		this.popUpBackground1.beginFill(0xFFFF00).drawRect(0,0,520,520).endFill();
// 		this.popUpBackground1.x = this.popUpBackground1.y = -10;
// 		this.popUp.addChild(this.popUpBackground1);
// 		this.popUpBackground = Assets.Graphics();
// 		this.popUpBackground.beginFill(0x000000).drawRect(0,0,500,500).endFill();
// 		this.popUp.addChild(this.popUpBackground);
// 		this.closeButton = Assets.Sprite('arrow.png');
// 		this.closeButton.anchor.set(0.5);
// 		this.closeButton.rotateSpeed = 0.25;
// 		this.closeButton.rotateDest = this.closeButton.finalDest = this.utils.deg2rad(180);

// 		this.closeButton.buttonMode = this.closeButton.interactive = true;
// 		this.popUp.addChild(this.closeButton);
// 		this.closeButton.on('pointerdown',this.seeScores);
// 		this.closeButton.on('pointerover',this.spin);
// 	},
// 	hide: function () {
// 		this.cont.visible = false;
// 		this.popUp.visible = false;
// 	},
// 	show: function () {
// 		this.cont.visible = true;
// 		this.popUp.visible = true;
// 	},
// 	spin: function (e) {
// 		Tweens.tween(e.target, e.target.rotateSpeed, {rotation: [0, e.target.rotateDest]}, this.spinEnd.bind(this, e.target))
// 	},
// 	spinEnd: function (button) {
// 		button.rotation = button.finalDest;
// 	},
// 	nextLevel: function () {
// 		//console.log('assign ', this.grandTotal, 'to', this.storeTotal)
// 		this.storeTotal += this.grandTotal;
// 		this.flyPoints = 0;
// 		this.swimPoints = 0;
// 		this.jumpPoints = 0;
// 		this.bouncePoints = 0;

// 		this.scoreTexts.flyText.text = `dragon points: ${this.flyPoints} / ${this.flyTotal}`;
// 		this.scoreTexts.swimText.text = `fish points: ${this.swimPoints} / ${this.swimTotal}`;
// 		this.scoreTexts.jumpText.text = `space points: ${this.jumpPoints} / ${this.jumpTotal}`;
// 		this.scoreTexts.bounceText.text=`bounce points: ${this.bouncePoints} / ${this.bounceTotal}`;
// 		this.scoreTexts.grandTotal.text= `grand total: ${this.grandTotal}`;
// 	},
// 	seeScores: function () {

// 		if (!this.utils.root.fullStop) {
// 			this.utils.root.fullStop = true;
// 			let spacer = 0;
// 			this.setGrandTotal();
// 			this.closeButton.rotation = 0;
// 			for (let key in this.scoreTexts) {
// 				this.scoreTexts[key].x = 50;
// 				this.scoreTexts[key].y = 50 + (spacer * 30);
// 				this.popUp.addChild(this.scoreTexts[key]);
// 				spacer ++;
// 			}
// 			this.utils.app.stage.addChild(this.popUp);
// 			this.cont.visible = false;
// 			this.popUp.pivot = Assets.Point(250, 250);
// 			this.popUp.x = this.utils.canvasWidth / 2;
// 			this.popUp.y = this.utils.canvasHeight / 2;
// 		} else {
// 			this.utils.root.fullStop = false;
// 			this.utils.app.stage.removeChild(this.popUp);
// 			for (let key in this.scoreTexts) {
// 				this.popUp.removeChild(this.scoreTexts[key]);
// 			}
// 			this.cont.visible = true;
// 			// let current = this.scoreTexts[`${this.utils.root.activeMode}Text`];
// 			// this.cont.addChild(current)
// 			this.switchMode();
// 		}

// 	},
// 	switchMode: function () {
// 		this.cont.removeChildren();
// 		this.cont.addChild(this.topBackground);
// 		let newText = this.scoreTexts[`${this.utils.root.activeMode}Text`];
// 		newText.x = 10;
// 		newText.y = 10;
// 		this.cont.addChild(newText);
// 		this.button.x = this.cont.width - 25;
// 		this.button.y = 23;
// 		this.cont.addChild(this.button);
// 		this.cont.x = (this.utils.canvasWidth - this.cont.width) /2;
// 	},
// 	createTotals: function () {

// 		// dragon
// 		this.flyTotal = Config.flyTreasureChestQ * Config.flyCoinsPerTreasureChest;
// 		// fish
// 		this.swimTotal = Config.swimTreasureChestQ * Config.swimCoinsPerTreasureChest;
// 		// space
// 		this.jumpTotal = Config.spaceColQ * Config.spaceRowQ * Config.spaceDotsPerPlanet;
// 		// bounce
// 		this.bounceTotal = Config.bounceTotalPoints;
// 	},
// 	stringCreate: function (dragon, fish, space, bounce) {
// 		this.grandTotal = this.flyPoints + this.swimPoints + this.jumpPoints + this.bouncePoints;
// 		return {
// 				flyText:  Assets.BitmapText(`dragon points: ${this.flyPoints} / ${this.flyTotal}`),
// 				swimText:  Assets.BitmapText(`fish points: ${this.swimPoints}/ ${this.swimTotal}`),
// 				jumpText:  Assets.BitmapText(`space points: ${this.jumpPoints} / ${this.jumpTotal}`),
// 				bounceText:  Assets.BitmapText(`bounce points: ${this.bouncePoints} / ${this.bounceTotal}`),
// 				grandTotal: Assets.BitmapText(`grand total: ${this.grandTotal}`)
// 			};
// 	},
// 	setGrandTotal: function () {
// 		this.grandTotal = this.storeTotal + this.flyPoints + this.swimPoints + this.jumpPoints + this.bouncePoints;
// 		this.scoreTexts.grandTotal.text = `grand total: ${this.grandTotal}`;
// 	},
// 	resize: function (wh) {

// 		this.cont.x = (this.utils.canvasWidth - this.cont.width) /2;
// 		this.popUp.x = this.utils.canvasWidth / 2;
// 		this.popUp.y = this.utils.canvasHeight / 2;
// 	},
// 	bounceRingHit: function () {

// 		this.bouncePoints ++;
// 		this.scoreTexts.bounceText.text =  `bounce points: ${this.bouncePoints} / ${this.bounceTotal}`;

// 		if (!this.bounceTokenEarned && this.bouncePoints >= this.bounceTotal) {
// 			this.bounceTokenEarned = true;
// 			this.utils.root.bounce.tokenEarn();
// 		}
// 	},
// 	bounceSpikeHit: function (q) {

// 			let store = this.bouncePoints
// 			q = (q > this.bouncePoints)? this.bouncePoints: q;
// 			this.bouncePoints -= q;
// 			this.scoreTexts.bounceText.text = `bounce points: ${this.bouncePoints} / ${this.bounceTotal}`;

// 	},
// 	treasureIncrease: function () {
// 		let activeMode = this.utils.root.activeMode;
// 		this[`${activeMode}Points`] += Config[`${activeMode}CoinsPerTreasureChest`];
// 		console.log(activeMode,this[`${activeMode}Points`],  Config[`${activeMode}CoinsPerTreasureChest`])
// 		this.scoreTexts[`${activeMode}Text`].text = `dragon points: ${this[`${activeMode}Points`]} / ${this[`${activeMode}Total`]}`;
// 	},
// 	treasureChange: function (str) {
// 		let activeMode = this.utils.root.activeMode;

// 		if(str === 'down') {
// 			this[`${activeMode}Points`] --;
// 		} else if (str === 'up') {
// 			this[`${activeMode}Points`] ++;
// 		}
// 		console.log(activeMode,this[`${activeMode}Points`],  Config[`${activeMode}CoinsPerTreasureChest`])
// 		this.scoreTexts[`${activeMode}Text`].text = `dragon points: ${this[`${activeMode}Points`]} / ${this[`${activeMode}Total`]}`;
// 	},
// 	jumpDotHit: function (str) {

// 		let activeMode = this.utils.root.activeMode;
// 		let jumpBackground = this.utils.root.jump.jumpBackground;
// 		let dotsEaten = this.utils.root.jump.jumpBackground.eatenDots.length;

// 		this[`${activeMode}Points`] = dotsEaten;

// 		this.scoreTexts[`${activeMode}Text`].text = `space points: ${this[`${activeMode}Points`]} / ${this[`${activeMode}Total`]}`;

// 		if (!jumpBackground.jumpTokenUnlocked && this[`${activeMode}Points`] >= this.jumpTokenUnlockPoints) {
// 			jumpBackground.jumpTokenUnlocked = true;
// 			jumpBackground.jumpTokenUnlockedGraphic.addToStage();
// 			Tweens.tween(jumpBackground.tokenLock, 0.5, {alpha: [1,0], onComplete: this.jumpRemoveLock.bind(this)});
// 		}
// 	},
// 	jumpRemoveLock: function () {
// 		let jumpBackground = this.utils.jump.jumpBackground;
// 		jumpBackground.tokenLock.removeChild(jumpBackground.tokenLock);
// 	},
// 	gridWeaponHit: function () {

// 		if(this[`${this.utils.root.activeMode}Points`] <= 0)return;
// 		//make soldier unable to hit again for two seconds

// 		//remove one point from flyPoints, if available
// 		this.treasureChange('down');

// 		//add ring to free space on page
// 		this.utils.root.grid.gridBuild.addCoinToGrid();

// 		//make sure upon grid build all the coins that should be on there are

// 		//add ring to loop for collision detection to be readded

// 	}
// }
// }
