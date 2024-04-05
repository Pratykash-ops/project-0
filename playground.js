const {PrismaClient} = require("@prisma/client")

// const prisma = new PrismaClient()

async function main (){
    const data = []
    const d = await new PrismaClient().category.findMany({ })
    console.log(d)
}   
main()
