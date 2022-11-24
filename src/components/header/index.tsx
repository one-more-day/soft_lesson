import styled from "@emotion/styled";
import { Row } from "@/components/lib";
import logo from "@/assets/logo.svg";
import avatar from "@/assets/avatar.jpg";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
export const PageHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Button
          type="link"
          onClick={() => {
            logout();
            navigate("login");
          }}
        >
          登出
        </Button>
      ),
    },
  ];
  return (
    <Header between marginBottom={0.1}>
      <HeaderLeft gap={7}>
        <LogoCon>
          <Logo src={logo} />
        </LogoCon>
        <Title>科研申报管理系统</Title>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <AvatarCon>
            <Avatar
              style={{ margin: "1rem" }}
              size={"default"}
              icon={<img src={avatar} />}
            />
            <span>{user?.name}</span>
          </AvatarCon>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const LogoCon = styled.div`
  height: 6rem;
`;
const Logo = styled.img`
  height: 6rem;
`;
const Header = styled(Row)`
  height: 6rem;
  padding-left: 5rem;
  padding-right: 7rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const Title = styled.div`
  font-size: 2.2rem;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const AvatarCon = styled.div`
  height: 6rem;
  /* width: 10rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: mediumpurple; */
  & span {
    color: #6e6d6d;
  }
`;
