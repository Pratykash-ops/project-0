import jwt from "jsonwebtoken";
import prisma from "../../../core/libs/prisma";
import auth from "../../../core/middleware/authenticate"
export default async function handler(req, res) {
    auth(req, res, async () => {
        if (req.method == "POST") {
            const { termsAccepted = false } = req.query
            try {
                if (termsAccepted) {
                    const alreadyExists = await prisma.partner.findUnique({
                        where : {
                            uid : req.user.id
                        },
                    })
                    if(alreadyExists){
                        return res.status(400).json({msg : "You already joined the place, please reload the page to see changes"})
                    }
                    else{
                        await prisma.user.update({
                            where : {
                                id : req.user.id
                            },
                            data : {
                                partner : {
                                    create: {
                                        
                                    }
                                }
                            }
                        })
                        return res.json({msg : "account created successfully please reload the page to see changes", })
                    }
                }else{
                    return res.status(400).send({msg : "please accept the terms and conditions first"})
                }
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    msg: "No authentication module found",
                    
                })
            }
        }
    })
}