exports.clearMemory = function clearMemory() {
    for (const creepName of Object.keys(Memory.creeps)) {
        if (!Game.creeps[creepName]) delete Memory.creeps[creepName];
    }
}
