export default (startValue) => {
  let milliseconds = startValue;
  let interval;

  const stopClock = () => {
    if (interval) interval = clearInterval(interval);
  };

  const startClock = () => {
    interval = setInterval(() => {
      if (milliseconds > 0) {
        milliseconds -= 100;
      } else {
        stopClock();
      }
      postMessage({
        timeLeft: milliseconds
      });
    }, 100);
  };

  startClock();
}