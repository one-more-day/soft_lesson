import { Button, List } from "antd";
import { ReactElement } from "react";

export const BaseList = <T,>({
  props,
  title,
  name,
}: {
  props: T[];
  title: string;
  name: string;
}) => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={props}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item[title as keyof T] as string}
              description={item[name as keyof T] as string}
            />
          </List.Item>
        )}
      />
    </>
  );
};
