import { prisma } from "../libs/prisma"

export const getAllBanners = async () => {
    const banners = await prisma.banner.findMany({
        select: { img: true, link: true }
    });
    return banners.map(banner => ({
        ...banner,
        img: `media/banners/${banner.img}`
    }));
}