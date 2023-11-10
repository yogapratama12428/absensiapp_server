import { PrismaClient } from "@prisma/client";

const prisma = PrismaClient()

export const getUser = async (req, res) => {
    try {
        const response = await prisma.user.findMany({
            include: {
                profile: true,
                postins: true,
                postouts: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {   
    const { id } = req.params
    try {
        const response = await prisma.user.findUnique({
            where: { id: id},
            include: {
                profile: true,
                postins: true,
                postouts: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}


export const createUser = async (req, res) => {   
    const { password, email } = req.body
    try {

        const user = await prisma.user.findUnique({
            where: { email: email},
        })

        if (user) return res.status(200).json(user)
                    
        await prisma.user.create({
            data: {
                password, 
                email,
                role: 'user'
            }
        })

        const data = await prisma.user.findUnique({
            where: {
                email: email
            },
        })
        
        return res.status(200).json(data)
        
      
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const updateUser = async (req, res) => {   
    const { id } = req.params
    const { password  } = req.body

    try {
        await prisma.user.update({
            where: { id: id },
            data: { password}
        })
        res.status(201).json({ msg: "User Updated"})
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const deleteUser = async (req, res) => {   
    const { id } = req.params
    try {
        await prisma.device.deleteMany({
            where: {
                authorId: id,
            }
        })
        
        await prisma.user.delete({
            where: { id: id },
            include: {
                profile: true,
                postins: true,
                postouts: true
            }
        })
        res.status(201).json({ msg: "User Deleted"})
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}
