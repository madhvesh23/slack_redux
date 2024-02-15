import React from 'react'
import { Icon } from 'semantic-ui-react'
function Spinner() {
  return (
    <div style={{justifyContent:'center', alignItems:'center' ,height:"100%",display:'flex'}}>
      <Icon loading color='violet' name='asterisk'  size='huge'/>
    </div>
  )
}

export default Spinner
