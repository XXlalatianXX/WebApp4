class Customer {
    constructor(id, lat, lon, personDemand, stretchDemand) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.personDemand = personDemand;
        this.stretchDemand = stretchDemand;
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
    constructor(id, stretchCapacity, personCapacity) {
        this.id = id;
        this.stretchCapacity = stretchCapacity;
        this.personCapacity = personCapacity;
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
};

function solveMDVRP(customers, depots) {
    const depot1 = depots[0];
    const depot2 = depots[1];
    const depot3 = depots[2];

    var stretchCapacity1 = 0;
    var personCapacity1 = 0;   // Copy from vehicleCapacity

    var stretchCapacity2 = 0;
    var personCapacity2 = 0;

    var stretchCapacity3 = 0;
    var personCapacity3 = 0;

    const vehicles1 = [];   // From warehouse 1
    const vehicles2 = [];
    const vehicles3 = [];
    const unassignedCustomers = [...customers];

    while (unassignedCustomers.length > 0) {
        var vehicle1 = new Vehicle(vehicles1.length + 1, stretchCapacity1, personCapacity1);    // Use var cause of can change out of block...
        var vehicle2 = new Vehicle(vehicles2.length + 1, stretchCapacity2, personCapacity2);
        var vehicle3 = new Vehicle(vehicles3.length + 1, stretchCapacity3, personCapacity3);
        
        var currentStretchCapacity1 = 0;
        var currentPersonCapacity1 = 0;

        var currentStretchCapacity2 = 0;
        var currentPersonCapacity2 = 0;

        var currentStretchCapacity3 = 0;
        var currentPersonCapacity3 = 0;

        var currentCustomer1 = depot1;
        var currentCustomer2 = depot2;
        var currentCustomer3 = depot3;

        var totalDistanceDepot1 = 0;
        var totalDistanceDepot2 = 0;
        var totalDistanceDepot3 = 0;

        //while ((currentCapacity1 < vehicleCapacity1) || (currentCapacity2 < vehicleCapacity2)) {
        while (true) {
            const { nearestCustomer: nearestCustomer1, distance: distance1 } = findNearestCustomer(currentCustomer1, unassignedCustomers);
            const { nearestCustomer: nearestCustomer2, distance: distance2 } = findNearestCustomer(currentCustomer2, unassignedCustomers);
            const { nearestCustomer: nearestCustomer3, distance: distance3 } = findNearestCustomer(currentCustomer3, unassignedCustomers);

            if ((nearestCustomer1 === null) && (nearestCustomer2 === null) && (nearestCustomer3 === null)) {    // break when all don't have nearest Customer
                break;
            }
            else {
                //============================================== Block to set Capacity Dynamic Type =========================================
                // Check Capacity from Warehouse 1
                if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand == 0) && (currentPersonCapacity1 + nearestCustomer1.personDemand <= 28)) {    //case JustPerson
                    stretchCapacity1 = 0;
                    personCapacity1 = 28;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 1) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 2) && // case Mini
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 22)) {
                    stretchCapacity1 = 2;
                    personCapacity1 = 22;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 3) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 5) && // case Medium
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 16)) {
                    stretchCapacity1 = 5;
                    personCapacity1 = 16;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 6) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 8) && // case High
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 10)) {
                    stretchCapacity1 = 8;
                    personCapacity1 = 10;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 9) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 11) && // case Max
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 4)) {
                    stretchCapacity1 = 11;
                    personCapacity1 = 4;
                } else {
                    break;
                }

                // Check Capacity from Warehouse 2
                if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand == 0) && (currentPersonCapacity2 + nearestCustomer2.personDemand <= 28)) {    //case JustPerson
                    stretchCapacity2 = 0;
                    personCapacity2 = 28;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 1) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 2) && // case Mini
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 22)) {
                    stretchCapacity2 = 2;
                    personCapacity2 = 22;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 3) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 5) && // case Medium
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 16)) {
                    stretchCapacity2 = 5;
                    personCapacity2 = 16;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 6) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 8) && // case High
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 10)) {
                    stretchCapacity2 = 8;
                    personCapacity2 = 10;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 9) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 11) && // case Max
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 4)) {
                    stretchCapacity2 = 11;
                    personCapacity2 = 4;
                } else {
                    break;
                }

                // Check Capacity from Warehouse 3
                if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand == 0) && (currentPersonCapacity3 + nearestCustomer3.personDemand <= 28)) {    //case JustPerson
                    stretchCapacity3 = 0;
                    personCapacity3 = 28;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 1) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 2) && // case Mini
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 22)) {
                    stretchCapacity3 = 2;
                    personCapacity3 = 22;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 3) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 5) && // case Medium
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 16)) {
                    stretchCapacity3 = 5;
                    personCapacity3 = 16;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 6) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 8) && // case High
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 10)) {
                    stretchCapacity3 = 8;
                    personCapacity3 = 10;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 9) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 11) && // case Max
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 4)) {
                    stretchCapacity3 = 11;
                    personCapacity3 = 4;
                } else {
                    break;
                }


                //=========================================================== Main Block for MDVRP =======================================================

                if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) && (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1) &&
                    (currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) && (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2) &&
                    (currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) && (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
                    //console.log("=============Over Capavity============");
                    break;
                }

                if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) && (currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1) &&
                    (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) && (currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2) &&
                    (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) && (currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {
                    // Case All can use

                    if ((totalDistanceDepot1 + distance1 < totalDistanceDepot2 + distance2) && (totalDistanceDepot1 + distance1 < totalDistanceDepot3 + distance3)) {
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                        currentPersonCapacity1 += nearestCustomer2.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    } else if ((totalDistanceDepot2 + distance2 < totalDistanceDepot1 + distance1) && (totalDistanceDepot2 + distance2 < totalDistanceDepot3 + distance3)) {
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                        currentPersonCapacity2 += nearestCustomer2.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    } else if ((totalDistanceDepot3 + distance3 < totalDistanceDepot1 + distance1) && (totalDistanceDepot3 + distance3 < totalDistanceDepot2 + distance1)) {
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                        currentPersonCapacity3 += nearestCustomer3.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 3
                    }
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&    // Just 1
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1) &&
                    !(currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&
                    !(currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2) &&
                    !(currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&
                    !(currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {
                    vehicle1.route.push(nearestCustomer1);
                    currentCustomer1 = nearestCustomer1;
                    currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                    currentPersonCapacity1 += nearestCustomer1.personDemand;
                    unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                    totalDistanceDepot1 += distance1; // Update total distance for depot 1
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&   // Just 2
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2) &&
                    !(currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&
                    !(currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1) &&
                    !(currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&
                    !(currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {
                    vehicle2.route.push(nearestCustomer2);
                    currentCustomer2 = nearestCustomer2;
                    currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                    currentPersonCapacity2 += nearestCustomer2.personDemand;
                    unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                    totalDistanceDepot2 += distance2; // Update total distance for depot 2
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&    // Just 3
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3) &&
                    !(currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&
                    !(currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2) &&
                    !(currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&
                    !(currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1)) {
                    vehicle3.route.push(nearestCustomer3);
                    currentCustomer3 = nearestCustomer3;
                    currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                    currentPersonCapacity3 += nearestCustomer3.personDemand;
                    unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                    totalDistanceDepot3 += distance3; // Update total distance for depot 3

                } else if (!(currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&   // 3 is not
                    !(currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {
                    if (totalDistanceDepot1 + distance1 < totalDistanceDepot2 + distance2) {
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                        currentPersonCapacity1 += nearestCustomer1.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    } else {
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                        currentPersonCapacity2 += nearestCustomer2.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    }
                } else if (!(currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&   // 2 is not
                    !(currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2)) {
                    if (totalDistanceDepot1 + distance1 < totalDistanceDepot3 + distance3) {
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                        currentPersonCapacity1 += nearestCustomer1.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    } else {
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                        currentPersonCapacity3 += nearestCustomer3.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 3
                    }
                } else if (!(currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&   // 1 is not
                    !(currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1)) {
                    if (totalDistanceDepot2 + distance2 < totalDistanceDepot3 + distance3) {
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                        currentPersonCapacity2 += nearestCustomer2.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    } else {
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                        currentPersonCapacity3 += nearestCustomer3.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 3
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
  // Original
const customers = [
    new Customer(1, 103.468000, 15.103200, 1,1),  // 1
    new Customer(2, 102.614435, 15.144884, 1, 1),  // 2
    new Customer(3, 104.241308, 15.099618, 1, 1),  // 3
    new Customer(4, 102.575274, 16.754043, 2, 2),  // 4
    new Customer(5, 103.473032, 16.772337, 3, 2)   // 5
    // Add more customers here
];
 
function clikRunVrp() {

    // vehicle1 is from warehouse 1
    // vehicle2 is from warehouse 2
    // vehicle3 is from warehouse 3
    const { vehicles1: vehicle1, vehicles2: vehicle2, vehicles3: vehicle3 } = solveMDVRP(customers, depots);

    const customersInRoutes1 = vehicle1.map((vehicle) =>    //const customersInRoutes1 = [[2, 1, 3], [4], []];
        vehicle.route.map((customer) => customer.id)
    );
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
    const { totalArray: totalDistanceArray2, totalDistance: totalDistance2 } = TotalDIstanceAllRoute(depots[1], customersInRoutes2);
    const { totalArray: totalDistanceArray3, totalDistance: totalDistance3 } = TotalDIstanceAllRoute(depots[2], customersInRoutes3);
    //console.log(totalDistanceArray1, totalDistance1);
    var allDistance = totalDistance1 + totalDistance2 + totalDistance3;
    console.log("Total Distance of All route : ",allDistance, "KM.")

    drawAllPoint();
    drawAllNamePoint();
    drawRouteLine(depots[0], customersInRoutes1);
    drawRouteLine(depots[1], customersInRoutes2);
    drawRouteLine(depots[2], customersInRoutes3);

    // Block to display Results
    var resultDiv = document.getElementById("results"),
    distanceElem = document.getElementById("distance-result")

    resultDiv.style.display = "block";  // set to can visibility
    distanceElem.innerHTML = allDistance;

}



function drawAllNamePoint(){
    drawGraphicText("Wing 1",newLayer,[depots[0].lon,depots[0].lat],[0,0,255],0)
	drawGraphicText("Wing 21",newLayer,[depots[1].lon,depots[1].lat],[0,0,255],0)
	drawGraphicText("Wing 23",newLayer,[depots[2].lon,depots[2].lat],[0,0,255],0)

    for ( const nameCust of customers){
        let text = "P " + nameCust.id;
        drawGraphicText(text,newLayer,[nameCust.lon,nameCust.lat],[0,0,255],0);
    }
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