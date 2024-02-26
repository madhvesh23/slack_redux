import React, { useEffect, useState, useRef } from "react";
import { Segment, Image } from "semantic-ui-react";
import { fetchingMsg } from "../../Firebase";
import { useSelector } from "react-redux";
import moment from "moment";
function Message() {
  const [msg, setMsg] = useState([]);
  const SelectedChannel = useSelector((state) => state.channel.selectedChannel);
  const chatWindowRef = useRef(null);
  useEffect(() => {
    if (SelectedChannel?.id) {
      const callback = (fetchedMessages) => {
        setMsg(fetchedMessages);
      };
      const cleanup = fetchingMsg(SelectedChannel.id, callback);
      return cleanup;
    }
  }, [SelectedChannel]);

  useEffect(() => {
    // Scroll to the bottom with smooth transition when 'msg' state changes
    if (chatWindowRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = chatWindowRef.current;
      const isScrolledToBottom = scrollHeight - clientHeight <= scrollTop + 1;
      if (!isScrolledToBottom) {
        chatWindowRef.current.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: "smooth",
        });
      }
    }
  }, [msg]);

  const groupedMessages = msg.reduce((result, message, index) => {
    const messageDate = moment(message.timestamp)
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    let label = '';
    if (messageDate.isSame(today, 'day')) {
      label = 'Today';
    } else if (messageDate.isSame(yesterday, 'day')) {
      label = 'Yesterday';
    } else {
      label = messageDate.format('MMMM D, YYYY'); // Change the format as per your requirement
    }
  
    if (
      index === 0 ||
      message.sender.username !== msg[index - 1].sender.username ||  label !== result[result.length - 1].label
    ) {
      result.push({ label, messages: [message] });
    } else {
      result[result.length - 1].messages.push(message);
    }
    return result;
  }, []);

console.log(groupedMessages)
  return (
    <>
      <div
        id="chatWindow"
        style={{ height: "100%", overflowY: "auto" }}
        ref={chatWindowRef}
        className="chat-window"
      >
        
        {groupedMessages.map((group, index) => (
          <>
          <Segment basic style={{ marginRight: "5px", marginBottom:'0px' ,marginTop:'0px',padding: '20px 15px 10px 1px' }}  key={index}>
             <p style={{textAlign:"center",color: '#6e6d6d'}}>
                  <strong>{group.label}</strong>
                </p>
            {group.messages.map((message, i) => (
              <React.Fragment key={i}>
                {i === 0 && (
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "0px 15px 5px 5px",
                    }}
                  >
                    <Image
                      avatar
                      src={message.sender.avtar}
                      circular
                      bordered
                    />
                    <i className="messages" style={{ marginLeft: "4px" }}>
                      {message.sender.username}
                    </i>
                  </div>
                )}
                <p className="msg-content">
                  <strong>{message.content} <i>{moment(message.timestamp).format('hh:mm a')}</i></strong>
                </p>
              </React.Fragment>
            ))}
          </Segment>
          </>
        ))}
        {msg.length === 0 && (
          <>
            {" "}
            <Image
              centered
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            />
            <Image
              centered
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
              style={{ marginTop: "10px" }}
            />{" "}
          </>
        )}
      </div>
    </>
  );
}

export default Message;
