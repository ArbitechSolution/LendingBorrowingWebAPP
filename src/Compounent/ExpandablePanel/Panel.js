import React from "react";
import { Row, Col } from "react-bootstrap";

const Panel = ({ item }) => {
  return (
    <td colSpan="17" style={{ backgroundColor: "rgb(16, 17, 67)" }}>
      <Row className="panel">
        {Object.keys(item).map((key, index) => {
          return (
            <Col xs={12} md={4} lg={4} key={index} className="px-5 d-flex align-items-center justify-content-start">
              <div className="py-2">
                {key} : {item[key]}
              </div>
            </Col>
          );
        })}
      </Row>
    </td>
  );
};

export default Panel;
