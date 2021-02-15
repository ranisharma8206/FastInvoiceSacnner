var imageData = undefined;
var clientID = 0;
function connect(){
  clientID = $("#addr").val()
  $("#connect_page").addClass("hidden");
  $("#scan_page").removeClass("hidden");
}

$( document ).ready(function() {

  connect_btn = document.getElementById('connect_btn');
  connect_btn.addEventListener('click', function(ev){
    connect();
    ev.preventDefault();
  }, false);
});

(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 1080;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
    output = document.getElementById('output');
    camera = document.getElementById('camera');
    back_btn = document.getElementById('back_btn');
    proceed_btn = document.getElementById('proceed_btn');
    

    navigator.mediaDevices.getUserMedia({video: {facingMode : 'environment'} , audio: false})
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    
    clearphoto();
  }


  function back(){
    clearphoto();
    $(output).addClass("hidden");
    $(camera).removeClass("hidden");
  }
  function sendData(){
    console.log(imageData);
    const data = { clientId: clientID, base64Image:imageData };
    console.log(data)
    fetch('http://10.3.0.104:5000/api/uploadImage', {
      method: 'POST', // or 'PUT'
      // mode:'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  proceed_btn.addEventListener('click', function(ev){
    sendData();
    back();
    ev.preventDefault();
  }, false);

  back_btn.addEventListener('click', function(ev){
    back();
    ev.preventDefault();
  }, false);


  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      imageData = data;
      $(output).removeClass("hidden");
      $(camera).addClass("hidden");
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }


  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();