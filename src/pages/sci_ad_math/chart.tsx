import { ApplyProjectType, ProjectType } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { Chart } from "@antv/g2";
import { useRef, useState } from "react";
import { User } from "../login/login.type";

export const IntervalChart = () => {
  const applyUser = useRef<Map<number, User>>(new Map());
  const applyProject = useRef<Map<number, ProjectType>>(new Map());
  const http = useHttp();
  const getAllTeacher = async () => {
    const user = await http("demo/teacher/getAllteacher");
    user.map((item: User) => {
      applyUser.current.set(Number(item.tno), item);
    });
  };
  const getAllProject = async () => {
    const pro = await http("demo/sciInfo/getAllSciInfo");
    pro.map((item: ProjectType) => {
      applyProject.current.set(Number(item.sciNo), item);
    });
  };
  const intervalChart = useRef(null);
  const getData = async () => {
    const user = await getAllTeacher();
    const pro = await getAllProject();
    const res = await http("demo/projectApply/getAllProjectApply");
    const applyNumber = new Map();
    res.map((item: ApplyProjectType) => {
      if (applyNumber.has(item.sciNo)) {
        applyNumber.set(item.sciNo, applyNumber.get(item.sciNo) + 1);
      } else {
        applyNumber.set(item.sciNo, 1);
      }
    });
    const data = [];
    for (const item of applyNumber.entries()) {
      data.push({
        project: applyProject.current.get(item[0])?.projectname,
        num: item[1],
      });
    }
    return data;
  };

  useMount(() => {
    getData().then((data) => {
      if (!intervalChart) return;
      const chart = new Chart({
        container: intervalChart.current!,
        height: 370,
        width: 600,
      });
      // 声明可视化
      chart
        .interval() // 创建一个 Interval 标记
        .data(data) // 绑定数据
        .encode("x", "project") // 编码 x 通道
        .encode("y", "num") // 编码 y 通道
        .axis("x", { title: "项目", labelStroke: "#878784" })
        .axis("y", { title: "教师申请数", labelStroke: "#878784" })
        .animate("updateDuration", 300); // 指定更新动画的时间

      // 渲染可视化
      chart.render();
    });
  });

  return <div ref={intervalChart}></div>;
};
export const ThetaChart = () => {
  const thetaChart = useRef(null);
  const ThetaData = useState();
  const http = useHttp();
  const getData = async () => {
    const res = await http("demo/teacher/getAllTeacAward");
    return [
      {
        id: "专利",
        value: res.data.teacPatents.length,
      },
      {
        id: "软著",
        value: res.data.teacSofts.length,
      },
      {
        id: "论文",
        value: res.data.teacPapers.length,
      },
    ];
  };
  useMount(() => {
    getData().then((data) => {
      if (!thetaChart) return;
      const chart = new Chart({
        container: thetaChart.current!,
        height: 370,
        width: 400,
        paddingLeft: 50,
      });
      chart.coordinate({ type: "theta", innerRadius: 0.25, outerRadius: 0.8 });
      chart
        .interval() // 创建一个 Interval 标记
        .data(data) // 绑定数据
        .transform({ type: "stackY" })
        .encode("y", "value")
        .encode("color", "id")
        .scale("color", {
          range: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"],
        })
        .label({
          text: "value",
          fontWeight: "bold",
          offset: 14,
        })
        .label({
          text: "id",
          position: "outside",
          fontWeight: "bold",
          textBaseline: "bottom",
          textAlign: (d: any) =>
            ["c", "sass"].includes(d.id) ? "end" : "start",
          dy: -4,
          connectorDistance: 0,
          transform: [{ type: "spider" }],
        })
        .style("radius", 4)
        .style("stroke", "#fff")
        .style("lineWidth", 2)
        .legend(false);

      // 渲染可视化
      chart.render();
    });
  });

  return <div ref={thetaChart}></div>;
};
export const TransposeChart = () => {
  const transposeChart = useRef(null);
  const applyUser = useRef<Map<number, User>>(new Map());
  const applyProject = useRef<Map<number, ProjectType>>(new Map());
  const http = useHttp();
  const getAllTeacher = async () => {
    const user = await http("demo/teacher/getAllteacher");
    user.map((item: User) => {
      applyUser.current.set(Number(item.tno), item);
    });
  };
  const getAllProject = async () => {
    const pro = await http("demo/sciInfo/getAllSciInfo");
    pro.map((item: ProjectType) => {
      applyProject.current.set(Number(item.sciNo), item);
    });
  };
  const getData = async () => {
    const user = await getAllTeacher();
    const pro = await getAllProject();
    const res = await http("demo/projectApply/getAllProjectApply");
    const applyNumber = new Map();
    res.map((item: ApplyProjectType) => {
      if (applyNumber.has(item.tno)) {
        applyNumber.set(item.tno, applyNumber.get(item.tno) + 1);
      } else {
        applyNumber.set(item.tno, 1);
      }
    });
    const data = [];
    for (const item of applyNumber.entries()) {
      data.push({
        teacher: applyUser.current.get(item[0])?.username,
        num: item[1],
      });
    }
    return data;
  };

  useMount(() => {
    getData().then((data) => {
      if (!transposeChart) return;
      const chart = new Chart({
        container: transposeChart.current!,
        height: 370,
        width: 1200,
      });
      chart.coordinate({ type: "transpose" });
      chart
        .interval()
        .data(data)
        .transform({ type: "sortX", reverse: true })
        .encode("x", "teacher")
        .encode("y", "num")
        .axis("y", { title: "数目", labelStroke: "#878784" })
        .axis("x", { title: "教师", labelStroke: "#878784" })
        .label({
          text: "num",
          textAnchor: "right",
          fill: "#000",
          dx: "-5px",
        });
      chart.render();
    });
  });

  return <div ref={transposeChart}></div>;
};
