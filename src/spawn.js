const {RoleName} = require('./role-name');
const {BodyParts} = require('./body-parts');

exports.spawnerCore = {
    spawn(role) {
        if (!RoleName[role]) {
            console.log(`Unknown role ${role}`);
        } else if (canRunSpawn()) {
            Game.spawns['Spawn1'].spawnCreep(
                [BodyParts.Work, BodyParts.Move, BodyParts.Carry],
                `${role}${Game.time}`,
                {memory: {role}}
            );
        } else {
            console.log('Spawn in progress');
        }
    }
}

function canRunSpawn() {
    return !Game.spawns['Spawn1'].spawning;
}
