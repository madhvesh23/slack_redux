import React from "react";
import { Icon } from "semantic-ui-react";
function Channels() {
  return (
    <div className="channels">
      <span className="channels-icon">
        <Icon style={{marginRight:'10px',fontSize:'13px'}} name="exchange"/>
     <span>CHANNELS</span>
      </span>
      <span style={{ marginLeft: "30px" }}>
        <Icon name="add" />
      </span>
    </div>
  );
}

export default Channels;
