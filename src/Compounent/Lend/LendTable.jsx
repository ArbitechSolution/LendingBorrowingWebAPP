import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";

const LendTable = ({
  lenderList,
  title,
  itemsPerPage,
  tokenData,
  url,
  web3,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lenderList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {


    
  }, [lenderList])

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12 mt-2 table-responsive">
      {/* <h2 className="mt-5 text-center">{title}</h2> */}
        <div className="card colorsa">
          <div className="card-body">
            <table className="table text-white text-center ">
              <thead>
                <tr>
                  <th scope="col" className="wi_th">
                    LendID
                  </th>
                  <th scope="col" className="wi_th">
                    LendingAmount
                  </th>
                  <th scope="col" className="wi_th">
                    InterestRate
                  </th>
                  <th scope="col" className="wi_th">
                    LendingDuration
                  </th>
                  <th scope="col" className="wi_th">
                    RemainingLendingAmount
                  </th>
                  <th scope="col" className="wi_th">
                    LendingStatus
                  </th>
                  <th scope="col" className="wi_th">
                    TokenAddress
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, i) => {
                  const token = tokenData.find(
                    (token) => token.address === item[2],
                  );
                  return (
                    <tr className="border-bottom  sdsd" key={i}>
                      <td>{item[0]}</td>
                      <td>{web3.utils.fromWei(item[3].toString(), "ether")}</td>
                      <td>{item[4]}</td>
                      <td>{item[6] / 60}</td>
                      <td>{web3.utils.fromWei(item[8].toString(), "ether")}</td>
                      <td>{item[9] ? "Open" : "Close"}</td>
                      <td>
                        <a
                          href={url + item[2]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {token && typeof token.name === "string"
                            ? token.name
                            : ""}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Pagination
          pageCount={Math.ceil(lenderList.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default LendTable;
