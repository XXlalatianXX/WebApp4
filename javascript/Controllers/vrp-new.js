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

        let CheckBool1 = true;
        let CheckBool2 = true;
        let CheckBool3 = true;

        do {
            const { nearestCustomer: nearestCustomer1, distance: distance1 } = findNearestCustomer(currentCustomer1, unassignedCustomers);
            const { nearestCustomer: nearestCustomer2, distance: distance2 } = findNearestCustomer(currentCustomer2, unassignedCustomers);
            const { nearestCustomer: nearestCustomer3, distance: distance3 } = findNearestCustomer(currentCustomer3, unassignedCustomers);

            if ((nearestCustomer1 === null) && (nearestCustomer2 === null) && (nearestCustomer3 === null)) {    // break when all don't have nearest Customer
                break;
            } else {
                //============================================== Block to set Capacity Dynamic Type =========================================
                // Check Capacity from Warehouse 1
                if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand == 0) && (currentPersonCapacity1 + nearestCustomer1.personDemand <= 28)) {
                    stretchCapacity1 = 0;
                    personCapacity1 = 28;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 1) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 2) &&
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 22)) {
                    stretchCapacity1 = 2;
                    personCapacity1 = 22;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 3) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 5) &&
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 16)) {
                    stretchCapacity1 = 5;
                    personCapacity1 = 16;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 6) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 8) &&
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 10)) {
                    stretchCapacity1 = 8;
                    personCapacity1 = 10;
                } else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand >= 9) && (currentStretchCapacity1 + nearestCustomer1.stretchDemand <= 11) &&
                    (currentPersonCapacity1 + nearestCustomer1.personDemand <= 4)) {
                    stretchCapacity1 = 11;
                    personCapacity1 = 4;
                } else {
                    CheckBool1 = false;
                }

                // Check Capacity from Warehouse 2
                if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand == 0) && (currentPersonCapacity2 + nearestCustomer2.personDemand <= 28)) {
                    stretchCapacity2 = 0;
                    personCapacity2 = 28;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 1) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 2) &&
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 22)) {
                    stretchCapacity2 = 2;
                    personCapacity2 = 22;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 3) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 5) &&
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 16)) {
                    stretchCapacity2 = 5;
                    personCapacity2 = 16;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 6) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 8) &&
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 10)) {
                    stretchCapacity2 = 8;
                    personCapacity2 = 10;
                } else if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand >= 9) && (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= 11) &&
                    (currentPersonCapacity2 + nearestCustomer2.personDemand <= 4)) {
                    stretchCapacity2 = 11;
                    personCapacity2 = 4;
                } else {
                    CheckBool2 = false;
                }

                // Check Capacity from Warehouse 3
                if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand == 0) && (currentPersonCapacity3 + nearestCustomer3.personDemand <= 28)) {
                    stretchCapacity3 = 0;
                    personCapacity3 = 28;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 1) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 2) &&
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 22)) {
                    stretchCapacity3 = 2;
                    personCapacity3 = 22;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 3) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 5) &&
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 16)) {
                    stretchCapacity3 = 5;
                    personCapacity3 = 16;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 6) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 8) &&
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 10)) {
                    stretchCapacity3 = 8;
                    personCapacity3 = 10;
                } else if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand >= 9) && (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= 11) &&
                    (currentPersonCapacity3 + nearestCustomer3.personDemand <= 4)) {
                    stretchCapacity3 = 11;
                    personCapacity3 = 4;
                } else {
                    CheckBool3 = false;
                }

                // Block to use event from Boolean
                if ((CheckBool1) && (CheckBool2) && (CheckBool3)) {
                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) && (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1) &&
                        (currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) && (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) && (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
                        //console.log("=============Over Capavity============");
                        break;
                    }

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&   // Case All can use
                        (currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1) &&
                        (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&
                        (currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {
                        if ((totalDistanceDepot1 + distance1 < totalDistanceDepot2 + distance2) &&
                            (totalDistanceDepot1 + distance1 < totalDistanceDepot3 + distance3)) {
                            vehicle1.route.push(nearestCustomer1);
                            currentCustomer1 = nearestCustomer1;
                            currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                            currentPersonCapacity1 += nearestCustomer2.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                            totalDistanceDepot1 += distance1; // Update total distance for depot 1
                        } else if ((totalDistanceDepot2 + distance2 < totalDistanceDepot1 + distance1) &&
                            (totalDistanceDepot2 + distance2 < totalDistanceDepot3 + distance3)) {
                            vehicle2.route.push(nearestCustomer2);
                            currentCustomer2 = nearestCustomer2;
                            currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                            currentPersonCapacity2 += nearestCustomer2.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                            totalDistanceDepot2 += distance2; // Update total distance for depot 2
                        } else if ((totalDistanceDepot3 + distance3 < totalDistanceDepot1 + distance1) &&
                            (totalDistanceDepot3 + distance3 < totalDistanceDepot2 + distance1)) {
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

                } else if ((!CheckBool1) && (CheckBool2) && (CheckBool3)) {  // 1 can not true

                    if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) &&    // Check 2%3 is over?
                        (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
                        //console.log("=============Over Capavity============");
                        break;
                    }

                    if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&   // Case 2&3 can use
                        (currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {

                        if (totalDistanceDepot2 + distance2 < totalDistanceDepot3 + distance3) {
                            vehicle2.route.push(nearestCustomer2);
                            currentCustomer2 = nearestCustomer2;
                            currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                            currentPersonCapacity2 += nearestCustomer2.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                            totalDistanceDepot2 += distance2; // Update total distance for depot 2
                        } else if (totalDistanceDepot3 + distance3 < totalDistanceDepot2 + distance2) {
                            vehicle3.route.push(nearestCustomer3);
                            currentCustomer3 = nearestCustomer3;
                            currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                            currentPersonCapacity3 += nearestCustomer3.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                            totalDistanceDepot3 += distance3; // Update total distance for depot 3
                        }

                    } else if (currentCapacity2 + nearestCustomer2.demand > vehicleCapacity2) {  // capacity 2 exceed...
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                        currentPersonCapacity3 += nearestCustomer3.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 3
                    } else if (currentCapacity3 + nearestCustomer3.demand > vehicleCapacity3) { // capacity 3 exceed...
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                        currentPersonCapacity2 += nearestCustomer2.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    }

                } else if ((CheckBool1) && (!CheckBool2) && (CheckBool3)) { // 2 can not true

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) &&    // Check 1 % 3 is over?
                        (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
                        //console.log("=============Over Capavity============");
                        break;
                    }

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&   // Case 1 & 3 can use
                        (currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {

                        if (totalDistanceDepot1 + distance1 < totalDistanceDepot3 + distance3) {
                            vehicle1.route.push(nearestCustomer1);
                            currentCustomer1 = nearestCustomer1;
                            currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                            currentPersonCapacity1 += nearestCustomer1.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                            totalDistanceDepot1 += distance1; // Update total distance for depot 1
                        } else if (totalDistanceDepot3 + distance3 < totalDistanceDepot1 + distance1) {
                            vehicle3.route.push(nearestCustomer3);
                            currentCustomer3 = nearestCustomer3;
                            currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                            currentPersonCapacity3 += nearestCustomer3.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                            totalDistanceDepot3 += distance3; // Update total distance for depot 3
                        }

                    } else if (currentCapacity1 + nearestCustomer1.demand > vehicleCapacity1) {  // capacity 1 exceed....
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                        currentPersonCapacity3 += nearestCustomer3.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 3
                    } else if (currentCapacity3 + nearestCustomer3.demand > vehicleCapacity3) { // capacity 3 exceed....
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                        currentPersonCapacity1 += nearestCustomer1.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    }

                } else if ((CheckBool1) && (CheckBool2) && (!CheckBool3)) {  // 3 can not true

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) &&    // Check 1 % 2 is over?
                        (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1) &&
                        (currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) &&
                        (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2)) {
                        //console.log("=============Over Capavity============");
                        break;
                    }

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&   // Case 1 & 2 can use
                        (currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1) &&
                        (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&
                        (currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2)) {
                        if (totalDistanceDepot1 + distance1 < totalDistanceDepot2 + distance2) {
                            vehicle1.route.push(nearestCustomer1);
                            currentCustomer1 = nearestCustomer1;
                            currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                            currentPersonCapacity1 += nearestCustomer1.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                            totalDistanceDepot1 += distance1; // Update total distance for depot 1
                        } else if (totalDistanceDepot2 + distance2 < totalDistanceDepot1 + distance1) {
                            vehicle2.route.push(nearestCustomer2);
                            currentCustomer2 = nearestCustomer2;
                            currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                            currentPersonCapacity2 += nearestCustomer2.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                            totalDistanceDepot2 += distance2; // Update total distance for depot 2
                        }

                    } else if (currentCapacity1 + nearestCustomer1.demand > vehicleCapacity1) { // capacity 1 exceed...
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                        currentPersonCapacity2 += nearestCustomer2.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    } else if (currentCapacity2 + nearestCustomer2.demand > vehicleCapacity2) { // capacity 2 exceed...
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                        currentPersonCapacity1 += nearestCustomer1.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    }

                } else if ((CheckBool1) && (!CheckBool2) && (!CheckBool3)) { // Just 1

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) &&    // Check 1 is over?
                        (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1)) {
                        //console.log("=============Over Capavity============");
                        break;
                    }

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&   // Case 1 can use
                        (currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1)) {
                        vehicle1.route.push(nearestCustomer1);
                        currentCustomer1 = nearestCustomer1;
                        currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                        currentPersonCapacity1 += nearestCustomer1.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer1), 1);
                        totalDistanceDepot1 += distance1; // Update total distance for depot 1
                    } else {
                        CheckBool1 = false;     // set checkbool 1 if it out of condition
                    }

                } else if ((!CheckBool1) && (CheckBool2) && (!CheckBool3)) {   // Just 2

                    if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) &&    // Check 2 is over?
                        (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2)) {
                        //console.log("=============Over Capavity============");
                        break;
                    }

                    if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&   // check 2 can use
                        (currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2)) {
                        vehicle2.route.push(nearestCustomer2);
                        currentCustomer2 = nearestCustomer2;
                        currentStretchCapacity2 += nearestCustomer2.stretchDemand;
                        currentPersonCapacity2 += nearestCustomer2.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer2), 1);
                        totalDistanceDepot2 += distance2; // Update total distance for depot 2
                    } else {
                        CheckBool2 = false;     // set checkbool 2 if it out of condition
                    }

                } else if ((!CheckBool1) && (!CheckBool2) && (CheckBool3)) {   // Just 3

                    if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) &&    // Check 3 is over?
                        (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
                        //console.log("=============Over Capavity============");
                        break;
                    }

                    if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {
                        vehicle3.route.push(nearestCustomer3);
                        currentCustomer3 = nearestCustomer3;
                        currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                        currentPersonCapacity3 += nearestCustomer3.personDemand;
                        unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                        totalDistanceDepot3 += distance3; // Update total distance for depot 3
                    } else {
                        CheckBool3 = false;     // set checkbool 3 if it out of condition
                    }
                }
            }
        } while (CheckBool1 || CheckBool2 || CheckBool3);   // If all false -> == false...
        vehicles1.push(vehicle1);
        vehicles2.push(vehicle2);
        vehicles3.push(vehicle3);
    }
    return { vehicles1: vehicles1, vehicles2: vehicles2, vehicles3: vehicles3 };
}

