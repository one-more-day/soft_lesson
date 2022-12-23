import {
  CheckOutlined,
  CheckSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { useState } from "react";

export const TUploadFile = ({
  FileList,
  FileUrl,
  setFileUrl,
  setFileList,
}: {
  FileList?: RcFile[];
  FileUrl?: string;
  setFileUrl?: (url: string) => void;
  setFileList: (file: (pre: RcFile[]) => RcFile[]) => void;
}) => {
  const beforeUpload = (file: RcFile) => {
    const isDoc =
      file.name.split(".")[1] === "doc" || file.name.split(".")[1] === "docx";
    if (!isDoc) {
      message.error("您只能上传word文档!");
      return false;
    }
    setFileList((pre) => [file, ...pre]);
    return false;
  };
  return (
    <Upload
      name="avatar"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      <div style={{ display: "flex" }}>
        <Button
          icon={<UploadOutlined style={{ color: "blue", fontSize: 20 }} />}
        >
          上传附件
        </Button>
        {FileList?.length !== 0 ? (
          <>
            <div style={{ display: "flex", marginTop: 5, marginLeft: 5 }}>
              <CheckSquareOutlined style={{ color: "green", fontSize: 25 }} />
              <div>
                <span
                  style={{
                    color: "green",
                    display: "block",
                    width: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {FileList ? FileList[0].name : ""}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Upload>
  );
};
