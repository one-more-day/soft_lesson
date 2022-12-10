import { CheckSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { useState } from "react";

export const TUploadFile = ({
  FileUrl,
  setFileUrl,
  setFileList,
}: {
  FileUrl?: string;
  setFileUrl?: (url: string) => void;
  setFileList: (file: (pre: RcFile[]) => RcFile[]) => void;
}) => {
  const beforeUpload = (file: RcFile) => {
    const isDoc =
      file.name.split(".")[1] === "doc" || file.name.split(".")[1] === "docx";
    if (!isDoc) {
      message.error("You can only upload doc file!");
    }
    setFileList((pre) => [...pre, file]);
    return false;
  };
  return (
    <Upload
      name="avatar"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      {FileUrl ? (
        <img src={FileUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        <Button
          icon={<UploadOutlined style={{ color: "blue", fontSize: 20 }} />}
        >
          上传附件
        </Button>
      )}
    </Upload>
  );
};
