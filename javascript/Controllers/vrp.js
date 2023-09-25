var Destination = [
    { name: 'X1', lat: 15.103200, lon: 103.468000, person: 0, stretcher: 1 },
    { name: 'X2', lat: 15.144884, lon: 102.614435, person: 1, stretcher: 0 },
    { name: 'X3', lat: 15.099618, lon: 104.241308, person: 1, stretcher: 1 },
    { name: 'X4', lat: 15.200000, lon: 103.500000, person: 6, stretcher: 34 },
    { name: 'X5', lat: 15.303200, lon: 103.168000, person: 57, stretcher: 4 },
    { name: 'X6', lat: 15.203200, lon: 103.198000, person: 1, stretcher: 0 },
    { name: 'X7', lat: 15.603200, lon: 103.398000, person: 1, stretcher: 0 }
];

const Warehouse = [
    { name: 'A1', lat: 14.934309, lon: 102.080567 },
    { name: 'A2', lat: 15.251905, lon: 104.870980 },
    { name: 'A3', lat: 17.386890, lon: 102.787364 },
];

//////////////////////////////////////////////////

function vrpuse() {
    const destSplited = splitDestinations(Destination);
    //console.log("=================splitDest=================");
    //console.log(destSplited);

    const results = runVRP(destSplited, Warehouse);
    //console.log("=================Process=================");
    //console.log(results);

    const filter = filterstoreResult(results);
    //console.log("Filters ======================",filter);

    const combine = combineResults(destSplited, filter)    // will filter by contain value (person&stretch)
    console.log("=================combineResults=================");
    console.log(combine);

    drawAll(combine,Destination,Warehouse);
    console.log("=====================drawallpoint======================");
    

    ////// Use to recheck total distance
    /*
    const total = calculateTotalDistances(results,destSplited,Warehouse);
    console.log("Total1 : ",total);
    */

    //////////////////////////////////////////////////
}

