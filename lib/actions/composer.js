var spawn = require('child_process').spawn;

module.exports = function(command, logger) {
    if (typeof command === 'object') {
        logger = command;
        command = 'install';
    }

    var composer,
        Q = this.require('q'),
        deferred = Q.defer();

    switch(command) {
        case 'install':
            composer = spawn('composer', ['install']);
            break;
        case 'update':
            composer = spawn('composer', ['update']);
            break;
    }

    if (composer) {
        composer.stdout.on('data', function(data) {
            logger.log(data.toString().trim());
        });
    }

    composer.on('close', function(code) {
        if (code) {
            deferred.reject(new Error('Composer error'));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};