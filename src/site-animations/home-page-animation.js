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
        width: w, height: h, transparent: true, resolution: window.devicePixelRatio || 1,
        });
        document.getElementById("home-canvas").appendChild(app.view);
        
        const container = new PIXI.Container();

        app.stage.addChild(container);

        this.app = app;
        
        this.startXs = ['TL', 'BL', 'TR', 'BR']
        for (let i = 0; i < this.rainbowSwirlsQ; i++) {
          this.tileColumn = RainbowSwirls()
          this.tileColumn.init(container, this.startXs[i], 30, 15)
          this.tileColumn.addToStage()
          this.rainbowSwirlInstances.push(this.tileColumn)
        }

        // Listen for animate update
        app.ticker.add(this.ticker.bind(this));
    },
    resize: function (w, h) {

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


