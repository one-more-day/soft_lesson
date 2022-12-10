import { Avatar, Button, Card, Divider, Form, Layout, List } from "antd";
import avatar from "@/assets/avatar.jpg";
import { useAuth } from "@/contexts/auth";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { UserEditModal } from "@/components/modal/userEditModal";
import TextArea from "antd/lib/input/TextArea";
import { useHttp } from "@/utils/http";
import { User } from "../login/login.type";
import { useMount } from "@/utils";
import { BaseList } from "@/components/list";
import { TeacAward } from "@/types";

export const UserScreen = () => {
  const http = useHttp();
  const [user, setUser] = useState<User | null>(null);
  const [teacAward, setTeacAward] = useState<TeacAward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: authUser } = useAuth();
  useMount(() => {
    http("demo/teacher/getTeacAward", {
      method: "GET",
      data: {
        tno: authUser?.id,
      },
    }).then(setTeacAward);
    setUser(authUser);
  });
  return (
    <OuterContainer>
      <Card
        style={{
          marginLeft: "1rem",
          width: user?.auth === 1 ? "55rem" : "80rem",
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
            <TextArea
              rows={2}
              placeholder={"简单记录自己"}
              value={user?.intro}
              disabled
            />
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
      {user?.auth === 1 ? (
        <Card
          style={{
            marginLeft: "1rem",
            width: "55rem",
          }}
          title={"个人奖项信息"}
          headStyle={{ fontSize: 20 }}
        >
          {teacAward ? (
            <>
              <h3>专利信息</h3>
              <BaseList
                props={teacAward.teacPatents}
                title={"patId"}
                name={"attached"}
              />
              <h3>软著信息</h3>
              <BaseList
                props={teacAward.teacSofts}
                title={"patId"}
                name={"softApply"}
              />
              <h3>论文信息</h3>
              <BaseList
                props={teacAward.teacPapers}
                title={"patId"}
                name={"thesis"}
              />
            </>
          ) : null}
        </Card>
      ) : null}
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  display: flex;
`;
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
