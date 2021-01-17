const btn = document.querySelector('.talk') //add a button or smth with class "talk"
const btn2 = document.querySelector('.end')
const content = document.querySelector('.content') //this is to display the recorded text, can change to smth else for the actual website

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

var speechText = ""
var question = false;
var asked = "";
var time = 0;
var firstStart = false;
var actualEnd = false;

const recognition = new SpeechRecognition()
recognition.continuous = true;

recognition.onstart = function() {
    console.log('Voice logging is activated, talk to take notes')
    if(firstStart == false)
    {
      var d = new Date();
      time = d.getTime()/1000;
      firstStart = true;
    }
}

recognition.onend = function() {
    console.log("end")
    if(actualEnd == false)
    {
        recognition.start();
    }
} //mic seems to end after a period of time hopefully this keeps it on

recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript
    if(transcript.includes('hey Siri')){
        readOutLoud("How may I help you?")
        question = true; // maybe for smth like play spotify or smth lol will come back to this
    }
    else if (question === true)
    {
      speechText+=transcript;
        if(transcript.includes('Spotify')){
            window.open("https://open.spotify.com/playlist/4wyu7odMaqvGsGUH25jIEq");
        }//smth to like open spotify or perform actions asked by user
        else if (transcript.includes('end session')){
          actualEnd = true;
          readOutLoud("Okay, goodbye!");
          recognition.stop();
          clearInterval(window.refreshIntervalId)
        }
        else {
          readOutLoud("Sorry, I don't understand.")
        }
        question = false;
    }
    else if(transcript.includes('Spotify'))
    {
      window.open("https://open.spotify.com/playlist/4wyu7odMaqvGsGUH25jIEq");
    }
    else if(transcript.includes ('rain')){
      window.open("https://www.youtube.com/watch?v=o8GrqUSdzi0&ab_channel=SoothingRelaxation");
    }
    else if(transcript.includes ('google drive')|| transcript.includes ('Google Drive')){
      window.open("https://www.google.com/intl/en_in/drive/");
    }
    else{
        var d = new Date();
        speechText += convertTime(d.getTime()) + " " + transcript + "\n"
        console.log(event.results[current][0].confidence)
        content.textContent = speechText
        readOutLoud(transcript)
        console.log(convertTime(d.getTime()))
    }
}

function convertTime(time2){
    var newTime = "";
    var diff = time2/1000 - time
    var temp = Math.floor(diff/3600)
    if(temp < 10) {
        newTime += "0" + temp + ":"
    }
    else {
        newTime += temp + ":"
    }

    diff = diff-temp*3600
    temp = Math.floor(diff/60)
    if(temp < 10) {
        newTime += "0" + temp + ":"
    }
    else {
        newTime += temp + ":"
    }

    diff = Math.floor(diff-temp*60)
    if(diff < 10) {
        newTime += "0" + diff
    }
    else {
        newTime += diff
    }
    return newTime
}

var speak = false;
btn.addEventListener('click', () => {
    recognition.start();
    speak = true;
})

var refreshIntervalId = setInterval(function(){ //can use this for like pom doro study thing
    if(speak)
    {
        readOutLoud("Drink water");
    }
}, 600000) //36000) every 10 minutes tells you to drink

btn2.addEventListener('click', () => {
    console.log("clicked")
    actualEnd = true;
    readOutLoud("Goodbye!");
    recognition.stop();
    clearInterval(window.refreshIntervalId)
})


function readOutLoud(message){ //customize this to talk outputs
    const speech = new SpeechSynthesisUtterance()
    speech.text = message; 
    console.log(message);
    if(message.includes('test'))
    {
        speech.text = message;
    }

    speech.volume = 0.8;
    speech.rate = 0.75;
    speech.pitch = 1.3;

    //window.speechSynthesis.speak(speech) // old voice
    responsiveVoice.speak(message); //new voice
}

