import prisma from '../utils/db';

export const getProducts = async (req, res) =>{
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        include:{
            products: true
        }
    });

    res.json({data: user.products})
}

export const getOneProduct = async (req, res) =>{
    const product = await prisma.product.findFirst({
        where:{
            id: req.params.id,
            userId: req.user.id
        }
    });

    res.json({data: product})
}

export const createProduct = async (req, res, next) =>{

    try{
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                userId: req.user.id
            }
        });
        res.json({ data: product })
    }catch(e){
        // handled by sub router error handler
        e.type = "validation"
        next(e)
    }
    
}

export const updateProduct = async (req, res) =>{
    const product = await prisma.product.update({
        where:{
            id_userId: {
                id: req.params.id,
                userId: req.user.id
            }
        },
        data:{
            name: req.body.name
        }
    });
    res.json({data: product})
}

export const deleteProduct = async (req, res) =>{
    console.log({
        id: req.params.id,
        userId: req.user.id
    });
    const product = await prisma.product.delete({
        where:{
            id_userId: {
                id: req.params.id,
                userId: req.user.id
            }
        }
    });
    res.json({data: product})
}