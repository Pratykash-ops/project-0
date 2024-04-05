import prisma from "../../../core/libs/prisma";
import authMiddleware from "../../../core/middleware/partnerAuth";

export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method == "GET") {
            const { pageno } = req.query
            const pageSize = 12;
            const pageNo = pageno? Number(pageno) : 1
            const data = await prisma.project.findMany({
                where: {
                    NOT : {
                        userId : {
                            equals : req.partner.uid
                        }
                    }
                },
                take: pageSize,
                skip: pageSize*(pageNo-1),
                select: {
                    title: true,
                    description: true,
                    budget: true,
                    categories: {
                        select: {
                            name: true
                        }
                    },
                    id: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                        }
                    },
                    ctx : true,
                }
            })
            res.json(data);
        }
    })
}