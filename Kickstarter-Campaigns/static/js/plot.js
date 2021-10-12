// Import from data.json
d3.json("./data/data.json").then(function(tableData) {

    country_counts = {};
    var counts_list = [];
    var country_list = [];
    
    // Country names
    var countries = tableData.map(id => id.country); 

    // Count of country
    countries.forEach(country => {
        // Initialize count
        count = 0;

        // Loop through to add to country count object
        for (var i = 0; i < countries.length; i++){
            if (country === countries[i]) {
                count+=1;
                country_counts[country] = {"count": count}  
            }
        }
        
    })

    console.log(count);
    console.log(country_counts);

    var other_count = 0;

    // Extract data into lists
    Object.entries(country_counts).forEach(x => {

        if (x[1].count > 73) {
            counts_list.push(x[1].count);
            country_list.push(x[0]);
        }
        else {
            other_count += x[1].count;
            
        }
        
    });
    counts_list.push(other_count);
    country_list.push("Others");


    // console.log(counts_list);
    // console.log(country_list);
    

    var data1 = [{
        type: "pie",
        values: counts_list, // country count
        labels: country_list, // country names
        textinfo: "label+percent",
        textposition: "outside",
        marker: {colors : ['#045a8d', '#2b8cbe','#74a9cf','#bdc9e1', '#f1eef6']}
        // automargin: true
    }]
    
    var layout1 = {
        // height: 500,
        // width: 1000,
        // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
        showlegend: true,
        title: {
        text:'Kickstarter Campaigns by Country',
        font: {
            size: 18
        }
    }
    }
    
    var config = { responsive: true }

    Plotly.newPlot('country_breakdown', data1, layout1, config);

    // Need count of category
    // Need category name

    category_counts = {};
    var cat_counts_list = [];
    var category_list = [];
    
    // Country names
    var categories = tableData.map(id => id.category); 

    // Count of country
    categories.forEach(category => {
        // Initialize count
        cat_count = 0;

        // Loop through to add to country count object
        for (var i = 0; i < categories.length; i++){
            if (category === categories[i]) {
                cat_count+=1;
                category_counts[category] = {"count": cat_count}  
            }
        }
        
    });
    console.log(category_counts);

    // Extract data into lists
    Object.entries(category_counts).forEach(x => {

        cat_counts_list.push(x[1].count);
        category_list.push(x[0]);
        
        
    });

    console.log(cat_counts_list);
    console.log(category_list);

    var data2 = [{
        type: "pie",
        values: cat_counts_list, // category count
        labels: category_list, // category names
        textinfo: "label+percent",
        textposition: "outside",
        
        marker: {
            colors: ['#00441b', '#006d2c','#238b45','#41ae76','#66c2a4','#99d8c9','#ccece6','#e5f5f9','#f7fcfd']
        }
        // automargin: true
    }]
    
    var layout2 = {
        // height: 500,
        // width: 1000,
        // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
        showlegend: true,
        title: {
            text:'Kickstarter Campaigns by Category',
            font: {
                size: 18
            }
        }
    }
    
    var config = { responsive: true }

    Plotly.newPlot('category_breakdown', data2, layout2, config);

});