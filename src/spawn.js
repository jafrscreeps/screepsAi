const {BodyParts} = require('./body-parts');

exports.spawnerCore = {
    spawnGatherer() {
        if (canRunSpawn()) {
            Game.spawns['Spawn1'].spawnCreep([BodyParts.Work, BodyParts.Move, BodyParts.Carry], `bGather${Game.time}`);
        } else {
            Game.notify('Spawn in progress');
        }
    }


}

function canRunSpawn() {
    return !Game.spawns['Spawn1'].spawning;
}
