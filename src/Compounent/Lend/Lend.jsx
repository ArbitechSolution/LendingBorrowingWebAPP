import React, { useState } from 'react'

function Lend() {
 const [amount, setAmount]=useState()
 const [days, setDays]=useState()
 const [address, setAddress]=useState()
 const [persentage, setPersentage]=useState()
  return (
    <div>
         <div>
        <div className="px-md-5 my-5 px-2">
      <h2>Lend</h2>
      <p>Lend your Assets </p>


      <div className="row pb-4">
        <div className="col-md-6 mx-auto col-sm-12 mt-2 ">
    
          <div className="card colorsa">
            <div className="card-body">
              <h6>Lend</h6>
              <hr />
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
               <label> Amount</label>
               <input type="number" className="py-2 " placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value) } name="" id="" />
               </div>
              </div>
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
               <label>Persentage</label>
               <input type="number" className="py-2 " placeholder="Persentage" name="" id="" value={persentage} onChange={(e)=>setPersentage(e.target.value)} />
               </div>
              </div>
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
               <label>Days</label>
               <input type="number" className="py-2 " placeholder="Days" value={days} onChange={(e)=>setDays(e.target.value)} name="" id="" />
               </div>
              </div>
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
               <label>Address</label>
               <input type="number" className="py-2 " placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} name="" id="" />
               </div>
              </div>
              <hr/>
           <div className="d-flex "style={{gap:"15px "}}>
              <button className="btn  batan">Lend</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mx-auto col-sm-12 mt-2 ">
    
          <div className="card colorsa">
            <div className="card-body">
              <h6>Lend Details</h6>
              <hr />
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
               <div> Amount</div>
               <div>${amount}</div>
               </div>
              </div>
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
                <div> Amount</div>
               <div>${persentage}</div>
               </div>
              </div>
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
                <div> Amount</div>
               <div>${days}</div>
               </div>
              </div>
              <div className="row my-2">
                <div className="d-flex align-items-center justify-content-between"style={{gap:"12px "}}>
                <div> Amount</div>
               <div>${address}</div>
               </div>
              </div>
             
            </div>
          </div>
        </div>
   
    </div>
    </div>
    </div>
    </div>
  )
}

export default Lend
