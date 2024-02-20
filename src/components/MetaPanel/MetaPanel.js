import React from 'react'
import { Segment } from 'semantic-ui-react'
import { UseSelector, useSelector } from 'react-redux'
function MetaPanel() {
  const SelectedChannel = useSelector((state) => state.channel.selectedChannel);

  console.log(SelectedChannel)
  return (
    <Segment>
      MetaData
      <Segment >
        {SelectedChannel &&  SelectedChannel.createdInfo.createdBy}
      </Segment>
    </Segment>
  )
}

export default MetaPanel