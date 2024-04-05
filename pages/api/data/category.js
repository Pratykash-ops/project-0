import prisma from "../../../core/libs/prisma";
import authMiddleware from "../../../core/middleware/authenticate";

export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method == "GET") {
            const { query } = req.query
            const data = await prisma.category.findMany({
                take : 8,
                where : {
                    name : {
                        contains : query,
                        mode : "insensitive"
                    }
                }
            })
            res.json(data);
        }
    })
}