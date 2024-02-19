import React from "react";
import {
  DropdownMenu,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
  Dropdown,
  Image,
  Icon,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
// import Logout from "../Auth/Logout"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Firebase";

function DropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUser = useSelector((state) => state.user.user);
 const avtarUrl = isUser?.avtar

  const HandleLogout = async () => {
    await logout(dispatch);
    navigate("/login");
  };

  const handleItemClick = (e, { name }) => {
    if (name === "sign-out") {
      HandleLogout();
    } else {
      console.log(name);
    }
  };
  const trigger = (
    <span>
      <Image src={avtarUrl} avatar />
      <h5 style={{display:"inline-block",margin:'0px 0px 0px 7px'}}>
      {isUser?.displayName}
      </h5>
        
    </span>
  );

  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{isUser?.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    // { key: 'profile', text: 'Your Profile' },
    // { key: 'stars', text: 'Your Stars' },
    // { key: 'explore', text: 'Explore' },
    // { key: 'integrations', text: 'Integrations' },
    // { key: 'help', text: 'Help' },
    // { key: 'settings', text: 'Settings' },
    {
      key: "change-avtar",
      text: "Change avtar",
      name: "change-avtar",
      onClick: handleItemClick,
    },
    {
      key: "sign-out",
      text: "Sign Out",
      name: "sign-out",
      onClick: handleItemClick,
    },
  ];
  return <Dropdown trigger={trigger} options={options} />;
}

export default DropDown;
