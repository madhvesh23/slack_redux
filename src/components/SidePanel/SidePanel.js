import React from "react";
import {
  SidebarPusher,
  SidebarPushable,
  ButtonGroup,
  MenuItem,
  GridRow,
  GridColumn,
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  HeaderSubheader,
  HeaderContent,
} from "semantic-ui-react";
import Messages from "../Messages/Messages";
import MetaPanel from "../MetaPanel/MetaPanel";
import DropDown from "./DropDown";
import Channels from "./Channels";
import SendMessage from "../Messages/SendMessage";
import Starred from "./Starred";

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    // width='thin'
    style={{ width: "220px" }}
  >
    <Header
      style={{
        padding: "30px 0px 20px  0px",
        textAlign: "-webkit-center",
        marginBottom: "0px",
      }}
      color="violet"
      as="h3"
    >
      <Icon size="small" name="facebook messenger" />
      <HeaderContent style={{ letterSpacing: "0.8px", fontSize: "23px" }}>
        Chat App
      </HeaderContent>
    </Header>

    <MenuItem as="a">
      <DropDown />
    </MenuItem>

    <MenuItem style={{marginTop:'5px'}}>
      <Starred/>
    </MenuItem>

    <MenuItem as="a" style={{ display: "flex", alignItems: "center" }}>
      <Channels />
    </MenuItem>
  </Sidebar>
);

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_ANIMATION":
      return { ...state, animation: action.animation, visible: !state.visible };
    case "CHANGE_DIMMED":
      return { ...state, dimmed: action.dimmed };
    case "CHANGE_DIRECTION":
      return { ...state, direction: action.direction, visible: false };
    default:
      throw new Error();
  }
}

function SidePanel() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: "uncover",
    direction: "left",
    dimmed: false,
    visible: true,
  });

  const { animation, dimmed, direction, visible } = state;
  const vertical = direction === "bottom" || direction === "top";

  return (
    <SidebarPushable as={Segment} style={{ overflow: "hidden" }}>
      {!vertical && (
        <VerticalSidebar
          animation={animation}
          direction={direction}
          visible={visible}
        />
      )}

      <SidebarPusher dimmed={dimmed && visible}>
        {/* <Logout /> */}
        {/* <Segment basic>
          <Messages/>
          <Header as="h3">Application Content</Header>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
        <Segment basic>
          <MetaPanel/>
        </Segment> */}
        <Grid divided="vertically" style={{margin:"0px 0px 0px 0px "}}>
          <GridRow columns={5}>
            <GridColumn style={{height:'fit-content'}} width={9}>
              <Messages/>
            </GridColumn>
            <GridColumn width={4}>
              <MetaPanel/>
            </GridColumn>
          </GridRow>
        </Grid>
        <SendMessage/>
      </SidebarPusher>
    </SidebarPushable>
  );
}

export default SidePanel;
