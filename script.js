let VIDEO=null;
let CANVAS=null;
// let CANVASIMG=null
let CONTEXT=null;
// let CONTEXTIMG=null;
let SCALER=0.8;
let SIZE={x:0,y:0,width:0,height:0};

function main() {
    // CANVASIMG=document.getElementById("canvas2");
    // CONTEXTIMG=CANVASIMG.getContext("2d");

    CANVAS=document.getElementById("myCanvas");
    CONTEXT=CANVAS.getContext("2d");
    
    // CANVASIMG=document.getElementById("canvas2");
    // CONTEXTIMG=CANVAS.getContext("2d");


    let promise=navigator.mediaDevices.getUserMedia({video:true});
    promise.then(function(signal){
        VIDEO=document.createElement("video");
        VIDEO.srcObject=signal;
        VIDEO.play();

        VIDEO.onloadeddata=function() {
            handleResize();
            window.addEventListener('resize',handleResize);
            // PutImage ();
            updateCanvas();
           
        }
    }).catch(function(err){
        alert("Camera error: "+ err);
    });

  
}

// function PutImage (){
//     var img = new Image();
//     img.src = "./images/black.png";
//     img.onload = function() {
//         CONTEXTIMG.drawImage(img,10,20,600, 500);
//     }
// }

function handleResize() {
    CANVAS.width=window.innerWidth;
    CANVAS.height=window.innerHeight;

    let resizer=SCALER*
    Math.min(
        window.innerWidth/VIDEO.videoWidth,
        window.innerHeight/VIDEO.videoHeight
    );

    SIZE.width=resizer*VIDEO.videoWidth;
    SIZE.height=resizer*VIDEO.videoHeight;
    SIZE.x=window.innerWidth/2-SIZE.width/2;
    SIZE.y=window.innerHeight/2-SIZE.height/2;
}

function updateCanvas() {
    // CONTEXTIMG.globalCompositeOperation='destination-over';
    CONTEXT.drawImage(VIDEO,
        SIZE.x, SIZE.y,
        SIZE.width, SIZE.height);
        
    window.requestAnimationFrame(updateCanvas);
}