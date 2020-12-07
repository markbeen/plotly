d3.json("samples.json").then(function(data) {
    // console.log(data.metadata[0]);

    // var metaData = data.metaData ;

    // console.log(data.samples[0].sample_values)
    // console.log(data.samples[0].sample_values.length)

    sampleValues = [] ;
    sampleIDs = [] ;
    yVals = [] ;
    yStarter = 9

    for (let i=0; i<10; i++) {
        sampleValues.push(data.samples[0].sample_values[i]) ;
        sampleIDs.push('OTU' + ' ' + data.samples[0].otu_ids[i].toString()) ;
        yVals.push(yStarter) ;
        yStarter--;
        } ;

    // sampleValues.reverse() ;    

    console.log(sampleValues) ;
    console.log(sampleIDs) ;
    // console.log(yVals)



    var trace1 = {
        x: sampleValues.reverse(),
        y: sampleIDs.reverse(),
        type: "bar",
        orientation: "h",
      };
      
      var data = [trace1];
      
      var layout = {
        title: "'Bar' Chart"
      };
      
      Plotly.newPlot("bar", data, layout);






}) ;