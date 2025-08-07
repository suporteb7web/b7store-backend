import { RequestHandler } from "express";
import { getProductSchema } from "../schemas/get-product-schema";
import { getAllProducts, getProduct, getProductsFromSameCategory, incrementProductView } from "../services/product";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { getOneProductSchema } from "../schemas/get-one-product-schema";
import { getCategory } from "../services/category";
import { getRelatedProductsSchema } from "../schemas/get-related-products-schema";
import { getRelatedProductsQuerySchema } from "../schemas/get-one-product-query-schema";

export const getProducts: RequestHandler = async (req, res) => {
    const parseResult = getProductSchema.safeParse(req.query);
    if (!parseResult.success) {
        res.status(400).json({ error: 'Parâmetros inválidos' });
        return;
    }
    const { metadata, orderBy, limit } = parseResult.data;

    const parsedLimit = limit ? parseInt(limit) : undefined;
    const parsedMetadata = metadata ? JSON.parse(metadata) : undefined;

    const products = await getAllProducts({
        metadata: parsedMetadata,
        order: orderBy,
        limit: parsedLimit
    });

    const productsWithAbsoluteUrl = products.map(product => ({
        ...product,
        image: product.image ? getAbsoluteImageUrl(product.image) : null,
        liked: false // TODO: Once have like funcionallity, fetch this.
    }))

    res.json({ error: null, products: productsWithAbsoluteUrl });
}

export const getOneProduct: RequestHandler = async (req, res) => {
    const paramsResult = getOneProductSchema.safeParse(req.params);
    if (!paramsResult.success) {
        res.status(400).json({ error: 'Parâmetros inválidos' });
        return;
    }
    const { id } = paramsResult.data;

    // Getting product
    const product = await getProduct(parseInt(id));
    if (!product) {
        res.json({ error: 'Produto não encontrado' });
        return;
    }

    const productWithAbsoluteImages = {
        ...product,
        images: product.images.map(img => getAbsoluteImageUrl(img))
    }

    // Getting category
    const category = await getCategory(product.categoryId);

    // Increment view count
    await incrementProductView(product.id);

    res.json({
        error: null,
        product: productWithAbsoluteImages,
        category
    });
}

export const getRelatedProducts: RequestHandler = async (req, res) => {
    const paramsResult = getRelatedProductsSchema.safeParse(req.params);
    const queryResult = getRelatedProductsQuerySchema.safeParse(req.query);

    if (!paramsResult.success || !queryResult.success) {
        res.status(400).json({ error: 'Parâmetros inválidos' });
        return;
    }
    const { id } = paramsResult.data;
    const { limit } = queryResult.data;

    const products = await getProductsFromSameCategory(
        parseInt(id),
        limit ? parseInt(limit) : undefined
    );

    const productsWithAbsoluteUrl = products.map(product => ({
        ...product,
        image: product.image ? getAbsoluteImageUrl(product.image) : null,
        liked: false // TODO: Once have like funcionallity, fetch this.
    }))

    res.json({ error: null, products: productsWithAbsoluteUrl });
}