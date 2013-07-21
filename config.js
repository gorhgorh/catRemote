var config = {};

config.servInfo = {};
config.servInfo.url = 'http://localhost';
config.servInfo.port = process.env.PORT || 4000,
	
config.cat = {};
config.cat.eventLog = true;

config.tcpPortServer ={};
config.tcpPortServer.port = 4666;


module.exports = config;