const depots = [
    new Depot(1, 102.080567, 14.934309), // Depot 1   1  Korat
    new Depot(2, 105.080567, 15.934309), // Depot 2   21 Ubon
    new Depot(3, 102.787364, 17.386890), // Depot 3   23 Udon
];

let customers = [];

function clikRunVrp() {

    // Block to check Input is correct Pattern ...
    let CustInput = [];
    do {
        CustInput = UnlimitedInput();
        //console.log("CustInput Before: ", CustInput);

        let inputIsValid = true;

        for (const CustIn of CustInput) {
            if ((CustIn.lat == "") && (CustIn.lon == "") && (CustIn.stretchDemand == "") && (CustIn.personDemand == "")) {
                alert(`Please Enter Data ... id : ${CustIn.id}`);
                inputIsValid = false;
                break;
            }

            if ((CustIn.stretchDemand == 0) && (CustIn.personDemand <= 28)) {
                continue;
            } else if ((CustIn.stretchDemand >= 1) && (CustIn.stretchDemand <= 2) &&
                (CustIn.personDemand <= 22)) {
                continue;
            } else if ((CustIn.stretchDemand >= 3) && (CustIn.stretchDemand <= 5) &&
                (CustIn.personDemand <= 16)) {
                continue;
            } else if ((CustIn.stretchDemand >= 6) && (CustIn.stretchDemand <= 8) &&
                (CustIn.personDemand <= 10)) {
                continue;
            } else if ((CustIn.stretchDemand >= 9) && (CustIn.stretchDemand <= 11) &&
                (CustIn.personDemand <= 4)) {
                continue;
            } else {
                console.log("CustIn Wrong : ", CustIn);
                alert(`***** Data ${CustIn.id} was wrong *****\nPlease input new data`);
                alert(`Enter Data like this condition ...\n\nif  stretcher==0  -->  person<=28\n if  1<=stretcher<=2  -->  person<=22\nif  3<=stretcher<=5  -->  person<=16\nif  6<=stretcher<=8  --> person<=10\nif  9<=stretcher<=11  -->  person<=4`)
                inputIsValid = false;
                break;
            }
        }
        if (inputIsValid) {
            break;
        }
    } while (!inputIsValid);

    customers = CustInput;
    console.log("Customer =========================", customers);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
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
    console.log("Route from depot 2", customersInRoutes2);
    console.log("Route from depot 3", customersInRoutes3);

    const { totalArray: totalDistanceArray1, totalDistance: totalDistance1 } = TotalDIstanceAllRoute(depots[0], customersInRoutes1);
    const { totalArray: totalDistanceArray2, totalDistance: totalDistance2 } = TotalDIstanceAllRoute(depots[1], customersInRoutes2);
    const { totalArray: totalDistanceArray3, totalDistance: totalDistance3 } = TotalDIstanceAllRoute(depots[2], customersInRoutes3);
    console.log("Total Distance Depot 1 : ", totalDistance1, "KM.");
    console.log("Total Distance Depot 2 : ", totalDistance2, "KM.");
    console.log("Total Distance Depot 3 : ", totalDistance3, "KM.");
    //console.log("Total Distance of All route : ",totalDistance1 + totalDistance2 + totalDistance3, "KM.");

    drawAllPoint();
    drawAllNamePoint();
    drawRouteLine(depots[0], customersInRoutes1);
    drawRouteLine(depots[1], customersInRoutes2);
    drawRouteLine(depots[2], customersInRoutes3);

    // Block to display Results
    var resultDiv = document.getElementById("results"),
        distanceElem = document.getElementById("distance-result")

    resultDiv.style.display = "block";  // set to can visibility
    distanceElem.innerHTML = totalDistance1 + totalDistance2 + totalDistance3;
}

