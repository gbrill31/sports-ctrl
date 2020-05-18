export default (startValue) => {
  let milliseconds = startValue;
  let interval;

  const convertSecToDuration = (sec) => {

    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (hours * 3600)) / 60);
    var seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));
    // var ms = Math.floor((sec % 1) * 10);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    return `${seconds}`;
  }

  const stopGameClock = () => {
    if (interval) interval = clearInterval(interval);
  };

  const startClock = () => {
    interval = setInterval(() => {
      if (milliseconds > 0) {
        milliseconds -= 100;
      } else {
        stopGameClock();
      }
      postMessage({
        clock: convertSecToDuration(milliseconds / 1000),
        timeLeft: milliseconds
      });
    }, 100);
  };

  startClock();
}