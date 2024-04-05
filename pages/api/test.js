import { auth } from "../../libs/pps.module"

export default async function handler(req, res) {
    if (req.method == "GET") {
        const { admn_no } = req.query
        const verify = await auth(admn_no)
        res.json(verify);
    }
}