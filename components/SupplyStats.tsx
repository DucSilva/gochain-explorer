import { numberWithCommas, transform } from "@Utils/functions";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { getSupplyStats } from "@Redux/actions/home/index";

const SupplyStats = () => {
  const dispatch = useDispatch();
  const { supplyStats } = useSelector((state: any) => state?.home) || {};

  React.useEffect(() => {
    const timer = setInterval(() => dispatch(getSupplyStats({})), 10000);
    return () => clearInterval(timer);
  });

  React.useEffect(() => {
    dispatch(getSupplyStats({}))
  }, [])

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="card-title">
          <img src="/assets/icons/comparison.svg" /> SUPPLY STATS
        </div>
        <dl>
          <dt>Total</dt>
          <dd>
            <span className="text-monospace">
              {supplyStats?.total &&
                numberWithCommas(transform(supplyStats?.total))}
            </span>{" "}
            GO
            {supplyStats?.fees_burned &&
              transform(supplyStats?.fees_burned) > 0 && (
                <>
                  <br />
                  <span className="text-monospace">
                    {supplyStats?.fees_burned &&
                      numberWithCommas(transform(supplyStats?.fees_burned))}
                  </span>
                  GO burned <img src="/assets/icons/fire.svg" />
                </>
              )}
          </dd>
          <dt>Circulating</dt>
          <dd>
            <span className="text-monospace">
              {supplyStats?.circulating &&
                numberWithCommas(transform(supplyStats?.circulating))}
            </span>{" "}
            GO
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default SupplyStats;
