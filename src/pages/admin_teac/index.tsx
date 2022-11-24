import { BreadHeader } from "../sci_info";
import { TeacUser } from "./teac_user";

export const AdminTeac = () => {
  return (
    <>
      <BreadHeader>教师信息管理</BreadHeader>

      <div style={{ margin: "0 2rem" }}>
        <TeacUser />
      </div>
    </>
  );
};
