var PriorityEvent = false;

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

function findNearestDepot(priorityCustomer, Depot) {
    let nearestDepot = null;
    let minDistance = Infinity;

    for (const dep of Depot) {
        const distance = calculateDistance(priorityCustomer, dep);
        if (distance < minDistance) {
            nearestDepot = dep;
            minDistance = distance;
        }
    }
    return { nearestDepot: nearestDepot, distance: minDistance };
}

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

    var totalDistanceDepot1 = 0;
    var totalDistanceDepot2 = 0;
    var totalDistanceDepot3 = 0;

    const vehicles1 = [];   // From warehouse 1
    const vehicles2 = [];
    const vehicles3 = [];
    const unassignedCustomers = [...customers];

    const priorityDep = [];

    while (unassignedCustomers.length > 0) {
        console.log(" Inner Large looop ...")

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

        let CheckBool1 = true;
        let CheckBool2 = true;
        let CheckBool3 = true;

        do {
            console.log(" Inner Small loop ...")

            if (PriorityEvent) {
                console.log(" Inner priority loop ...")
                var priorityCustomer = unassignedCustomers[0];

                const { nearestDepot: nearestDepotPri, distance: distancePri } = findNearestDepot(priorityCustomer, depots);
                priorityDep.push(nearestDepotPri.id);
                unassignedCustomers.splice(unassignedCustomers[0], 1);   // remove the first member of array

                for (let x of priorityDep) {
                    if (x == 1) {
                        CheckBool1 = false;
                        console.log("Use Depot 1");
                    } else if (x == 2) {
                        CheckBool2 = false;
                        console.log("Use Depot 2");
                    } else if (x == 3) {
                        CheckBool3 = false;
                        console.log("Use Depot 3");
                    }
                }
                PriorityEvent = false;
                console.log("Priority Case Successfully !!");
            }

            const { nearestCustomer: nearestCustomer1, distance: distance1 } = findNearestCustomer(currentCustomer1, unassignedCustomers);
            const { nearestCustomer: nearestCustomer2, distance: distance2 } = findNearestCustomer(currentCustomer2, unassignedCustomers);
            const { nearestCustomer: nearestCustomer3, distance: distance3 } = findNearestCustomer(currentCustomer3, unassignedCustomers);
            const AlldisArray = [distance1, distance2, distance3];
            const dis13Array = [distance1, distance3];
            const dis12Array = [distance1, distance2];
            const dis23Array = [distance2, distance3];
            console.log("disArray : " + AlldisArray);

            if (nearestCustomer1 != null) {
                console.log(" Near from Deepot 1 : ", nearestCustomer1.id);
            }
            if (nearestCustomer2 != null) {
                console.log(" Near from Deepot 2 : ", nearestCustomer2.id);
            }
            if (nearestCustomer3 != null) {
                console.log(" Near from Deepot 3 : ", nearestCustomer3.id);
            }

            console.log("CheckBool1 : ", CheckBool1);
            console.log("CheckBool2 : ", CheckBool2);
            console.log("CheckBool3 : ", CheckBool3);

            if (nearestCustomer1 != null && nearestCustomer2 != null && nearestCustomer3 != null) {
                console.log(" Inner check nearest before execute ...")
                if ((nearestCustomer1.id == nearestCustomer2.id) && (nearestCustomer2.id == nearestCustomer3.id)) { // all point have same nearest
                    console.log(" all point same nesarest ...")
                    let nearDep = null;
                    let minDis = Infinity;
                    for (const dis of AlldisArray) {
                        if (dis < minDis) {
                            minDis = dis;
                            nearDep = AlldisArray.indexOf(dis);
                        }
                    }

                    if ((nearDep == 0) && !CheckBool1) {
                        CheckBool2 = false;
                        CheckBool3 = false;
                    } else if ((nearDep == 1) && !CheckBool2) {
                        CheckBool1 = false;
                        CheckBool3 = false;
                    } else if ((nearDep == 2) && !CheckBool3) {
                        CheckBool1 = false;
                        CheckBool2 = false;
                    }
                } else if ((nearestCustomer1.id == nearestCustomer3.id) && (nearestCustomer2.id != nearestCustomer3.id)) { // just point 1,3 have same nearest
                    console.log(" just point 1,3 have same nearest ...")
                    let nearDep = null;
                    let minDis = Infinity;
                    for (const dis of dis13Array) {
                        if (dis < minDis) {
                            minDis = dis;
                            nearDep = dis13Array.indexOf(dis);
                        }
                    }
                    if ((nearDep == 0) && !CheckBool1) {
                        CheckBool3 = false;
                    } else if ((nearDep == 1) && !CheckBool3) {
                        CheckBool1 = false;
                    }
                } else if ((nearestCustomer1.id == nearestCustomer2.id) && (nearestCustomer2.id != nearestCustomer3)) {  // just point 1,2 have same nearest
                    console.log(" just point 1,2 have same nearest ...")
                    let nearDep = null;
                    let minDis = Infinity;
                    for (const dis of dis12Array) {
                        if (dis < minDis) {
                            minDis = dis;
                            nearDep = dis12Array.indexOf(dis);
                        }
                    }
                    if ((nearDep == 0) && !CheckBool1) {
                        CheckBool2 = false;
                    } else if ((nearDep == 1) && !CheckBool2) {
                        CheckBool1 = false;
                    }
                } else if ((nearestCustomer2.id == nearestCustomer3.id) && (nearestCustomer1.id != nearestCustomer2)) {  // just point 2,3 have same nearest
                    console.log(" just point 2,3 have same nearest ...")
                    let nearDep = null;
                    let minDis = Infinity;
                    for (const dis of dis23Array) {
                        if (dis < minDis) {
                            minDis = dis;
                            nearDep = dis23Array.indexOf(dis);
                        }
                    }
                    if ((nearDep == 0) && !CheckBool2) {
                        CheckBool3 = false;
                    } else if ((nearDep == 1) && !CheckBool3) {
                        CheckBool2 = false;
                    }
                }
            }
            console.log("Before capacity CheckBool1 : ", CheckBool1);
            console.log("Before capacity CheckBool2 : ", CheckBool2);
            console.log("Before capacity CheckBool3 : ", CheckBool3);

            console.log("||||||||||||||||||||||||||||||||||||||||||||");

            if ((nearestCustomer1 === null) && (nearestCustomer2 === null) && (nearestCustomer3 === null)) {    // break when all don't have nearest Customer
                console.log(" break when all don't have nearest Customer ...")
                break;
            } else {
                //============================================== Block to set Capacity Dynamic Type =========================================
                console.log(" inner block to set Capacity Dynamic Type ...")

                if (!CheckBool1 && !CheckBool2 && !CheckBool3) { // if all checkbox false before capacity set
                    console.log(" all checkbox false before capacity set ...")
                    break;
                } else if (!CheckBool1 & !CheckBool3) {  // if 1,3 check point false before capacity set
                    console.log(" 1,3 check point false before capacity set ...")
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
                        console.log("Warehouse 2 Full");
                        const vehicle1Inloop2 = vehicle2.route.map((customer) => customer.id);  // vehicle1Inloop :  [ 2 , ...]

                        for (const custInloop2 of vehicle1Inloop2) {
                            if (vehicle1Inloop2.indexOf(custInloop2) == (vehicle1Inloop2.length - 1)) {  // end in loop will can distance return to warehouse
                                for (const cust of customers) {
                                    const id = cust.id;
                                    if (custInloop2 == id) {
                                        const distance = calculateDistance(cust, depots[1]);
                                        totalDistanceDepot2 += distance;
                                    }
                                }
                            }
                        }
                        CheckBool2 = false;
                    }
                } else if (!CheckBool1 && !CheckBool2) { // if 1,2 check point false before capacity set
                    console.log(" 1,2 check point false before capacity set ...")
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
                        console.log("Warehouse 3 Full");
                        const vehicle1Inloop3 = vehicle3.route.map((customer) => customer.id);  // vehicle1Inloop :  [ 2 , ...]

                        for (const custInloop3 of vehicle1Inloop3) {
                            if (vehicle1Inloop3.indexOf(custInloop3) == (vehicle1Inloop3.length - 1)) {  // end in loop will can distance return to warehouse
                                for (const cust of customers) {
                                    const id = cust.id;
                                    if (custInloop3 == id) {
                                        const distance = calculateDistance(cust, depots[2]);
                                        totalDistanceDepot3 += distance;
                                    }
                                }
                            }
                        }
                        CheckBool3 = false;
                    }
                } else if (!CheckBool2 && !CheckBool3) { // if 2,3 check point false before capacity set
                    console.log(" 2,3 check point false before capacity set ...")
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
                        const vehicle1Inloop1 = vehicle1.route.map((customer) => customer.id);  // vehicle1Inloop :  [ 2 , ...]

                        for (const custInloop1 of vehicle1Inloop1) {
                            if (vehicle1Inloop1.indexOf(custInloop1) == (vehicle1Inloop1.length - 1)) {  // end in loop will can distance return to warehouse
                                for (const cust of customers) {
                                    const id = cust.id;
                                    if (custInloop1 == id) {
                                        const distance = calculateDistance(cust, depots[0]);
                                        totalDistanceDepot1 += distance;
                                    }
                                }
                            }
                        }
                        CheckBool1 = false;
                    }
                } else {                                // another case
                    console.log(" another case to set capacity ...")
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
                        const vehicle1Inloop1 = vehicle1.route.map((customer) => customer.id);  // vehicle1Inloop :  [ 2 , ...]

                        for (const custInloop1 of vehicle1Inloop1) {
                            if (vehicle1Inloop1.indexOf(custInloop1) == (vehicle1Inloop1.length - 1)) {  // end in loop will can distance return to warehouse
                                for (const cust of customers) {
                                    const id = cust.id;
                                    if (custInloop1 == id) {
                                        const distance = calculateDistance(cust, depots[0]);
                                        totalDistanceDepot1 += distance;
                                    }
                                }
                            }
                        }
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
                        const vehicle1Inloop2 = vehicle2.route.map((customer) => customer.id);  // vehicle1Inloop :  [ 2 , ...]

                        for (const custInloop2 of vehicle1Inloop2) {
                            if (vehicle1Inloop2.indexOf(custInloop2) == (vehicle1Inloop2.length - 1)) {  // end in loop will can distance return to warehouse
                                for (const cust of customers) {
                                    const id = cust.id;
                                    if (custInloop2 == id) {
                                        const distance = calculateDistance(cust, depots[1]);
                                        totalDistanceDepot2 += distance;
                                    }
                                }
                            }
                        }
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
                        const vehicle1Inloop3 = vehicle3.route.map((customer) => customer.id);  // vehicle1Inloop :  [ 2 , ...]

                        for (const custInloop3 of vehicle1Inloop3) {
                            if (vehicle1Inloop3.indexOf(custInloop3) == (vehicle1Inloop3.length - 1)) {  // end in loop will can distance return to warehouse
                                for (const cust of customers) {
                                    const id = cust.id;
                                    if (custInloop3 == id) {
                                        const distance = calculateDistance(cust, depots[2]);
                                        totalDistanceDepot3 += distance;
                                    }
                                }
                            }
                        }
                        CheckBool3 = false;
                    }
                }
                console.log("---------------------After Capacity Check -------------------");
                console.log("totalDistanceDepot1 : ", totalDistanceDepot1);
                console.log("totalDistanceDepot2 : ", totalDistanceDepot2);
                console.log("totalDistanceDepot3 : ", totalDistanceDepot3);
                console.log("CheckBool1 : ", CheckBool1);
                console.log("CheckBool2 : ", CheckBool2);
                console.log("CheckBool3 : ", CheckBool3);

                console.log(" block to use event from boolean checkbock")
                // Block to use event from Boolean
                if ((CheckBool1) && (CheckBool2) && (CheckBool3)) {
                    console.log("all checkbock true")
                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) && (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1) &&
                        (currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) && (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) && (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
                        break;
                    }

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&   // Case All can use
                        (currentPersonCapacity1 + nearestCustomer1.personDemand <= personCapacity1) &&
                        (currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&
                        (currentPersonCapacity2 + nearestCustomer2.personDemand <= personCapacity2) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand <= stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand <= personCapacity3)) {
                            console.log(" !!!!! All case have true !!!!!");
                        if ((totalDistanceDepot1 + distance1 < totalDistanceDepot2 + distance2) &&
                            (totalDistanceDepot1 + distance1 < totalDistanceDepot3 + distance3)) {
                            vehicle1.route.push(nearestCustomer1);
                            currentCustomer1 = nearestCustomer1;
                            currentStretchCapacity1 += nearestCustomer1.stretchDemand;
                            currentPersonCapacity1 += nearestCustomer1.personDemand;
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
                            (totalDistanceDepot3 + distance3 < totalDistanceDepot2 + distance2)) {
                            vehicle3.route.push(nearestCustomer3);
                            currentCustomer3 = nearestCustomer3;
                            currentStretchCapacity3 += nearestCustomer3.stretchDemand;
                            currentPersonCapacity3 += nearestCustomer3.personDemand;
                            unassignedCustomers.splice(unassignedCustomers.indexOf(nearestCustomer3), 1);
                            totalDistanceDepot3 += distance3; // Update total distance for depot 3
                        }

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
                    }
                    else if (!(currentStretchCapacity2 + nearestCustomer2.stretchDemand <= stretchCapacity2) &&   // 2 is not
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

                    }
                    else if (!(currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&   // 1 is not
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
                    else if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand <= stretchCapacity1) &&    // Just 1
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

                    }
                    console.log("finish all checkbock true")

                } else if ((!CheckBool1) && (CheckBool2) && (CheckBool3)) {  // 1 can not true
                    console.log("Case 1 can not true")

                    if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) &&    // Check 2%3 is over?
                        (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
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
                    console.log(" finish Case 1 can not true")

                } else if ((CheckBool1) && (!CheckBool2) && (CheckBool3)) { // 2 can not true
                    console.log(" case 2 can not true")

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) &&    // Check 1 % 3 is over?
                        (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1) &&
                        (currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) &&
                        (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
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
                    console.log(" finish Case 2 can not true")

                } else if ((CheckBool1) && (CheckBool2) && (!CheckBool3)) {  // 3 can not true
                    console.log(" case 3 can not true")

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) &&    // Check 1 % 2 is over?
                        (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1) &&
                        (currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) &&
                        (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2)) {
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
                    console.log("finish Case 3 can not true")

                } else if ((CheckBool1) && (!CheckBool2) && (!CheckBool3)) { // Just 1
                    console.log(" case just 1")

                    if ((currentStretchCapacity1 + nearestCustomer1.stretchDemand > stretchCapacity1) &&    // Check 1 is over?
                        (currentPersonCapacity1 + nearestCustomer1.personDemand > personCapacity1)) {
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
                    console.log(" finish case just 1")

                } else if ((!CheckBool1) && (CheckBool2) && (!CheckBool3)) {   // Just 2
                    console.log(" case just 2")

                    if ((currentStretchCapacity2 + nearestCustomer2.stretchDemand > stretchCapacity2) &&    // Check 2 is over?
                        (currentPersonCapacity2 + nearestCustomer2.personDemand > personCapacity2)) {
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
                    console.log(" finish case just 2")

                } else if ((!CheckBool1) && (!CheckBool2) && (CheckBool3)) {   // Just 3
                    console.log("case just 3")

                    if ((currentStretchCapacity3 + nearestCustomer3.stretchDemand > stretchCapacity3) &&    // Check 3 is over?
                        (currentPersonCapacity3 + nearestCustomer3.personDemand > personCapacity3)) {
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
                    console.log(" finish case just 3")
                }

                if ((!CheckBool1) && (!CheckBool2) && (!CheckBool3)) {   // if all check is false after capacity exceed
                    console.log(" case all false")
                    break;
                }
            }
            console.log("--------------------Finish calculated-------------------");
            console.log("vehicle1 : ", vehicle1.route.map((customer) => customer.id));
            console.log("vehicle2 : ", vehicle2.route.map((customer) => customer.id));
            console.log("vehicle3 : ", vehicle3.route.map((customer) => customer.id));
            console.log("totalDistanceDepot1 : ", totalDistanceDepot1);
            console.log("totalDistanceDepot2 : ", totalDistanceDepot2);
            console.log("totalDistanceDepot3 : ", totalDistanceDepot3);
            console.log("---------------------------------------------------");
        } while (CheckBool1 || CheckBool2 || CheckBool3);   // If all false -> == false...
        console.log(" case all false")
        vehicles1.push(vehicle1);
        vehicles2.push(vehicle2);
        vehicles3.push(vehicle3);
    }
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Finish !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    return { vehicles1: vehicles1, vehicles2: vehicles2, vehicles3: vehicles3, priorityDep: priorityDep };
}

