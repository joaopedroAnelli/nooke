import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {
  NookeHeading,
  NookeSection,
  NookeText,
  NookeButton,
} from '~/components/NookeBrand';

export const meta: Route.MetaFunction = () => {
  return [{title: 'NOOKE | Your Home Sanctuary'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <HeroSection />
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
    </>
  );
}

function HeroSection() {
  return (
    <NookeSection spacing="xl" className="text-center">
      <NookeHeading level={1} className="mb-6">
        Transform Your Space into a Sanctuary
      </NookeHeading>
      <NookeText variant="muted" className="max-w-2xl mx-auto mb-8 text-lg">
        Discover thoughtfully curated essentials that bring calm, comfort, and
        understated elegance to your home. Less clutter. More intention.
      </NookeText>
      <NookeButton size="lg" href="/collections/all">
        Explore Essentials
      </NookeButton>
    </NookeSection>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <NookeSection spacing="lg">
      <Link className="group block" to={`/collections/${collection.handle}`}>
        {image && (
          <div className="relative overflow-hidden rounded-2xl mb-6 group-hover:transform group-hover:scale-[1.02] transition-transform duration-500">
            <Image
              data={image}
              sizes="100vw"
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-deep-charcoal bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
          </div>
        )}
        <div className="text-center">
          <NookeHeading
            level={2}
            className="group-hover:text-soft-ember transition-colors duration-200"
          >
            {collection.title}
          </NookeHeading>
        </div>
      </Link>
    </NookeSection>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <NookeSection spacing="lg" className="bg-white">
      <div className="text-center mb-12">
        <NookeHeading level={2} className="mb-4">
          Carefully Curated for You
        </NookeHeading>
        <NookeText variant="muted" className="max-w-xl mx-auto">
          Each piece selected for its ability to enhance your daily rituals with
          quiet sophistication.
        </NookeText>
      </div>
      <Suspense
        fallback={
          <div className="text-center text-warm-stone">
            Discovering essentials...
          </div>
        }
      >
        <Await resolve={products}>
          {(response) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </NookeSection>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
