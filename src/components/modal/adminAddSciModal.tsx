import { useAuth } from "@/contexts/auth";
import { User } from "@/pages/login/login.type";
import { useHttp } from "@/utils/http";
import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import { ModalButton } from "../lib";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  retry: () => void;
}
export const AdminAddSciModal = (props: Iprops) => {
  const { setIsModalOpen, isModalOpen, retry } = props;
  const http = useHttp();
  const onFinish = async (values: User) => {
    console.log(values);
    http("demo/sciManager/addSciManager", {
      method: "POST",
      data: { ...values },
    }).then((res) => {
      retry();
      message.success("添加成功");
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="添加信息"
        open={isModalOpen}
        width={600}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item name="realname" label="真实姓名">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Select>
              <Select.Option value={0}>男</Select.Option>
              <Select.Option value={1}>女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="username" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input />
          </Form.Item>
          <Form.Item name="telephone" label="联系电话">
            <Input />
          </Form.Item>
          <Divider />
          <ModalButton>
            <Button
              type="primary"
              style={{ marginRight: "2rem" }}
              htmlType="submit"
            >
              确定
            </Button>
            <Button
              style={{ marginRight: "2rem" }}
              onClick={() => setIsModalOpen(false)}
            >
              取消
            </Button>
          </ModalButton>
        </Form>
      </Modal>
    </>
  );
};
