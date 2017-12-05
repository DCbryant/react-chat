import React from 'react'
import {connect} from 'react-redux'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../utils'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:8080')

@connect(
    state => state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:''})
        // user里面的id  (自己)
        const from = this.props.user._id //5a177df68dae0b0c04374b9e
        // 发送给谁,url中的id (跟别人聊天，别人的user的id)
        const to = this.props.match.params.user //5a177df68dae0b0c04374b9e
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:'',showImoji:false})
    }
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }

    fixCarousel(){
        // 修复组件bug
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    render(){
        const emoji = '😠 😩 😲 😞 😵 😰 😒 😍 😤 😜 😝 😋 😘 😚 😷 😳 😃 😆 😁 😂 ☺ 😄 😢 😭 😨 😣 😡 😌 😖 😔 😱 😪 😏 😓 😥 😫 😉 😺 😸 😹 😽 😻 😿 😼 🙀 🙋 🙌 🙍 🙏 🔥 🎁 🎄 🎅 🎈 🎉 🎍 🎎 🎓 🎏 🎐 🎃 📞 📱 📲 📠 💻 💽 💾 💿 📀 🎵 🎶 🎼 📺 💋 💏 💐 💑 🍔 ☕ 🍸 🍺 ❤ 💓 💔 💖 💗 💘 💙 💚 💛 💜 💝 ♥ 💢 💤 💦 💨 💩 💪 ✨ 🔔 ✊ ✋ ✌ 👊 👍 ☝ 👆 👇 👈 👉 👋 👏 👌 👎 👐 '
                        .split(' ')
                        .filter(v => v)
                        .map(v => ({text:v}))
        const userid = this.props.match.params.user
        const Item = List.Item
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatMsg.filter( v => v.chatid === chatid )

        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        return(
            <div id='chat-page'>
                <NavBar mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v => {
                    const avatar = require(`../imgs/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar} alt='avatar' />}
                                className='chat-me'
                            >{v.content}</Item>
                        </List>
                    )
                })}
                <div className='stick-footer'>
                    {/* chat with user:{this.props.match.params.user} */}
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange = {v => {
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span 
                                        style={{marginRight:10}}
                                        onClick={() => {
                                            this.setState({
                                                showImoji:!this.state.showImoji
                                            })
                                            this.fixCarousel()
                                        }}
                                    >😤</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {this.state.showImoji?
                        <Grid 
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(e) => {
                                this.setState({
                                    text:this.state.text + e.text
                                })
                            }}
                        />:null
                    }
                </div>
            </div>
        )
    }
}

export default Chat