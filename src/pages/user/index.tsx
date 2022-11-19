import { Avatar, Button, Card, Divider, Layout } from "antd";
import avatar from "@/assets/avatar.jpg";
import { useAuth } from "@/contexts/auth";
import styled from "@emotion/styled";
export const UserScreen = () => {
  const { user } = useAuth();
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
            <span style={{ display: "inline-block", marginRight: "20px" }}>
              姓名:
            </span>
            <span>{user?.name}</span>
          </IntroCon>

          <IntroCon>
            <span style={{ display: "inline-block", marginRight: "20px" }}>
              职业:
            </span>
            <span>
              {user?.auth === 1
                ? "教师"
                : user?.auth === 2
                ? "科研管理员"
                : "管理员"}
            </span>
          </IntroCon>
          <IntroCon>
            <span style={{ display: "inline-block", marginRight: "20px" }}>
              学校:
            </span>
            <span>河北工业大学</span>
          </IntroCon>
          <IntroCon>
            <span style={{ display: "inline-block", marginRight: "20px" }}>
              联系电话:
            </span>
            <span>{user?.tele}</span>
          </IntroCon>
        </Container>
        <Divider />
        <Button type="primary">编辑资料</Button>
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
`;
const AvatarCon = styled.div`
  width: 40rem;
  text-align: center;
  margin-bottom: 3rem;
`;
const IntroCon = styled.div`
  width: 20rem;
`;
