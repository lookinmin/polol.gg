const port = 3002;
const server = require("../server/server");

server.listen(port, () => {
  console.log(`listening on port ${port}`)
});