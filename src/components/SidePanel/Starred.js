import React from "react";
import { Icon, ListContent, List, Image, ListItem } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedChannel } from "../../actions/channelAction";

function Starred() {
  const disptach = useDispatch()
  const user = useSelector((state) => state.user.user);
  const SelectedChannel = useSelector((state) => state.channel.selectedChannel);
  const channel = useSelector((state) => state.channel.channel);
  // console.log(channel)
  const starred = user?.star;
  const starArray = [];

  if (starred && typeof starred === "object") {
    const keys = Object.keys(starred);
    for (let i = 0; i < keys.length; i++) {
      const starId = keys[i];
      const starType = starred[starId];
     if(starType==="filled"){
      channel.forEach(cha => {
            if(starId === cha.id){
              starArray.push(cha)
            }   
      });
      
     }
      // const isSelectedChannel =
      //   SelectedChannel && SelectedChannel.id === starId;

      // if (starType && starType === "filled" && isSelectedChannel) {
      //   starArray.push(SelectedChannel);
      // }
    }
  }

  return (
    <>
      <div className="channels">
        <span className="channels-icon">
          <Icon style={{ marginRight: "10px", fontSize: "13px" }} name="star" />
          <span style={{ letterSpacing: "1px" }}>
            FAVORITES ({starArray.length})
          </span>
        </span>
      </div>

      <List
        style={{ paddingLeft: "12px", textAlign: "center" }}
        divided
        verticalAlign="middle"
        size="small"
        className="channel-lists"
      >
        {starArray && starArray.length > 0
          ? starArray.map((channel) => (
              <ListItem key={channel.id}>
                <ListContent className="channel-list">
                  <span
                    style={{
                      color: "#a3a8ad",
                      fontSize: "14px",
                      color: "goldenrod",
                      letterSpacing: "1.3px",
                       cursor:"pointer"
                    }}
                    onClick={()=>disptach(setSelectedChannel(channel))}
                  >
                    # {channel.name}
                  </span>
                </ListContent>
              </ListItem>
            ))
          : ""}
      </List>
    </>
  );
}

export default Starred;
