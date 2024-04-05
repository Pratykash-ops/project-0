import prisma from "../../../core/libs/prisma";

export default async function handler(req, res) {
    if (req.method == "GET") {
        const query = req.query.q
        const data = await prisma.institution.findMany({
            where: {
                institutionNm: query,
                name: query
            },
            take: 12,
            select: {
                code: true,
                _count: {
                    select: {
                        user: true
                    }
                },
                img: true,
                institutionNm: true,
                name: true
            }
        })
        res.json({ data })
    }
}