function runVRP(Destination, warehouse) {
    const results1 = [];
    const results2 = [];
    const results3 = [];
    const results4 = [];
    const results5 = [];
    const results6 = [];
    const resultReal = [];
    let warehouseIndex = 0;

    const storeNomal = [];
    const storePerson = [];
    const storeStretch = [];
    for (const dest of Destination) {
        const person = Object.values(dest)[3];
        const stretcher = Object.values(dest)[4];

        if (person >= 1 && person <= 4 && stretcher >= 1 && person <= 11) {
            storeNomal.push(dest);
        }
        else if (person <= 28 && person >= 1 && stretcher == 0) {
            storePerson.push(dest);
        }
        else if (person == 0 && stretcher >= 1 && stretcher <= 11) {
            storeStretch.push(dest);
        }
        else if (person == 0 && stretcher == 0) {        // It cannot lets any solution.
            console.log("Person: 0, Stretcher: 0");
        }
    }

    let storeNormalcopy = [...storeNomal];
    let storePersoncopy = [...storePerson];
    let storeStretchcopy = [...storeStretch];

    for (let n = 1; n <= 6; n++) {
        if (storeNormalcopy.length === 0) {
            storeNormalcopy = [...storeNomal];
        }
        if (storePersoncopy.length === 0) {
            storePersoncopy = [...storePerson];
        }
        if (storeStretchcopy.length === 0) {
            storeStretchcopy = [...storeStretch];
        }

        if (n == 1) {
            Possible1(results1, storeNormalcopy, storePersoncopy, storeStretchcopy);
        } else if (n == 2) {
            Possible2(results2, storeNormalcopy, storePersoncopy, storeStretchcopy);
        } else if (n == 3) {
            Possible3(results3, storeNormalcopy, storePersoncopy, storeStretchcopy);
        } else if (n == 4) {
            Possible4(results4, storeNormalcopy, storePersoncopy, storeStretchcopy);
        } else if (n == 5) {
            Possible5(results5, storeNormalcopy, storePersoncopy, storeStretchcopy);
        } else if (n == 6) {
            Possible6(results6, storeNormalcopy, storePersoncopy, storeStretchcopy);
        }

    }
    /*
    console.log("Results1===================",results1);
    console.log("Results2===================",results2);
    console.log("Results3===================",results3);
    console.log("Results4===================",results4);
    console.log("Results5===================",results5);
    console.log("Results6===================",results6);
    */

    const resultsdistanceArray = [
        { name: 'results1', totalDistance: calculateTotalDistances(results1, Destination, warehouse) },
        { name: 'results2', totalDistance: calculateTotalDistances(results2, Destination, warehouse) },
        { name: 'results3', totalDistance: calculateTotalDistances(results3, Destination, warehouse) },
        { name: 'results4', totalDistance: calculateTotalDistances(results4, Destination, warehouse) },
        { name: 'results5', totalDistance: calculateTotalDistances(results5, Destination, warehouse) },
        { name: 'results6', totalDistance: calculateTotalDistances(results6, Destination, warehouse) }
    ];
    let minDistance = Infinity; // Initialize with a high value
    let minDistanceVariable = '';

    for (const result of resultsdistanceArray) {
        if (result.totalDistance < minDistance) {
            minDistance = result.totalDistance;
            minDistanceVariable = result.name;
        }
    }
    console.log(resultsdistanceArray);
    console.log(`the minimum total distance is : ${minDistanceVariable} = ${minDistance}`);


    if (minDistanceVariable == "results1") {
        //console.log("===========Return results1****************")
        return results1;
    } else if (minDistanceVariable == "results2") {
        //console.log("===========Return results2****************")
        return results2;
    }
    else if (minDistanceVariable == "results3") {
        //console.log("===========Return results3****************")
        return results3;
    }
    else if (minDistanceVariable == "results4") {
        //console.log("===========Return results4****************")
        return results4;
    }
    else if (minDistanceVariable == "results5") {
        //console.log("===========Return results5****************")
        return results5;
    }
    else if (minDistanceVariable == "results6") {
        //console.log("===========Return results6****************")
        return results6;
    }

    function Possible1(results, normal, person, stretcher) {
        executedNormal(results, normal);
        executedPerson(results, person);
        executedStretch(results, stretcher);
        //return results;
    }
    function Possible2(results, normal, person, stretcher) {
        executedNormal(results, normal);
        executedStretch(results, stretcher);
        executedPerson(results, person);
        //return results;
    }
    function Possible3(results, normal, person, stretcher) {
        executedPerson(results, person);
        executedNormal(results, normal);
        executedStretch(results, stretcher);
        //return results;
    }
    function Possible4(results, normal, person, stretcher) {
        executedPerson(results, person);
        executedStretch(results, stretcher);
        executedNormal(results, normal);
        //return results;
    }
    function Possible5(results, normal, person, stretcher) {
        executedStretch(results, stretcher);
        executedNormal(results, normal);
        executedPerson(results, person);
        //return results;
    }
    function Possible6(results, normal, person, stretcher) {
        executedStretch(results, stretcher);
        executedPerson(results, person);
        executedNormal(results, normal);
        //return results;
    }

    function executedNormal(result, store) {
        while (store.length > 0) {
            const eachHouse = warehouse[warehouseIndex];

            // Make sure there are destinations left to consider
            if (store.length === 0) {
                break; // All destinations have been visited, exit the loop
            }

            // Use your VRP algorithm to calculate the route from warehouse to destination
            var calculatedRoute = vrpNormalModel(store, eachHouse);
            // Push the calculated route to the results array
            result.push(calculatedRoute);

            const route = Object.keys(calculatedRoute)[3];
            //console.log("Route :",route);
            const matches = route.match(/[A-Z]+\d+/g); // Extract all alphabet-number pairs (e.g., ['X123', 'A123'])
            //console.log("matches :",matches[0])

            for (const remaining of store) {
                const remainRoute = Object.values(remaining)[0];
                const index = store.findIndex(remainRoute => remainRoute.name === matches[0]);
                if (remainRoute == matches[0]) {
                    store.splice(index, 1);
                    //console.log("Index was Deleted : ", index);
                }
            }

            // Move to the next warehouse
            if (warehouseIndex === 2) {
                warehouseIndex = 0; // Reset to the first warehouse
            } else {
                warehouseIndex++;
            }
        }
        //return results;
        //console.log("====================================================================Finish Nomal....");
    }

    function executedPerson(results, store) {
        while (store.length > 0) {
            const eachHouse = warehouse[warehouseIndex];

            // Make sure there are destinations left to consider
            if (store.length === 0) {
                break; // All destinations have been visited, exit the loop
            }
            //console.log("store Person  : ", storePerson);
            // Use your VRP algorithm to calculate the route from warehouse to destination
            var calculatedRoute = vrpPersonModel(store, eachHouse);
            // Push the calculated route to the results array
            //console.log("calculatedRoute : ",calculatedRoute);
            results.push(calculatedRoute);

            const route = Object.keys(calculatedRoute)[3];
            //console.log("Route :",route);
            const matches = route.match(/[A-Z]+\d+/g); // Extract all alphabet-number pairs (e.g., ['X123', 'A123'])
            //console.log("matches :",matches[0])

            for (const remaining of store) {
                const remainRoute = Object.values(remaining)[0];
                const indexs = store.findIndex(remainRoute => remainRoute.name === matches[0]);
                if (remainRoute == matches[0]) {
                    store.splice(indexs, 1);
                    //console.log("Index was Deleted : ", indexs);
                }
            }

            // Move to the next warehouse
            if (warehouseIndex === 2) {
                warehouseIndex = 0; // Reset to the first warehouse
            } else {
                warehouseIndex++;
            }
        }
        //return results;
        //console.log("====================================================================Finish Person....");
    }

    function executedStretch(results, store) {
        while (store.length > 0) {
            const eachHouse = warehouse[warehouseIndex];

            // Make sure there are destinations left to consider
            if (store.length === 0) {
                break; // All destinations have been visited, exit the loop
            }
            // Use your VRP algorithm to calculate the route from warehouse to destination
            var calculatedRoute = vrpStretcherModel(store, eachHouse);
            //console.log("CalcualteRoute :",calculatedRoute);
            // Push the calculated route to the results array
            results.push(calculatedRoute);

            const route = Object.keys(calculatedRoute)[3];
            //console.log("Route :",route);
            const matches = route.match(/[A-Z]+\d+/g); // Extract all alphabet-number pairs (e.g., ['X123', 'A123'])
            //console.log("matches :",matches[0])

            for (const remaining of store) {
                const remainRoute = Object.values(remaining)[0];
                const index = store.findIndex(remainRoute => remainRoute.name === matches[0]);
                if (remainRoute == matches[0]) {
                    store.splice(index, 1);
                    //console.log("Index was Deleted : ", index);
                }
            }

            // Move to the next warehouse
            if (warehouseIndex === 2) {
                warehouseIndex = 0; // Reset to the first warehouse
            } else {
                warehouseIndex++;
            }
        }
        //return results;
        //console.log("====================================================================Finish Stretch....");
    }
    return resultReal;
};

