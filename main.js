var myWorker;

function initWorker() {
  if(typeof(Worker) != 'undefined') {
    if(typeof(myWorker) == 'undefined') {

      var blob = new Blob([document.querySelector('#worker1').textContent]);
      var blobURL = window.URL.createObjectURL(blob);

      myWorker = new Worker(blobURL);
      console.log('[Main]', 'Init Web Worker');
      myWorker.onmessage = function(event) {
        handleMessage(event);
      }
      myWorker.onerror = function(event) {
        console.log('[Main]', 'Error', event.message, event);
      }
    }
  } else {
    console.log("[Main]", "The browser doesn't support web worker");
  }
}

function handleMessage(event) {
  console.log('[Main]', 'Main Thread receives command: ', event.data.cmd, event.data.msg);
  if(event.data.cmd == 'stop') {
    console.log('[Main]', 'Web Worker is already stopped');
  }
}

function startWorker() {
  if(typeof(myWorker) != 'undefined') {
    myWorker.postMessage({cmd : 'start', msg : 'hello'});
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}

function stopWorker1() {
  if(typeof(myWorker) != 'undefined') {
    myWorker.terminate();
    myWorker = undefined;
    console.log('[Main]', 'Worker terminated.');  
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}

function stopWorker2() {
  if(typeof(myWorker) != 'undefined') {
    myWorker.postMessage({cmd : 'stop', msg : 'bye'});
  } else {
    console.log('[Main]', 'Worker is undefined.');
  }
}
