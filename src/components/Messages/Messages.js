import React from 'react'
import { Segment,Image } from 'semantic-ui-react'
import Starred from './Starred'
import Message from './Message'
import SendMessage from './SendMessage'
function Messages() {
  return (
    <>
    <Starred/>
    <Segment style={{height:'60vh'}}>
      <Message/>
    </Segment>
    </>
  )
}

export default Messages