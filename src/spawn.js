const {RoleName} = require('./role-name');
const {BodyParts} = require('./body-parts');
const {GathererState} = require('./gatherer');

const defaults = {
    [RoleName.gatherer]: {state: GathererState.Empty}
}

exports.spawnerCore = {
    spawn(role) {
        if (!RoleName[role]) {
            console.log(`Unknown role ${role}`);
        } else if (canRunSpawn()) {
            console.log(`Spawn order for role ${role}`);
            Game.spawns['Spawn1'].spawnCreep(
                [BodyParts.Work, BodyParts.Move, BodyParts.Carry],
                `${role}${Game.time}`,
                {memory: {role, ...(defaults[role] || {})}}
            );
        } else {
            console.log('Spawn in progress');
        }
    }
}

function canRunSpawn() {
    return !Game.spawns['Spawn1'].spawning;
}
