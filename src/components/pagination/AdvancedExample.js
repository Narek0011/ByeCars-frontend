import Pagination from "react-bootstrap/Pagination";
import React from "react";

function AdvancedExample() {
  return (
    <Pagination style={{margin:0}}>
      <Pagination.Item style={{marginLeft:10}}>{1}</Pagination.Item>
      <Pagination.Item style={{marginLeft:10}}>{2}</Pagination.Item>
      <Pagination.Item style={{marginLeft:10}}>{3}</Pagination.Item>
      <Pagination.Item style={{marginLeft:10}}>{4}</Pagination.Item>
      <Pagination.Ellipsis style={{marginLeft:10}}/>
      <Pagination.Item style={{marginLeft:10}}>{22}</Pagination.Item>
    </Pagination>
  );
}
export default AdvancedExample