import { Button, Card, Divider, message } from "antd";
import { useEffect, useState } from "react";
import { LoginSreen } from "./login";
import { RegisterSreen } from "./register";
import styled from "@emotion/styled";
import logo from "@/assets/logo.svg";
import left from "@/assets/left.webp";
import right from "@/assets/right.webp";
export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "JIRA注册" : "科研申报管理系统"}</Title>
        {isRegister ? <RegisterSreen /> : <LoginSreen />}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了?直接登录" : "没有账号?注册新账号"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
`;
const ShadowCard = styled(Card)`
  width: 43rem;
  min-height: 50rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Header = styled.div`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  width: 100%;
  background-size: 16rem;
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left center, right center;
  background-size: 67rem, 67rem;
  background-image: url(${left}), url(${right});
`;
const Title = styled.h2`
  font-family: "Ma Shan Zheng", cursive;
  margin-bottom: 2.4rem;
  color: rgb(16, 76, 161);
`;
