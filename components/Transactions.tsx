import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { getStats } from "@Redux/actions/home/index";
import { numberWithCommas } from "@Utils/functions";

const Transactions = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state: any) => state?.home) || {};
  const {
    total_transactions_count,
    last_day_transactions_count,
    last_week_transactions_count,
  } = stats;

  React.useEffect(() => {
    const timer = setInterval(() => dispatch(getStats({})), 10000);
    return () => clearInterval(timer);
  });

  React.useEffect(() => {
    dispatch(getStats({}));
  }, []);

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="card-title">
          <img src="/assets/icons/tx.svg" /> TRANSACTIONS
          {/* <!--(Updated every 5 minutes)--> */}
        </div>

        <div className="row font-small">
          <div className="col">
            <div className="card h-100 shadow-none border-0">
              <div className="card-body text-center">
                <div>
                  <img src="/assets/icons/circle.svg" alt="Total" />
                </div>
                <div className="mt-3">Total</div>
                <div className="mt-3">
                  {total_transactions_count &&
                    numberWithCommas(total_transactions_count)}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-none border-0">
              <div className="card-body text-center">
                <div>
                  <img src="/assets/icons/disc.svg" alt="Last 7 days" />
                </div>
                <div className="mt-3">Last 7 days</div>
                <div className="mt-3">
                  {last_week_transactions_count &&
                    numberWithCommas(last_week_transactions_count)}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-none border-0">
              <div className="card-body text-center">
                <div>
                  <img src="/assets/icons/target.svg" alt="Last 24 hours" />
                </div>
                <div className="mt-3">Last 24 hours</div>
                <div className="mt-3">
                  {last_day_transactions_count &&
                    numberWithCommas(last_day_transactions_count)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
