import React from 'react'
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
} from 'semantic-ui-react'
import Logout from "../Auth/Logout";



const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <MenuItem as='a'>
      <Icon name='home' />
      Home
    </MenuItem>
    <MenuItem as='a'>
      <Icon name='gamepad' />
      Games
    </MenuItem>
    <MenuItem as='a'>
      <Icon name='camera' />
      Channels
    </MenuItem>
  </Sidebar>
)

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_ANIMATION':
      return { ...state, animation: action.animation, visible: !state.visible }
    case 'CHANGE_DIMMED':
      return { ...state, dimmed: action.dimmed }
    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
}

function SidePanel() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: true,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === 'bottom' || direction === 'top'

  return (
      <SidebarPushable as={Segment} style={{ overflow: 'hidden' }}>
        {!vertical && (
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}

        <SidebarPusher dimmed={dimmed && visible}>
            <Logout/>
          <Segment basic>
            <Header as='h3'>Application Content</Header>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </SidebarPusher>
      </SidebarPushable>
  )
}

export default SidePanel