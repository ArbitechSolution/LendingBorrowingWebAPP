import React from "react";
import "./Dash_Stats.css";
import drop from "../image/drop.svg";
function Dash_Stats() {
  return (
    <div className="px-md-5 px-2 pt-5">
      <h1>
        Stats <img src={drop} alt="" />{" "}
      </h1>
      <p>
        Arbitrum Total Stats start from 01 Sep 2021.
        <br />
        For detailed stats: https://stats.AFT.io.
      </p>
      <div className="row">
        <div className="col-md-6 col-sm-12 mt-2 ">
          <div className="card color">
            <div className="card-body">
              <h6>Overview</h6>
              <hr />
              <div className="row">
                <div className="col AUM">AUM</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">GLP Pool</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">24h Volume</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Open Interest</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Long Positions</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Short Positions</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Fees since 19 Jul 2023</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mt-2">
          <div className="card color">
            <div className="card-body">
              <h6>Total Stats</h6>
              <hr />
              <div className="row">
                <div className="col AUM">Total Fees</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Total Volume</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Total Users</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Floor Price Fund</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash_Stats;
