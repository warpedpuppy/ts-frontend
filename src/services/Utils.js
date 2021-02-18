const Utils = {
    hexArray: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "H"],
    randomHex: function () {
        let returnString = '#';
        for (let i = 0; i < 6; i++) {
            returnString += this.hexArray[Math.floor(Math.random()*this.hexArray.length)]
        }
        return returnString;
    },
    cosWave (startPoint, differential, speed) {
        const currentDate = new Date()
        return startPoint + (Math.cos(currentDate.getTime() * speed) * differential)
    }
}
export default Utils;