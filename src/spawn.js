const {RoleName} = require('./role-name');
const {BodyParts} = require('./body-parts');

exports.spawnerCore = {
    spawn(role) {
        if (!RoleName[role]) {
            console.log(`Unknown role ${role}`);
            return;
        }
        if (canRunSpawn()) {
            Game.spawns['Spawn1'].spawnCreep(
                [BodyParts.Work, BodyParts.Move, BodyParts.Carry],
                `${role}${Game.time}`,
                {role}
            );
        } else {
            Game.notify('Spawn in progress');
        }
    }
}

function canRunSpawn() {
    return !Game.spawns['Spawn1'].spawning;
}