function vrpNormalModel(destInput, warehouse) {
    var model = {
        "optimize": "distance",
        "opType": "min",
        "constraints": {
            "person": { "min": 1, "max": 4 },
            "stretcher": { "min": 1, "max": 11 }
        },
        "variables": {}         // The loop will input data to this
    };

    // Calculate distances and add them to the model
    for (const dest of destInput) {
        const distance = getDistanceFromLatLonInKm(dest.lat, dest.lon, warehouse.lat, warehouse.lon); // Calculate distance for each destination-warehouse pair
        const variableName = `${dest.name}${warehouse.name}`; // Create the variable name based on your naming pattern

        // Add the variable to the model
        model.variables[variableName] = {
            distance: distance,
            person: dest.person, // Set the person capacity for this variable based on the destination's person capacity
            stretcher: dest.stretcher
        };
    }

    //var solver = require("javascript-lp-solver");   // Import LP Solver
    var results = solver.Solve(model);
    //console.log("=====================Model====================");
    //console.log(model);
    return results;
};

function vrpPersonModel(destInput, warehouse) {
    var model = {
        "optimize": "distance",
        "opType": "min",
        "constraints": {
            "person": { "min": 1, "max": 28 }
        },
        "variables": {}         // The loop will input data to this
    };

    // Calculate distances and add them to the model
    for (const dest of destInput) {
        const distance = getDistanceFromLatLonInKm(dest.lat, dest.lon, warehouse.lat, warehouse.lon); // Calculate distance for each destination-warehouse pair
        const variableName = `${dest.name}${warehouse.name}`; // Create the variable name based on your naming pattern

        // Add the variable to the model
        model.variables[variableName] = {
            distance: distance,
            person: dest.person, // Set the person capacity for this variable based on the destination's person capacity
            stretcher: dest.stretcher
        };
    }
    //var solver = require("javascript-lp-solver");   // Import LP Solver
    var results = solver.Solve(model);
    //console.log("=====================Model====================");
    //console.log(model);
    return results;
};

