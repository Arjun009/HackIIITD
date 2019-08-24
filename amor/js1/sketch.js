let video;
let poseNet;
let poses = [];
let l1 = false;
let l2 = false;
let l3 = false;
let l4 = true;
let cycle = 0;
var prev = 0;
let count_uni = 0;
var saved = false;
console.log("opop");

function setup() {
    console.log(windowWidth+" "+windowHeight)
    createCanvas(640, 500);
    video = createCapture(VIDEO);
    video.size(width, height);
    frameRate(30);


    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function draw() {
    image(video, 0, 0, width, height);
    // We can call both functions to draw all keypoints and the skeletons
        drawKeyPoints();
        drawSkeleton();
  
    
}

// A function to draw ellipses over the detected keypoints
function drawKeyPoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(124, 252, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
   
        if (poses.length != 0) {
            l1 = true;


            if (abs(poses[0].pose.leftEye.y - poses[0].pose.rightEye.y) < 5 && l1 == true && l4) {
                l2 = true;
                l3 = false;
                l1 = false;
                //console.log(poses[0].pose.leftShoulder.y, poses[0].pose.leftWrist.y);

            }

            if ((15 < poses[0].pose.leftEye.y - poses[0].pose.rightEye.y && poses[0].pose.leftEye.y - poses[0].pose.rightEye.y < 30) && l1 == true) {
                l3 = true;
                l2 = false;
                l1 = false;
                l4 = false;


            }

            if ((15 < poses[0].pose.rightEye.y - poses[0].pose.leftEye.y && poses[0].pose.rightEye.y - poses[0].pose.leftEye.y < 30) && l3 == true && l4 == false) {
                l1 = true;
                l2 = false;
                l3 = false;
                if(cycle != 5)
                    cycle++;
            }

        }
        if (cycle != prev) {
            //console.log("cycle: " + cycle);
            // document.getElementById("sarthak").innerHTML=cycle;
            $("#sarthak").fadeOut("slow", () => {
                $("#sarthak").html(cycle);
                $("#sarthak").fadeIn();
            });
        }
        if (cycle == 5 && saved == false) {

            $("#sarthak").fadeOut("slow", () => {
                $("#sarthak").html(cycle);
                $("#sarthak").fadeIn();
            });
            //console.log("Im back in 0");
            saved = true;
        }
        prev = cycle;
    
        //drawKeyPoints1();
}


// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(124, 252, 0);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
