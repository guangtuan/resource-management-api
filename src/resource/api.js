const walk = require("./service");

module.exports = {
  base: "resource",
  apis: [
    {
      method: "post",
      url: "",
      handler: async (req, res) => {
        const body = req.body;
        console.log(`body is ${JSON.stringify(body)}`);
        return body.map((b) => walk(b));
      },
    },
  ],
};