function UnlimitedInput() {

    CustInputs = [];

    let c = 0;
    column = ["lat_list", "lon_list", "num_person", "num_stretchers"];
    const row = { lat_list: 0, lon_list: 0, num_person: 0, num_stretchers: 0 };
    const data = [];
    for (let i = 0; i < document.getElementsByClassName("lon_list").length; i++) {
        const clone = { ...row };
        data.push(clone);
    }

    for (let i = 0; i < column.length; i++) {
        const collection = document.getElementsByClassName(column[i]);
        for (let j = 0; j < collection.length; j++) {
            const value = collection[j].value;
            // alert(value)
            if (value != "") {
                data[j][column[i]] = parseFloat(value); // Have to parse to Number before use in Class
            }
            else {
                c = 1;
                break
            }
        }
        if (c == 1) {
            break
        }
    }
    for (let i = 0; i < data.length; i++) {
        //console.log(i + 1);
        CustInputs.push(new Customer(i + 1, data[i]["lat_list"], data[i]["lon_list"], data[i]["num_person"], data[i]["num_stretchers"]));
    }

    return CustInputs;
}

function drawAllNamePoint() {
    drawGraphicText("Wing 1", newLayer, [depots[0].lon, depots[0].lat], [0, 0, 255], 0)
    drawGraphicText("Wing 21", newLayer, [depots[1].lon, depots[1].lat], [0, 0, 255], 0)
    drawGraphicText("Wing 23", newLayer, [depots[2].lon, depots[2].lat], [0, 0, 255], 0)

    for (const nameCust of customers) {
        let text = "P " + nameCust.id;
        drawGraphicText(text, newLayer, [nameCust.lon, nameCust.lat], [0, 0, 255], 0);
    }
}

