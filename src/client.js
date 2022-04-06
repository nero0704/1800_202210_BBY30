function ready(callback) {
  if (document.readyState != "loading") {
    callback();
    console.log("ready state is 'complete'");
  } else {
    document.addEventListener("DOMContentLoaded", callback);
    console.log("Listener was invoked");
  }
}

function client() {
  console.log("Client script loaded.");

  ajaxGET("/app/nav", (data) => {
    try {
      document.getElementById("footer-nav").innerHTML = data;
    } catch (error) {
      console.log("Footer not found.");
    }
  });
}

function ajaxGET(url, callback) {

  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      callback(this.responseText);
    } else {
      console.log(this.status);
    }
  }
  xhr.open("GET", url);
  xhr.send();
}

export { ready, client, ajaxGET };