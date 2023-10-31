import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";

const LoanTable = ({
  title,
  loanList,
  itemsPerPage,
  url,
  web3,
  tokenData,
  borrowerList2,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    // Your mapping logic to create an array of objects
    const mappedData = loanList?.flatMap((item) =>
      item[0] === true
        ? item["data"].map((item2) => {
            const borrower = borrowerList2.find(
              (borrower) => borrower[0] === item2["loanID"],
            );
            const isClosed = borrower?.payment.isClosed;
            const repaymentTime = borrower?.repaymentTime;
            const currentTime = Math.floor(Date.now() / 1000);

            const status =
              isClosed === true
                ? "Loan Paid"
                : repaymentTime > currentTime
                ? "Repayable"
                : "Overdue";

            return {
              lendID: item2["lendID"],
              loanID: item2["loanID"],
              collateralToken: item2["collateralToken"],
              borrower: item2["borrower"],
              borrowed: web3.utils.fromWei(item2["Borrowed"], "ether"),
              status,
            };
          })
        : [],
    );

    // Update the state variable with the computed data
    setData(mappedData);
  }, [loanList, borrowerList2, web3]);

  useEffect(() => {
    // Update currentItems based on currentPage
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(data.slice(startIndex, endIndex));
  }, [currentPage, data, itemsPerPage]);

  return (
    <div>
      {/* <h2 className="mt-5 text-center">{title}</h2> */}
      <div className="col-md-12 mx-auto col-sm-12 mt-2 table-responsive ">
        <div className="card colorsa">
          <div className="card-body">
            <table className="table text-white text-center ">
              <thead>
                <tr>
                  <th scope="col" className="wi_th">
                    LendID
                  </th>
                  <th scope="col" className="wi_th">
                    Loan ID
                  </th>
                  <th scope="col" className="wi_th">
                    Collateral Token
                  </th>
                  <th scope="col" className="wi_th">
                    Borrower Address
                  </th>
                  <th scope="col" className="wi_th">
                    Borrowed Amount
                  </th>
                  <th scope="col" className="wi_th">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, index) => {
                  return (
                    <tr className="border-bottom  sdsd" key={index}>
                      <td>{item["lendID"]}</td>
                      <td>{item["loanID"]}</td>
                      <td>
                        {
                          <a
                            href={url + item["collateralToken"]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {
                              tokenData.find(
                                (token) =>
                                  token.address === item["collateralToken"],
                              ).name
                            }
                          </a>
                        }
                      </td>
                      <td>
                        {item["borrower"]?.slice(0, 6) +
                          "..." +
                          item["borrower"]?.slice(-4)}
                      </td>
                      <td>{item["borrowed"]}</td>
                      <td>{item.status}</td>
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
          pageCount={Math.ceil(data.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default LoanTable;
