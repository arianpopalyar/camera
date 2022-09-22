let VIDEO=null;
let CANVAS=null;
let CONTEXT=null;

function main() {
    document.getElementsByClassName("container__background")[0].style.display = "none";
    document.getElementsByClassName("container__button--try")[0].style.display ="none";
    document.getElementsByClassName("container__canvas")[0].style.display ="block";
    CANVAS=document.getElementById("myCanvas");
    CONTEXT=CANVAS.getContext("2d");


    let promise=navigator.mediaDevices.getUserMedia({
        video: {
            width:{exact:800},
            height:{exact:700}
        }
    });

    promise.then(function(signal){
        VIDEO=document.createElement("video");
        VIDEO.srcObject=signal;
        VIDEO.play();

        VIDEO.onloadeddata=function() {
            handleResize();
            window.addEventListener('resize',handleResize);
            updateCanvas();
           
        }
    }).catch(function(err){
        alert("Camera error: "+ err);
    });
}

function handleResize() {
    CANVAS.width=1200;
    CANVAS.height=900
}

function updateCanvas() {
    CONTEXT.drawImage(VIDEO,10,10);
    window.requestAnimationFrame(updateCanvas);
}