const Timer = {
    date: undefined,
    startTime: undefined,
    startTimer: function() {
        this.date = new Date();
        this.startTime = this.date.getTime();
    },
    endTimer: function () {
        this.date = new Date();
        let endTime = this.date.getTime()
        return  endTime - this.startTime;
    },
}
export default Timer;