const depots = [
    new Depot(1, 102.081660, 14.933738), // Depot 1   1  Korat
    new Depot(2, 104.861988, 15.249080), // Depot 2   21 Ubon
    new Depot(3, 102.795457, 17.379619), // Depot 3   23 Udon
];

let customers = [];

/*
// set 1&2
let customers = [
    new Customer(1, 16.385090, 102.848165, 1, 3),
    new Customer(2, 15.574469, 102.543969, 2, 5),
    new Customer(3, 16.758493, 103.477906, 1, 6),
    new Customer(4, 16.308275, 104.374485, 4, 6),
    new Customer(5, 15.595031, 104.870806, 2, 2),
    new Customer(6, 15.553905, 102.784124, 3, 7),
    new Customer(7, 14.956655, 103.093657,  1, 4),
    new Customer(8, 15.157644, 104.145004,  2, 4),
    new Customer(9, 16.395330, 103.355160,  4, 5),
    new Customer(10, 16.477229, 104.315781,  2, 3)
];
*/

function clikRunVrp() {
    
    // Block to check Input is correct Pattern ...
    let CustInput = [];
    do {
        CustInput = UnlimitedInput();
        let inputIsValid = true;

        for (const CustIn of CustInput) {                                                                                                   // Check Input is Empty?
            const isDataMissing1 = (CustIn.lat == "") && (CustIn.lon == "") && (CustIn.stretchDemand == 0) && (CustIn.personDemand == 0);
            const isDataMissing2 = (CustIn.lat != "" && CustIn.lon != "") && (CustIn.stretchDemand == 0 && CustIn.personDemand == 0);

            if (isDataMissing1 || isDataMissing2) {
                fireSweetAlert(CustIn.id);
                inputIsValid = false;
                CustInput = [];
                break;
            }

            if ((CustIn.stretchDemand == 0) && (CustIn.personDemand <= 28)) {
                continue;
            } else if ((CustIn.stretchDemand >= 1) && (CustIn.stretchDemand <= 2) &&
                (CustIn.personDemand <= 22) && (CustIn.personDemand >= 0)) {
                continue;
            } else if ((CustIn.stretchDemand >= 3) && (CustIn.stretchDemand <= 5) &&
                (CustIn.personDemand <= 16) && (CustIn.personDemand >= 0)) {
                continue;
            } else if ((CustIn.stretchDemand >= 6) && (CustIn.stretchDemand <= 8) &&
                (CustIn.personDemand <= 10) && (CustIn.personDemand >= 0)) {
                continue;
            } else if ((CustIn.stretchDemand >= 9) && (CustIn.stretchDemand <= 11) &&
                (CustIn.personDemand <= 4) && (CustIn.personDemand >= 0)) {
                continue;
            } else {
                console.log("CustIn Wrong : ", CustIn);
                fireSweetAlert2(CustIn.id);
                inputIsValid = false;
                CustInput = [];
                break;
            }
        }
        if (inputIsValid) {
            break;
        }
    } while (!inputIsValid);

    customers = CustInput;
    console.log("Customer Dictionary : ", customers);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // vehicle1 is from warehouse 1
    // vehicle2 is from warehouse 2
    // vehicle3 is from warehouse 3
    const { vehicles1: vehicle1, vehicles2: vehicle2, vehicles3: vehicle3, priorityDep: priorityDep } = solveMDVRP(customers, depots);
    console.log(" !!!!!!!!!!!!!!!!!!! Complete using MDVRP Function !!!!!!!!!!!!!!!!!!!!!!")

    const customersInRoutes1 = vehicle1.map((vehicle) =>    //const customersInRoutes1 = [[2, 1, 3], [4], []];
        vehicle.route.map((customer) => customer.id)
    );
    const customersInRoutes2 = vehicle2.map((vehicle) =>
        vehicle.route.map((customer) => customer.id)
    );
    const customersInRoutes3 = vehicle3.map((vehicle) =>
        vehicle.route.map((customer) => customer.id)
    );
    console.log("------------------- Generate Routes ------------------")

    console.log("Route from depot 1", customersInRoutes1);
    console.log("Route from depot 2", customersInRoutes2);
    console.log("Route from depot 3", customersInRoutes3);
    console.log("Priority Depot : ", priorityDep);  // Check how it's come

    var { totalArray: totalDistanceArray1, totalDistance: totalDistance1 } = TotalDIstanceAllRoute(depots[0], customersInRoutes1);
    var { totalArray: totalDistanceArray2, totalDistance: totalDistance2 } = TotalDIstanceAllRoute(depots[1], customersInRoutes2);
    var { totalArray: totalDistanceArray3, totalDistance: totalDistance3 } = TotalDIstanceAllRoute(depots[2], customersInRoutes3);

    // Case to check that PriorityDep was used ...
    if (priorityDep == "") {   // case don't be used
        console.log("Priority do not use...");
        var totalDistanceAll = totalDistance1 + totalDistance2 + totalDistance3;
        console.log("Total Distance of All route : ", totalDistanceAll, "KM.");

        var Depot1Round = getRoundDepot(customersInRoutes1);
        var Depot2Round = getRoundDepot(customersInRoutes2);
        var Depot3Round = getRoundDepot(customersInRoutes3);

    } else {
        // Priority was used
        console.log(" ============= Priority Case was used ... ==============");
        const totalDistancePri = calculateDistance(depots[priorityDep[0] - 1], customers[0]) * 2;   // go and back
        const totalDistanceArrayPri = [totalDistancePri];

        console.log("Total Distance Priority : ", totalDistancePri, "KM.");
        console.log("Total Distance Array Priority : ", totalDistanceArrayPri);

        // Block to plus round of depot if priority was used ...
        if (priorityDep[0] == 1) {
            var Depot1Round = getRoundDepot(customersInRoutes1) + 1;
            var Depot2Round = getRoundDepot(customersInRoutes2);
            var Depot3Round = getRoundDepot(customersInRoutes3);
            totalDistance1 += totalDistancePri;
            var totalDistanceAll = totalDistance1 + totalDistance2 + totalDistance3;
        } else if (priorityDep[0] == 2) {
            var Depot1Round = getRoundDepot(customersInRoutes1);
            var Depot2Round = getRoundDepot(customersInRoutes2) + 1;
            var Depot3Round = getRoundDepot(customersInRoutes3);
            totalDistance2 += totalDistancePri;
            var totalDistanceAll = totalDistance1 + totalDistance2 + totalDistance3;
        } else if (priorityDep[0] == 3) {
            var Depot1Round = getRoundDepot(customersInRoutes1);
            var Depot2Round = getRoundDepot(customersInRoutes2);
            var Depot3Round = getRoundDepot(customersInRoutes3) + 1;
            totalDistance3 += totalDistancePri;
            var totalDistanceAll = totalDistance1 + totalDistance2 + totalDistance3;
        }

        console.log("Total Distance of All route : ", totalDistanceAll, "KM.");

        var PriorityRound = getRoundDepot(priorityDep);

        var PriRoute = generateRoutesPri(priorityDep);

        var TimePri = generateTimeMin(totalDistanceArrayPri);

        var totalStretchPri = [customers[0].stretchDemand];

        var totalPersonPri = [customers[0].personDemand];

        var resultPri = getDictResult(PriRoute, TimePri, totalPersonPri, totalStretchPri, totalDistanceArrayPri);


        const outlineWidth = 3.0;
        const coordinatesPri = [[[depots[priorityDep[0] - 1].lon, depots[priorityDep[0] - 1].lat], [customers[0].lon, customers[0].lat]]];
        drawGraphicPolyLine(newLayer, coordinatesPri, "rgba(255,0,0,0.8)", outlineWidth)
    }

    const route1 = generateRoutes(customersInRoutes1, "W1");
    const route2 = generateRoutes(customersInRoutes2, "W21");
    const route3 = generateRoutes(customersInRoutes3, "W23");

    const Time1 = generateTimeMin(totalDistanceArray1);
    const Time2 = generateTimeMin(totalDistanceArray2);
    const Time3 = generateTimeMin(totalDistanceArray3);

    const totalStretch1 = generateTotalStretch(customersInRoutes1);
    const totalStretch2 = generateTotalStretch(customersInRoutes2);
    const totalStretch3 = generateTotalStretch(customersInRoutes3);

    const totalPerson1 = generateTotalPerson(customersInRoutes1);
    const totalPerson2 = generateTotalPerson(customersInRoutes2);
    const totalPerson3 = generateTotalPerson(customersInRoutes3);

    const result1 = getDictResult(route1, Time1, totalPerson1, totalStretch1, totalDistanceArray1);
    console.log("Result 1 : ", result1);
    const result2 = getDictResult(route2, Time2, totalPerson2, totalStretch2, totalDistanceArray2);
    console.log("Result 2 : ", result2);
    const result3 = getDictResult(route3, Time3, totalPerson3, totalStretch3, totalDistanceArray3);
    console.log("Result 3 : ", result3);



    drawAllPoint();
    drawAllNamePoint();
    drawRouteLine(depots[0], customersInRoutes1);
    drawRouteLine(depots[1], customersInRoutes2);
    drawRouteLine(depots[2], customersInRoutes3);



    // Block to display Results
    var resultDiv = document.getElementById("results"),
        AlldistanceElem = document.getElementById("Alldistance-result"),
        distance1Elem = document.getElementById("distance1-result"),
        distance2Elem = document.getElementById("distance2-result"),
        distance3Elem = document.getElementById("distance3-result"),
        wing1Round = document.getElementById("Depot1-round"),
        wing21Round = document.getElementById("Depot2-round"),
        wing23Round = document.getElementById("Depot3-round"),
        routesW = document.getElementById("routes-w"),
        routesPri = document.getElementById("routes-priority")

    resultDiv.style.display = "block";  // set to can visibility
    AlldistanceElem.innerHTML = totalDistanceAll.toFixed(2);
    distance1Elem.innerHTML = totalDistance1.toFixed(2);
    distance2Elem.innerHTML = totalDistance2.toFixed(2);
    distance3Elem.innerHTML = totalDistance3.toFixed(2);
    wing1Round.innerHTML = Depot1Round;
    wing21Round.innerHTML = Depot2Round;
    wing23Round.innerHTML = Depot3Round;

    var IdOfli = 1

    if (resultPri != null) {
        for (let pri of resultPri) {
            var li = document.createElement("li");
            let variableRoutePri = Object.values(pri)[0];
            let variablePersonPri = Object.values(pri)[1];
            let variableStretchPri = Object.values(pri)[2];
            let variableTimePri = Object.values(pri)[3];
            let variableDistPri = Object.values(pri)[4];
            let route = "Routes : " + variableRoutePri;
            let person = "Person : " + variablePersonPri;
            let stretch = "Stretch : " + variableStretchPri;
            let Time = "Time : " + variableTimePri;
            let Distance = "Distance : " + variableDistPri.toFixed(2);

            li.innerHTML += route + "<br>" + person + "     " + stretch + "<br>" + Time + " Minutes" + "<br>" + Distance + " KM.";
            li.id = 1;
            routesPri.appendChild(li);
        }
    }

    if (result1 != null) {
        for (let i of result1) {
            var li = document.createElement("li");
            let variableRouteW1 = Object.values(i)[0];
            let variablePersonW1 = Object.values(i)[1];
            let variableStretchW1 = Object.values(i)[2];
            let variableTimeW1 = Object.values(i)[3];
            let variableDistW1 = Object.values(i)[4];
            let route = "Routes : " + variableRouteW1;
            let person = "Person : " + variablePersonW1;
            let stretch = "Stretch : " + variableStretchW1;
            let Time = "Time : " + variableTimeW1;
            let Distance = "Distance : " + variableDistW1.toFixed(2);

            li.innerHTML += route + "<br>" + person + "     " + stretch + "<br>" + Time + " Minutes" + "<br>" + Distance + " KM.";
            li.id = IdOfli;
            IdOfli += 1;
            routesW.appendChild(li);
        }
    }

    if (result2 != null) {
        for (let j of result2) {
            var li = document.createElement("li");
            let variableRouteW2 = Object.values(j)[0];
            let variablePersonW2 = Object.values(j)[1];
            let variableStretchW2 = Object.values(j)[2];
            let variableTimeW2 = Object.values(j)[3];
            let variableDistW2 = Object.values(j)[4];
            let route = "Routes : " + variableRouteW2;
            let person = "Person : " + variablePersonW2;
            let stretch = "Stretch : " + variableStretchW2;
            let Time = "Time : " + variableTimeW2;
            let Distance = "Distance : " + variableDistW2.toFixed(2);

            li.innerHTML += route + "<br>" + person + "     " + stretch + "<br>" + Time + " Minutes" + "<br>" + Distance + " KM.";
            li.id = IdOfli;
            IdOfli += 1;
            routesW.appendChild(li);
        }
    }

    if (result3 != null) {
        for (let k of result3) {
            var li = document.createElement("li");
            let variableRouteW2 = Object.values(k)[0];
            let variablePersonW2 = Object.values(k)[1];
            let variableStretchW2 = Object.values(k)[2];
            let variableTimeW2 = Object.values(k)[3];
            let variableDistW2 = Object.values(k)[4];
            let route = "Routes : " + variableRouteW2;
            let person = "Person : " + variablePersonW2;
            let stretch = "Stretch : " + variableStretchW2;
            let Time = "Time : " + variableTimeW2;
            let Distance = "Distance : " + variableDistW2.toFixed(2);

            li.innerHTML += route + "<br>" + person + "     " + stretch + "<br>" + Time + " Minutes" + "<br>" + Distance + " KM.";
            li.id = IdOfli;
            IdOfli += 1;
            routesW.appendChild(li);
        }
    }
    $('#mainSearch').hide();
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
}
function drawRouteLine(Depot, CustomerInRoute) {
    currentPoint = null;
    var outlineWidth = 3.0;
    for (const cust of CustomerInRoute) {
        if (cust.length === 0) {
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
            continue;
        } else if (cust.length === 1) {
            for (const inCust of cust) {
                if (cust.indexOf(inCust) === cust.indexOf(cust[0])) {       // Case depot -> point 1
                    for (const customer of customers) {
                        const id = customer.id;
                        if (id == inCust) {
                            let distance = calculateDistance(Depot, customer);
                            totalDistance += (distance * 2);
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
                            currentPoint = id;
                        }
                    }
                } else if (cust.indexOf(inCust) === (cust.length - 1)) {    // Case -> last point
                    for (const customer of customers) {
                        const id = customer.id;
                        if (inCust == id) {
                            let distance = calculateDistance(customer, Depot);
                            totalDistance += distance;
                            for (const customerCurrent of customers) {
                                const idCurrent = customerCurrent.id;
                                if (idCurrent === currentPoint) {   // Check that now index of CurrentPoint is same in customers
                                    let distance = calculateDistance(customer, customerCurrent);
                                    totalDistance += distance;
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

function getRoundDepot(CustomerInRoute) {
    let NumberOfRound = 0;

    for (const cust of CustomerInRoute) {
        if (cust != '') {
            NumberOfRound += 1;
        }
    }
    return NumberOfRound;
}

function generateRoutes(customersInRoutes, startLocation) {
    let routes = [];

    for (const route of customersInRoutes) {
        const routeSegments = [];

        if (route.length > 0) {
            routeSegments.push(startLocation);
            for (const customer of route) {
                routeSegments.push(customer);
            }
        } else {
            continue;
        }
        routeSegments.push(startLocation);

        // Join the route segments to create the full route for this route
        const fullRoute = routeSegments.join(' -> ');
        routes.push(fullRoute);
    }
    return routes;
}

function generateRoutesPri(DepotInRoute) {
    let routes = [];
    let firstCust = '1';
    let dep = null;

    if (DepotInRoute[0] == 1) {
        dep = "W1";
    } else if (DepotInRoute[0] == 2) {
        dep = "W21";
    } else if (DepotInRoute[0] == 3) {
        dep = "W23";
    }

    for (const route in DepotInRoute) {
        let routesSegments = [];
        if (route.length > 0) {
            routesSegments.push(dep)
            routesSegments.push(firstCust)
        } else {
            continue;
        }
        routesSegments.push(dep);

        // Join the route segments to create the full route for this route
        const fullRoute = routesSegments.join(' -> ');
        routes.push(fullRoute);
    }
    return routes;
}

function generateTimeMin(customerDistanceArray) {
    let arrayTime = [];
    for (const dist of customerDistanceArray) {
        let time = (dist * 60) / 224.24;   // get time minutes
        arrayTime.push(time.toFixed(2));
    }
    return arrayTime;
}

function generateTotalStretch(customersInRoutes) {
    let stretch = [];
    for (const cust of customersInRoutes) {
        let totalStretch = 0;
        if (cust != '') {
            for (const inCust of cust) {
                for (const customer of customers) {
                    const id = customer.id;
                    if (id == inCust) {
                        totalStretch += customer.stretchDemand;
                    }
                }
            }
        } else {
            continue;
        }
        stretch.push(totalStretch);
    }
    return stretch;
}

function generateTotalPerson(customersInRoutes) {
    let person = [];
    for (const cust of customersInRoutes) {
        let totalPerson = 0;
        if (cust != '') {
            for (const inCust of cust) {
                for (const customer of customers) {
                    const id = customer.id;
                    if (id == inCust) {
                        totalPerson += customer.personDemand;
                    }
                }
            }
        } else {
            continue;
        }
        person.push(totalPerson);
    }
    return person;
}

function getDictResult(route, Time, totalPerson, totalStretch, totalDistanceArray) {
    let results = [];

    for (let i = 0; i < route.length; i++) {
        let result = {
            route: route[i],
            person: totalPerson[i],
            stretch: totalStretch[i],
            time: Time[i],
            distance: totalDistanceArray[i]
        };
        results.push(result);
    }
    return results;
}

function fireSweetAlert(id) {
    Swal.fire({
        icon: 'error',
        title: `กรุณากรอกข้อมูล id : ${id}`
    });
}

function fireSweetAlert2(id) {
    Swal.fire({
        icon: 'error',
        title: `ข้อมูล ${id} ผิดพลาด`,
        text: 'กรุณากรอกข้อมูลใหม่'
        // text: `Please Enter Data ... id : ${CustIn.id}`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'กรุณากรอกข้อมูลให้ตรงตามเงื่อนไขนี้',
                'ถ้า  เปล == 0   -->   คน <= 28 <br> ถ้า  1 <= เปล <= 2   -->   คน <= 22 <br> ถ้า   3 <= เปล <= 5   -->   คน <= 16 <br> ถ้า   6 <= เปล <= 8   -->  คน <= 10 <br> ถ้า   9 <= เปล <= 11  -->  คน <= 4',
                'info'
            )
        }
    })
};