const {spawnerCore} = require('./spawn.js');

const gatherers = _.filter(Game.creeps, (c, name) => name.match(/^bGather/));

if (gatherers.length < 3) {
    spawnerCore.spawnGatherer();
}
