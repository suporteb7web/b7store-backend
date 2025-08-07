import { prisma } from "../libs/prisma";

export const getCategory = async (id: number) => {
    const category = await prisma.category.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            slug: true
        }
    });
    return category;
}

export const getCategoryBySlug = async (slug: string) => {
    const category = await prisma.category.findFirst({
        where: { slug },
        select: {
            id: true,
            name: true,
            slug: true
        }
    });
    return category;
}

export const getCategoryMetadata = async (id: number) => {
    const metadata = await prisma.categoryMetadata.findMany({
        where: { categoryId: id },
        select: {
            id: true,
            name: true,
            values: {
                select: {
                    id: true,
                    label: true
                }
            }
        }
    });
    return metadata;
}