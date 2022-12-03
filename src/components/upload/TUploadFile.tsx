import { CheckSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";

export const TUploadFile = ({
  FileUrl,
  setFileUrl,
}: {
  FileUrl: string;
  setFileUrl: (url: string) => void;
}) => {
  const beforeUpload = (file: RcFile) => {
    const isDoc =
      file.name.split(".")[1] === "doc" || file.name.split(".")[1] === "docx";
    if (!isDoc) {
      message.error("You can only upload doc file!");
    }
    return isDoc;
  };
  return (
    <Upload
      name="avatar"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={({ file, data }) => {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("id", "teacher");
        fetch("http://localhost:8888/fileupload", {
          method: "POST",
          body: fd,
        }).then(async (res) => {
          console.log(await res.json());
          message.success("上传成功");
        });
      }}
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
