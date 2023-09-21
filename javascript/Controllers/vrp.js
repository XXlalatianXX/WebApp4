var Destination = [
    { name: 'X1', lat: 15.144884, lon: 102.614435, person: 37, stretcher: 12 },
    { name: 'X2', lat: 15.099618, lon: 104.241308, person: 2, stretcher: 23 },
    { name: 'X3', lat: 15.200000, lon: 103.500000, person: 30, stretcher: 1 },
    { name: 'X4', lat: 15.203200, lon: 103.568000, person: 0, stretcher: 0 }
];

const Warehouse = [
    { name: 'A1', lat: 14.934309, lon: 102.080567 },    // wing 1
    { name: 'A2', lat: 15.251905, lon: 104.870980 },    // wing 21 
    { name: 'A3', lat: 17.386890, lon: 102.787364 },    // wing 23
];

//////////////////////////////////////////////////
const storeResult = []; // Use to store results from executed VRP
const storeUse = [];    // Use ... from Filters

const destSplited = splitDestinations(Destination);
//console.log("=================splitDest=================");
//console.log(destSplited);

useDest(destSplited);

const filters = filterstoreResult(storeResult);
//console.log("=================filters=================");
//console.log(filters);

const combine = combineResults(destSplited, filters)    // will filter by contain value (person&stretch)
console.log("=================combineResults=================");
console.log(combine);
//////////////////////////////////////////////////

function useDest(Input) {           // Use vrp function by input each step destination
    for (const dest of Input) {
        const person = Object.values(dest)[3];
        const stretcher = Object.values(dest)[4];
        if (person >= 1 && person <= 4 && stretcher >= 1 && person <= 11){
            const result = vrpNormalModel(dest);
            storeResult.push(result);
        }
        else if (person <= 28 && person >= 1 && stretcher == 0 ){
            const result = vrpjustPersonModel(dest);
            storeResult.push(result);
        }
        else if (person == 0 && stretcher >= 1 && stretcher <= 11){
            const result = vrpjustStretcherModel(dest);
            storeResult.push(result);
        }
        else if (person == 0 && stretcher == 0){        // It cannot lets any solution.
            console.log("Person: 0, Stretcher: 0");
        }
    }
    //console.log("=================storeResult=================");
    //console.log(storeResult);   // show array after executed
};

function vrpNormalModel(destInput) {
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
    const dest = destInput;
    for (const warehouse of Warehouse) {
        const distance = getDistanceFromLatLonInKm(dest.lat, dest.lon, warehouse.lat, warehouse.lon); // Calculate distance for each destination-warehouse pair
        const variableName = `${dest.name}${warehouse.name}`; // Create the variable name based on your naming pattern

        // Add the variable to the model
        model.variables[variableName] = {
            distance: distance,
            person: dest.person, // Set the person capacity for this variable based on the destination's person capacity
            stretcher: dest.stretcher
        };
    }

    var solver = require("javascript-lp-solver");   // Import LP Solver
    var results = solver.Solve(model);
    return results;
};

function vrpjustPersonModel(destInput) {
    var model = {
        "optimize": "distance",
        "opType": "min",
        "constraints": {
            "person": { "min": 1, "max": 28 }
        },
        "variables": {}         // The loop will input data to this
    };

    // Calculate distances and add them to the model
    const dest = destInput;
    for (const warehouse of Warehouse) {
        const distance = getDistanceFromLatLonInKm(dest.lat, dest.lon, warehouse.lat, warehouse.lon); // Calculate distance for each destination-warehouse pair
        const variableName = `${dest.name}${warehouse.name}`; // Create the variable name based on your naming pattern

        // Add the variable to the model
        model.variables[variableName] = {
            distance: distance,
            person: dest.person, // Set the person capacity for this variable based on the destination's person capacity
            stretcher: dest.stretcher
        };
    }

    var solver = require("javascript-lp-solver");   // Import LP Solver
    var results = solver.Solve(model);
    return results;
};

function vrpjustStretcherModel(destInput) {
    var model = {
        "optimize": "distance",
        "opType": "min",
        "constraints": {
            //"person": { "min": 1, "max": 28 },
            "stretcher": { "min": 1, "max": 11 }
        },
        "variables": {}         // The loop will input data to this
    };

    // Calculate distances and add them to the model
    const dest = destInput;
    for (const warehouse of Warehouse) {
        const distance = getDistanceFromLatLonInKm(dest.lat, dest.lon, warehouse.lat, warehouse.lon); // Calculate distance for each destination-warehouse pair
        const variableName = `${dest.name}${warehouse.name}`; // Create the variable name based on your naming pattern

        // Add the variable to the model
        model.variables[variableName] = {
            distance: distance,
            person: dest.person, // Set the person capacity for this variable based on the destination's person capacity
            stretcher: dest.stretcher
        };
    }

    var solver = require("javascript-lp-solver");   // Import LP Solver
    var results = solver.Solve(model);
    return results;
};

function splitDestinations(Destination) {
    const splitDest = [];

    for (const dest of Destination) {
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

            splitDest.push(splitDestPart);
            remainingPersons -= splitDestPart.person;
        }
        // If stretcher is 0 and there are remaining persons, split them into groups of 28
        while (remainingPersons > 0) {
            const splitDestPart = { ...dest };
            splitDestPart.stretcher = 0;
            splitDestPart.person = Math.min(remainingPersons, 28);
            splitDest.push(splitDestPart);
            remainingPersons -= splitDestPart.person;
        }
    }
    return splitDest;
}

function filterstoreResult(storeResult) {
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

function combineResults(splitDest, filters) {
    const combinedResults = [];
    let N =0;

    for (const filter of filters) {
        const key = Object.keys(filter)[0]; // Get the key from the filter object (e.g., 'X11A12')

        const matches = key.match(/[A-Z]+\d+/g); // Extract all alphabet-number pairs (e.g., ['X123', 'A123'])
        //console.log("matches[0] : ", matches[0]);

        const split = splitDest[N];
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
            N += 1;
        }
        else{
            console.log("don't match");
        }
    }
    return combinedResults;
}