function vrpStretcherModel(destInput, warehouse) {
    var model = {
        "optimize": "distance",
        "opType": "min",
        "constraints": {
            //"person": { "min": 1, "max": 28 },
            "stretcher": { "min": 1, "max": 11 },
        },
        "variables": {}         // The loop will input data to this
    };

    // Calculate distances and add them to the model
    for (const dest of destInput) {
        const distance = getDistanceFromLatLonInKm(dest.lat, dest.lon, warehouse.lat, warehouse.lon); // Calculate distance for each destination-warehouse pair
        const variableName = `${dest.name}${warehouse.name}`; // Create the variable name based on your naming pattern

        // Add the variable to the model
        model.variables[variableName] = {
            distance: distance,
            person: dest.person, // Set the person capacity for this variable based on the destination's person capacity
            stretcher: dest.stretcher
        };
    }
    //var solver = require("javascript-lp-solver");   // Import LP Solver
    var results = solver.Solve(model);
    //console.log("=====================Model====================");
    //console.log(model);
    return results;
};

function filterstoreResult(storeResult) {
    const storeUse = [];
    for (const result of storeResult) {
        if (result.feasible === true && result.result > 0 && result.bounded === true) {
            // Extract the variable name (e.g., X1A1)
            const variableName = Object.keys(result).find(key => key !== 'feasible' && key !== 'result' && key !== 'bounded');

            // Create a new object with the desired format
            const formattedResult = {
                [variableName]: result[variableName],
                results: result.result
            };

            // Push the formatted result to the storeUse array
            storeUse.push(formattedResult);
        }
    }
    return storeUse;
};

function splitDestinations(Destination) {
    const splitDest = [];
    const nameCounts = {}; // Keep track of how many times each name appears

    for (const dest of Destination) {
        const name = dest.name;
        let remainingPersons = dest.person;
        let remainingStretchers = dest.stretcher;

        while (remainingStretchers > 0) {
            const splitDestPart = { ...dest };

            if (remainingStretchers >= 11) {
                splitDestPart.stretcher = 11;
                splitDestPart.person = Math.min(remainingPersons, 4);
                remainingStretchers -= 11;
            } else {
                splitDestPart.stretcher = remainingStretchers;
                splitDestPart.person = Math.min(remainingPersons, 4);
                remainingStretchers = 0;
            }

            // Generate a unique name
            let newName = name;
            let count = nameCounts[newName] || 0;
            while (splitDest.some(item => item.name === newName)) {
                count++;
                newName = `${name}${count}`;
            }

            splitDestPart.name = newName;

            splitDest.push(splitDestPart);
            remainingPersons -= splitDestPart.person;

            // Update the count for this name
            nameCounts[newName] = count;
        }

        while (remainingPersons > 0) {
            const splitDestPart = { ...dest };
            splitDestPart.stretcher = 0;
            splitDestPart.person = Math.min(remainingPersons, 28);

            // Generate a unique name
            let newName = name;
            let count = nameCounts[newName] || 0;
            while (splitDest.some(item => item.name === newName)) {
                count++;
                newName = `${name}${count}`;
            }

            splitDestPart.name = newName;

            splitDest.push(splitDestPart);
            remainingPersons -= splitDestPart.person;

            // Update the count for this name
            nameCounts[newName] = count;
        }
    }
    return splitDest;
};

