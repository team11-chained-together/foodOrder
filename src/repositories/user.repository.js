import { prisma } from "../utils/prisma/index.js";


//유저 생성 (회원 가입)

export class userRepository{
    createdUser = async(email,password,name,address)=>{
        
        return await prisma.user.create({
            email,
            password,
            name,
            address,
            point,
        });
    }

        async findUserEmail(email){
        return await prisma.user.findUnique({
            where : {
            email
            },
        });
        // const existEmail = await prisma.user.findUnique({
        //     where : {
        //     email
        //     },
        // });
        // return existEmail;
    }
}