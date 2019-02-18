var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myData = JSON.parse(this.responseText);
        for(var i = 0; i < myData.length; i++) {
            procGraphData(myData[i]);
        }
    }
};
xmlhttp.open("GET", "data.json", true);
xmlhttp.send();

function procGraphData(myData) {
    // for(var objProp in myData) {
    //     document.getElementById("demo").innerHTML += "\"" + myData[objProp] + "\" ";
    // }
    
    var graph = document.getElementById(myData["graph-id"]);
    var ctx = graph.getContext("2d");
    ctx.textAlign = "center";


    switch(myData["graph-type"]) {
        case "line-graph":
            ctx.strokeStyle ="#000000";
            var graphMargins = 35;
            // draw graph
            ctx.beginPath();
            ctx.moveTo(graphMargins, 0);
            ctx.lineTo(graphMargins, graph.height-graphMargins);
            ctx.lineTo(graph.width, graph.height-graphMargins);
            ctx.stroke();
            ctx.fillText(myData["x-label"], graph.height, graph.width/2-5)
            ctx.rotate(-90 * Math.PI / 180);
            ctx.fillText(myData["y-label"], -graph.height/2, 10);
            ctx.rotate(90 * Math.PI / 180);

            // get y marker data
            var yLen = graph.height-graphMargins;
            var yRange = myData["y-range"][1] - myData["y-range"][0];
            var ySegments = yRange;
            var yStep = yLen / ySegments;
            // draw y markers
            ctx.moveTo(graphMargins, graph.height-graphMargins);
            for(var i = 1; i < ySegments-1; i++) {
                console.log(i % myData["y-range"][2]);
                if(i % myData["y-range"][2] == 0) {
                    var newY = (graph.height-graphMargins)-(yStep*i);
                    ctx.moveTo(graphMargins, newY);
                    ctx.lineTo(graphMargins-5, newY);
                    ctx.stroke();
                }
            }
            // get x marker data
            var xLen = graph.width-graphMargins;
            var xRange = myData["x-range"][1] - myData["x-range"][0];
            var xSegments = xRange;
            var xStep = xLen / xSegments;
            // draw x markers
            ctx.moveTo(graphMargins, graph.height-graphMargins);
            for(var i = 0; i < xSegments-1; i++) {
                if(i % myData["x-range"][2] == 0) {
                    var newX = (graphMargins)+(xStep*(i+1));
                    ctx.moveTo(newX, graph.height-graphMargins);
                    ctx.lineTo(newX, graph.height-graphMargins+5);
                    ctx.stroke();
                }
            }
            ctx.closePath();

            // create line data
            // y location
            console.log("Y Data");
            console.log(yRange);
            console.log((Number(myData["graph-data"][0][1]) - myData["y-range"][0]));
            // x location
            console.log("X Data");
            console.log(xRange);
            console.log((Number(myData["graph-data"][0][0]) - myData["x-range"][0]));

            ctx.strokeStyle ="#F00";
            
            ctx.beginPath();
            for(var i = 0; i < myData["graph-data"].length; i++) {
                console.log("TEST");
                var yLoc = Number(myData["graph-data"][i][1]) - myData["y-range"][0];
                console.log(yLoc);
                var xLoc = Number(myData["graph-data"][i][0]) - myData["x-range"][0];
                console.log(xLoc);
                if(i==0) {
                    ctx.moveTo(graphMargins+(xStep*xLoc), graph.height-graphMargins-(yStep*yLoc));
                } else {
                    ctx.lineTo(graphMargins+(xStep*xLoc), graph.height-graphMargins-(yStep*yLoc));
                    ctx.stroke();
                }
            }
            ctx.closePath();
            
            break;
        default:
            break;
    }
}