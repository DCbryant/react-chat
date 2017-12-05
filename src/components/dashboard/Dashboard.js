import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch,Route,Redirect} from 'react-router-dom'

import NavLink from'../navlink/NavLink'
import Boss from '../boss/Boss'
import Genius from '../genius/Genius'
import Msg from '../msg/Msg'
import User from '../user/User'
import {getMsgList,recvMsg} from '../../redux/chat.redux'


@connect(
    state => state,
    {getMsgList,recvMsg}
)
class DashBoard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render(){
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type === 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'boss列表',
                component:Genius,
                hide:user.type === 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        let title
        if(navList.find(v => v.path === pathname)){
            title = navList.find(v => v.path === pathname).title
        }else{
            title = false
        }
        // 没有匹配到路由就进入到dashboard
        return(
            <div>
                <NavBar className='fixed-header' mode='dard'>
                    {/* {navList.find(v => v.path === pathname).title} */}
                    {title ? title : <Redirect to="login"></Redirect>}
                </NavBar>
                <div>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component} />
                        ))}
                    </Switch>
                </div>
                <NavLink data={navList}></NavLink>
            </div>
        )
    }
}

export default DashBoard