var config = {};

config.servInfo = {};
config.servInfo.url = 'http://localhost';
config.servInfo.port = process.env.PORT || 4000;
config.servInfo.tcpServer = false;
config.servInfo.tcpServerPort = 4600;
	
config.cat = {};
config.cat.eventLog = true;

config.tcpPortServer ={};
config.tcpPortServer.launch = false;

module.exports = config;