import express from "express";
import u from "@/utils";
import { z } from "zod";
import { success } from "@/lib/responseFormat";
import { validateFields } from "@/middleware/middleware";
const router = express.Router();

// 清洗小说原文
export default router.post(
  "/",
  validateFields({
    projectId: z.number(),
    windowSize: z.number().optional().default(5), // 每组数量 默认5
    overlap: z.number().optional().default(1), // 交叠数量 默认1
  }),
  async (req, res) => {
    const { projectId, windowSize, overlap } = req.body;
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const novel = new u.cleanNovel(windowSize, overlap);
    const { emitter } = novel;

    const itemPromises: any = [];

    //单次调用完成
    emitter.on("item", (data) => {
      console.log("%c Line:21 🍧 data", "background:#33a5ff", data);
    //   itemPromises.push(
    //     (async () => {
    //       for (const item of data.character) {
    //         await upsertCharacter(item, projectId);
    //       }
    //       for (const item of data.event) {
    //         await upsertEvent(item, projectId);
    //       }
    //       data.total = total;
    //       res.write(JSON.stringify(data) + "\n");
    //     })(),
    //   );
    });
    //调用完成
    emitter.on("data", async (data) => {
      await Promise.all(itemPromises);
      res.end();
    });
    const allChapters = await u.db("o_novel").where("projectId", projectId);

    await novel.start(allChapters);
  },
);
