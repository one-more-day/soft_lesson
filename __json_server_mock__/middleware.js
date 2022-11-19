module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (
      req.body.username === "jack" &&
      req.body.password === "jack" &&
      req.body.identity === "teacher"
    ) {
      return res.status(200).json({
        user: {
          token: "123",
          auth: 1,
        },
      });
    } else {
      return res.status(400).json({ message: "输入信息有误" });
    }
  }
  next();
};
