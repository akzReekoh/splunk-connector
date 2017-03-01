'use strict'

const amqp = require('amqplib')

let _channel = null
let _conn = null
let app = null

describe('Splunk Connector Test', () => {
  before('init', () => {
    process.env.ACCOUNT = 'adinglasan'
    process.env.CONFIG = JSON.stringify({
      url : 'http://54.174.219.239:8088',
      token: '7871D514-7506-41AA-A7C1-9C6F8B104E41'
    })
    process.env.INPUT_PIPE = 'ip.splunk'
    process.env.LOGGERS = 'logger1, logger2'
    process.env.EXCEPTION_LOGGERS = 'ex.logger1, ex.logger2'
    process.env.BROKER = 'amqp://guest:guest@127.0.0.1/'

    amqp.connect(process.env.BROKER)
      .then((conn) => {
        _conn = conn
        return conn.createChannel()
      }).then((channel) => {
      _channel = channel
    }).catch((err) => {
      console.log(err)
    })
  })

  after('close connection', function (done) {
    _conn.close()
    done()
  })

  describe('#start', function () {
    it('should start the app', function (done) {
      this.timeout(10000)
      app = require('../app')
      app.once('init', done)
    })
  })

  describe('#data', () => {
    it('should send data to third party client', function (done) {
      this.timeout(15000)

      let data = {
        title: 'String data',
        data: 'Sample String Log Data'
      }

      _channel.sendToQueue('ip.splunk', new Buffer(JSON.stringify(data)))
      setTimeout(done, 10000)
    })
  })
})
