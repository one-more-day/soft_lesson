import { LoginUrl } from "@/global";
import { User } from "@/pages/login/login.type";
import { useHttp } from "@/utils/http";
import styled from "@emotion/styled";
import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ModalButton } from "../lib";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  user: User | null;
  setUser: (user: User) => void;
}
export const UserEditModal = (props: Iprops) => {
  const { user, setIsModalOpen, isModalOpen, setUser } = props;
  const onFinish = async (values: User) => {
    // const res = await fetch(`${LoginUrl}/users/${user?.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...user, ...values }),
    // });
    setUser({ ...user, ...values });
    setIsModalOpen(false);
    message.success("修改成功");
  };

  return (
    <>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="修改个人信息"
        open={isModalOpen}
        width={600}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          initialValues={{ ...user, email: "2728103295@qq.com" }}
        >
          <Form.Item
            name="username"
            label="姓名"
            rules={[
              {
                required: true,
                message: "姓名不能为空",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="academy" label="学院">
            <Select>
              <Select.Option value="人工智能与数据科学">
                人工智能与数据科学
              </Select.Option>
              <Select.Option value="土木工程">土木工程</Select.Option>
              <Select.Option value="马克思主义">马克思主义</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input />
          </Form.Item>
          <Form.Item
            name="telephone"
            label="联系电话"
            rules={[
              {
                required: false,
                pattern: new RegExp(
                  /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
                ),
                message: "请输入正确的手机号",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="intro" label="个人简介">
            <TextArea rows={2} placeholder={"简单记录自己"} />
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
