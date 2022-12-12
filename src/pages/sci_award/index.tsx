import { BreadHeader } from "../sci_info";
import { SciAwardTable } from "./table";

export const SciAward = () => {
  return (
    <>
      <BreadHeader>个人奖项信息</BreadHeader>
      <div style={{ margin: "0 2rem" }}>
        <SciAwardTable />
      </div>
    </>
  );
};
