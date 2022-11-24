import { BreadHeader } from "../sci_info";
import { SciApplyTable } from "./table";

export const SciApply = () => {
  return (
    <>
      <BreadHeader>科研申请信息</BreadHeader>
      <div style={{ margin: "0 2rem" }}>
        <SciApplyTable />
      </div>
    </>
  );
};
