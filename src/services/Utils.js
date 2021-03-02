const Utils = {
    hexArray: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "H"],
    hexes: [
        '#FF5733',
        '#FFBD33',
        '#DBFF33',
        '#75FF33',
        '#33FF57',
        '#33FFBD'

    ],
    randomHex: function () {
       
        return this.hexes[Math.floor(Math.random()* this.hexes.length)];
    },
    trueRandomHex: function () {
        let returnString = '#';
        for (let i = 0; i < 6; i++) {
            returnString += this.hexArray[Math.floor(Math.random()*this.hexArray.length)]
        }
        return returnString;
    },
    cosWave (startPoint, differential, speed) {
        const currentDate = new Date()
        return startPoint + (Math.cos(currentDate.getTime() * speed) * differential)
    },
    parseURLVars: function (str) {
        str = str.substring(1);
        let arr = str.split("&");
        let obj = {};
        arr.forEach(item => {
            let tempArr = item.split("=");
            obj[tempArr[0]] = tempArr[1];
        })
        return obj;
    }
}
export default Utils;