import { Avatar, Button, Card, Divider, Form, Layout } from "antd";
import avatar from "@/assets/avatar.jpg";
import { useAuth } from "@/contexts/auth";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { UserEditModal } from "@/components/modal/userEditModal";
import TextArea from "antd/lib/input/TextArea";
import { useHttp } from "@/utils/http";
import { User } from "../login/login.type";
export const UserScreen = () => {
  const http = useHttp();
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: authUser } = useAuth();
  useEffect(() => {
    setUser(authUser);
  });
  return (
    <Card
      style={{
        marginLeft: "1rem",
        width: "80rem",
      }}
      title={"基本信息"}
      headStyle={{ fontSize: 25 }}
    >
      <CardCon>
        <AvatarCon>
          <Avatar src={avatar} size={70} />
        </AvatarCon>
        <Container>
          <IntroCon>
            <IntroSpan>姓名:</IntroSpan>
            <span>{user?.name}</span>
          </IntroCon>
          <IntroCon>
            <IntroSpan>职业:</IntroSpan>
            <span>
              {user?.auth === 1
                ? "教师"
                : user?.auth === 2
                ? "科研管理员"
                : "管理员"}
            </span>
          </IntroCon>
          <IntroCon>
            <IntroSpan>学校:</IntroSpan>
            <span>{user?.school}</span>
          </IntroCon>
          <IntroCon>
            <IntroSpan>学院:</IntroSpan>
            <span>{user?.academy}</span>
          </IntroCon>
          <IntroCon>
            <IntroSpan>邮箱:</IntroSpan>
            <span>{user?.email}</span>
          </IntroCon>
          <IntroCon>
            <IntroSpan>联系电话:</IntroSpan>
            <span>{user?.tele}</span>
          </IntroCon>
        </Container>
        <Divider />
        <Form.Item style={{ width: "50rem" }} label="个人简介">
          <TextArea rows={2} placeholder={"简单记录自己"} value={user?.intro} />
        </Form.Item>
        <Divider />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          编辑资料
        </Button>
        <UserEditModal
          setUser={(user) => setUser(user)}
          user={user}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </CardCon>
    </Card>
  );
};
const CardCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10rem;
`;
const AvatarCon = styled.div`
  width: 40rem;
  text-align: center;
  margin-bottom: 3rem;
`;
const IntroCon = styled.div`
  width: 25rem;
`;
const IntroSpan = styled.span`
  margin-right: 3rem;
`;
