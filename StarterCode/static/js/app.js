d3.json("samples.json").then(function(data) {
    sampleValues = [] ;
    sampleIDs = [] ;
    sampleNames = [] ;

    for (let i=0; i<10; i++) {
        sampleValues.push(data.samples[0].sample_values[i]) ;
        sampleIDs.push('OTU' + ' ' + data.samples[0].otu_ids[i].toString()) ;
        sampleNames.push(data.samples[0].otu_labels[i])
        } ;

    console.log(sampleValues) ;
    console.log(sampleIDs) ;
    console.log(sampleNames) ;

    var trace1 = {
        x: sampleValues.reverse(),
        y: sampleIDs.reverse(),
        type: "bar",
        orientation: "h",
        mode: "markers",
        text: sampleNames.reverse()
      };
      
      var data = [trace1];
      
      var layout = {
        title: "'Bar' Chart"
      };
      
      Plotly.newPlot("bar", data, layout);

}) ;