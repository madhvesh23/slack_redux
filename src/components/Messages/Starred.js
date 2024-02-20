import React, { useEffect, useState } from "react";
import { Segment, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateStarred } from "../../Firebase";
function Starred() {
  const SelectedChannel = useSelector((state) => state.channel.selectedChannel);
  const channels = useSelector((state) => state.channel.channel);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { uid } = user;

  const toggleIconState = async (channelId) => {
    try {
      if (!user) {
        return;
      }

      const newStarState =
        user?.star?.[channelId] === "filled" ? "outline" : "filled";
      await updateStarred(uid, channelId, newStarState);
    } catch (error) {
      console.log("Error stroing star value");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!SelectedChannel && channels.length > 0) {
        dispatch({ type: "SET_SELECTED_CHANNEL", payload: channels[0] });
      }
  
      if (user && SelectedChannel) {
        const channelId = SelectedChannel.id;
        const channelStarState = user?.star?.[channelId];
        
        // Check if channelStarState is undefined or null
        if (channelStarState == null) {
          await updateStarred(uid, channelId, "outline");
        }
      }
    };
  
    fetchData();
  }, [dispatch, channels, SelectedChannel, uid]);
  

  return (
    <Segment style={{ paddingBottom: "35px" }} size="huge">
      {SelectedChannel && (
        <>
          <p style={{ display: "inline", marginRight: "10px" }}>
            {SelectedChannel.name}
          </p>
          <Icon
            style={{ cursor: "pointer" }}
            onClick={() => toggleIconState(SelectedChannel.id)}
            color={
              user?.star?.[SelectedChannel.id] === "filled" ? "yellow" : null
            }
            name={
              user?.star?.[SelectedChannel.id] === "outline"
                ? "star outline"
                : "star"
            }
          />
        </>
      )}
    </Segment>
  );
}

export default Starred;
