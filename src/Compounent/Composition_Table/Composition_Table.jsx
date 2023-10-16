import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

function Composition_Table({ title, table_data, tokenData, itemsPerPage }) {
  let web3 = useSelector((state) => state.connect?.web3);
  let url = "https://testnet.bscscan.com/address/";


  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = table_data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="px-2 px-md-5 py-3">
      <div className="card color">
        <p className="m-0 pt-3 px-4 fw-bold">{title}</p>
        <hr />
        <div className="table-responsive">
          <table className="table table-borderless   text-center text-white">
            <thead>
              <tr>
                <th scope="col">Request ID</th>
                <th scope="col">Lender Address</th>
                <th scope="col">Lend Token</th>
                <th scope="col">Lend Amount</th>
                <th scope="col">remainingLendAmount</th>
                <th scope="col">Lending Duration</th>
                <th scope="col">Open to Borrow</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((items, index) => (
                <tr key={index}>
                  <th scope="row" className="py-3">
                    <div
                      className="d-flex justify-content-center"
                      style={{ gap: "10px" }}
                    >
                      <span>
                        {/* <img src={items.img} style={{ width: "40px" }} alt="" /> */}
                      </span>
                      <span className="text-start">
                        <p className="m-0">{items?.name}</p>
                        <p className="m-0" style={{ fontSize: "12px" }}>
                          {items?.requestID}
                        </p>
                      </span>
                    </div>
                  </th>
                  <td>
                    {items.lenderAddress?.slice(0, 6) +
                      "..." +
                      items.lenderAddress?.slice(-4)}
                  </td>
                  <td>
                    {
                      <a
                        href={url + items.tokenAddress}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tokenData?.map((item, index) => {
                          if (item.address === items.tokenAddress) {
                            return item.name;
                          }
                        })}
                      </a>

                      // items.tokenAddress?.slice(0, 6) +
                      //   "..." +
                      //   items.tokenAddress?.slice(-4)
                    }
                  </td>
                  <td>{web3.utils.fromWei(items?.lendAmount)}</td>
                  <td>
                    {web3.utils.fromWei(items.remainingLendAmount)?.slice(0, 6)}
                  </td>
                  <td>{items?.lendingDuration / 60 + "min"}</td>
                  <td>{items?.isOpenToBorrow ? "Open" : "Closed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-2">
      <Pagination 
        pageCount={Math.ceil(table_data.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
      </div>
    </div>
  );
}

export default Composition_Table;
