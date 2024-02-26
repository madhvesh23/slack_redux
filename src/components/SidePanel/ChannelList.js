import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListContent, Image } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { setSelectedChannel } from "../../actions/channelAction";

function ChannelList() {
  const channels = useSelector((state) => state.channel.channel);
  const selectedChannel = useSelector((state) => state.channel.selectedChannel);
  const disptach = useDispatch();

  const submitChannelName = async (channel) => {
    console.log(channel);
    disptach(setSelectedChannel(channel));
  };

  return (
    <List divided verticalAlign="middle" size="small" className="channel-lists">
      {channels && Array.isArray(channels) && channels.length > 0 ? (
        <>
          {channels.map((channel) => (
            <ListItem
              style={{ textAlign: "start", marginTop: "5px" }}
              key={channel.id}
            >
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
              />
              <ListContent className="channel-list">
                <span
                  onClick={() => submitChannelName(channel)}
                  style={{
                    color:
                      selectedChannel && selectedChannel.id === channel.id
                        ? "blueviolet" // Change this to your desired active color
                        : "#a3a8ad",
                    letterSpacing: "1.3px",
                    fontWeight:
                      selectedChannel && selectedChannel.id === channel.id
                        ? "bold"
                        : "normal",
                        fontSize :  selectedChannel && selectedChannel.id === channel.id ? "16px" :"inherit"
                  }}
                >
                  {channel.name}
                </span>
              </ListContent>
            </ListItem>
          ))}
        </>
      ) : (
        "Default Channel"
      )}
    </List>
  );
}

export default ChannelList;
