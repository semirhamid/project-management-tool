import prisma from '../utils/db';


export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);
    res.json({ data: updates })
}

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id,
        }
    });
    console.log(req.params.id, update)
    res.json({ data: update })
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })
    if (product.userId !== req.user.id) {
        res.json("You are not authorized to create an update for this product")
    }
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            version: req.body.version,
            assets: req.body.assets,
            productId: req.body.productId
        }
    });
    res.json({ data: update })
}


export const updateUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })
    if (product.userId !== req.user.id) {
        res.json("You are not authorized to update this update")
    }
    const update = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            version: req.body?.version,
            assets: req.body?.assets,
            productId: req.body.productId
        }
    });
    res.json({ data: update })
}

export const deleteUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })
    if (product.userId !== req.user.id) {
        res.json("You are not authorized to delete this update")
    }
    const update = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });
    res.json({ data: update })
}