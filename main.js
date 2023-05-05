status="";

objects=[];

//object=document.getElementById("object").value;
function preload(){

}

function setup(){
canvas=createCanvas(400,300);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}

function draw(){
image(video,0,0,400,300);
if(status!=""){
object_Detector.detect(video,gotResults);
for(i=0;i<objects.length;i++){
document.getElementById('status').innerHTML="Objects Detected";
fill("red");
stroke("red");
percent=floor(objects[i].confidence * 100);
text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
noFill();
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

if(object==objects[i].label){
video.stop();
object_Detector.detect(gotResults);
document.getElementById("detected").innerHTML=object+" Found";
synth=window.speechSynthesis;
speak_data=object+" Found";
utter_this=new SpeechSynthesisUtterance(speak_data);
synth.speak(utter_this);

}
else{
document.getElementById("detected").innerHTML=object+" Not Found";
}
}
}
}

function start(){
object_Detector=ml5.objectDetector("cocossd",modelloaded);
document.getElementById('status').innerHTML="Detecting Objects";
object=document.getElementById("object").value;
}

function modelloaded(){
console.log("Model is Loaded!");
status=true;
}

function gotResults(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}