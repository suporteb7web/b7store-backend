import { RequestHandler } from "express";
import { getCategoryBySlug, getCategoryMetadata } from "../services/category";

export const getCategoryWithMetadata: RequestHandler = async (req, res) => {
    const { slug } = req.params;

    const category = await getCategoryBySlug(slug);
    if (!category) {
        res.json({ error: 'Categoria não encontrada' });
        return;
    }

    const metadata = await getCategoryMetadata(category.id);

    res.json({ error: null, category, metadata });
}