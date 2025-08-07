import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Check if seeding has already been done
    console.log('Checking if database has already been seeded...')
    const existingCategory = await prisma.category.findFirst({
        where: {
            slug: 'camisas'
        }
    })

    if (existingCategory) {
        console.log('✅ Database has already been seeded. Skipping to avoid duplicate records.')
        console.log('Found existing category:', existingCategory.name)
        return
    }

    console.log('📝 No existing data found. Proceeding with seeding...')

    // Create Category
    console.log('Creating category...')
    const category = await prisma.category.create({
        data: {
            slug: 'camisas',
            name: 'Camisas'
        }
    })
    console.log('✅ Category created:', category.name)

    // Create CategoryMetadata
    console.log('Creating category metadata...')
    const categoryMetadata = await prisma.categoryMetadata.create({
        data: {
            id: 'tech',
            name: 'Tecnologia',
            categoryId: category.id
        }
    })
    console.log('✅ Category metadata created:', categoryMetadata.name)

    // Create Banners
    console.log('Creating banners...')
    const banners = await Promise.all([
        prisma.banner.create({
            data: {
                img: 'banner_promo_1.jpg',
                link: '/categories/camisas'
            }
        }),
        prisma.banner.create({
            data: {
                img: 'banner_promo_2.jpg',
                link: '/categories/algo'
            }
        })
    ])
    console.log('✅ Banners created:', banners.length)

    // Create MetadataValues
    console.log('Creating metadata values...')
    const metadataValues = await Promise.all([
        prisma.metadataValue.create({
            data: {
                id: 'node',
                label: 'Node',
                categoryMetadataId: 'tech'
            }
        }),
        prisma.metadataValue.create({
            data: {
                id: 'react',
                label: 'React',
                categoryMetadataId: 'tech'
            }
        }),
        prisma.metadataValue.create({
            data: {
                id: 'python',
                label: 'Python',
                categoryMetadataId: 'tech'
            }
        }),
        prisma.metadataValue.create({
            data: {
                id: 'php',
                label: 'PHP',
                categoryMetadataId: 'tech'
            }
        })
    ])
    console.log('✅ Metadata values created:', metadataValues.length)

    // Create Products
    console.log('Creating products...')
    const products = await Promise.all([
        prisma.product.create({
            data: {
                label: 'Camisa RN',
                price: 89.90,
                description: 'Camisa com estampa de React Native, perfeita para desenvolvedores',
                categoryId: category.id
            }
        }),
        prisma.product.create({
            data: {
                label: 'Camisa React',
                price: 94.50,
                description: 'Camisa com logo do React, ideal para front-end developers',
                categoryId: category.id
            }
        }),
        prisma.product.create({
            data: {
                label: 'Camisa Python',
                price: 79.99,
                description: 'Camisa com design Python, para programadores Python',
                categoryId: category.id
            }
        }),
        prisma.product.create({
            data: {
                label: 'Camisa PHP',
                price: 69.90,
                description: 'Camisa com estampa PHP, para desenvolvedores web',
                categoryId: category.id
            }
        })
    ])
    console.log('✅ Products created:', products.length)

    // Create ProductImages for each product
    console.log('Creating product images...')
    const productImages = []
    for (const product of products) {
        const images = await Promise.all([
            prisma.productImage.create({
                data: {
                    productId: product.id,
                    url: `product_${product.id}_1.jpg`
                }
            }),
            prisma.productImage.create({
                data: {
                    productId: product.id,
                    url: `product_${product.id}_2.jpg`
                }
            })
        ])
        productImages.push(...images)
    }
    console.log('✅ Product images created:', productImages.length)

    // Create ProductMetadata for each product
    console.log('Creating product metadata...')
    const productMetadata = await Promise.all([
        prisma.productMetadata.create({
            data: {
                productId: products[0].id,
                categoryMetadataId: 'tech',
                metadataValueId: 'react'
            }
        }),
        prisma.productMetadata.create({
            data: {
                productId: products[1].id,
                categoryMetadataId: 'tech',
                metadataValueId: 'react'
            }
        }),
        prisma.productMetadata.create({
            data: {
                productId: products[2].id,
                categoryMetadataId: 'tech',
                metadataValueId: 'python'
            }
        }),
        prisma.productMetadata.create({
            data: {
                productId: products[3].id,
                categoryMetadataId: 'tech',
                metadataValueId: 'php'
            }
        })
    ])
    console.log('✅ Product metadata created:', productMetadata.length)

    console.log('🎉 Database seeding completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
