import prisma from "../../../core/libs/prisma";
import authMiddleware from "../../../core/middleware/authenticate";

export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method == "POST") {
            const { title, desc, categoryIds, budget="100" } = req.body;
            if(!title || !desc || typeof categoryIds != "object" || !budget){
                return res.status(400).json({msg : "Invalid request something is missing"})
            }
            const newPost = await prisma.project.create({
                data : {
                    budget: Number(budget),
                    description: desc,
                    title,
                    categories: {
                        connect : categoryIds.map(v=>({id: v}))
                    },
                    // isPrivate: false,
                    user: {
                        connect: {
                            id : req.user.id
                        }
                    }
                }
            })
            // await prisma.project.update({
            //     where : {
            //         id: newPost.id
            //     },
            //     data : {
            //         categories : {
            //             connect: categoryIds
            //         }
            //     }
            // })
            res.json(newPost);
        }
    })
}