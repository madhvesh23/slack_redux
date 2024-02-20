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
function SendMessage() {
  const [formData, setFormData] = useState({ content: "" });
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitContent = async() => {
    try {
      const result = await sendingMsg(formData.content)
      console.log(result)
    } catch (error) {
      console.log("Error in sending msg")
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
          placeholder="Search users..."
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
          >
            <Icon name="edit" />
            Add
          </Button>
          <Button circular size="large" color="teal" icon labelPosition="right">
            Next
            <Icon name="cloud upload" />
          </Button>
        </ButtonGroup>
      </Form>
    </Segment>
  );
}

export default SendMessage;
