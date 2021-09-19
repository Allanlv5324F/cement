object_label = "";
status = "";
objects = "";

function setup()
{
    canvas = createCanvas(380,380);
    canvas.position(500,350)
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    object_label = document.getElementById("name_of_object").value;
    speech = object_label + "mentioned found";
    document.getElementById("status").innerHTML = "Status : Detecting" + " " + object_label;
    console.log("Start Button have been pressed");
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded()
{
    console.log("Model Loaded")
    status = true; 
}

function draw()
{
    image(video,0,0,380,380)
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            percent = floor(objects[i].confidence * 100);
            fill("#FF0000");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == object_label)
            {
            video.stop();
            document.getElementById("status").innerHTML = "Status : Finding" + object_label;
            objectDetector.detect(gotResult);
            document.getElementById("detect").innerHTML = object_label + "Found";

            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(speech);
            synth.speak(utterThis);

           }
           else
           {
            document.getElementById("detect").innerHTML = object_label + " " +"Not Found";
           }  
        }
    }
}

function gotResult(error,results)
{
    if(error)
    {
        document.getElementById("status").innerHTML = "An Error Occured !"
    }
    console.log(results);
    objects = results;
}