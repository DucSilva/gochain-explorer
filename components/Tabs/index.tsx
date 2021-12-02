import { OverlayTrigger, Tabs, Tooltip } from "react-bootstrap";
import { SignerData, SignerStat } from "@Models/signer-stats";

import React from "react";
import SignerTab from "@Components/SignerTab";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";

const renderTitle = (tab: any) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="tab__title mr-1"> {tab?.title || tab?.range}</div>
      {tab?.isShowDes && (
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
      )}
    </div>
  );
};

function ControlledTabs({ tabs, isSigner = false, disabled = false }: any) {
  const { statsData } = useSelector((state: any) => state.signer);
  const [key, setKey] = React.useState(
    !isSigner ? tabs[0]?.eventKey : statsData?.[0]?.range
  );

  if (!isSigner) {
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
                disabled={disabled}
              >
                {tab.renderTab()}
              </Tab>
            );
          }
        })}
      </Tabs>
    );
  } else {
    return (
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 tab__custom"
      >
        {statsData.map((stat: SignerStat, index: any) => {
          return (
            <Tab
              eventKey={`${stat?.range}`}
              title={renderTitle(stat)}
              key={index}
            >
              <SignerTab stat={stat}/>
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}

export default ControlledTabs;
