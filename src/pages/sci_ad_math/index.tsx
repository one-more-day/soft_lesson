import styled from "@emotion/styled";
import { Card } from "antd";
import { BreadHeader } from "../sci_info";
import { ThetaChart, IntervalChart, TransposeChart } from "./chart";

export const SciChart = () => {
  return (
    <>
      <BreadHeader>信息统计</BreadHeader>
      <Container>
        <TopContainer>
          <Card style={{ height: 500, width: 700, marginRight: 20 }}>
            <ChartCon>
              <IntervalChart />
              <div>
                <span style={{ fontSize: 18 }}>教师科研项目申请数</span>
              </div>
            </ChartCon>
          </Card>
          <Card style={{ height: 500, width: 600 }}>
            <ChartCon>
              <ThetaChart />
              <div>
                <span style={{ fontSize: 18 }}>教师申请奖项信息统计</span>
              </div>
            </ChartCon>
          </Card>
        </TopContainer>
        <Card style={{ height: 500, width: 1300 }}>
          <ChartCon>
            <TransposeChart />
            <div>
              <span style={{ fontSize: 18 }}>各教师项目申请数</span>
            </div>
          </ChartCon>
        </Card>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
`;
const TopContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
`;
const ChartCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5px;
`;
