'use strict';

var cp        = require('child_process'),
	should    = require('should'),
	deviceId1 = Date.now(),
	connector;

describe('Connector', function () {
	this.slow(5000);

	after('terminate child process', function (done) {
		this.timeout(7000);

		setTimeout(function () {
			connector.kill('SIGKILL');
			done();
		}, 5000);
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			should.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			connector.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			connector.send({
				type: 'ready',
				data: {
					options: {
						url : '',
						token: ''
					}
				}
			}, function (error) {
				should.ifError(error);
			});
		});
	});

	describe('#data', function (done) {
		it('should process the data', function () {
			connector.send({
				type: 'data',
				data: {
					title: 'String data',
					data: 'Sample String Log Data'
				}
			}, done);
		});
	});
});