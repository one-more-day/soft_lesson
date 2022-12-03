import { Button, List } from "antd";

export const BaseList = <T extends { title?: string; name: string }>({
  props,
}: {
  props: T[];
}) => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={props}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a type="link">
                  {item.title ? item.title : item.name}
                </a>
              }
              description={item.name}
            />
          </List.Item>
        )}
      />
    </>
  );
};
