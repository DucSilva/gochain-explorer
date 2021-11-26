import React from "react";
import { Tabs, Tooltip, OverlayTrigger } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";

const renderTitle = (tab: any) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="tab__title mr-1"> {`${tab.title}`}</div>
      <div className="tab__desc">
        {tab?.description ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>{tab?.description}</Tooltip>}
          >
            <img src="/assets/icons/info.svg" alt="Description" />
          </OverlayTrigger>
        ) : (
          <img src="/assets/icons/info.svg" alt="Description" />
        )}
      </div>
    </div>
  );
};

function ControlledTabs({ tabs }: any) {
  const [key, setKey] = React.useState(tabs[0]?.eventKey);

  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 tab__custom"
    >
      {tabs.map((tab: any, index: any) => {
        if (tab.isRender) {
          return (
            <Tab
              eventKey={`${tab.eventKey}`}
              title={renderTitle(tab)}
              key={index}
            >
              {tab.renderTab()}
            </Tab>
          );
        }
      })}
    </Tabs>
  );
}

export default ControlledTabs;
