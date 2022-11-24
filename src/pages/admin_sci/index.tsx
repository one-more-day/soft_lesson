import { BreadHeader } from "../sci_info";
import { SciUser } from "./sci_user";

export const AdminSci = () => {
  return (
    <>
      <BreadHeader>科研管理员信息管理</BreadHeader>

      <div style={{ margin: "0 2rem" }}>
        <SciUser />
      </div>
    </>
  );
};
