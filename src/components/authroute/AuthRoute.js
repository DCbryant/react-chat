import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'
// 逻辑
// 获取用户信息


// 是否登陆
// 现在的url login是不需要登录的
// 用户的type 身份是boss还是牛人
// 用户是否完善信息 (选择头像 个人简介)

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['./login','./register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        // 获取用户信息
        axios.get('/user/info')
            .then(res => {
                if(res.status === 200){
                    if(res.data.code === 0){
                        // 有登陆信息就加载数据
                        this.props.loadData(res.data.data)
                    }else{
                        // 没有登录
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render(){
        return null
    }
}

export default AuthRoute