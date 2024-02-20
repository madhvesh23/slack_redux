import React, { useState } from "react";
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
  Input,
  FormField,
  Form,
  List,
  ListItem,
  ListHeader,
  ListContent,
  Image,
} from "semantic-ui-react";
import { channelCreation } from "../../Firebase";
import { useSelector } from "react-redux";
import ChannelList from "./ChannelList";
function Channels() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const channels = useSelector((state) => state.channel.channel);

  const { uid, displayName, email } = user;
  const [channelData, setChannelData] = useState({
    channelName: "",
    aboutChannel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChannelData({ ...channelData, [name]: value });
  };

  const submitChannelData = async () => {
    const result = await channelCreation(
      uid,
      displayName,
      email,
      channelData.channelName,
      channelData.aboutChannel
    );
    console.log(result);
  };

  return (
    <>
      <div className="channels">
        <span className="channels-icon">
          <Icon
            style={{ marginRight: "10px", fontSize: "13px" }}
            name="exchange"
          />
          <span style={{ letterSpacing: "0.6px" }}>
            CHANNELS ({channels.length})
          </span>
        </span>
        <span onClick={() => setOpen(true)} style={{ marginLeft: "30px" }}>
          <Icon name="add" className="add-icon" />
        </span>
      </div>

      {/* channels list */}
      <ChannelList />

      {/* add channel modal */}
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Header icon>
          <Icon name="wechat" />
          Start a New Channel
        </Header>
        <ModalContent>
          <Form>
            <FormField>
              <Input
                label="Channel Name"
                fluid
                placeholder="Name your Channel"
                name="channelName"
                value={channelData.channelName}
                onChange={handleChange}
              />
            </FormField>
            <Input
              label="About Channel"
              fluid
              placeholder="Tell something about your Channel"
              name="aboutChannel"
              value={channelData.aboutChannel}
              onChange={handleChange}
            />
            <FormField></FormField>
          </Form>
        </ModalContent>
        <ModalActions>
          <Button
            color="green"
            inverted
            onClick={() => {
              submitChannelData();
              setOpen(false);
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
          <Button
            color="red"
            inverted
            onClick={() => {
              setOpen(false);
            }}
          >
            <Icon name="remove" /> No
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
}

export default Channels;
