const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}

// 清空Chat数据
// Chat.remove({},(err,doc) => {

// })

Router.get('/info',(req,res) => {
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,(err,doc) => {
        if(err){
            res.status(500).json({code:1,msg:`服务端出现错误：${err}`})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

Router.post('/update',(req,res) => {
    const userid = req.cookies.userid
    if(!userid){
        return res.json({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,(err,doc) => {
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

Router.get('/list',(req,res) => {
    const {type} = req.query

    // 清空数据
    // User.remove({},(err,doc) =>{})
    User.find({type},(err,doc) =>{
        return res.json({code:0,data:doc})
    })
})

Router.get('/getmsglist',(req,res) => {
    const user = req.cookies.userid
    // '$or':[{from:user,to:user}]
    User.find({},(e,userdoc) => {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},(err,doc) =>{
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})

Router.post('/readmsg',(req,res) => {
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
            console.log(doc)
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
        }
    )
})

Router.post('/register',(req,res) => {
    const {user,pwd,type} = req.body
    User.findOne({user},(err,doc) => {
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        // 注册的时候需要存储id
        userModel.save((e,d) => {
            if(e){
                return res.status(500).json({code:1,msg:`服务端出现错误：${e}`})
            }
            const {user,type,_id} = d
            // 注册需要保存状态
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})

Router.post('/login',(req,res) => {
    // 登陆需要保存状态
    // 利用cookie添加登录状态
    const {user,pwd} = req.body
    // 不显示pwd字段
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc) => {
        if(!doc){
            return res.status(500).json({code:1,msg:`服务端出现错误：${err}`})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
        
    })
})

function md5Pwd(pwd){
    const salt = 'sdkfhjksdfhlkasd5sd4f65'
    return utils.md5(utils.md5(pwd + salt))
}


module.exports = Router