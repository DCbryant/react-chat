import React from 'react'
import {List,Badge} from 'antd-mobile'
import {connect} from 'react-redux'

@connect(
    state => state
)
class Msg extends React.Component{
    render(){
        const userid = this.props.user._id
        const userInfo = this.props.chat.users
        const msgGroup = {}
        const Item = List.Item
        const Brief = Item.Brief
        this.props.chat.chatMsg.forEach((v) => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b) => {
            const a_last = getLast(a).create_time
            const b_last = getLast(b).create_time
            return b_last - a_last
        })
        return(
            <div>
                {chatList.map(v => {
                    const lastItem = getLast(v)
                    const targetId = v[0].from === userid ? v[0].to : v[0].from
                    const name = userInfo[targetId] ? userInfo[targetId].name : ''
                    const avatar = userInfo[targetId] ? userInfo[targetId].avatar : 'girl'
                    const unreadNum = v.filter(v => !v.read && v.to === userid).length
                    return (
                        <List key={lastItem._id}>
                            <Item 
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../imgs/${avatar}.png`)}
                                arrow='horizontal'
                                onClick = {() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        </List>    
                    )
                })}
            </div>
        )
    }
}


function getLast(arr){
    return arr[arr.length-1]
}

export default Msg