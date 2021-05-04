export default {
    spritesheet: undefined,
    canvasWidth: undefined,
    canvasHeight:undefined,
    hero: undefined,
    app: undefined,
    wh: {},
    lilypads: Object,
    root: {},
    setLilypads: function (object) {
        this.lilypads = object;
    },
    setProperties: function (obj) {
        this.canvasWidth = obj.canvasWidth;
        this.canvasHeight = obj.canvasHeight;
        this.spritesheet = obj.spritesheet;
        this.app = obj.app;
        this.wh = {
            canvasHeight: obj.canvasHeight,
            canvasWidth: obj.canvasWidth
        };
        this.root = obj.root;
    },
    setWidthAndHeight: function(w, h){
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.wh = {
            canvasWidth: w,
            canvasHeight: h
        }
    },
    getWidthAndHeight: function () {
        this.setWidthAndHeight(
            this.returnCanvasWidth(),
            this.returnCanvasHeight());
    },
    setHero: function (hero) {
        this.hero = hero;
    },
    resize: function (w, h) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.wh = {
            canvasHeight: h,
            canvasWidth: w
        }
    },
    distributeAroundCircle: function (circleCenter, numElements, radius) {
        let arr = [];
        for (let i = 0; i < numElements; i++) {
            let x = circleCenter.x + radius * Math.cos( ( 2 * Math.PI) * i / numElements);
            let y = circleCenter.y + radius * Math.sin( ( 2 * Math.PI) * i / numElements);
            arr.push({x: x, y:y});
        }
        return arr;
    },
    returnPointsAroundACircle: function (radius, i, numElements) {
        let x = radius * Math.cos( ( 2 * Math.PI) * i / numElements);
        let y = radius * Math.sin( ( 2 * Math.PI) * i / numElements);
        return {x: x, y: y};
    },
    lineDistance: function (point1, point2) {
        var xs = 0;
        var ys = 0;

        xs = point2.x - point1.x;
        xs = xs * xs;

        ys = point2.y - point1.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    },
    lineAngle: function(point1, point2) {
        return Math.atan2(point2.y - point1.y, point2.x - point1.x);
    },
    numberWithCommas: function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    distanceAndAngle: function (point1, point2) {
        var xs = 0;
        var ys = 0;

        xs = point2.x - point1.x;
        ys = point2.y - point1.y;
        var angle = Math.atan2(ys, xs);

        ys = ys * ys;
        xs = xs * xs;
        var distance = Math.sqrt(xs + ys);

        return [distance, angle];

    },
    intersectRect: function (r1, r2) {
        let a,b;
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    },
    randomHex: function () {
        return "#000000".replace(/0/g, function() {
            return (~~(Math.random() * 16)).toString(16);
        });
    },
    randomItemFromArray: function (arr) {
        return arr[Math.floor(Math.random()*arr.length)]
    },
    randomColor: function () {

        var x = Math.round(0xffffff * Math.random()).toString(16);
        var y = (6 - x.length);
        var z = '000000';
        var z1 = z.substring(0, y);
        var color = '0x' + z1 + x;
        return color;
    },
    cosWave: function (startPoint, differential, speed) {
        //place in an onEnterFrame Handler0.0015

        var currentDate = new Date();
        return startPoint + (Math.cos(currentDate.getTime() * speed) * differential);
    },
    randomIntBetween: function (min, max) {
        max++;
        return Math.floor(Math.random() * (max - min) + min);
    },
    randomNumberBetween: function (min, max) {

        return Math.random() * (max - min) + min;
    },
    deg2rad: function (degree) {
        return degree * (Math.PI / 180);
    },
    rad2deg: function (radians) {
        return radians * 180 / Math.PI;
    },
    shuffle: function (array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },
    pixiPointRectangleCollisionDetection: function (point, rectangle) {
        var rightSide = rectangle.x + rectangle.width;
        var bottom = rectangle.y + rectangle.height;
        if (point.x > rectangle.x && point.x < rightSide && point.y > rectangle.y && point.y < bottom) {
            return true;
        } else {
            return false;
        }
    },
    triangleCircleCollision: function (circle, point1, point2, point3) {

        //first edge
        var c1x = circle.x - point1.x;
        var c1y = circle.y - point1.x;
        var e1x = point2.x - point1.x;
        var e1y = point2.y - point1.y;

        var k = c1x * e1x + c1y * e1y;

        if (k > 0) {
            var len = Math.sqrt(e1x * e1x + e1y * e1y)
            k = k / len;

            if (k < len) {
                if (Math.sqrt(c1x * c1x + c1y * c1y - k * k) <= circle.radius)
                    return true
            }
        }

        // Second edge
        var c2x = circle.x - point2.x;
        var c2y = circle.y - point2.y;
        var e2x = point3.x - point2.x;
        var e2y = point3.y - point2.y;

        k = c2x * e2x + c2y * e2y

        if (k > 0) {
            len = Math.sqrt(e2x * e2x + e2y * e2y)
            k = k / len

            if (k < len) {
                if (Math.sqrt(c2x * c2x + c2y * c2y - k * k) <= circle.radius)
                    return true
            }
        }

        // Third edge
        var c3x = circle.x - point3.x;
        var c3y = circle.y - point3.y;
        var e3x = point1.x - point3.x;
        var e3y = point1.y - point3.y;

        k = c3x * e3x + c3y * e3y

        if (k > 0) {
            len = Math.sqrt(e3x * e3x + e3y * e3y)
            k = k / len

            if (k < len) {
                if (Math.sqrt(c3x * c3x + c3y * c3y - k * k) <= circle.radius)
                    return true
            }
        }

        // We're done, no intersection
        return false
    },
    hexToRgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    componentToHex: function (c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },
    rgbToHex: function (r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },
    circleRectangleCollisionRegPointCenter: function (circle, rect) {
 
        var distX = Math.abs(circle.x - rect.x - rect.width * 0.25);
        var distY = Math.abs(circle.y - rect.y - rect.height * 0.25);

        if (distX > (rect.width * 0.25 + circle.radius)) {
            return false;
        }
        if (distY > (rect.height * 0.25 + circle.radius)) {
            return false;
        }
        if (distX <= (rect.width * 0.25)) {
            return true;
        }
        if (distY <= (rect.height)) {
            return true;
        }

    },
    circleRectangleCollision: function (circle, rect) {
 
        var distX = Math.abs(circle.x - rect.x - rect.width / 2);
        var distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > (rect.width / 2 + circle.radius)) {
            return false;
        }
        if (distY > (rect.height / 2 + circle.radius)) {
            return false;
        }
        if (distX <= (rect.width / 2)) {
            return true;
        }
        if (distY <= (rect.height)) {
            return true;
        }

    },
    rectangleRectangleCollisionDetection: function (rect1, rect2) {
        return (rect1.x <= (rect2.x + rect2.width) &&
            rect2.x <= (rect1.x + rect1.width) &&
            rect1.y <= (rect2.y + rect2.height) &&
            rect2.y <= (rect1.y + rect1.height));
    },
    pointRectangleCollisionDetection: function (point, rect) {
        if (point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height) {
            return true;
        } else {
            return false;
        }
    },
    pointItemCollisionDetection: function (item1, item2) {
        //the item here is a class with two pubic properties:  a shape and the width
        // var point = new createjs.Point(item1.x, item1.y);

        // if (point.x > target.body.x && point.x < item2.body.x + item2.width && point.y > item2.body.y && point.y < item2.body.y + item2.height) {
        //     return true;
        // } else {
        //     return false;
        // }
    },
    proxy: function (method, scope) {
        return function() {
            return method.apply(scope, arguments);
        };
    },
    createParamObject: function () {
        let string = window.location.search.substring(1);
        let arr = string.split('&');
        let returnObj = {};
        for(let i = 0; i < arr.length; i++){
          let miniArr = arr[i].split("=")
          returnObj[miniArr[0]] = miniArr[1]
        }
        return returnObj;
    },
    circleToCircleCollisionDetection: function (ballA, ballB) {

        var rSum = ballA.radius + ballB.radius;
        var dx = ballB.x - ballA.x;
        var dy = ballB.y - ballA.y;
        return [rSum*rSum > dx*dx + dy*dy,rSum-Math.sqrt(dx*dx+dy*dy)];
    },
    ccc: function (ballA, ballB) {
        var rSum = ballA.radius + ballB.radius;
        var dx = ballB.x - ballA.x;
        var dy = ballB.y - ballA.y;
        return rSum*rSum > dx*dx + dy*dy;
    },
    updateLeaveScreen: function (ball) {
        // ball.x += ball.vx;
        // ball.y += ball.vy;
        ball.x -= this.root.activeAction.vx;
        ball.y -= this.root.activeAction.vy;
        ball.rotation += this.deg2rad(ball.rotate);

        if(ball.x > this.canvasWidth + ball.r) {
            ball.x =  - ball.r;
            //ball.vx *= -1;
        } else if(ball.x < -ball.r) {
            ball.x = this.canvasWidth + ball.r;
            //ball.vx *= -1;
        }
        if(ball.y > this.canvasHeight + ball.r) {
            ball.y = - ball.r;
            //ball.vy *= -1;
        } else if(ball.y < -ball.r) {
            ball.y = this.canvasHeight + ball.r;
            //ball.vy *= -1;
        }
    },
    update: function (ball) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.rotation += this.deg2rad(ball.rotate);
        if(ball.x > this.canvasWidth - ball.r) {
            ball.x = this.canvasWidth - ball.r;
            ball.vx *= -1;
        } else if(ball.x < ball.r) {
            ball.x = ball.r;
            ball.vx *= -1;
        }
        if(ball.y > this.canvasHeight - ball.r) {
            ball.y = this.canvasHeight - ball.r;
            ball.vy *= -1;
        } else if(ball.y < ball.r) {
            ball.y = ball.r + 1;
            ball.vy *= -1;
        }
    },
    adjustPositionCircleBox: function (circle, box) {
        // let boxleft = box.x,
        //     boxRight = box.x + box.width,
        //     boxTop = box.y,
        //     boxBottom = box.y + box.height;
        // let circleX = circle.x + circle.radius,
        //     circleY = circle.y + cir
        // if(circle.x + circle)
    },
    adjustPositions: function (ballA, ballB, depth){

        const percent = 0.2;
        const slop = 0.01;
        var correction = (Math.max(depth - slop, 0) / (1/ballA.r + 1/ballB.r)) * percent;
        //console.log(correction)
        var norm = [ballB.x - ballA.x, ballB.y - ballA.y];
        //console.log("norm", norm)
        var mag = Math.sqrt(norm[0]*norm[0] + norm[1]*norm[1]);
        //console.log("mag", mag)
        norm = [norm[0]/mag,norm[1]/mag];
        correction = [correction*norm[0],correction*norm[1]];
        //console.log(correction)
        //console.log("here", correction[0])
        if (!isNaN(correction[0]) && !isNaN(correction[1])) {
            ballA.x -= 1/ballA.r * correction[0];
            ballA.y -= 1/ballA.r * correction[1];
            ballB.x += 1/ballB.r * correction[0];
            ballB.y += 1/ballB.r * correction[1];
        }
        //console.log('adjust = ', 1/ballB.r * correction[1])
    },
    resolveCollision: function (ballA, ballB){
        var relVel = [ballB.vx - ballA.vx,ballB.vy - ballA.vy];
        var norm = [ballB.x - ballA.x, ballB.y - ballA.y];
        var mag = Math.sqrt(norm[0]*norm[0] + norm[1]*norm[1]);
        norm = [norm[0]/mag,norm[1]/mag];
        
        var velAlongNorm = relVel[0]*norm[0] + relVel[1]*norm[1];
        if(velAlongNorm > 0)
            return;
        
        var bounce = 0.7;
        var j = -(1 + bounce) * velAlongNorm;
        j /= 1/ballA.r + 1/ballB.r;
        
        var impulse = [j*norm[0],j*norm[1]];
        ballA.vx -= 1/ballA.r * impulse[0];
        ballA.vy -= 1/ballA.r * impulse[1];
        ballB.vx += 1/ballB.r * impulse[0];
        ballB.vy += 1/ballB.r * impulse[1];
        return { aX:ballA.vx, aY: ballA.vy, bX:ballB.vx, bY:ballB.vy }
    },
    lineIntersectCircle: function (A, B, C, r) {
        this.intersects = false;

        var a = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
        var b = 2 * ((B.x - A.x) * (A.x - C.x) + (B.y - A.y) * (A.y - C.y));
        var cc = C.x * C.x + C.y * C.y + A.x * A.x + A.y * A.y - 2 * (C.x * A.x + C.y * A.y) - r * r;
        var deter = b * b - 4 * a * cc;
        if (deter <= 0) {
            this.inside = false;
        } else {
            var e = Math.sqrt(deter);
            var u1 = (-b + e) / (2 * a);
            var u2 = (-b - e) / (2 * a);
            if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {

            } else {
                this.intersects = true;

            }
        }

        return this.intersects;
    },
    returnCanvasWidth: function () {
        let scale = window.devicePixelRatio;
        return ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * scale);
    },
    returnCanvasHeight: function (){
        let scale = window.devicePixelRatio;
        return ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * scale);
    },
    centerOnStage: function (mc, canvasWidth, canvasHeight) {
        mc.body.x = (canvasWidth - mc.body.getBounds().width) / 2;
        mc.body.y = (canvasHeight - mc.body.getBounds().height) / 2;
    }

}