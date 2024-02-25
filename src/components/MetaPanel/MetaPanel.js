import React from "react";
import {
  Header,
  Segment,
  Icon,
  Image,
  AccordionTitle,
  AccordionContent,
  Accordion,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
function MetaPanel() {
  const SelectedChannel = useSelector((state) => state.channel.selectedChannel);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Accordion styled>
      <Header as="h2" style={{ textAlign: "center", paddingTop: "10px" }}>
        {" "}
        About #{SelectedChannel?.name}
      </Header>

      <AccordionTitle
      //  style={{paddingTop:"10px"}}
        active={activeIndex === 0}
        index={0}
        onClick={(e, titleProps) => handleClick(e, titleProps)}
      >
        <Icon name="dropdown" />
        <Icon name="info"  style={{marginRight:"10px"}}/>
        Channel details
      </AccordionTitle>
      <AccordionContent className="meta-content" active={activeIndex === 0}>
        <p>{SelectedChannel?.details}</p>
      </AccordionContent>

      <AccordionTitle
        active={activeIndex === 1}
        index={1}
        onClick={(e, titleProps) => handleClick(e, titleProps)}
      >
        <Icon name="dropdown" />
        <Icon name="users" style={{marginRight:"10px"}}/> 
        Top Posters
      </AccordionTitle>
      <AccordionContent className="meta-content"  active={activeIndex === 1}>
        <p>
          <Image avatar src={SelectedChannel?.createdInfo.avtar} size="tiny" />
          {SelectedChannel?.createdInfo.createdBy}
        </p>
      </AccordionContent>

      <AccordionTitle
        active={activeIndex === 2}
        index={2}
        onClick={(e, titleProps) => handleClick(e, titleProps)}
      >
        <Icon name="dropdown" />
        <Icon name="user circle" style={{marginRight:"10px"}}/> 
        Created By
      </AccordionTitle>
      <AccordionContent className="meta-content" active={activeIndex === 2}>
        <p>
          <Image avatar src={SelectedChannel?.createdInfo.avtar} size="tiny" />
          {SelectedChannel?.createdInfo.createdBy}
        </p>
      </AccordionContent>
    </Accordion>
  );
}

export default MetaPanel;
