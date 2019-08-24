let video;
let poseNet;
let poses = [];
let a = 0, b = 0, c = 0, d = 0;
let move_count = 0;
var prev = 0;
let count_uni = 0;
var saved = false;

function setup() {
    createCanvas(640, 480);
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

function modelReady() {
    select('#status').html('Model Loaded');
}

function draw() {
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
        drawKeyPoints();
        drawSkeleton();
  
    
}



function drawKeyPoints(){
    
    // Loop through all the poses detected
    
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(255);
                stroke(20);
                strokeWeight(4);
                ellipse(keypoint.position.x, keypoint.position.y, 8, 8);
            }
        }
    }
 
    if (poses.length != 0) {
            a = 1;

            if (abs(poses[0].pose.leftShoulder.y - poses[0].pose.leftWrist.y) < 30 && abs(poses[0].pose.rightShoulder.y - poses[0].pose.rightWrist.y) < 30 && a === 1) {
                b = 1; c = 0; a = 0;
                //console.log(poses[0].pose.leftShoulder.y, poses[0].pose.leftWrist.y);

            }

            if (poses[0].pose.leftWrist.y < poses[0].pose.leftEye.y && poses[0].pose.rightWrist.y < poses[0].pose.rightEye.y && b === 1) {
                c = 1; b = 0; a = 0;
            }
            if (poses[0].pose.leftWrist.y < (poses[0].pose.leftShoulder.y - 30) && poses[0].pose.rightWrist.y < (poses[0].pose.rightShoulder.y - 30) && c === 1) {
                a = 1; b = 0; c = 0;
                
                if(move_count < 5)
                    move_count++;
            }
        }


        if (move_count != prev) {
           
            $("#counting-id").fadeOut("slow", () => {
                $("#counting-id").html(move_count);
                $("#counting-id").fadeIn();
            });
        }
        if (move_count == 5 && saved == false) {

            $("#counting-id").fadeOut("slow", () => {
                $("#counting-id").html(move_count);
                $("#counting-id").fadeIn();
            });
           
            saved = true;
        }
        prev = move_count;
    
      
    
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
            stroke(255);
            strokeWeight(1);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
