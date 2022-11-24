import { BreadHeader } from "@/pages/sci_info";
import styled from "@emotion/styled";
import { Paper } from "./Paper";
import { Patent } from "./Patent";
import { Soft } from "./Soft";
export const CardCon = styled.div`
  display: flex;
  justify-content: center;
`;
export const PatentUpload = () => {
  return (
    <div>
      <BreadHeader>专利上传</BreadHeader>
      <Patent />
    </div>
  );
};
export const SoftUpload = () => {
  return (
    <div>
      <BreadHeader>软著上传</BreadHeader>
      <Soft />
    </div>
  );
};
export const PaperUpload = () => {
  return (
    <div>
      <BreadHeader>论文上传</BreadHeader>
      <Paper />
    </div>
  );
};
