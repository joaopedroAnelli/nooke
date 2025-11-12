import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {NookeCard} from '~/components/NookeBrand';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="group block"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <NookeCard
        elevated
        padding="sm"
        className="h-full transition-all duration-300"
      >
        {image && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="space-y-2">
          <h4 className="font-heading font-medium text-deep-charcoal group-hover:text-soft-ember transition-colors duration-200">
            {product.title}
          </h4>
          <div className="font-body text-warm-stone text-sm">
            <Money data={product.priceRange.minVariantPrice} />
          </div>
        </div>
      </NookeCard>
    </Link>
  );
}
