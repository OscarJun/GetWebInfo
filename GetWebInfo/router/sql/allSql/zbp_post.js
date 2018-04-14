
var Sequelize = require('sequelize');
var sequelize = require('../sqlConnect.js');

var zbp_post = sequelize.define('zbp_post',{
    log_ID:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    log_CateID:{
        type:Sequelize.SMALLINT(6),//链接名称
        allowNull:false,
    },
    log_AuthorID:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    log_Tag:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    log_Status:{
        type:Sequelize.TINYINT(4),//链接名称
        allowNull:false,
    },
    log_Type:{
        type:Sequelize.TINYINT(4),
        allowNull:false
    },
    log_Alias:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    log_IsTop:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    log_IsLock:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    log_Title:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    log_Intro:{
        type:Sequelize.TEXT,//链接排序序号
        allowNull:false
    },
    log_Content:{
        type:Sequelize.TEXT('long'),
        allowNull:false
    },
    log_PostTime:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    log_CommNums:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    log_ViewNums:{
        type:Sequelize.INTEGER(11),
        allowNull:false
    },
    log_Template:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    log_Meta:{
        type:Sequelize.TEXT('long'),
        allowNull:false
    }
},{
    timestamps:false,//不增加 TIMESTAMP 属性  (updatedAt, createdAt)
    freezeTableName:true//Model 对应的表名将与model名相同
})
module.exports = zbp_post;


