import { useMount } from "@/utils";
import { Button, message, Result } from "antd";
import { useEffect } from "react";
import { Navigate, NavigateProps, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          回到首页
        </Button>
      }
    />
  );
};

export const RedirectTo = ({ to, replace, ...rest }: NavigateProps) => {
  useMount(() => {
    message.warning("请先登录");
  });
  return <Navigate to={to} replace={replace} />;
};

