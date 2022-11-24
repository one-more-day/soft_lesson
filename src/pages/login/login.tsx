import { useAuth } from "@/contexts/auth";
import { useAsync } from "@/utils/useAsync";
import styled from "@emotion/styled";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
export const LongButton = styled(Button)`
  width: 100%;
`;
export const LoginSreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { run, isLoading } = useAsync();
  const handleSubmit = (values: {
    username: string;
    password: string;
    identity: string;
  }) => {
    console.log(values);

    run(
      login(values)
        .then(() => {
          message.success("登陆成功");
          navigate("/");
        })
        .catch((e) => {
          message.error(e.message);
        })
    );
  };
  return (
    <Form labelCol={{ span: 7 }} onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        <Input placeholder="用户名" type="text" id="username"></Input>
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
      >
        <Input placeholder="密码" type="password" id="password"></Input>
      </Form.Item>
      <Form.Item name={"identity"} label="身份">
        <Select
          style={{ width: " 100% " }}
          options={[
            { label: "请选择", value: "" },
            {
              label: "教师",
              value: "teacher",
            },
            {
              label: "科研管理员",
              value: "sciAdmin",
            },
            {
              label: "管理员",
              value: "admin",
            },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
