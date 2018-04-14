var run = require('../getUrlAndCookie/getUrlAndCookie.js');

module.exports = function(){
	var data = {
		wxgzhName:'大海书单',
		cookies:'Cookie: __guid=50703648.2618390668637321000.1523345181933.588; monitor_count=3; Hm_lvt_5859c7e2fd49a1739a0b0f5a28532d91=1523351948,1523495355,1523605227,1523667456; Hm_lpvt_5859c7e2fd49a1739a0b0f5a28532d91=1523667456; PHPSESSID=ib118v0aqskt6vlb8u57pndoe2',
		beginNumber:2,
		lastNumber:3,
	}
	run(data)
}
