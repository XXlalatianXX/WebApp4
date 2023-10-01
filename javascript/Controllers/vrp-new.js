class Customer {
    constructor(id, lon, lat, demand) {
        this.id = id;
        this.lon = lon;
        this.lat = lat;
        this.demand = demand;
    }
}

class Depot {
    constructor(id, lon, lat) {
        this.id = id;
        this.lon = lon;
        this.lat = lat;
    }
}

class Vehicle {
    constructor(id, capacity) {
        this.id = id;
        this.capacity = capacity;
        this.route = [];
    }
}

function calculateDistance(customer1, customer2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(customer2.lat - customer1.lat);  // deg2rad below
    var dLon = deg2rad(customer2.lon - customer1.lon);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(customer1.lat)) * Math.cos(deg2rad(customer2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
};
function deg2rad(deg) {
    return deg * (Math.PI / 180);
};

function findNearestCustomer(currentCustomer, unassignedCustomers) {
    let nearestCustomer = null;
    let minDistance = Infinity;

    for (const customer of unassignedCustomers) {
        const distance = calculateDistance(currentCustomer, customer);
        if (distance < minDistance) {
            nearestCustomer = customer;
            minDistance = distance;
        }
    }

    return { nearestCustomer: nearestCustomer, distance: minDistance };
}

function solveVRP(customers, depots, vehicleCapacity) {
    const depot1 = depots[0];
    const depot2 = depots[1];
    const depot3 = depots[2];
    //customers.splice(0, 3); // Remove the first three elements (depots) from the list of customers

    const vehicleCapacity1 = vehicleCapacity;   // Copy from vehicleCapacity
    const vehicleCapacity2 = vehicleCapacity;
    const vehicleCapacity3 = vehicleCapacity;
    //console.log(vehicleCapacity1);
    const vehicles1 = [];   // From warehouse 1
    const vehicles2 = [];
    const vehicles3 = [];
    const unassignedCustomers = [...customers];

    while (unassignedCustomers.length > 0) {
        const vehicle1 = new Vehicle(vehicles1.length + 1, vehicleCapacity1);
        const vehicle2 = new Vehicle(vehicles2.length + 1, vehicleCapacity2);
        const vehicle3 = new Vehicle(vehicles3.length + 1, vehicleCapacity3);
        let currentCapacity1 = 0;
        let currentCapacity2 = 0;
        let currentCapacity3 = 0;
        //console.log("55555555");

        let currentCustomer1 = depot1;
        let currentCustomer2 = depot2;
        let currentCustomer3 = depot3;

        let totalDistanceDepot1 = 0;
        let totalDistanceDepot2 = 0;
        let totalDistanceDepot3 = 0;

        //while ((currentCapacity1 < vehicleCapacity1) || (currentCapacity2 < vehicleCapacity2)) {
        while (true) {
            const { nearestCustomer: nearestCustomer1, distance: distance1 } = findNearestCustomer(currentCustomer1, unassignedCustomers);
            const { nearestCustomer: nearestCustomer2, distance: distance2 } = findNearestCustomer(currentCustomer2, unassignedCustomers);
            const { nearestCustomer: nearestCustomer3, distance: distance3 } = findNearestCustomer(currentCustomer3, unassignedCustomers);
            //console.log("nearestCustomer1 : ", nearestCustomer1);
            //console.log("nearestCustomer2 : ", nearestCustomer2);

            // Check if no customers are left to assign to either depot
            if (!nearestCustomer1 && !nearestCustomer2 && !nearestCustomer3) {
                break;
            } else {
                if ((currentCapacity1 + nearestCustomer1.demand > vehicleCapacity1) && (currentCapacity2 + nearestCustomer2.demand > vehicleCapacity2) &&
                    (currentCapacity3 + nearestCustomer3.demand > vehicleCapacity3)) {
                    //console.log("=============Over Capavity============");
                    break;
                }
                if ((currentCapacity1 + nearestCustomer1.demand <= vehicleCapacity1) && (currentCapacity2 + nearestCustomer2.demand <= vehicleCapacity2) &&
                    (currentCapacity3 + nearestCustomer3.demand <= vehicleCapacity3)) {

                    if ((totalDistanceDepot1 + distance1 < totalDistanceDepot2 + distance2) && (totalDistanceDepot1 + distance1 < totalDistanceDepot3 + distance3)) {
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentCapacity1 += nearestCustomer1.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    } else if ((totalDistanceDepot2 + distance2 < totalDistanceDepot1 + distance1) && (totalDistanceDepot2 + distance2 < totalDistanceDepot3 + distance3)) {
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentCapacity2 += nearestCustomer2.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    } else if ((totalDistanceDepot3 + distance3 < totalDistanceDepot1 + distance1) && (totalDistanceDepot3 + distance3 < totalDistanceDepot2 + distance2)) {
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentCapacity3 += nearestCustomer3.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 2
                    }
                } else if ((currentCapacity1 + nearestCustomer1.demand <= vehicleCapacity1) && !(currentCapacity2 + nearestCustomer2.demand <= vehicleCapacity2) &&
                    !(currentCapacity3 + nearestCustomer3.demand <= vehicleCapacity3)) {
                    vehicle1.route.push(nearestCustomer1);
                    currentCustomer1 = nearestCustomer1;
                    currentCapacity1 += nearestCustomer1.demand;
                    unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                    totalDistanceDepot1 += distance1; // Update total distance for depot 1
                } else if ((currentCapacity2 + nearestCustomer2.demand <= vehicleCapacity2) && !(currentCapacity1 + nearestCustomer1.demand <= vehicleCapacity1) &&
                    !(currentCapacity3 + nearestCustomer3.demand <= vehicleCapacity3)) {
                    vehicle2.route.push(nearestCustomer2);
                    currentCustomer2 = nearestCustomer2;
                    currentCapacity2 += nearestCustomer2.demand;
                    unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                    totalDistanceDepot2 += distance2; // Update total distance for depot 2
                } else if ((currentCapacity3 + nearestCustomer3.demand <= vehicleCapacity3) && !(currentCapacity1 + nearestCustomer1.demand <= vehicleCapacity1) &&
                    !(currentCapacity2 + nearestCustomer2.demand <= vehicleCapacity2)) {
                    vehicle3.route.push(nearestCustomer3);
                    currentCustomer3 = nearestCustomer3;
                    currentCapacity3 += nearestCustomer3.demand;
                    unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                    totalDistanceDepot3 += distance3; // Update total distance for depot 2
                } else if (!(currentCapacity3 + nearestCustomer3.demand <= vehicleCapacity3)) {      // 3 not fact
                    if (totalDistanceDepot1 + distance1 < totalDistanceDepot2 + distance2) {
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentCapacity1 += nearestCustomer1.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    } else {
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentCapacity2 += nearestCustomer2.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    }
                } else if (!(currentCapacity2 + nearestCustomer2.demand <= vehicleCapacity2)) {
                    if (totalDistanceDepot1 + distance1 < totalDistanceDepot3 + distance3) {
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentCapacity1 += nearestCustomer1.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    } else {
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentCapacity3 += nearestCustomer3.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 2
                    }
                } else if (!(currentCapacity1 + nearestCustomer1.demand <= vehicleCapacity1)) {
                    if (totalDistanceDepot2 + distance2 < totalDistanceDepot3 + distance3) {
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentCapacity2 += nearestCustomer2.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    } else {
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentCapacity3 += nearestCustomer3.demand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3;
                    }
                }
            }
        }
        vehicles1.push(vehicle1);
        vehicles2.push(vehicle2);
        vehicles3.push(vehicle3);

    }
    return { vehicles1: vehicles1, vehicles2: vehicles2, vehicles3: vehicles3 };
}

const depots = [
    new Customer(1, 102.080567, 14.934309), // Depot 1   1  Korat
    new Customer(2, 105.080567, 15.934309), // Depot 2   21 Ubon
    new Customer(3, 102.787364, 17.386890), // Depot 3   23 Udon
];

// Example usage
const customers = [
    new Customer(1, 103.468000, 15.103200, 6),  // 1
    new Customer(2, 102.614435, 15.144884, 5),  // 2
    new Customer(3, 104.241308, 15.099618, 11),  // 3
    new Customer(4, 102.575274, 16.754043, 4),  // 4
    new Customer(5, 103.473032, 16.772337, 8)   // 5
    // Add more customers here
];

function clikRunVrp() {
    const vehicleCapacity = 11; // Capacity of each vehicle

    // vehicle1 is from warehouse 1
    // vehicle2 is from warehouse 2
    // vehicle3 is from warehouse 3
    const { vehicles1: vehicle1, vehicles2: vehicle2, vehicles3: vehicle3 } = solveVRP(customers, depots, vehicleCapacity);
    //console.log("From Depot 1",vehicle1);
    //console.log("From Depot 2",vehicle2);
    //console.log("From Depot 3",vehicle3);

    
    const customersInRoutes1 = vehicle1.map((vehicle) =>
        vehicle.route.map((customer) => customer.id)
    );
    
    //const customersInRoutes1 = [[2, 1, 3], [4], []];

    
    const customersInRoutes2 = vehicle2.map((vehicle) =>
        vehicle.route.map((customer) => customer.id)
    );
    const customersInRoutes3 = vehicle3.map((vehicle) =>
        vehicle.route.map((customer) => customer.id)
    );
    
    console.log("Route from depot 1", customersInRoutes1);
    console.log("Route from depot 2",customersInRoutes2);
    console.log("Route from depot 3",customersInRoutes3);


    const { totalArray: totalDistanceArray1, totalDistance: totalDistance1 } = TotalDIstanceAllRoute(depots[0], customersInRoutes1);
    console.log(totalDistanceArray1, totalDistance1);

    drawAllPoint();
    drawRouteLine(depots[0], customersInRoutes1);
    drawRouteLine(depots[1], customersInRoutes2);
    drawRouteLine(depots[2], customersInRoutes3);
}
function drawAllPoint() {
    for (const cust of customers) {
        drawGraphicPoint(newLayer, [cust.lon, cust.lat]);
    }
    for (const depot of depots) {
        drawGraphicPointWarehouse(newLayer, [depot.lon, depot.lat]);
    }
    console.log("Draw all point");

}
function drawRouteLine(Depot, CustomerInRoute) {
    currentPoint = null;
    var outlineWidth = 3.0;
    for (const cust of CustomerInRoute) {
        if (cust.length === 0) {
            console.log("Empty...");
            break;
        } else {
            for (const inCust of cust) {
                if (cust.indexOf(inCust) === cust.indexOf(cust[0])) {       // Case depot -> point 1
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id == inCust) {
                            let coordinates = [[[Depot.lon, Depot.lat], [customer.lon, customer.lat]]];
                            drawGraphicPolyLine(newLayer, coordinates, "rgba(255,0,0,0.8)", outlineWidth);	// red line
                            currentPoint = id;
                        }
                    }
                } else if (cust.indexOf(inCust) === (cust.length - 1)) {    // Case -> last point
                    for (const customer of customers) {
                        const id = customer.id;
                        if (inCust == id) {
                            let coordinates = [[[Depot.lon, Depot.lat], [customer.lon, customer.lat]]];
                            drawGraphicPolyLine(newLayer, coordinates, "rgba(255,0,0,0.8)", outlineWidth);	// red line
                            for (const customerCurrent of customers) {
                                const idCurrent = customerCurrent.id;
                                if (idCurrent === currentPoint) {   // Check that now index of CurrentPoint is same in customers
                                    let coordinates = [[[customer.lon, customer.lat], [customerCurrent.lon, customerCurrent.lat]]];
                                    drawGraphicPolyLine(newLayer, coordinates, "rgba(255,0,0,0.8)", outlineWidth);	// red line
                                    currentPoint = inCust;
                                    console.log("Point to Point");
                                }
                            }
                        }
                    }
                } else {                                                    // Case point -> point
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id === inCust) {    // Check that now index is same in customers
                            for (const customerCurrent of customers) {
                                const idCurrent = customerCurrent.id;
                                if (idCurrent === currentPoint) {   // Check that now index of CurrentPoint is same in customers
                                    let coordinates = [[[customer.lon, customer.lat], [customerCurrent.lon, customerCurrent.lat]]];
                                    drawGraphicPolyLine(newLayer, coordinates, "rgba(255,0,0,0.8)", outlineWidth);	// red line
                                    currentPoint = inCust;
                                    console.log("Point to Point");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function TotalDIstanceAllRoute(Depot, CustomerInRoute) {
    let totalDistanceArray = [];    // the sequnce of array will tell the round of each index.
    let totalDistanceAllRoute = 0;
    currentPoint = null;
    for (const cust of CustomerInRoute) {
        let totalDistance = 0;
        if (cust.length === 0) {
            console.log("Empty...");
            break;
        }else if (cust.length === 1){
            console.log("Have 1 Point");
            for (const inCust of cust) {
                if (cust.indexOf(inCust) === cust.indexOf(cust[0])) {       // Case depot -> point 1
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id == inCust) {
                            let distance = calculateDistance(Depot, customer);
                            totalDistance += (distance*2);
                            console.log("Dist from Depot to point ",id ,"and return to Depot", distance*2);
                        }
                    }
                }
            }
        }else{
            for (const inCust of cust) {
                if (cust.indexOf(inCust) === cust.indexOf(cust[0])) {       // Case depot -> point 1
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id == inCust) {
                            let distance = calculateDistance(Depot, customer)
                            totalDistance += distance;
                            console.log("Dist from Depot to point ",id , distance)
                            currentPoint = id;
                        }
                    }
                } else if (cust.indexOf(inCust) === (cust.length - 1)) {    // Case -> last point
                    for (const customer of customers) {
                        const id = customer.id;
                        if (inCust == id) {
                            let distance = calculateDistance(customer, Depot);
                            totalDistance += distance;
                            console.log("Dist from Last point ",id ," to Depot ", distance)
                            for (const customerCurrent of customers) {
                                const idCurrent = customerCurrent.id;
                                if (idCurrent === currentPoint) {   // Check that now index of CurrentPoint is same in customers
                                    let distance = calculateDistance(customer, customerCurrent);
                                    totalDistance += distance;
                                    console.log("Dist from Current point",id ," to Last point", idCurrent, distance);
                                }
                            }
                        }
                    }
                } else {                                                    // Case point -> point
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id === inCust) {    // Check that now index is same in customers
                            for (const customerCurrent of customers) {
                                const idCurrent = customerCurrent.id;
                                if (idCurrent === currentPoint) {   // Check that now index of CurrentPoint is same in customers
                                    let distance = calculateDistance(customerCurrent, customer);
                                    totalDistance += distance;
                                    console.log("Dist Current",currentPoint, "to point ",id , distance);
                                    currentPoint = inCust;
                                }
                            }
                        }
                    }
                }
            }
        }
        totalDistanceArray.push(totalDistance);
    }
    for ( const distance of totalDistanceArray){
        totalDistanceAllRoute += distance;
    }
    return { totalArray: totalDistanceArray, totalDistance: totalDistanceAllRoute};
}