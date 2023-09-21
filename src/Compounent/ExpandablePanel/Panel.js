import React from "react";
import { Row, Col } from "react-bootstrap";

const Panel = ({ item }) => {
  // destructuring item
  const data = {
    loanID: item.loanID,
    lendRequestID: item.lendRequestID,
    borrowerAddress: item.borrowerAddress,
    lenderAddress: item.lenderAddress,
    collateralToken: item.collateralToken,
    collateralAmount: item.collateralAmount,
    collateralLivePrice: item.collateralLivePrice,
    lendToken: item.lendToken,
    lendAmount: item.lendAmount,
    loanStartTime: item.loanStartTime,
    repaymentTime: item.repaymentTime,
    status: item.status,
    payment: item.payment[2],
  };
  return (
    <td colSpan="17" style={{ backgroundColor: "rgb(13, 14, 65)" }}>
      <Row className="panel">
        {Object.keys(data).map((key, index) => {
          return (
            <Col
              xs={12}
              md={6}
              lg={6}
              key={index}
              className="px-5 d-flex align-items-center justify-content-start"
            >
              <div className="py-2">
                <span
                  className="fw-bold"
                  style={{ color: "rgb(241, 241, 241)" }}
                >
                  {key}{" "}
                </span>
                :
                <span className="" style={{ color: "rgb(226, 226, 226)" }}>
                  {" "}
                  {data[key]}
                </span>
              </div>
            </Col>
          );
        })}
      </Row>
    </td>
  );
};

export default Panel;
