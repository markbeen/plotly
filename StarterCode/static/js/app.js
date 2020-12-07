d3.json("samples.json").then(function (data) {

    currentData = data.samples[0];

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


    d3.selectAll("#selDataset").on("change", getData);

    // Function called by DOM changes
    function getData() {
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value").toString();
        console.log(dataset);
        var a = data.names.indexOf(dataset);
        console.log(a)
        newData = data.samples[a];
        console.log(newData);
        updatePlotly(newData);
    }

    // });

    function updatePlotly(newdata) {
        Plotly.restyle("bubble", "values", [newdata]);
    }

    function myFunction(p1, p2) {
        p3 = p1 * p2 ;
        return p3 ;
    }

    x = myFunction(3,5) ;
    console.log(x)

});
