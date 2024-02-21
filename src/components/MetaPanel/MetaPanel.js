import React from 'react'
import { Segment } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
function MetaPanel() {
  const SelectedChannel = useSelector((state) => state.channel.selectedChannel);
  return (
    <Segment>
      #  {SelectedChannel?.name}
      <Segment >
        {SelectedChannel &&  SelectedChannel.createdInfo.createdBy}
      </Segment>
    </Segment>
  )
}

export default MetaPanel