function combineResults(splitDest, filters) {
    const combinedResults = [];

    for (const filter of filters) {
        const key = Object.keys(filter)[0]; // Get the key from the filter object (e.g., 'X11A12')

        const matches = key.match(/[A-Z]+\d+/g); // Extract all alphabet-number pairs (e.g., ['X123', 'A123'])

        for (const split of splitDest) {
            const name = Object.values(split)[0];
            if (name == matches[0]) {
                const person = Object.values(split)[3];
                const stretcher = Object.values(split)[4];

                // Create a new object combining the data
                const combinedResult = {
                    route: key,
                    person: person,
                    stretcher: stretcher,
                }
                combinedResults.push(combinedResult);
                //console.log("Found combine resulte : ",combinedResult);
            }
        }
    }
    return combinedResults;
};

function drawAll(fromCombined,Destination,Warehouse){
    var outlineWidth = 3.0;

    for (const wh of Warehouse){
        const key = Object.values(wh)[0]; // Get the key from the filter object (e.g., 'X11A12')
        if ( key ) {
            const warehouse = Warehouse.find(item => item.name === key)
            if ( warehouse ){
                console.log("Create warehouse point =================");
                drawGraphicPointWarehouse(newLayer, [warehouse.lon, warehouse.lat]);
                drawGraphicText(key,newLayer,[warehouse.lon, warehouse.lat],[0,0,255],0)
            }
        }
    }

    for (const dest of Destination){
        const key = Object.values(dest)[0];
        if ( key ){
            const destination = Destination.find(item => item.name === key)
            if ( destination ){
                console.log("Create Destination point =================");
                drawGraphicPoint(newLayer, [destination.lon, destination.lat]);
                drawGraphicText(key,newLayer,[destination.lon, destination.lat],[0,0,255],0)
            }
        }

    }

    for (const point of fromCombined){
        const key = Object.values(point)[0]; // Get the key from the filter object (e.g., 'X11A12')
        const matches = key.match(/[A-Z]+\d+/g); // Extract all alphabet-number pairs (e.g., ['X123', 'A123'])
        if (matches && matches.length === 2){
            const destName = matches[0];
            const warehouseName = matches[1];

            const dest = Destination.find(item => item.name === destName);
            const warehouse = Warehouse.find(item => item.name === warehouseName);

            if (dest && warehouse) {
                let coordinate = [[[warehouse.lon, warehouse.lat],[dest.lon,dest.lat]]];

                drawGraphicPolyLine(newLayer, coordinate, "rgba(255,0,0,0.8)", outlineWidth);	// red line

            }
        }
    }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
};

function deg2rad(deg) {
    return deg * (Math.PI / 180);
};

function calculateTotalDistances(results, Destination, Warehouse) {
    var totalDistances = 0;

    for (const result of results) {
        if (result.feasible) {
            const route = Object.keys(result)[3];
            const matches = route.match(/[A-Z]+\d+/g); // Extract all alphabet-number pairs (e.g., ['X123', 'A123'])

            if (matches && matches.length === 2) {
                const destName = matches[0];
                const warehouseName = matches[1];

                const dest = Destination.find(item => item.name === destName);
                const warehouse = Warehouse.find(item => item.name === warehouseName);

                if (dest && warehouse) {
                    const distance = getDistanceFromLatLonInKm(dest.lat, dest.lon, warehouse.lat, warehouse.lon);
                    totalDistances += distance;
                }
            }
        }
    }
    return totalDistances;
};