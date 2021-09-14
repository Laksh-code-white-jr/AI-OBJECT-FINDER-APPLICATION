status="";
object=[];
percent="";
value_fromtextbox="";

function setup(){
canvas=createCanvas(500,500);
canvas.center();
camera = createCapture(VIDEO);
camera.hide();
}

function draw(){
image(camera,0,0,500,500); 
if(status!=0){
objectDetector.detect(camera,gotresult);
for(var l=0;l<object.length;l++){
    document.getElementById("detecting").innerHTML="Status: Objects Detected";
    fill("#FF0000");
percent=floor(object[l].confidence * 100);
text(object[l].label+" "+ percent+ "%",object[l].x + 15,object[l].y + 15);
stroke("#FF0000");
noFill();
rect(object[l].x,object[l].y,object[l].width,object[l].height);
if(object[l].label==value_fromtextbox){
    camera.stop();
    objectDetector.detect(gotresult);
    document.getElementById("finding").innerHTML=value_fromtextbox+"Found";
    Synth=window.speechSynthesis;
    utterThis=new SpeechSynthesisUtterance(value_fromtextbox+"Found");
    Synth.speak(utterThis);
}
else{
    document.getElementById("finding").innerHTML=value_fromtextbox+"Not Found";
}
}
}
}

function gotresult(error,results){
    if (error){
        console.error(error)
    }
    else{
        console.log(results);
        object=results 
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("detecting").innerHTML="Status : Detecting Objects"
    value_fromtextbox=document.getElementById("textbox").value;
}

function modelLoaded(){
console.log("COCOSSD Has Successfully Loaded!");
status=true;
}