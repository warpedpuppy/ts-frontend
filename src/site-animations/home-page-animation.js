import * as PIXI from 'pixi.js';
import Utils from '../pages/games/animations/utils/utils';

const HomePageAnimation = {
    lines:[],
    balls: [],
    gravity: 3,
    ballQ: 100,
    init: function (w, h) {

        this.rainbowSwirlInstances = [];
        Utils.setWidthAndHeight(w, h);
        const app = new PIXI.Application({
            width: w, height: h, transparent: true, resolution: 1, resizeTo: window 
        });
        document.getElementById("home-canvas").appendChild(app.view);
        
        this.container = new PIXI.Container();

        app.stage.addChild(this.container);

        this.app = app;
        this.resize()
        this.createLines();

        
      
        // Listen for animate update
        app.ticker.add(this.ticker.bind(this));
        
        window.addEventListener('resize', this.resize.bind(this))

    },
    createBalls: function () {
        this.balls = [];
        for (let i = 0; i < this.ballQ; i++) {
            let dot = new PIXI.Sprite.from('/bmps/homePageDot.png');
            let scale = (Math.random()*0.25)+0.1;
            dot.alpha = 0.25;
            dot.scale.set(scale)
            dot.radius = 20 * scale;
            dot.x = Math.random() * Utils.canvasWidth * 0.1;
            dot.y = Math.random() * -500;
            dot.mass =  Math.floor(Math.random()*0.5) + 0.25;
            dot.vx = dot.storeVX = Math.floor(Math.random()*4) + 1;
            dot.vy = dot.storeVY = Math.floor(Math.random()*0.5) + 0.25;
            dot.tint = 0xFF00FF;
            this.container.addChild(dot);
            this.balls.push(dot)
        }
    },
    createLines: function () {
        this.lines = [];
        let spacing = 10;

        let largerDimension = Math.max(Utils.canvasWidth, Utils.canvasHeight);
        let lineQ = this.lineQ = Math.ceil(largerDimension/spacing);

        for (let i = 0; i < lineQ; i++) {
            let startX = 0;
            let startY = i * spacing;
            let endX = i * spacing;
            let endY = Utils.canvasHeight;
            
            let line = new PIXI.Graphics();
            line.lineStyle(1, 0xCCCCCC, 0.5);
            line.moveTo(startX, startY).lineTo(endX, endY)
            this.container.addChild(line);
            this.lines.push({line, startX, startY, endX, endY})
        }
    },
    resize: function () {
        // Utils.getWidthAndHeight();
        this.container.removeChildren();
        // console.log(this.app, this.app.renderer)
        // this.app.renderer.resize(Utils.canvasWidth, Utils.canvasHeight);
        this.createLines();
        this.createBalls();
    },
    destroy: function () {
        this.app.destroy(true);
        window.removeEventListener('resize', this.resize)
    },
    ticker: function (delta) {
        for (let i = 0; i < this.ballQ; i++) {
            let dot = this.balls[i];

            dot.vy += (this.gravity * dot.mass);
            dot.y += (dot.vy) * 0.1;
            dot.x += dot.vx;
            if (dot.y > Utils.canvasHeight) {
                dot.y -= 5;
                dot.vy  = dot.storeVY;
            }
            if (dot.x > Utils.canvasWidth) {
                dot.x = 0;
                dot.y = 0;
                dot.vy  = dot.storeVY;
            }

            for (let j = 0;  j < this.lineQ;  j++) {
                let {startX, startY, endX, endY} = this.lines[j];

                let A = {x: startX, y: startY}
                let B = {x: endX, y: endY}

                let hit = Utils.lineIntersectCircle(A, B, dot, dot.radius) 
                if (hit && dot.vy > 0) {
                    dot.y -= 10;
                    dot.vy *= -1;
                }


            }
        }
    }
    
}
export default HomePageAnimation


