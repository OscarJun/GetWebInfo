
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js');

var zbp_testcategory = sequelize.define('zbp_testcategory',
{
    cate_ID:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    cate_Name:{
        type:Sequelize.STRING(255),//链接名称
        allowNull:false,
    },
    cate_Order:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    cate_Count:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    cate_Alias:{
        type:Sequelize.STRING(255),//链接排序序号
        allowNull:false
    },
    cate_Intro:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    cate_RootID:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    cate_ParentID:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    cate_Template:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    cate_LogTemplate:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    cate_Meta:{
        type:Sequelize.TEXT('long'),
        allowNull:false
    }
},{
    timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
    freezeTableName:true//Model 对应的表名将与model名相同
})


module.exports = zbp_testcategory;
