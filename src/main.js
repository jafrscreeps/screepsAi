// const {RoleName} = require('./role-name');
// const {spawnerCore} = require('./spawn');
// const gathererBrain = require('./role-gatherer-state-machine');
// const upgraderBrain = require('./role-upgrader');
// const builderBrain = require('./role-builder');
// const {clearMemory} = require("./memory-cleanup");
// const {roomsConfig} = require("./room-stats");
// const units = getUnits();
//
// clearMemory();
//
// const mainSpawn = Game.spawns.Spawn1;
// checkWorkerNumbers(mainSpawn.room);
//
// for (const gatherer of units[RoleName.gatherer]) {
//     gathererBrain.run(gatherer);
// }
// for (const upgrader of units[RoleName.upgrader]) {
//     upgraderBrain.run(upgrader);
// }
// for (const builder of units[RoleName.builder]) {
//     builderBrain.run(builder);
// }
//
// function getUnits() {
//     /**
//      *
//      * @type CreepCollector<Creep>
//      */
//     const collector = {
//         [RoleName.gatherer]: [],
//         [RoleName.upgrader]: [],
//         [RoleName.builder]: []
//     };
//
//     _.forEach(Game.creeps, (creep, name) => {
//         if (!creep.memory.role) {
//             console.log(`Creep ${name} does not have role defined`);
//         } else {
//             if (RoleName[creep.memory.role]) {
//                 collector[creep.memory.role].push(creep);
//             } else {
//                 console.log(`Creep ${name} has invalid role ${creep.memory.role}`);
//             }
//         }
//     });
//
//     return collector;
// }
//
// /**
//  *
//  * @param {Room} room
//  */
// function checkWorkerNumbers(room) {
//     /**
//      * @type RoomStats
//      */
//     const config = roomsConfig[room.controller.level] || {};
//
//     if (units[RoleName.gatherer].length < config.gatherers) {
//         spawnerCore.spawn(RoleName.gatherer);
//     } else if (units[RoleName.upgrader].length < config.upgrader) {
//         spawnerCore.spawn(RoleName.upgrader);
//     } else if (units[RoleName.builder].length < config.builders) {
//         spawnerCore.spawn(RoleName.builder);
//     }
// }
