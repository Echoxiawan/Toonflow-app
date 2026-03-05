// @routes-hash dbd4a161b358380c8b1c03500e6aa55d
import { Express } from "express";

import route1 from "./routes/novel/addNovel";
import route2 from "./routes/novel/clearNovel";
import route3 from "./routes/novel/delNovel";
import route4 from "./routes/novel/getNovel";
import route5 from "./routes/novel/updateNovel";
import route6 from "./routes/other/clearDatabase";
import route7 from "./routes/other/deleteAllData";
import route8 from "./routes/other/getCaptcha";
import route9 from "./routes/other/login";
import route10 from "./routes/other/testAI";
import route11 from "./routes/other/testImage";
import route12 from "./routes/other/testVideo";
import route13 from "./routes/project/addProject";
import route14 from "./routes/project/delProject";
import route15 from "./routes/project/getProject";
import route16 from "./routes/project/getProjectCount";
import route17 from "./routes/project/getSingleProject";
import route18 from "./routes/project/updateProject";

export default async (app: Express) => {
  app.use("/novel/addNovel", route1);
  app.use("/novel/clearNovel", route2);
  app.use("/novel/delNovel", route3);
  app.use("/novel/getNovel", route4);
  app.use("/novel/updateNovel", route5);
  app.use("/other/clearDatabase", route6);
  app.use("/other/deleteAllData", route7);
  app.use("/other/getCaptcha", route8);
  app.use("/other/login", route9);
  app.use("/other/testAI", route10);
  app.use("/other/testImage", route11);
  app.use("/other/testVideo", route12);
  app.use("/project/addProject", route13);
  app.use("/project/delProject", route14);
  app.use("/project/getProject", route15);
  app.use("/project/getProjectCount", route16);
  app.use("/project/getSingleProject", route17);
  app.use("/project/updateProject", route18);
}
