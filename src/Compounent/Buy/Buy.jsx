import React from "react";
import logo from "../image/logo.svg"
import glp from "../image/glp.svg"
function Buy() {
  return (
    <div className="mt-5 px-md-5 px-2">
      <h1>Buy AFT or GLP</h1>
      <div className="row "style={{marginBottom:"152px"}}>
        <div className="col-md-6 col-sm-12 shadow">
            <div className="card color">
                <div className="card-body">
                    <img style={{width:"15%",marginBottom: "8px"}}  src={logo} alt="" />
<p className="mt-4 pt-3">AFT is the utility and governance token. Accrues 30% of the platform's generated fees.</p>
<p className="mt-3">
Arbitrum APR: 3.27%, Avalanche APR: 3.19%
</p>
<div className="d-md-flex d-block justify-content-between" >
    <div className="">
    <button className="btn btn-primary mt-2">Buy on Arbitrum</button>
    <button className="btn btn-primary ms-md-2 ms-0 mt-2">Buy on Avalanche</button></div>
    <button className="btn btn-primary mt-2">Read more</button>
</div>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-sm-12 shadow">
            <div className="card color">
                <div className="card-body">
                    <img style={{width:"6%",marginBottom: "8px"}} src={glp} alt="" /><span className="fs-4 ms-2">GLP</span>
<p className="mt-4">AFT is the utility and governance token. Accrues 30% of the platform's generated fees.</p>
<p className="mt-3">
Arbitrum APR: 3.27%, Avalanche APR: 3.19%
</p>
<div className="d-md-flex d-block justify-content-between" >
    <div className="">
    <button className="btn btn-primary mt-2">Buy on Arbitrum</button>
    <button className="btn btn-primary ms-md-2 ms-0 mt-2">Buy on Avalanche</button></div>
    <button className="btn btn-primary mt-2">Read more</button>
</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
