import { useDispatch, useSelector } from 'react-redux';

import React from "react";
import { getSupplyStats } from '@Redux/actions/home/index';

const SupplyStats = () => {
  const dispatch = useDispatch();
  const { supplyStats } = useSelector(state => state?.home) || {}

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
          {/* <ng-container *ngIf="supplyStats$ | async as supplyStats"> */}
          <dt>Total</dt>
          <dd>
            {/* <span className="text-monospace">{{supplyStats.total | weiToWholeGO | bigNumber}}</span> GO */}
            {/* <ng-container *ngIf="supplyStats.fees_burned > 0"> */}
            {/* <br/><span className="text-monospace">{{supplyStats.fees_burned | weiToWholeGO | bigNumber}}</span>  */}
            GO burned <img src="/assets/icons/fire.svg" />
            {/* </ng-container> */}
          </dd>
          <dt>Circulating</dt>
          <dd>
            {/* <span className="text-monospace">{{supplyStats.circulating | weiToWholeGO | bigNumber}}</span> GO */}
          </dd>
          {/* </ng-container> */}
        </dl>
      </div>
    </div>
  );
};

export default SupplyStats;
