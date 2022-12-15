import { BreadHeader } from "../sci_info";
import { SciExamTable } from "./table";

export const SciExam = () => {
  return (
    <>
      <BreadHeader>项目信息审批</BreadHeader>
      <div style={{ margin: "0 2rem" }}>
        <SciExamTable />
      </div>
    </>
  );
};
