
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js');

var zbp_testconfig = sequelize.define('zbp_testconfig',
{
    conf_ID:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    conf_Name:{
        type:Sequelize.STRING(255),//链接名称
        allowNull:false,
    },
    conf_Value:{
        type:Sequelize.TEXT
    }
},{
    timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
    freezeTableName:true//Model 对应的表名将与model名相同
})


module.exports = zbp_testconfig;
