// Select table
var table = d3.select("#table-data");

// Import from data.json
d3.json("../data/data.json").then(function(tableData) {

    console.log(tableData);

    match_sub = [];
    match_cat = [];
    match_country = [];

    // Create an object that determines matching cat/sub-cat
    matching = {};

    tableData.forEach(id =>
    {
        matching[id.sub_category] = id.category;

        // if (matching[id.sub_category]) {
        //     console.log("duplicate");
        // }
        match_sub.push(id.sub_category);
        match_cat.push(id.category);
        match_country.push(id.country);
    });


    // console.log(matching);

    // console.log(match_sub);
    // console.log(match_cat);
    // console.log(match_country);

    // Select the tbody in the html table
    var tbody = d3.select("tbody");

    // FOR FILTERS:
    var button = d3.select("#reset-button");
    var filter_form = d3.selectAll(".form-group");
    var search_results = d3.select("#search-results");

    // When button is clicked
    button.on("click", runReset);
    filter_form.on("change", runEnter);

    // Create object to hold filters
    var filter = {};

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

    // Find number of results
    var num_results = tableData.length;

    // Append search number of search results
    search_results.append("p").text(`Number of results: ${num_results}`);
}


// Run enter function - when filter button is ran
function runEnter() {

    // Reset the html
    runHTMLReset();

    // Keep the page from refreshing
    d3.event.preventDefault();

    // INPUTS:
    // Select the input
    var inputElement = d3.select(this).select("select");
    // Find the value of the input
    var inputValue = inputElement.property("value");
    // Find the type of the input
    var inputType = inputElement.attr("id");

    console.log("Inputs")
    console.log("------------")
    console.log("Element: ", inputElement);
    console.log("Value: ", inputValue);
    console.log("Type: ", inputType);


    // Add to the filter object
    if (inputValue) {
        filter[inputType] = inputValue;
    }
    else {
        delete filter[inputType];
    }

    console.log("Filter: ", filter);
    
    // Call the filtered table function 
    var filteredData = filterTable();

    // Update dropdowns
    updateDropdown(filteredData, inputType);
    
};

// Create the filtered table
function filterTable() {

    // // Reset table html
    // runHTMLReset();

    var filteredData = tableData;
    console.log(filteredData);

    // Run through filter object and filter data accordingly
    Object.entries(filter).forEach(([key, value]) => {

        if (key === "staff_pick") {
            if (value === "false") {
                value = Boolean(false);
            }
            else {
                value = Boolean(true);
            }
            
            filteredData = filteredData.filter(id => id[key] === value);
        }
        else {
            filteredData = filteredData.filter(id => id[key] === value);
        }
        // console.log(key);
        // console.log(value);

    
    });

    // console.log(filteredData);

    // Find number of results
    var num_results = filteredData.length;
    // console.log(num_results);

    // Append search number of search results
    search_results.append("p").text(`Number of results: ${num_results}`);

    // Take data and append results to each row
    filteredData.forEach(id => {
        // console.log(id);
    
        // Append a row to the tbody
        var row = tbody.append("tr");
    
            Object.entries(id).forEach(([key, value]) => {
                // console.log(key, value);
    
                var data_cell = row.append("td").text(value);
            });
    });

    return filteredData;

};

// Define the reset button function
function runReset() {
    
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    // Reset the table
    tbody.html("");

    // Reset the search results html
    search_results.html("");

    // Re-initialize the table
    init();
};

// Define the HTML reset function
function runHTMLReset() {
    
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    // Reset the table
    tbody.html("");

    // Reset the search results html
    search_results.html("");

};

function resetCategory() {
    categoryDropdown.selectAll("option.dropdown-item").remove();
}

function resetSubCategory() {
    subCategoryDropdown.selectAll("option.dropdown-item").remove();
    
}

function resetCountry() {
    countryDropdown.selectAll("option.dropdown-item").remove();
}

function resetState() {
    stateDropdown.selectAll("option.dropdown-item").remove();
}

function resetStaffPick() {
    staffPickDropdown.selectAll("option.dropdown-item").remove();
}

    // Loop through each data point to convert
    // tableData.forEach(data => {
    //     // Convert string variables to numbers
    //     data.percent_funded = +data.percent_funded;
    //     data.pledged = +data.pledged;
    //     data.goal = +data.goal;

    // });

    // Select dropdown menus
    countryDropdown = d3.select(".inputCountry");
    categoryDropdown = d3.select(".inputCat");
    subCategoryDropdown = d3.select(".inputSubCat");
    stateDropdown = d3.select(".inputState");
    staffPickDropdown = d3.select(".inputStaffPick");

    // GRAB DATASETS FOR FILTERS:
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

    // Category
    var category = tableData.map(id => id.category);

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
    var subCategory = tableData.map(id => id.sub_category);

    // console.log(subCategory);

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
    var staff_pick = tableData.map(id => id.staff_pick);

    // GET RID OF DUPLICATES
    // Convert the array to a set
    var setStaffPick = new Set(staff_pick);
    // Convert the set back into an array
    var uniqueStaffPick = Array.from(setStaffPick);

    // For each city, append the name to a dropdown attribute
    uniqueStaffPick.forEach(pick => {
        
        var item = staffPickDropdown.append("option");
        item.attr("class", "dropdown-item");
        item.text(pick);
    });
    
function updateDropdown(data, dropdown) {

    if (dropdown != "category") {

        resetCategory();

        // Category
        var category = data.map(id => id.category);

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
        
        
    }
    if (dropdown != "sub_category") {

        resetSubCategory();

        // Sub-Category
        var subCategory = data.map(id => id.sub_category);

        // console.log(subCategory);

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
        

    }
    if (dropdown != "country") {

        resetCountry();

        // Countries
        var countries = data.map(id => id.country);

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
    }
    if (dropdown != "state") {

        resetState();

        // State of Campaign
        var state = data.map(id => id.state);

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
    }
    if (dropdown != "staff_pick") {

        resetStaffPick();

        // Staff Pick
        var staff_pick = data.map(id => id.staff_pick);

        // GET RID OF DUPLICATES
        // Convert the array to a set
        var setStaffPick = new Set(staff_pick);
        // Convert the set back into an array
        var uniqueStaffPick = Array.from(setStaffPick);

        // For each city, append the name to a dropdown attribute
        uniqueStaffPick.forEach(pick => {
            
            var item = staffPickDropdown.append("option");
            item.attr("class", "dropdown-item");
            item.text(pick);
        });
    }
}

    // // Percent Funded
    // var percent_funded = tableData.map(id => id.percent_funded);

    // // MIN & MAX
    // var max_percent = percent_funded.reduce(function(a, b) {
    //     return Math.max(a, b);
    // }, 0);
    // var min_percent = percent_funded.reduce(function(a, b) {
    //     return Math.max(a, b);
    // }, 0);

    //  // Goal
    // var goal = tableData.map(id => id.goal);
    // // MIN & MAX
    // var max_goal = goal.reduce(function(a, b) {
    //     return Math.max(a, b);
    // }, 0);
    // var min_goal = goal.reduce(function(a, b) {
    //     return Math.max(a, b);
    // }, 0);

    // // Pledged
    // var pledged = tableData.map(id => id.pledged);
    // // MIN & MAX
    // var max_pledged = pledged.reduce(function(a, b) {
    //     return Math.max(a, b);
    // }, 0);
    // var min_pledged = pledged.reduce(function(a, b) {
    //     return Math.max(a, b);
    // }, 0);

}); // End of code