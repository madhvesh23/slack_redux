import React from "react";
import Firebase from "../Firebase";
import Logout from "./Auth/Logout";
import SidePanel from "./SidePanel/SidePanel";

function MainPage() {
  return (
    <div style={{height:"100%"}}>
      <SidePanel/>
    </div>
  );
}

export default MainPage;
