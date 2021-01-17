/*To do: Figure out how to turn web cam off. 
         Total up data for Facial expressions
 */

const video = document.getElementById('video')
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var startButt = document.getElementById('start-button')
var endButt = document.getElementById('end-button')
var webcam;
var totalDistractions = 0;
var distractionCounter = 0;
var camera = 0;
var angry = 0;
var disgusted = 0;
var fearful = 0;
var happy = 0;
var neutral= 0;
var sad= 0;
var surprised =  0;
var total =0;


const recognition = new SpeechRecognition()
recognition.continuous = true;


function startVideo(){
    navigator.getUserMedia(
        { video: {} },
        stream => {video.srcObject = stream;
        webcam = stream;}, 
        err => console.error(err)
    )
    camera = true;
}

function stopVideo(){
  const tracks = webcam.getTracks();
  console.log(tracks);
  console.log(tracks[0]);
  tracks[0].stop();
  camera = false;
  /*stream.getTracks().forEach(track => track.stop())*/ 
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
])

startButt.onclick = function(){
  startVideo();
  video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const videoDisplay = document.getElementById('video')
  const displaySize = {width: video.width, height: video.height}
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async() => {
    const detections = await faceapi.detectAllFaces (video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height)
    const newDetections = faceapi.resizeResults(detections, displaySize)

    faceapi.draw.drawFaceLandmarks(canvas, newDetections)
    faceapi.draw.drawDetections(canvas,newDetections)
    faceapi.draw.drawFaceExpressions(canvas, newDetections)
    checkAttention(detections)
    //console.log(detections)
    //expressions = faceapi.recognizeFaceExpressions();
    if(detections.length != 0){
      angry += detections[0].expressions.angry;
      disgusted += detections[0].expressions.disgusted;
      fearful += detections[0].expressions.fearful;
      happy += detections[0].expressions.happy;
      neutral += detections[0].expressions.neutral;
      sad += detections[0].expressions.sad;
      surprised += detections[0].expressions.surprised;
      total = angry + disgusted + fearful + happy + neutral + sad  + surprised;
      document.getElementById("alert").style.opacity = "0";
      document.getElementById("attention-notice").innerHTML = ""
      //console.log(detections[0].expressions.neutral);
    }
    //console.log(total);


    }, 100)
  })

  recognition.start();
  recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript
    if(transcript.includes('test')||transcript.includes('listen') || transcript.includes('assignment')|| transcript.includes('quiz')|| transcript.includes('project') || transcript.includes('important') ){
        console.log("wagwan homie"); 
        document.getElementById("alert2").style.opacity = "1";
        document.getElementById("important-notice").innerHTML = "Listen up! Important info soon!"
        pingUser()
        //console.log(transcript);
    }}
  

  /*tabulate expressions*/
  
   
}

endButt.onclick = function(){
  stopVideo();
  getStats(angry,disgusted, fearful, happy, neutral, sad, surprised, total)
   camera = 0;
   angry = 0;
   disgusted = 0;
   fearful = 0;
   happy = 0;
   neutral= 0;
   sad= 0;
   surprised = 0;
   total =0;
}


var audio = document.getElementById("audioMusic");

function playSound() {
  audio.play();
}

function precise(x) {
  return Number.parseFloat(x).toPrecision(4);
}

function getStats(angry,disgusted, fearful ,happy ,neutral ,sad ,surprised,total) {
  angry_percent = precise((angry/total)*100);
  disgusted_percent  = precise((disgusted/total)*100);
  fearful_percent  = precise((fearful/total)*100);
  happy_percent  =  precise((happy/total)*100);
  neutral_percent  =  precise((neutral/total)*100);
  surprised_percent  = precise((surprised/total)*100) ;
  sad_percent =  precise((sad/total));

  console.log("Angry: " + angry_percent + "%")
  console.log("disgusted: " + disgusted_percent + "%")
  console.log("fearful: " + fearful_percent + "%")
  console.log("happy: " + happy_percent + "%")
  console.log("neutral: " + neutral_percent + "%")
  console.log("surprised: " + surprised_percent + "%")
  console.log("sad: " + sad_percent + "%")

  document.getElementById("disgusted").innerHTML = disgusted_percent + "%"
  document.getElementById("angry").innerHTML = angry_percent + "%"
  document.getElementById("fearful").innerHTML = fearful_percent + "%"
  document.getElementById("happy").innerHTML = happy_percent + "%"
  document.getElementById("neutral").innerHTML = neutral_percent + "%"
  document.getElementById("surprised").innerHTML = surprised_percent + "%"
  document.getElementById("sad").innerHTML = sad_percent + "%"
  

}

function checkAttention(detections){ 
      if(detections.length == 0 && distractionCounter == 25 && camera){
      document.getElementById("attention-notice").innerHTML = "Pay Attention!"
      document.getElementById("alert").style.opacity = "1";
      console.log("PAY ATTENTION")
      playSound()
      distractionCounter = 0
      totalDistractions++;
      document.getElementById("distraction").innerHTML = totalDistractions
      //alert ("PAY ATTENTION")
    }
    else if (detections.length == 0 && camera ){
      distractionCounter++
      console.log(distractionCounter);
    }
    else if(detections.length == 1 && camera ){
        document.getElementById("alert2").style.opacity = "0";
    }
}

function pingUser(){
  playSound()
  document.getElementById("alert2").style.opacity = "1";
  //alert ("Pay attention your professor is going to say something important!")

}


/*  if(detections.length > 0){
      console.log(detections[0]["expressions"])
    }
    
     */