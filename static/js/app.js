function plots(id) {
// Fetch the JSON data and console log it
   d3.json("samples.json").then((data) => {
      console.log(data);
   
 
// Grab values from the data json object to build the plots

               // Get metadata table
                  var metadata = data.metadata[0];
                  // Append data for table 
                  Object.entries(metadata).forEach(([key, value]) => {
                     d3.select("#sample-metadata")
                         .append("h5")
                         .text(`${key}:${value}`)
                 })

      // Get Samples by ID 
      var samples = data.samples.filter(d => d.id.toString() === id)[0];

// Sort and slice the sample values to get the top 10 
      
      var samples_vs = samples.sample_values.slice(0, 10).reverse();
      var o_ids = (samples.otu_ids.slice(0, 10)).reverse();
      var o_labels = (samples.otu_labels.slice(0, 10)).reverse();
      // Format the OTU ids
      var new_labels = o_labels.map(d => "OTU" + d);

// Create the Trace for bar chart
      var trace1 = {
         x: samples_vs.sort((a, b) => a - b),
         y: new_labels,
         type: "bar",
         orientation : "h",
         text: o_labels,
      };

      var data = [trace1];

      var layout = {
         title: "Top 10 OTUs",
      };
      
      // Plot the chart to a div tag with id "bar"
      Plotly.newPlot("bar", data, layout);

   // Create the Trace for bubble chart
      var trace2 = {
         x: samples.otu_ids,
         y: samples.sample_values,
         mode: "markers",
         marker: {
             size: samples.sample_values,
             color: samples.otu_ids
         },
         text: samples.otu_labels
     };

     var data2 = [trace2];

     var layout2 = {
         title: "OTU ID"
     };

     // Plot the chart to a div tag with id "bubble"
     Plotly.newPlot("bubble", data2, layout2);
      

   });
};


// Create the function for the option changing event
function  optionChanged(id) {
   plots(id);

}

// Initializes the page with a default plots
function init() {
   // Use D3 to select the dropdown menu
   var dropdownMenu = d3.select("#selDataset");

   // Fetch the JSON data and console log it
   d3.json("samples.json").then((data) => {
      console.log(data);
   
       // Extract IDs
       var names = data.names;
       names.forEach((value) => {
           dropdownMenu.append("option").text(value).property("value");
       });

       // Display plots
       plots(names[0]);
   });

}
init();