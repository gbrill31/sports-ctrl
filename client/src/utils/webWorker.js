export default class WebWorker {
  constructor() {
    this.worker = null;
  }

  start(workerSetup, handleMessage) {
    if (typeof (Worker) !== "undefined") {
      if (!this.worker) {
        const code = workerSetup.file.toString();
        const blob = workerSetup.initialData ? new Blob([`(${code})(${workerSetup.initialData})`]) :
          new Blob([`(${code})()`]);
        this.worker = new Worker(URL.createObjectURL(blob));
      }
      this.worker.onmessage = (e) => {
        handleMessage(e);
      };
    }
  }
  stop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = undefined;
    }
  }
}