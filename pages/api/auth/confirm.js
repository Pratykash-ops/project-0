import jwt from "jsonwebtoken";
import prisma from "../../../core/libs/prisma";
import auth  from "../../../libs/auth.module"
export default async function handler(req, res) {
    if(req.method=="POST"){
        const { admn_no, InstCode } = req.body
        const findInst = await prisma.institution.findUnique({
            where : {
                code : Number(InstCode)
            }
        })
        if(!findInst){
            return res.status(400).json({
                msg : "Bad request",
                message : "Bhai Database me is iNst Code ke corressponding kuch nahi ha"
            })
        }
        try {
            const verify = await auth(findInst.institutionNm, {admn_no})
            if(verify.verified){
                const token = jwt.sign({
                    admn_no,
                    code : InstCode,
                    ...verify,
                }, process.env.JWT_SIGNATURE)
                res.json({data: verify, token});
            }
            else{
                return res.status(400).json({
                    msg : "invalid admission no./ Credentials",
                    message : "Bhai Database me is iNst Code ke corressponding kuch nahi ha"
                })
            }
        } catch (error) {
            return res.status(500).json({
                msg : "No authentication module found"
            })
        }
    }
}