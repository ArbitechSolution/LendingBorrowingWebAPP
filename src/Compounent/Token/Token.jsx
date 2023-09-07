import React, { useState } from "react";
import drop from "../image/drop.svg";
import token from "../image/token.svg";
import "./Token.css"
function Token() {
  return (
    <div>
      <div className="px-md-5 px-2 pt-5">
        <h1>
          Tokens <img src={drop} alt="" />{" "}
        </h1>
        <p>Platform and GLP index tokens.</p>
        <div className="row">
          <div className="col-md-6 col-sm-12 mt-2 ">
            <div className="card color">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8 col-sm-12">
                    <div className="d-flex"><img src={token} alt="" />
                    <h6 className="ms-2 m-0 ">AFT<br/><p className="fs m-0">AFT</p></h6>

</div>
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
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div
                      className="recharts-wrapper"
                      style={{
                        position: "relative",
                        cursor: "default",
                        width: 210,
                        height: 210,
                      }}
                    >
                      <svg
                        cx="50%"
                        cy="50%"
                        className="recharts-surface"
                        width={180}
                        height={180}
                        viewBox="0 0 210 210"
                        version="1.1"
                      >
                        <defs>
                          <clipPath id="recharts1-clip">
                            <rect x={5} y={5} height={200} width={200} />
                          </clipPath>
                        </defs>
                        <g className="recharts-layer recharts-pie">
                          <g className="recharts-layer recharts-pie-sector">
                            <path
                              name="staked"
                              cx={105}
                              cy={105}
                              fill="#4353fa"
                              stroke="#4353fa"
                              color="#4353fa"
                              strokeWidth={1}
                              className="recharts-sector"
                              d="M 105,25
    A 80,80,0,
    1,1,
    27.11368777014718,86.73193039114756
  L 33.928740090259296,88.33038648192215
      A 73,73,0,
      1,0,
      105,32 Z"
                              style={{ filter: "none", cursor: "pointer" }}
                            />
                          </g>
                          <g className="recharts-layer recharts-pie-sector">
                            <path
                              name="not staked"
                              cx={105}
                              cy={105}
                              fill="#5c0af5"
                              stroke="#5c0af5"
                              color="#5c0af5"
                              strokeWidth={1}
                              className="recharts-sector"
                              d="M 27.798680442215073,84.02486570873083
    A 80,80,0,
    0,1,
    84.8074290316925,27.590310182188006
  L 86.5742789914194,34.36365804124655
      A 73,73,0,
      0,0,
      34.55379590352126,85.86018995921688 Z"
                              style={{ filter: "none", cursor: "pointer" }}
                            />
                          </g>
                          <g className="recharts-layer recharts-pie-sector">
                            <path
                              name="in liquidity"
                              cx={105}
                              cy={105}
                              fill="#0598fa"
                              stroke="#0598fa"
                              color="#0598fa"
                              strokeWidth={1}
                              className="recharts-sector"
                              d="M 87.52128901487977,26.932755509761733
    A 80,80,0,
    0,1,
    102.20804026379994,25.048733838472344
  L 102.45233674071744,32.044469627606006
      A 73,73,0,
      0,0,
      89.0506762260778,33.763639402657574 Z"
                              style={{ filter: "none", cursor: "pointer" }}
                            />
                          </g>
                        </g>
                        <text
                          x="50%"
                          y="50%"
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          Distribution
                        </text>
                      </svg>
                      <div
                        className="recharts-tooltip-wrapper"
                        style={{
                          pointerEvents: "none",
                          visibility: "hidden",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          transform: "translate(42.7053px, 117.953px)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mt-2">
            <div className="card color">
              <div className="card-body">
              <div className="row">
                  <div className="col-md-8 col-sm-12">
                    <div className="d-flex"><img src={token} alt="" />
                    <h6 className="ms-2 m-0 ">AFT<br/><p className="fs m-0">AFT</p></h6>

</div>
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
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div
                      className="recharts-wrapper"
                      style={{
                        position: "relative",
                        cursor: "default",
                        width: 210,
                        height: 210,
                      }}
                    >
                      <svg
                        cx="50%"
                        cy="50%"
                        className="recharts-surface"
                        width={180}
                        height={180}
                        viewBox="0 0 210 210"
                        version="1.1"
                      >
                        <defs>
                          <clipPath id="recharts1-clip">
                            <rect x={5} y={5} height={200} width={200} />
                          </clipPath>
                        </defs>
                        <g className="recharts-layer recharts-pie">
                          <g className="recharts-layer recharts-pie-sector">
                            <path
                              name="staked"
                              cx={105}
                              cy={105}
                              fill="#4353fa"
                              stroke="#4353fa"
                              color="#4353fa"
                              strokeWidth={1}
                              className="recharts-sector"
                              d="M 105,25
    A 80,80,0,
    1,1,
    27.11368777014718,86.73193039114756
  L 33.928740090259296,88.33038648192215
      A 73,73,0,
      1,0,
      105,32 Z"
                              style={{ filter: "none", cursor: "pointer" }}
                            />
                          </g>
                          <g className="recharts-layer recharts-pie-sector">
                            <path
                              name="not staked"
                              cx={105}
                              cy={105}
                              fill="#5c0af5"
                              stroke="#5c0af5"
                              color="#5c0af5"
                              strokeWidth={1}
                              className="recharts-sector"
                              d="M 27.798680442215073,84.02486570873083
    A 80,80,0,
    0,1,
    84.8074290316925,27.590310182188006
  L 86.5742789914194,34.36365804124655
      A 73,73,0,
      0,0,
      34.55379590352126,85.86018995921688 Z"
                              style={{ filter: "none", cursor: "pointer" }}
                            />
                          </g>
                          <g className="recharts-layer recharts-pie-sector">
                            <path
                              name="in liquidity"
                              cx={105}
                              cy={105}
                              fill="#0598fa"
                              stroke="#0598fa"
                              color="#0598fa"
                              strokeWidth={1}
                              className="recharts-sector"
                              d="M 87.52128901487977,26.932755509761733
    A 80,80,0,
    0,1,
    102.20804026379994,25.048733838472344
  L 102.45233674071744,32.044469627606006
      A 73,73,0,
      0,0,
      89.0506762260778,33.763639402657574 Z"
                              style={{ filter: "none", cursor: "pointer" }}
                            />
                          </g>
                        </g>
                        <text
                          x="50%"
                          y="50%"
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          Distribution
                        </text>
                      </svg>
                      <div
                        className="recharts-tooltip-wrapper"
                        style={{
                          pointerEvents: "none",
                          visibility: "hidden",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          transform: "translate(42.7053px, 117.953px)",
                        }}
                      />
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Token;
