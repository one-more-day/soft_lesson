import styled from "@emotion/styled";
import { SciInfoTable } from "./table";
export const BreadHeader = styled.h1`
  margin: 1rem 1rem;
`;
export const SciInfo = () => {
  return (
    <>
      <BreadHeader>科研项目信息</BreadHeader>
      <div style={{ margin: "0 2rem" }}>
        <SciInfoTable />
      </div>
    </>
  );
};
