status = "";
txet = "";
objects = [];
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    txet = document.getElementById("textarea").value;
}
function modelLoaded()
{
    console.log("The model has successfully loaded!");
    status = true;
}
function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "" && txet == objects)
    {

      for (i = 0; i < objects.length; i++)
      {     
        videoLiveView.stop();     
        document.getElementById("instruction").innerHTML = "Object mentioned found!!";
        percent = floor(objects[i].confidence * 100);
        text(objects[i].labe l + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#2be");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        objectDetector.detect(gotResult);
        speech = window.speechSynthesis;
        var utterthis = new SpeechSynthesisUtterance("Object mentioned found!!");
        speak(utterthis);
      }
    }
    else
    {
        document.getElementById("instruction").innerHTML = "Could not find object. :(";
    }
}
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}