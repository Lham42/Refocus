function toggleDarkMode() 
{
   document.body.classList.toggle ("darkMode");
   var icons = document.getElementsByClassName("icon");

for(var i=0; i< icons.length; i++){
    icons[i].classList.toggle("darkMode");
}
}


function openDisplay(){
document.getElementById("sTopic").innerHTML = "Focus your studies on these topics:";
}


function openTimeline(){
document.getElementById("sTopic").innerHTML = "Upcoming tasks:";
}