const {GathererState} = require("./gatherer");

const roleGatherer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        const creepState = creep.memory.state;
        stateFns[creepState](creep);
    }
};

const stateFns = {
    [GathererState.Empty]: assignMineOrder,
    [GathererState.MovingToSource]: createAwaitFunction(GathererState.Gathering),
    [GathererState.MovingToTransfer]: createAwaitFunction(GathererState.Transfering),
    [GathererState.Gathering]: gather,
    [GathererState.Transfering]: transfer
}

function assignMineOrder(creep) {
    const sources = creep.room.find(FIND_SOURCES);
    const closestSource = creep.pos.findClosestByPath(sources);
    const path = creep.pos.findPathTo(closestSource);

    creep.memory.targetStructure = closestSource.id;
    creep.moveByPath(path, {visualizePathStyle: {stroke: '#ffaa00'}});

    console.log(`Creep ${creep.name} is moving towards source ${creep.memory.targetStructure}`);
    creep.memory.state = GathererState.MovingToSource;
}
/**
 *
 * @param {number} nextState
 */
function createAwaitFunction(nextState) {
    return function waitForMove(creep) {
        // assignMineOrder(creep);
        const target = Game.getObjectById(creep.memory.targetStructure);

        if (creep.pos.inRangeTo(target.pos)) {
            creep.memory.state = nextState;
        }
    }
}

function gather(creep) {
    if (creep.store.getFreeCapacity() > 0) {
        const target = Game.getObjectById(creep.memory.targetStructure);
        const transferResult = creep.harvest(target, RESOURCE_ENERGY);

        if (transferResult !== 0) Game.notify(`Creep ${creep.name} could not transfer resources because error code ${transferResult}`);
    } else {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (targets.length > 0) {
            const closestTarget = creep.pos.findClosestByPath(targets);
            const path = creep.pos.findPathTo(closestTarget);

            creep.memory.targetStructure = closestSource.id;
            creep.moveByPath(path, {visualizePathStyle: {stroke: '#ffaa00'}});

            creep.memory.state = GathererState.MovingToTransfer;
        }
    }
}

function transfer(creep) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        const target = Game.getObjectById(creep.memory.targetStructure);
        const transferResult = creep.transfer(target, RESOURCE_ENERGY);

        if (transferResult !== 0) Game.notify(`Creep ${creep.name} could not transfer resources because error code ${transferResult}`);
    } else {
        console.log(`Creep ${creep.name} is now empty`);
        creep.memory.state = GathererState.Empty;
    }
}
module.exports = roleGatherer;