function drawAllPoint() {
    for (const cust of customers) {
        drawGraphicPoint(newLayer, [cust.lon, cust.lat]);
    }
    for (const depot of depots) {
        drawGraphicPointWarehouse(newLayer, [depot.lon, depot.lat]);
    }
    //console.log("Draw all point");

}
function drawRouteLine(Depot, CustomerInRoute) {
    currentPoint = null;
    var outlineWidth = 3.0;
    for (const cust of CustomerInRoute) {
        if (cust.length === 0) {
            //console.log("Empty...");
            continue;
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
                                    //console.log("Point to Point");
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
                                    //console.log("Point to Point");
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
            //console.log("Empty...");
            continue;
        } else if (cust.length === 1) {
            //console.log("Have 1 Point");
            for (const inCust of cust) {
                if (cust.indexOf(inCust) === cust.indexOf(cust[0])) {       // Case depot -> point 1
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id == inCust) {
                            let distance = calculateDistance(Depot, customer);
                            totalDistance += (distance * 2);
                            //console.log("Dist from Depot to point ",id ,"and return to Depot", distance*2);
                        }
                    }
                }
            }
        } else {
            for (const inCust of cust) {
                if (cust.indexOf(inCust) === cust.indexOf(cust[0])) {       // Case depot -> point 1
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id == inCust) {
                            let distance = calculateDistance(Depot, customer)
                            totalDistance += distance;
                            //console.log("Dist from Depot to point ",id , distance)
                            currentPoint = id;
                        }
                    }
                } else if (cust.indexOf(inCust) === (cust.length - 1)) {    // Case -> last point
                    for (const customer of customers) {
                        const id = customer.id;
                        if (inCust == id) {
                            let distance = calculateDistance(customer, Depot);
                            totalDistance += distance;
                            //console.log("Dist from Last point ",id ," to Depot ", distance)
                            for (const customerCurrent of customers) {
                                const idCurrent = customerCurrent.id;
                                if (idCurrent === currentPoint) {   // Check that now index of CurrentPoint is same in customers
                                    let distance = calculateDistance(customer, customerCurrent);
                                    totalDistance += distance;
                                    //console.log("Dist from Current point",id ," to Last point", idCurrent, distance);
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
                                    //console.log("Dist Current",currentPoint, "to point ",id , distance);
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
    for (const distance of totalDistanceArray) {
        totalDistanceAllRoute += distance;
    }
    return { totalArray: totalDistanceArray, totalDistance: totalDistanceAllRoute };
}