function toggleLogin() 
{
   var login = document.getElementById("login-overlay-ID");
     login.classList.toggle("open");
    var overlay = document.getElementById ("overlay");
    overlay.classList.toggle("overlayShow");
}

document.addEventListener ("click", function(event) {   
  var target = event.target;
  var login = document.getElementById("login-overlay-ID");
  if(login.classList.contains ("open") && target == document.getElementById("overlay"))
  {
      toggleLogin();
  }        
});


function handleSubmit()
{
 const username = document.getElementById("username").value;
 localStorage.setItem("USERNAME", username);
 return;
}