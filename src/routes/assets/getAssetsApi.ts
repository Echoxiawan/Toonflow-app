import express from "express";
import u from "@/utils";
import { z } from "zod";
import { success } from "@/lib/responseFormat";
import { validateFields } from "@/middleware/middleware";
const router = express.Router();

// 获取资产
export default router.post("/",
    validateFields({
        projectId: z.number(),
        type: z.string(),
        name: z.string().optional(),
        page: z.number(),
        limit: z.number(),
    }),
    async (req, res) => {
        const { projectId, type, name, page = 1, limit = 10, } = req.body;
        const offset = (page - 1) * limit;
        let query = u.db("o_assets").select("*").where("projectId", projectId).andWhere("type", type);
        if (name) {
            query = query.andWhere("name", "like", `%${name}%`);
        }
        // 分页查询
        const parentAssets = await query.where("sonId", null).offset(offset).limit(limit);

        // 获取所有子资产供关联使用
        let childQuery = u.db("o_assets").select("*").where("projectId", projectId).andWhere("type", type).whereNotNull("sonId");
        if (name) {
            childQuery = childQuery.andWhere("name", "like", `%${name}%`);
        }
        const childAssets = await childQuery;

        // 为每个父资产添加子资产
        const result = parentAssets.map(parent => ({
            ...parent,
            sonAssets: childAssets.filter(child => child.sonId === parent.id)
        }));

        // 统计总数
        const totalQuery = (await u
            .db("o_assets")
            .where("projectId", projectId)
            .andWhere("type", type)
            .andWhere("sonId", null)
            .andWhere((qb) => {
                if (name) {
                    qb.andWhere("name", "like", `%${name}%`);
                }
            })
            .count("* as total")
            .first()) as any;
        res.status(200).send(success({ data: result, total: totalQuery?.total }));
    });
