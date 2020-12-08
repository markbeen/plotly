// this js script has two functions. The primary function is plotFunc. Test ID is passed into plotFunc as 'testID'.
// Then, on line 13, the index of testID within the json data is identfied and called 'idIDX'.

// the js script is initialized by seeding with a default testID:
plotFunc('940');

// plotFunc (the primary function):
function plotFunc(testID) {
    d3.json("samples.json").then(function (data) {

        // ************** (I) DRILL DOWN TO SPECIFIC ID WTIHIN JSON AND GET RELEVANT DATA **************
        // find index of testID within json file:
        var idIDX = data.names.indexOf(testID);
        currentData = data.samples[idIDX];
        metaData = data.metadata[idIDX];

        // gather data for the bar and bubble plot. The bar plot only wants the top ten sample_values - therefore,
        // the data will be sliced later:

        // first declare holder variables:
        var allSampleValues = [];
        var allSampleIDs = [];
        var allSampleNames = [];

        // fill holder variables with json data
        for (let j = 0; j < (currentData.sample_values.length) + 1; j++) {
            allSampleValues.push(currentData.sample_values[j]);
            allSampleIDs.push(currentData.otu_ids[j]);
            allSampleNames.push(currentData.otu_labels[j]);
        };

        // ************** (II) POPULATE PULL DOWN WITH ALL TEST IDS **************
        // populate pull down with Subject ID numbers. First create variable that points to html div:
        var select = document.getElementById("selDataset");
        // Then create variable ('options') that holds all test IDs (aka 'names' within data json):
        var options = data.names;
        // iterate through all options and add it to select variable:
        for (let m = 0; m < options.length; m++) {
            var opt = options[m];
            var el = document.createElement("option");
            el.text = opt;
            el.value = opt;
            select.add(el);
        };
        // now populate the panel with data specific to testID. First create variable that points to html div:
        var div = document.getElementById('sample-metadata');
        // clear any text first:
        div.innerHTML = [];
        // append desired text. The "<br />" is html and creates a new line
        div.innerHTML += 'id:' + metaData.id + "<br />";
        div.innerHTML += 'ethnicity:' + metaData.ethnicity + "<br />";
        div.innerHTML += 'gender:' + metaData.gender + "<br />";
        div.innerHTML += 'age:' + metaData.age + "<br />";
        div.innerHTML += 'location:' + metaData.location + "<br />";
        div.innerHTML += 'bbtype:' + metaData.bbtype + "<br />";
        div.innerHTML += 'wfreq:' + metaData.wfreq + "<br />";


        // ************** (III) SLICE SAMPLE VALUES SO THAT ONLY TOP TEN ARE RETAINED **************
        // create new variable containing the sliced values
        var topTenSampleValues = allSampleValues.slice(0, 10);
        // for plotting purposes, the string 'OTU' should be prepended to the sample IDs. This was performed
        // by creating a function (stringAdder). Later (line 75), sliced sampleIDs are fed into this function:
        stringAdder = topTenSampleIDs => {
            let newIDs = topTenSampleIDs.map(function (e) {
                return 'OTU' + ' ' + e;
            });
            return newIDs;
        }

        // ************** (IV) MAKE BAR PLOT ******************************************************
        // make "trace" for bar plot    
        var trace1 = {
            x: topTenSampleValues.reverse(), // this was reversed so that the highest values would show on top
            y: stringAdder(allSampleIDs.slice(0, 10)).reverse(), // I made a function to add "OTU" string
            type: "bar",
            orientation: "h",
            mode: "markers",
            text: allSampleNames.reverse()
        };
        // define bar plot layout (i.e. titles, axes, font properties):
        var barLayout = {
            title: {
                text: "<b>Sample Values of Top 10 OTU IDs</b>",
                font: {
                    size: 18
                }
            },
            xaxis: {
                title: {
                    text: "<b>Sample Values</b>",
                    font: {
                        size: 14
                    }
                }
            },
            yaxis: {
                title: {
                    text: "<b>Operational Taxonomic Unit (OTU) ID</b>",
                    font: {
                        size: 14
                    }
                }
            },
        };
        // make the plot - the plotly argument order: Plotly.newPlot(graphDiv, data, layout, config)
        Plotly.newPlot("bar", [trace1], barLayout);


        // ************** (V) MAKE SCATTER PLOT ****************************************************** 
        // I created a variable to hold colors for the bubble plot - not sure I need to do this
        var colors = allSampleIDs.map(i => i);

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
