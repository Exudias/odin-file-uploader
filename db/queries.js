const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserByUsername(username) {
    return await prisma.user.findUnique({
        where: { username },
    });
}

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: { id },
    });
}

async function createUser(username, password) {
    return await prisma.user.create({
        data: {
            username,
            password,
        },
    });
}

async function createFile(name, dbName, folderId, userId) {
    return await prisma.file.create({
        data: {
            name,
            dbName,
            user: {
                connect: { id: userId }
            },
            ...(folderId && {
                folder: {
                    connect: { id: folderId }
                }
            }),
        },
    });
}

module.exports = {
    getUserByUsername,
    getUserById,
    createUser,
    createFile,
}