import prisma from "../../../core/libs/prisma";
import authMiddleware from "../../../core/middleware/authenticate";

export default async function handler(req, res) {
    authMiddleware(req, res, async () => {
        if (req.method == "GET") {
            const { admn_no } = req.query
            const data = await prisma.user.findFirst({
                where: {
                    id: req.user.id
                },
                select: {
                    name: true,
                    academicDetails: true,
                    email: true,
                    institution: {
                        select: {
                            name: true,
                            img: true,
                        }
                    },
                    // partner: {
                    //     select: {
                    //         projects: {
                    //             take: 8,
                    //             select: {
                    //                 assigned: {
                    //                     select: {
                    //                         user: {
                    //                             select: {
                    //                                 name: true
                    //                             }
                    //                         }
                    //                     }
                    //                 },
                    //                 bids: {
                    //                     select: {

                    //                     }
                    //                 }
                    //             }
                    //         },
                    //         // bids: {
                    //         //     take: 5,
                    //         //     select: {
                    //         //         price: true,
                    //         //         project: {
                    //         //             select: {
                    //         //                 title: true,
                    //         //                 description: true,
                    //         //                 assigned: {
                    //         //                     select: {
                    //         //                         user: {
                    //         //                             select: {
                    //         //                                 name: true
                    //         //                             }
                    //         //                         }
                    //         //                     }
                    //         //                 },
                    //         //                 budget: true,
                    //         //             }
                    //         //         },

                    //         //     }
                    //         // }
                    //     }
                    // },
                    posts: {
                        select: {
                            id: true,
                            title: true,
                            budget: true,
                            description: true,
                            createdAt: true,
                            categories: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }

                }
            })
            const partner = await prisma.partner.findUnique({
                where: {
                    uid: req.user.id
                },
                select: {
                    bids: {
                        take: 6
                    },
                    projects: {
                        take: 6,
                        select: {
                            title: true,
                            description: true,
                            createdAt: true,
                            budget: true,
                            deal: true,
                            status : true,
                            user: {
                                select: {
                                    name: true,
                                    academicDetails: {
                                        select: {
                                            class: true,
                                            section: true,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    _count: {
                        select : {
                            projects :{
                                where: {
                                    status: "working"
                                }
                            }
                        }
                    }

                }
            })
            res.json({...data, partner});
        }
    })
}