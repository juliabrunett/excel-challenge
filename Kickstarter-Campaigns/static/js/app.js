var table = d3.select("#table-data");

// Import from data.json
d3.json("../data/data.json").then(function(tableData) {

console.log(tableData);

// Select the tbody in the html table
var tbody = d3.select("tbody");

// Take data and append results to each row
tableData.forEach(id => {
    // console.log(id);

    // Append a row to the tbody
    var row = tbody.append("tr");
    
    Object.entries(id).forEach(([key, value]) => {
        // console.log(key, value);

        var data_cell = row.append("td").text(value);
    });
});
});