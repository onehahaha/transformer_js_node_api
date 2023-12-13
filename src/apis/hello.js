const sendHello = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send({
    data: "hello world22222",
  });
};

export default sendHello
