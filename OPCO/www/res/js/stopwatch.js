class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.moneyValue = 0;
        this.cleanMoney;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = [ 0, 0, 0 ];
    }

    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }

    clear() {
        clearChildren(this.results);
    }

    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[0] += diff / 10;

        // Seconds are 100 hundredths of a second
        if (this.times[0] >= 100) {
            this.times[1] += 1;
            this.times[0] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[2] += 1;
            this.times[1] -= 60;
        }

        this.moneyValue =( this.times[1] * .002388) + (this.times[2] * .1433);
      //  this.moneyValue /= 1000;
        this.cleanMoney = this.moneyValue.toFixed(2);
    }

    print() {
        this.display.innerText = this.format(this.times);
        document.getElementById("money").innerHTML = "Money Earned: " +  this.cleanMoney ;


    }

    format(times) {
        return `\
      ${pad0(times[2], 0)}:\
      ${pad0(times[1], 0)}:\
      ${pad0(Math.floor(times[0]), 0)}`;
          }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'));
