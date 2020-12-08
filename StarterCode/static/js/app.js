plotFunc('940') ;

function plotFunc(dataset) {
d3.json("samples.json").then(function (data) {

    var a = data.names.indexOf(dataset);
    currentData = data.samples[a];
    metaData = data.metadata[a] ;



    // gather data for the bubble plot
    var allSampleValues = [];
    var allSampleIDs = [];
    var allSampleNames = [];

    for (let j = 0; j < (currentData.sample_values.length) + 1; j++) {
        allSampleValues.push(currentData.sample_values[j]);
        allSampleIDs.push(currentData.otu_ids[j]);
        allSampleNames.push(currentData.otu_labels[j]);
    };


    var colors = allSampleIDs.map(i => i);

    // populate pull down with Subject ID numbers
    var select = document.getElementById("selDataset");
    var options = data.names;

    for (let m = 0; m < options.length; m++) {
        var opt = options[m];
        var el = document.createElement("option");
        el.text = opt;
        el.value = opt;
        select.add(el);
    };


    var topTenSampleValues = allSampleValues.slice(0, 10);

    stringAdder = topTenSampleIDs => {
        let newIDs = topTenSampleIDs.map(function (e) {
            return 'OTU' + ' ' + e;
        });
        return newIDs;
    }

    // make bar plot    
    var trace1 = {
        x: topTenSampleValues.reverse(),
        y: stringAdder(allSampleIDs.slice(0, 10)).reverse(), // I made a function to add "OTU" string
        type: "bar",
        orientation: "h",
        mode: "markers",
        text: allSampleNames.reverse()
    };

    var barData = [trace1];

    var barLayout = {
        title: "Bar Chart"
    };

    Plotly.newPlot("bar", barData, barLayout);


    // make scatter plot    
    var trace2 = {
        x: allSampleIDs,
        y: allSampleValues,
        type: "scatter",
        mode: "markers",
        marker: {
            size: allSampleValues,
            color: colors
        }
    };

    var bubbleData = [trace2];

    var bubbleLayout = {
        title: "Bubble Chart"
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);




    var div = document.getElementById('sample-metadata');

    div.innerHTML = [];
    div.innerHTML += 'id:' + metaData.id + "<br />";
    div.innerHTML += 'ethnicity:' + metaData.ethnicity + "<br />";
    div.innerHTML += 'gender:' + metaData.gender + "<br />";
    div.innerHTML += 'age:' + metaData.age + "<br />";
    div.innerHTML += 'location:' + metaData.location + "<br />";
    div.innerHTML += 'bbtype:' + metaData.bbtype + "<br />";
    div.innerHTML += 'wfreq:' + metaData.wfreq + "<br />";   

    console.log(metaData)

    // var traceGauge = {
    //     type: 'pie',
    //     showlegend: false,
    //     hole: 0.4,
    //     rotation: 90,
    //     values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
    //     text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    //     direction: 'clockwise',
    //     textinfo: 'text',
    //     textposition: 'inside',
    //     marker: {
    //       colors: ['','','','','','','','','','white'],
    //       labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    //       hoverinfo: 'label'
    //     }
    //   }
  
    //   // needle
    //   var degrees = 106, radius = .68
    //   var radians = degrees * Math.PI / 180
    //   var x = -1 * radius * Math.cos(radians) * metaData.wfreq
    //   var y = radius * Math.sin(radians)

    //   console.log(x)
    //   console.log(y)
  
    //   var gaugeLayout = {
    //     shapes: [{
    //       type: 'line',
    //       x0: 0.5,
    //       y0: 0.5,
    //       x1: 1.31,
    //       y1: 0.65,
    //     //   x1: x,
    //     //   y1: y,
    //       line: {
    //         color: 'black',
    //         width: 3
    //       }
    //     }],
    //     title: 'Chart',
    //     xaxis: {visible: false, range: [-1, 1]},
    //     yaxis: {visible: false, range: [-1, 1]}
    //   }
  
    //   var dataGauge = [traceGauge]
  
    //   Plotly.plot('gauge', dataGauge, gaugeLayout)



    var gaugeData = [
        {
            type: "indicator",
            mode: "gauge+number",
            value: metaData.wfreq,
            title: { text: "Scrubs Per Week", font: { size: 24 } },
            gauge: {
              axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
              bar: { color: "black" },
              bgcolor: "white",
              borderwidth: 2,
              bordercolor: "gray",
              steps: [
                { range: [0, 1], color: "lightblue" },
                { range: [1, 2], color: "coral" },
                { range: [2, 3], color: "palegreen" },
                { range: [3, 4], color: "red" },
                { range: [4, 5], color: "mediumorchid" },
                { range: [5, 6], color: "green" },
                { range: [6, 7], color: "chocolate" },
                { range: [7, 8], color: "tan" },
                { range: [8, 9], color: "blue" }
              ],              
            }
          }
        ];
    Plotly.newPlot('gauge', gaugeData) //, gaugeLayout);

});
};

d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value").toString();
    plotFunc(dataset)
}
