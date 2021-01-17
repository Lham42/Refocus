window.addEventListner("load", ()=> {
const canvas = document.querySelector("#canvas");
const ct = canvas.getContext("2d");



let painting = false;

function startPosition(e){
  painting = true;
  draw(e);
}
function finishedPosition(){
  painting = false;
  ct.beginPath();
}

function draw(e){
  if (!painting) return;

  ct.lineWidth = 10;
  ct.lineCap = "round";

 ct.strokeStyle = pink;
  ct.lineTo(e.clientX, e.clientY);
 ct.stroke();
 ct.beginPath();
  ct.moveTo(e.clientX, e.clientY);

}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

});





