import * as PIXI from 'pixi.js';
import RainbowSwirls from '../pages/games/animations/supportingClasses/jump/rainbowSwirls';
import Utils from '../pages/games/animations/utils/utils';

const HomePageAnimation = {
    rainbowSwirlsQ: 4,
    rainbowSwirlInstances: [],
    init: function (w, h) {

        this.rainbowSwirlInstances = [];
        Utils.setWidthAndHeight(w, h);
        const app = new PIXI.Application({
        width: w, height: h, transparent: true, resolution: 1,
        });
        document.getElementById("home-canvas").appendChild(app.view);
        
        this.container = new PIXI.Container();

        app.stage.addChild(this.container);

        this.app = app;
        
        this.startXs = ['TL', 'BL', 'TR', 'BR']
        for (let i = 0; i < this.rainbowSwirlsQ; i++) {
          this.tileColumn = RainbowSwirls();
          this.tileColumn.init(this.container, this.startXs[i], 30, 15)
          this.tileColumn.addToStage()
          this.rainbowSwirlInstances.push(this.tileColumn)
        }
        this.adjustScaleAndAlpha(w);
        // Listen for animate update
        app.ticker.add(this.ticker.bind(this));
        

    },
    adjustScaleAndAlpha: function (w) {
        if (w < 768) {
            this.container.alpha = 0.35;
            this.container.scale.set(0.4)
            for (let i = 1; i < 4; i++) {
                this.rainbowSwirlInstances[i].cont.alpha = 0;
              }
        } else {
            this.container.alpha = 1;
            this.container.scale.set(1);
            for (let i = 1; i < 4; i++) {
                this.rainbowSwirlInstances[i].cont.alpha = 1;
              }
        }
    },
    resize: function (w, h) {
        this.adjustScaleAndAlpha(w);
        Utils.setWidthAndHeight(w, h);
        this.app.renderer.resize(w, h)
    },
    destroy: function () {
        this.app.destroy(true);
        
        for (let i = 0; i < this.rainbowSwirlsQ; i++) {
            this.rainbowSwirlInstances[i].removeFromStage()
        }
    },
    ticker: function (delta) {
        for (let i = 0; i < this.rainbowSwirlsQ; i++) {
            this.rainbowSwirlInstances[i].animate()
          }
    }
    
}
export default HomePageAnimation


