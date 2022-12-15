import styled from "@emotion/styled";
import { Input } from "antd";

export const SearchPanle = ({ onEnter }: { onEnter: (e: any) => void }) => {
  return (
    <SearchCon>
      <div style={{ width: 50, height: 30, paddingTop: 3 }}>
        <span>搜索:</span>
      </div>
      <InputCon>
        <Input placeholder="按回车搜索" onPressEnter={onEnter} />
      </InputCon>
      <div style={{ height: 30, paddingTop: 3, marginLeft: 10 }}>
        <span style={{ fontSize: 13 }}>(ps:输入空串搜索所有)</span>
      </div>
    </SearchCon>
  );
};
const SearchCon = styled.div`
  display: flex;
  height: 30px;
  width: 60rem;
`;
const InputCon = styled.div`
  width: 25rem;
  margin-left: 0.5rem;
`;
