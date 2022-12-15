import { BreadHeader } from "../sci_info";
import { SciAwardExamTable } from "./table";

export const SciInfoExam = () => {
  return (
    <>
      <BreadHeader>科研信息审批</BreadHeader>
      <div style={{ margin: "0 2rem" }}>
        <SciAwardExamTable />
      </div>
    </>
  );
};
