var spawn = require('child_process').spawn;

module.exports = function(command, logger) {
    if (typeof command === 'function') {
        command = 'install';
    }

    switch(command) {
        case 'install':
            spawn('composer', ['install'], {'stdio': 'inherit'});
            break;
    }
};