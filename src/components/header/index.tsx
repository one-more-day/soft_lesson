import styled from "@emotion/styled";
import { Row } from "@/components/lib";
import logo from "@/assets/logo.svg";
import avatar from "@/assets/avatar.jpg";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { useAuth } from "@/contexts/auth";
export const PageHeader = () => {
  const { logout } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Button type="link" onClick={logout}>
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
            <Avatar size={"default"} icon={<Logo src={avatar} />} />
            <span>Admin</span>
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
  width: 9rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: mediumpurple; */
  & span {
    color: #6e6d6d;
  }
`;
