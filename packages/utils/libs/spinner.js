const readline = require('readline');

class Spinner {
  constructor(options = {}) {
    this.text = options.text || 'Loading';
    this.spinner = options.spinner || ['|', '/', '-', '\\'];
    this.interval = options.interval || 100;
    this.stream = options.stream || process.stderr;
    this.isSpinning = false;
    this.frameIndex = 0;
    this.intervalId = null;
  }

  start() {
    if (this.isSpinning) return this;

    this.isSpinning = true;
    this.render();
    this.intervalId = setInterval(() => {
      this.render();
    }, this.interval);

    return this;
  }

  stop() {
    if (!this.isSpinning) return this;

    clearInterval(this.intervalId);
    this.isSpinning = false;
    readline.clearLine(this.stream, 0);
    readline.cursorTo(this.stream, 0);
    return this;
  }

  render() {
    readline.clearLine(this.stream, 0);
    readline.cursorTo(this.stream, 0);
    const frame = this.spinner[this.frameIndex];
    this.stream.write(`${frame} ${this.text}`);
    this.frameIndex = (this.frameIndex + 1) % this.spinner.length;
  }
}

module.exports = Spinner;