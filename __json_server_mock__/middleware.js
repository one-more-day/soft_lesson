module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (
      req.body.username === "jack" &&
      req.body.password === "jack" &&
      req.body.identity === "teacher"
    ) {
      return res.status(200).json({
        user: {
          id: "1",
          token: "teacher",
          name: "jack",
          school: "河北工业大学",
          tele: "13456709876",
          email: "1234598769@qq.com",
          academy: "土木工程",
          auth: 1,
        },
      });
    } else if (
      req.body.username === "sci" &&
      req.body.password === "sci" &&
      req.body.identity === "sciAdmin"
    )
      return res.status(200).json({
        user: {
          name: "sci",
          token: "sciadmin",
          auth: 2,
        },
      });
    else if (
      req.body.username === "admin" &&
      req.body.password === "admin" &&
      req.body.identity === "admin"
    ) {
      return res.status(200).json({
        user: {
          name: "admin",
          token: "admin",
          auth: 3,
        },
      });
    } else return res.status(400).json({ message: "输入信息有误" });
  }
  next();
};
