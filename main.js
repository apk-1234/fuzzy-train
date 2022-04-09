video="";
status="";
objects=[];
function preload()
{
    video=createVideo('video.mp4');
    video.hide();
}
function setup()
{
    canvas=createCanvas(460,320);
    canvas.center();
}
function draw()
{
    image(video,0,0,460,320);
    if(status!="")
    {
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number").innerHTML="Number of objects detected : "+objects.length;
            fill("#FF0000");
            noFill();
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(1);
}
function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects=results;
}