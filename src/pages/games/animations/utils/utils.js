const Utils =  {
  spritesheet: undefined,
  canvasWidth: undefined,
  canvasHeight: undefined,
  hero: undefined,
  app: undefined,
  wh: {},
  lilypads: Object,
  root: {},
  setLilypads (object) {
    this.lilypads = object
  },
  setProperties (obj) {
    this.canvasWidth = obj.canvasWidth
    this.canvasHeight = obj.canvasHeight
    this.spritesheet = obj.spritesheet
    this.isMobile = obj.isMobile
    this.isMobileOnly = obj.isMobileOnly
    this.app = obj.app
    this.wh = {
      canvasHeight: obj.canvasHeight,
      canvasWidth: obj.canvasWidth
    }
    this.root = obj.root
  },
  setWidthAndHeight (w, h) {
    this.canvasWidth = w
    this.canvasHeight = h
    this.wh = {
      canvasWidth: w,
      canvasHeight: h
    }
  },
  getWidthAndHeight () {
    this.setWidthAndHeight(
      this.returnCanvasWidth(),
      this.returnCanvasHeight()
    )
  },
  setHero (hero) {
    this.hero = hero
  },
  resize (w, h) {
    this.canvasWidth = w
    this.canvasHeight = h
    this.wh = {
      canvasHeight: h,
      canvasWidth: w
    }
  },
  distributeAroundCircle (circleCenter, numElements, radius) {
    const arr = []
    for (let i = 0; i < numElements; i++) {
      const x = circleCenter.x + radius * Math.cos((2 * Math.PI) * i / numElements)
      const y = circleCenter.y + radius * Math.sin((2 * Math.PI) * i / numElements)
      arr.push({ x, y })
    }
    return arr
  },
  returnPointsAroundACircle (radius, i, numElements) {
    const x = radius * Math.cos((2 * Math.PI) * i / numElements)
    const y = radius * Math.sin((2 * Math.PI) * i / numElements)
    return { x, y }
  },
  lineDistance (point1, point2) {
    let xs = 0
    let ys = 0

    xs = point2.x - point1.x
    xs *= xs

    ys = point2.y - point1.y
    ys *= ys

    return Math.sqrt(xs + ys)
  },
  lineAngle (point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x)
  },
  numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  distanceAndAngle (point1, point2) {
    let xs = 0
    let ys = 0

    xs = point2.x - point1.x
    ys = point2.y - point1.y
    const angle = Math.atan2(ys, xs)

    ys *= ys
    xs *= xs
    const distance = Math.sqrt(xs + ys)

    return [distance, angle]
  },
  intersectRect (a, b) {
    return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
  },
  randomHex () {
    return '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
  },
  randomItemFromArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  },
  randomColor () {
    const x = Math.round(0xffffff * Math.random()).toString(16)
    const y = (6 - x.length)
    const z = '000000'
    const z1 = z.substring(0, y)
    const color = `0x${z1}${x}`
    return color
  },
  cosWave (startPoint, differential, speed) {
    // place in an onEnterFrame Handler0.0015

    const currentDate = new Date()
    return startPoint + (Math.cos(currentDate.getTime() * speed) * differential)
  },
  randomIntBetween (min, max) {
    max++
    return Math.floor(Math.random() * (max - min) + min)
  },
  randomNumberBetween (min, max) {
    return Math.random() * (max - min) + min
  },
  deg2rad (degree) {
    return degree * (Math.PI / 180)
  },
  rad2deg (radians) {
    return radians * 180 / Math.PI
  },
  shuffle (array) {
    let currentIndex = array.length
    let temporaryValue; let
      randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  },
  pixiPointRectangleCollisionDetection (point, rectangle) {
    const rightSide = rectangle.x + rectangle.width
    const bottom = rectangle.y + rectangle.height
    if (point.x > rectangle.x && point.x < rightSide && point.y > rectangle.y && point.y < bottom) {
      return true
    }
    return false
  },
  triangleCircleCollision (circle, point1, point2, point3) {
    // first edge
    const c1x = circle.x - point1.x
    const c1y = circle.y - point1.x
    const e1x = point2.x - point1.x
    const e1y = point2.y - point1.y

    let k = c1x * e1x + c1y * e1y

    if (k > 0) {
      var len = Math.sqrt(e1x * e1x + e1y * e1y)
      k /= len

      if (k < len) {
        if (Math.sqrt(c1x * c1x + c1y * c1y - k * k) <= circle.radius) return true
      }
    }

    // Second edge
    const c2x = circle.x - point2.x
    const c2y = circle.y - point2.y
    const e2x = point3.x - point2.x
    const e2y = point3.y - point2.y

    k = c2x * e2x + c2y * e2y

    if (k > 0) {
      len = Math.sqrt(e2x * e2x + e2y * e2y)
      k /= len

      if (k < len) {
        if (Math.sqrt(c2x * c2x + c2y * c2y - k * k) <= circle.radius) return true
      }
    }

    // Third edge
    const c3x = circle.x - point3.x
    const c3y = circle.y - point3.y
    const e3x = point1.x - point3.x
    const e3y = point1.y - point3.y

    k = c3x * e3x + c3y * e3y

    if (k > 0) {
      len = Math.sqrt(e3x * e3x + e3y * e3y)
      k /= len

      if (k < len) {
        if (Math.sqrt(c3x * c3x + c3y * c3y - k * k) <= circle.radius) return true
      }
    }

    // We're done, no intersection
    return false
  },
  hexToRgb (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },
  componentToHex (c) {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  },
  rgbToHex (r, g, b) {
    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`
  },
  circleRectangleCollisionRegPointCenter (circle, rect) {
    const distX = Math.abs(circle.x - rect.x - rect.width * 0.25)
    const distY = Math.abs(circle.y - rect.y - rect.height * 0.25)

    if (distX > (rect.width * 0.25 + circle.radius)) {
      return false
    }
    if (distY > (rect.height * 0.25 + circle.radius)) {
      return false
    }
    if (distX <= (rect.width * 0.25)) {
      return true
    }
    if (distY <= (rect.height)) {
      return true
    }
  },
  circleRectangleCollision (circle, rect) {
    const distX = Math.abs(circle.x - rect.x - rect.width / 2)
    const distY = Math.abs(circle.y - rect.y - rect.height / 2)

    if (distX > (rect.width / 2 + circle.radius)) {
      return false
    }
    if (distY > (rect.height / 2 + circle.radius)) {
      return false
    }
    if (distX <= (rect.width / 2)) {
      return true
    }
    if (distY <= (rect.height)) {
      return true
    }
  },
  rectangleRectangleCollisionDetection (rect1, rect2) {
    return (rect1.x <= (rect2.x + rect2.width) &&
            rect2.x <= (rect1.x + rect1.width) &&
            rect1.y <= (rect2.y + rect2.height) &&
            rect2.y <= (rect1.y + rect1.height))
  },
  pointRectangleCollisionDetection (point, rect) {
    if (point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height) {
      return true
    }
    return false
  },
  proxy (method, scope) {
    return function () {
      return method.apply(scope, arguments)
    }
  },
  createParamObject () {
    const string = window.location.search.substring(1)
    const arr = string.split('&')
    const returnObj = {}
    for (let i = 0; i < arr.length; i++) {
      const miniArr = arr[i].split('=')
      returnObj[miniArr[0]] = miniArr[1]
    }
    return returnObj
  },
  circleToCircleCollisionDetection (ballA, ballB) {
    const rSum = ballA.radius + ballB.radius
    const dx = ballB.x - ballA.x
    const dy = ballB.y - ballA.y
    return [rSum * rSum > dx * dx + dy * dy, rSum - Math.sqrt(dx * dx + dy * dy)]
  },
  ccc (ballA, ballB) {
    const rSum = ballA.radius + ballB.radius
    const dx = ballB.x - ballA.x
    const dy = ballB.y - ballA.y
    return rSum * rSum > dx * dx + dy * dy
  },
  updateLeaveScreen (ball) {
    // ball.x += ball.vx;
    // ball.y += ball.vy;
    ball.x -= this.root.activeAction.vx
    ball.y -= this.root.activeAction.vy
    ball.rotation += this.deg2rad(ball.rotate)

    if (ball.x > this.canvasWidth + ball.r) {
      ball.x = -ball.r
      // ball.vx *= -1;
    } else if (ball.x < -ball.r) {
      ball.x = this.canvasWidth + ball.r
      // ball.vx *= -1;
    }
    if (ball.y > this.canvasHeight + ball.r) {
      ball.y = -ball.r
      // ball.vy *= -1;
    } else if (ball.y < -ball.r) {
      ball.y = this.canvasHeight + ball.r
      // ball.vy *= -1;
    }
  },
  update (ball) {
    ball.x += ball.vx
    ball.y += ball.vy
    ball.rotation += this.deg2rad(ball.rotate)
    if (ball.x > this.canvasWidth - ball.r) {
      ball.x = this.canvasWidth - ball.r
      ball.vx *= -1
    } else if (ball.x < ball.r) {
      ball.x = ball.r
      ball.vx *= -1
    }
    if (ball.y > this.canvasHeight - ball.r) {
      ball.y = this.canvasHeight - ball.r
      ball.vy *= -1
    } else if (ball.y < ball.r) {
      ball.y = ball.r + 1
      ball.vy *= -1
    }
  },
  adjustPositions (ballA, ballB, depth) {
    const percent = 0.2
    const slop = 0.01
    let correction = (Math.max(depth - slop, 0) / (1 / ballA.r + 1 / ballB.r)) * percent
    // console.log(correction)
    let norm = [ballB.x - ballA.x, ballB.y - ballA.y]
    // console.log("norm", norm)
    const mag = Math.sqrt(norm[0] * norm[0] + norm[1] * norm[1])
    // console.log("mag", mag)
    norm = [norm[0] / mag, norm[1] / mag]
    correction = [correction * norm[0], correction * norm[1]]
    // console.log(correction)
    // console.log("here", correction[0])
    if (!isNaN(correction[0]) && !isNaN(correction[1])) {
      ballA.x -= 1 / ballA.r * correction[0]
      ballA.y -= 1 / ballA.r * correction[1]
      ballB.x += 1 / ballB.r * correction[0]
      ballB.y += 1 / ballB.r * correction[1]
    }
    // console.log('adjust = ', 1/ballB.r * correction[1])
  },
  resolveCollision (ballA, ballB) {
    const relVel = [ballB.vx - ballA.vx, ballB.vy - ballA.vy]
    let norm = [ballB.x - ballA.x, ballB.y - ballA.y]
    const mag = Math.sqrt(norm[0] * norm[0] + norm[1] * norm[1])
    norm = [norm[0] / mag, norm[1] / mag]

    const velAlongNorm = relVel[0] * norm[0] + relVel[1] * norm[1]
    if (velAlongNorm > 0) return

    const bounce = 0.7
    let j = -(1 + bounce) * velAlongNorm
    j /= 1 / ballA.r + 1 / ballB.r

    const impulse = [j * norm[0], j * norm[1]]
    ballA.vx -= 1 / ballA.r * impulse[0]
    ballA.vy -= 1 / ballA.r * impulse[1]
    ballB.vx += 1 / ballB.r * impulse[0]
    ballB.vy += 1 / ballB.r * impulse[1]
    return {
      aX: ballA.vx, aY: ballA.vy, bX: ballB.vx, bY: ballB.vy
    }
  },
  lineIntersectCircle (A, B, C, r) {
    this.intersects = false

    const a = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y)
    const b = 2 * ((B.x - A.x) * (A.x - C.x) + (B.y - A.y) * (A.y - C.y))
    const cc = C.x * C.x + C.y * C.y + A.x * A.x + A.y * A.y - 2 * (C.x * A.x + C.y * A.y) - r * r
    const deter = b * b - 4 * a * cc
    if (deter <= 0) {
      this.inside = false
    } else {
      const e = Math.sqrt(deter)
      const u1 = (-b + e) / (2 * a)
      const u2 = (-b - e) / (2 * a)
      if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
        this.intersects = false
      } else {
        this.intersects = true
      }
    }

    return this.intersects
  },
  returnCanvasWidth () {
    const scale = (window.devicePixelRatio < 3) ? 1 : window.devicePixelRatio
    return ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * scale)
  },
  returnCanvasHeight () {
    const scale = (window.devicePixelRatio < 3) ? 1 : window.devicePixelRatio
    return ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * scale)
  },
  centerOnStage (mc, canvasWidth, canvasHeight) {
    mc.body.x = (canvasWidth - mc.body.getBounds().width) / 2
    mc.body.y = (canvasHeight - mc.body.getBounds().height) / 2
  }

}
export default Utils;