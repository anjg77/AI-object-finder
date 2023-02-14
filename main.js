status=" ";
video=" ";
object=" ";
objects=[];
var SpeechRecognition=window.webkitSpeechRecognition;
var speech=new SpeechRecognition();

function preload(){
   
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
    object=document.getElementById("object_name").value;
   
    
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
    
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status=="true"){
        object_detector.detect(video,gotResult);
        for (i=0;i<objects.length;i++){
            
            document.getElementById("status").innerHTML="status:object detected "
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("blue")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


            if(objects[i].label==object){
                video.stop()  
                object_detector.detect(gotResult);
                document.getElementById("status").innerHTML=object+" found";
                speak_data=object+"Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            if(objects[i].label!=object){
                document.getElementById("status").innerHTML=object+" not found";
            }
        }
    }
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
    
}
