// import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from '@prisma/extension-accelerate'
// declare global{
//     var prisma:PrismaClient|undefined
// }
// export const db=globalThis.prisma || new PrismaClient().$extends(withAccelerate())

// if(process.env.NODE_ENV!=="production")globalThis.prisma=db;


import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export  const db = new PrismaClient().$extends(withAccelerate())