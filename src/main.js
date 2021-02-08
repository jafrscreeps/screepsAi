const {RoleName} = require('./role-name');
const {spawnerCore} = require('./spawn');
const gathererBrain = require('./role-harvester');
const upgraderBrain = require('./role-upgrader');
const units = getUnits();

if (units[RoleName.gatherer].length < 3) {
    spawnerCore.spawn(RoleName.gatherer);
}
if (units[RoleName.upgrader].length < 1) {
    spawnerCore.spawn(RoleName.upgrader)
}

for (const gatherer of units[RoleName.gatherer]) {
    gathererBrain.run(gatherer);
}
for (const upgrader of units[RoleName.upgrader]) {
    upgraderBrain.run(upgrader);
}

function getUnits() {
    const collector = {
        [RoleName.gatherer]: [],
        [RoleName.upgrader]: []
    };

    _.forEach(Game.creeps, (creep, name) => {
        if (!creep.memory.type) {
            Game.notify(`Creep ${name} does not have type defined`);
        } else {
            collector[creep.memory.type].push(creep);
        }
    });

    return collector;
}
