import styled from "@emotion/styled";
import { Button } from "antd";
import { BreadHeader } from "../sci_info";
import { SciPublishTable } from "./table";

export const SciPublish = () => {
  return (
    <>
      <BreadHeader>科研项目信息</BreadHeader>
      
      <div style={{ margin: "0 2rem" }}>
        <SciPublishTable />
      </div>
    </>
  );
};
