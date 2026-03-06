import express from "express";
import u from "@/utils";
import { z } from "zod";
import { success } from "@/lib/responseFormat";
import { validateFields } from "@/middleware/middleware";
import { id } from "zod/locales";
const router = express.Router();

// 更新资产
export default router.post(
    "/",
    validateFields({
        id: z.number(),
    }),
    async (req, res) => {
        const { id } = req.body;
        await u.db("o_assets").where({ id }).delete();
        res.status(200).send(success({ message: "删除资产成功" }));
    },
);
