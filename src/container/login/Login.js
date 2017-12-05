import React from 'react'
import {connect} from 'react-redux'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import Logo from '../../components/logo/Logo'
import Hoc from '../../components/hoc/Hoc'

@connect(
    state => state.user,
    {login}
)
@Hoc
class Login extends React.Component{
    constructor(props){
        super(props)
        // this.state = {
        //     user:'',
        //     pwd:''
        // }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    register(){
        // 路由组件
        this.props.history.push('/register')
    }

    // handleChange(key,value){
    //     this.setState({
    //         [key]:value
    //     })
    // }

    handleLogin(){
        this.props.login(this.props.state)
    }

    render(){
        return(
            <div>
                {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={v => this.props.handleChange('user',v)}>
                            用户
                        </InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={v => this.props.handleChange('pwd',v)} type="password">
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handleLogin}>登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login