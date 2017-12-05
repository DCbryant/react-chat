import React from 'react'
import {List,InputItem,WhiteSpace,Button,Radio} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Logo from '../../components/logo/Logo'
import {register} from '../../redux/user.redux'
import './register.css'
import Hoc from '../../components/hoc/Hoc'


@connect(
    state => state.user,
    {register}
)
@Hoc
class Register extends React.Component{
    constructor(props){
        super(props)
        // this.state = {
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:'genius' //boss
        // }
        this.handleRegister = this.handleRegister.bind(this)
    }

    // handleChange(key,value){
    //     this.setState({
    //         [key]:value
    //     })
    // }

    componentDidMount(){
        this.props.handleChange('type','genius')
    }

    handleRegister(){
        this.props.register(this.props.state)
    }

    render(){
        const RadioItem = Radio.RadioItem
        return(
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <List>
                    <InputItem onChange={v => this.props.handleChange('user',v)}>
                        用户名
                    </InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem 
                        type='password'
                        onChange={v => this.props.handleChange('pwd',v)}
                    >
                        密码
                    </InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem 
                        type='password'
                        onChange={v => this.props.handleChange('repeatpwd',v)}
                    >
                        重复密码
                    </InputItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem 
                        checked={this.props.state.type === 'genius'}
                        onChange={v => this.props.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem 
                        checked={this.props.state.type === 'boss'}
                        onChange={v => this.props.handleChange('type','boss')}
                    >
                        老板
                    </RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register