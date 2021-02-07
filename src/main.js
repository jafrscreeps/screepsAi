const {spawnerCore} = require('./spawn');
const gathererBrain = require('./role-harvester');
const gatherers = getGatherers();

if (gatherers.length < 3) {
    spawnerCore.spawnGatherer();
}
for (const gatherer of gatherers) {
    gathererBrain.run(gatherer);
}

function getGatherers() {
    return _.filter(Game.creeps, (c, name) => name.match(/^bGather/) || c.memory.role === 'harvester');
}
