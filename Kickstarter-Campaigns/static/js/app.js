// Select table
var table = d3.select("#table-data");

// Import from data.json
d3.json("../data/data.json").then(function(tableData) {

    console.log(tableData);

    // Select the tbody in the html table
    var tbody = d3.select("tbody");

    init();



// Init function to create table on page
function init() {
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
}


// FOR FILTERS:
var button = d3.select("#filter-button");

// When button is clicked
button.on("click", runEnter);

// Run enter function - when filter button is ran
function runEnter() {

    // Reset the html
    runReset();

    // Keep the page from refreshing
    d3.event.preventDefault();

    // Select the inputs
    var inputState = d3.select("#inputState").property("value");
    var inputStaffPick = d3.select("#inputStaffPick").property("value");
    var inputMinPledge = d3.select("#inputMinPledge").property("value");
    var inputMaxPledge = d3.select("#inputMaxPledge").property("value");
    var inputCat = d3.select("#inputCat").property("value");
    var inputSubCat = d3.select("#inputSubCat").property("value");
    var inputMinGoal = d3.select("#inputMinGoal").property("value");
    var inputMaxGoal = d3.select("#inputMaxGoal").property("value");
    var inputState = d3.select("#inputState").property("value");
    var inputMinPerFunded = d3.select("#inputMinPerFunded").property("value");
    var inputMaxPerFunded = d3.select("#inputMaxPerFunded").property("value");

    console.log(inputState);

    // Run select function
    runSelect();
}

// Define the reset button function
function runReset() {
    
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    // Reset the table
    tbody.html("");

    init();
}

function runSelect() {

}

    countryDropdown = d3.select("#inputCountry");
    categoryDropdown = d3.select("#inputCat");
    subCategoryDropdown = d3.select("#inputSubCat");
    stateDropdown = d3.select("#inputState");
    staffPickDropdown = d3.select("#inputStaffPick");


    // Countries
    var countries = tableData.map(id => id.country);

    // GET RID OF DUPLICATES
    // Convert the array to a set
    var setCountryNames = new Set(countries);
    // Convert the set back into an array
    var uniqueCountryNames = Array.from(setCountryNames);

    // For each city, append the name to a dropdown attribute
    uniqueCountryNames.forEach(country => {
        
        var item = countryDropdown.append("option");
        item.attr("class", "dropdown-item");
        item.text(country);
    });

    // Goal
    var goal = tableData.map(id => id.goal);

    // Category
    var category = tableData.map(id => id.Category);

    // GET RID OF DUPLICATES
    // Convert the array to a set
    var setCatNames = new Set(category);
    // Convert the set back into an array
    var uniqueCatNames = Array.from(setCatNames);

    // For each city, append the name to a dropdown attribute
    uniqueCatNames.forEach(category => {
        
        var item = categoryDropdown.append("option");
        item.attr("class", "dropdown-item");
        item.text(category);
    });

    // Sub-Category
    var subCategory = tableData.map(id => id["Sub-Category"]);

    // GET RID OF DUPLICATES
    // Convert the array to a set
    var setSubCatNames = new Set(subCategory);
    // Convert the set back into an array
    var uniqueSubCatNames = Array.from(setSubCatNames);

    // For each city, append the name to a dropdown attribute
    uniqueSubCatNames.forEach(subCat => {
        
        var item = subCategoryDropdown.append("option");
        item.attr("class", "dropdown-item");
        item.text(subCat);
    });

    // State of Campaign
    var state = tableData.map(id => id.state);

    // GET RID OF DUPLICATES
    // Convert the array to a set
    var setState = new Set(state);
    // Convert the set back into an array
    var uniqueState = Array.from(setState);

    // For each city, append the name to a dropdown attribute
    uniqueState.forEach(the_state => {
        
        var item = stateDropdown.append("option");
        item.attr("class", "dropdown-item");
        item.text(the_state);
    });

    // Staff Pick
    var staff_pick = tableData.map(id => id["staff_pick"]);

    // Percent Funded
    var percent_funded = tableData.map(id => id["Percent Funded"]);

    // console.log(category);
});