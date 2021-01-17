function toggleLightMode() 
{
   document.body.classList.toggle ("lightMode");
   var icons = document.getElementsByClassName("icon");

for(var i=0; i< icons.length; i++){
    icons[i].classList.toggle("lightMode");
}
}