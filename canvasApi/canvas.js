
/*

    HTML5 Canvas API demo
    Joshua A. Lemli
    2018

*/

"use strict";

var Demo = (function(){

    var canvas, context

    const resizeCanvas = () => {
        context.canvas.width = canvas.offsetWidth
        context.canvas.height = canvas.offsetHeight
    }

    const clearCanvas = () => {
        context.setTransform(1,0,0,1,0,0)
        context.clearRect(0,0,context.canvas.width,context.canvas.height)
        context.setTransform(1,0,0,-1,0,context.canvas.height)
    }

    const plotData = (freq) => {
        // get start time of this function to measure performance
        let tStart = performance.now()
        // reset the drawing element
        clearCanvas()
        // create some spoof data
        let data = []
        for (var i = context.canvas.width*10; i--;) {
            data.push([i/10,(Math.sin(i*freq)+2) * 200 + (Math.random() - 0.5) * 40 ,Math.floor(Math.random()*100)+100])
        }
        // plot it
        data.forEach( point => {
            context.fillStyle = `rgb(0,${point[2]},0)`
            context.fillRect(point[0]-1,point[1]-1,2,2)
        })
        // log the time taken by this func
        console.log(`computed and drew ${data.length} points in ${(performance.now()-tStart).toFixed(2)} milliseconds`)
    }
    
    return function() {
        canvas = document.getElementById("canvas")
        context = canvas.getContext("2d")
        resizeCanvas()
        window.addEventListener("resize",resizeCanvas)
        let input = document.getElementById("freqInput")        
        plotData(input.value)
        input.oninput = event => plotData(input.value)
    }

})()
