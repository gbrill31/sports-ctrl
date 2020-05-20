export const convertSecToDuration = (sec, options = { showMin: true, showSec: true, showMil: true }) => {

  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));
  let ms = Math.floor((sec % 1) * 10);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  const { showMin, showSec, showMil } = options;
  if (showMin && !showSec && !showMil) return `${minutes}`;
  if (showMin && showSec && !showMil) return `${minutes}:${seconds}`;
  if (showMin && showSec && showMil) return `${minutes}:${seconds}:${ms}`;
  if (!showMin && showSec && showMil) return `${seconds}:${ms}`;
  if (!showMin && !showSec && showMil) return `${ms}`;
  if (!showMin && showSec && !showMil) return `${seconds}`;

};

export const convertMinToSec = (min) => {
  return min * 60;
}
export const convertMinToMilli = (min) => {
  return min * 60 * 1000;
}
export const convertMilliToSec = (milli) => {
  return milli / 1000;
}
export const convertSecToMilli = (sec) => {
  return sec * 1000;
}