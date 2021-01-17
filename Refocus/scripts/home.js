function toggleDarkMode() 
{
   document.body.classList.toggle ("darkMode");
   var icons = document.getElementsByClassName("icon");

for(var i=0; i< icons.length; i++){
    icons[i].classList.toggle("darkMode");
}
}

window.onload = function()
{hi();
};


function hi ()
{
  var username = "hi";
  username = localStorage.getItem("USERNAME");
  alert("Hello, "+username +"!");
  }