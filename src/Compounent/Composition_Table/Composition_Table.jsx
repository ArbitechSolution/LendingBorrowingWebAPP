import React from "react";
import drop from "../image/drop.svg";
import eth from "../image/eth.svg";
import eth1 from "../image/2.svg";
function Composition_Table() {
    const table_data=[
        {
            img:eth,
            name:"Ethereum",
            Symbol:"ETH",
            PRICE:"$1,869.53",
            POOL:"$119,410,413",
            WEIGHT:"24.34% / 30.00%",
            UTILIZATION:"31.02%"


        },
        {
            img:eth1,
            name:"Ethereum",
            Symbol:"ETH",
            PRICE:"$1,869.53",
            POOL:"$119,410,413",
            WEIGHT:"24.34% / 30.00%",
            UTILIZATION:"31.02%"


        },
        {
            img:eth,
            name:"Ethereum",
            Symbol:"ETH",
            PRICE:"$1,869.53",
            POOL:"$119,410,413",
            WEIGHT:"24.34% / 30.00%",
            UTILIZATION:"31.02%"


        },
        {
            img:eth,
            name:"Ethereum",
            Symbol:"ETH",
            PRICE:"$1,869.53",
            POOL:"$119,410,413",
            WEIGHT:"24.34% / 30.00%",
            UTILIZATION:"31.02%"


        },
        {
            img:eth,
            name:"Ethereum",
            Symbol:"ETH",
            PRICE:"$1,869.53",
            POOL:"$119,410,413",
            WEIGHT:"24.34% / 30.00%",
            UTILIZATION:"31.02%"


        },
        {
            img:eth,
            name:"Ethereum",
            Symbol:"ETH",
            PRICE:"$1,869.53",
            POOL:"$119,410,413",
            WEIGHT:"24.34% / 30.00%",
            UTILIZATION:"31.02%"


        },
        {
            img:eth,
            name:"Ethereum",
            Symbol:"ETH",
            PRICE:"$1,869.53",
            POOL:"$119,410,413",
            WEIGHT:"24.34% / 30.00%",
            UTILIZATION:"31.02%"


        },
    ]
  return (
    <div className="px-2 px-md-5 py-3">
      <div className="card color">
        <p className="m-0 pt-3 px-4">
          GLP Index Composition <img src={drop} alt="" />
        </p>
        <hr />
        <div className="table-responsive">
        <table className="table table-borderless   text-center text-white">
          <thead>
            <tr>
              <th scope="col">TOKEN</th>
              <th scope="col">PRICE</th>
              <th scope="col">POOL</th>
              <th scope="col">WEIGHT</th>
              <th scope="col">UTILIZATION</th>
            </tr>
          </thead>
          <tbody>
            {table_data.map((items,index)=>(

           
            <tr key={index}>
              <th scope="row" className="py-3">
                <div className="d-flex justify-content-center" style={{gap:"10px"}}>
                  
                  <span>
                    
                    <img src={items.img} style={{width:"40px"}} alt="" />
                  </span>
                  <span className="text-start">
                    <p className="m-0">{items.name}</p>
                    <p className="m-0" style={{ fontSize: "12px" }}>
                      {items.Symbol}
                    </p>
                  </span>
                </div>
              </th>
              <td>{items.PRICE}</td>
              <td>{items.POOL}</td>
              <td>{items.WEIGHT}</td>
              <td>{items.UTILIZATION}</td>
            </tr>
             ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}

export default Composition_Table;
