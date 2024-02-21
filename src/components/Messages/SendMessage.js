import React, { useState } from "react";
import {
  Segment,
  Icon,
  Form,
  Input,
  Button,
  ButtonGroup,
} from "semantic-ui-react";
import { sendingMsg } from "../../Firebase";
import {  useSelector } from "react-redux";
function SendMessage() {
  const SelectedChannel = useSelector(state => state.channel.selectedChannel)
  const user = useSelector(state => state.user.user)
console.log(user)
  const [formData, setFormData] = useState({ content: "" });

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitContent = async() => {
    try {
      const result = await sendingMsg(SelectedChannel.id,formData.content,user.displayName,user.uid,user.avtar)
      console.log(result)
    } catch (error) {
      console.log("Error in sending msg")
    }finally{
      setFormData({content:""})
    }
  };
  return (
    <Segment
      style={{
        width: "85%",
        position: "absolute",
        bottom: "10px",
        margin: "0px 10px",
      }}
    >
      <Form>
        <Input
          icon="add"
          iconPosition="left"
          fluid
          placeholder="Use me for Messages!"
          onChange={handleChange}
          value={formData.content}
          name="content"
        />
        <ButtonGroup style={{ marginTop: "14px" }} attached="bottom">
          <Button
            onClick={submitContent}
            circular
            color="orange"
            icon
            labelPosition="left"
            disabled={!formData.content}
          >
            <Icon name="edit" />
            Send
          </Button> 
          
          <Button circular size="large" color="teal" icon labelPosition="right">
            Media Upload
            <Icon name="cloud upload" />
          </Button>
        </ButtonGroup>
      </Form>
    </Segment>
  );
}

export default SendMessage;
