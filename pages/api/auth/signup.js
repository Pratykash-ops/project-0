import prisma from "../../../core/libs/prisma";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export default async function handler(req, res) {
    if (req.method == "POST") {
        const { token, InstCode, name } = req.body
        try {
        const verify = jwt.verify(token, process.env.JWT_SIGNATURE);
            const isAlreadyExisted = await prisma.user.findFirst({
                where : {
                    authenticationMethod : {
                        addmissionNumber : verify.admn_no
                    },
                    institution : {
                        code : Number(verify.code)
                    }
                }
            })
            if(isAlreadyExisted){
                const sessionToken = jwt.sign({
                    id: isAlreadyExisted.id,
                    InstCode: verify.code,
                    signedAt: new Date().getTime()
                }, process.env.JWT_SIGNATURE)
                res.setHeader('set-cookie', `token=${sessionToken}; Max-Age=${60*60*24*365}; path=/`)
                return res.json({
                    sessionToken,
                    username: isAlreadyExisted.name,
                    next: "/"
                })
            }
            if (verify.verified) {
                const hashedPassword = bcrypt.hashSync(verify.admn_no, 12)
                const user = await prisma.user.create({
                    data: {
                        name: name,
                        password: hashedPassword,
                        authenticationMethod: {
                            addmissionNumber: verify.admn_no
                        },
                        academicDetails: {

                        },
                        institution: {
                            connect: {
                                code: Number(verify.code)
                            }
                        }
                    }
                })
                if (user) {
                    const sessionToken = jwt.sign({
                        id: user.id,
                        InstCode: verify.code,
                        signedAt: new Date().getTime()
                    }, process.env.JWT_SIGNATURE)
                    res.setHeader('set-cookie', `token=${sessionToken}; Max-Age=${60*60*24*365}; path=/`)
                    res.json({
                        sessionToken,
                        username: user.name,
                        next: "/"
                    })
                }
            }
        }
        catch {

            res.json({
                msg: "Something went wrong"
            });
        }
    }
}