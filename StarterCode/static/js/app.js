//create function for chart
function init(id) {
   // Fetch the JSON data and console log it
    d3.json("samples.json").then((data)=> {
    console.log(data);