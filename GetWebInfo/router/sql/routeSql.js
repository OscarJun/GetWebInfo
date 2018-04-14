
var routeSql = {}
var zbp_post = require('./allSql/zbp_post.js')
zbp_post.sync({force:false});
routeSql.zbp_post = zbp_post;
module.exports = routeSql