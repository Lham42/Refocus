function toggleDarkMode() 
{
   document.body.classList.toggle ("darkMode");
   var icons = document.getElementsByClassName("icon");

for(var i=0; i< icons.length; i++){
    icons[i].classList.toggle("darkMode");
}
}


document.getElementById("disgusted").innerHTML = disgusted_percent + "%"
  document.getElementById("angry").innerHTML = angry_percent + "%"
  document.getElementById("fearful").innerHTML = fearful_percent + "%"
  document.getElementById("happy").innerHTML = happy_percent + "%"
  document.getElementById("neutral").innerHTML = neutral_percent + "%"
  document.getElementById("surprised").innerHTML = surprised_percent + "%"
  document.getElementById("sad").innerHTML = sad_percent + "%"
  