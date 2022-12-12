import { User } from "@/pages/login/login.type";
import { ProjectType } from "@/types";
import { Button, Dropdown, Space } from "antd";

export const More = ({
  project,
  onDelete,
}: {
  project: ProjectType | User;
  onDelete: (e: any, project: ProjectType | User) => void;
}) => {
  const items = [
    {
      label: (
        <Button
          style={{ fontSize: "1.4rem" }}
          type="link"
          onClick={(e) => onDelete(e, project)}
        >
          删除
        </Button>
      ),
      key: "1",
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button type="text">
        <Space>...</Space>
      </Button>
    </Dropdown>
  );
};
