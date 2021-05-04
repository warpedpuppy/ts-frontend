const Easing = {
  // no easing, no acceleration
  linear (t) { return t },
  // accelerating from zero velocity
  easeInQuad (t) { return t * t },
  // decelerating to zero velocity
  easeOutQuad (t) { return t * (2 - t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
  // accelerating from zero velocity
  easeInCubic (t) { return t * t * t },
  // decelerating to zero velocity
  easeOutCubic (t) { return (--t) * t * t + 1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
  // accelerating from zero velocity
  easeInQuart (t) { return t * t * t * t },
  // decelerating to zero velocity
  easeOutQuart (t) { return 1 - (--t) * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuart (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
  // accelerating from zero velocity
  easeInQuint (t) { return t * t * t * t * t },
  // decelerating to zero velocity
  easeOutQuint (t) { return 1 + (--t) * t * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuint (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t },

  easeOutElastic (t) {
    const p = 0.3
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1
  },
  easeOutBounce (t) {
    if ((t) < (1 / 2.75)) {
      return (7.5625 * t * t)
    } if (t < (2 / 2.75)) {
      return (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)
    } if (t < (2.5 / 2.75)) {
      return (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)
    }
    return (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)
  }
}
export default Easing;