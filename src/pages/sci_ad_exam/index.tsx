import { BreadHeader } from "../sci_info";
import { SciExamTable } from "./table";

export const SciExam = () => {
  return (
    <>
      <BreadHeader>科研审批信息</BreadHeader>
      <div style={{ margin: "0 2rem" }}>
        <SciExamTable />
      </div>
    </>
  );
};
