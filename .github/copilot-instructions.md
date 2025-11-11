# Nooke - Shopify Hydrogen + React Router Instructions

This is a **Shopify Hydrogen storefront** built with React Router v7 (not Remix). It's a headless e-commerce solution using Shopify's Storefront API.

## Architecture Overview

- **Framework**: Shopify Hydrogen 2025.7.0 with React Router 7.9.2
- **Hosting**: Shopify Oxygen (edge runtime)
- **Styling**: Tailwind CSS 4.x with custom reset
- **Data Fetching**: GraphQL via Shopify Storefront API
- **Build Tool**: Vite with Hydrogen plugin

## Critical Import Patterns

**Always use React Router imports, never Remix:**

```typescript
// ✅ CORRECT
import {useLoaderData, redirect, useRouteError} from 'react-router';

// ❌ WRONG
import {useLoaderData, redirect, useRouteError} from '@remix-run/react';
```

## Route Structure

- File-based routing via `@react-router/fs-routes`
- All routes prefixed with `($locale)` for i18n
- Route files use `+types/[routename]` for TypeScript safety
- Example: `($locale).products.$handle.tsx` handles `/en/products/t-shirt`

## Data Loading Patterns

**Critical vs Deferred Data:**

```typescript
// In route loaders, separate critical (above fold) from deferred data
export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args); // Start async
  const criticalData = await loadCriticalData(args); // Block render
  return {...deferredData, ...criticalData};
}
```

**GraphQL Fragments:**

- All GraphQL queries use fragments from `~/lib/fragments.ts`
- Example: `CART_QUERY_FRAGMENT`, `PRODUCT_QUERY_FRAGMENT`
- Always include Money fragment for currency formatting

## Context & Session

- Hydrogen context created in `~/lib/context.ts` using `createHydrogenContext()`
- Session handling via `AppSession.init()` with env variable `SESSION_SECRET`
- Context provides: `storefront`, `cart`, `session`, `env`, `waitUntil`

## Development Commands

```bash
npm run dev          # Dev server with codegen
npm run build        # Production build with codegen
npm run codegen      # Generate GraphQL types + React Router types
npm run typecheck    # TypeScript + route type checking
```

## Component Patterns

- Components in `~/components/` are reusable UI pieces
- Use Hydrogen hooks: `useOptimisticVariant`, `getSelectedProductOptions`
- ProductForm handles variant selection + cart mutations
- Always include Analytics component for Shopify tracking

## Performance Optimizations

- Root loader revalidation disabled by default (`shouldRevalidate: false`)
- CSS imports use `?url` suffix for proper bundling
- Assets inline limit set to 0 for strict CSP compliance
- Storefront redirect handles locale/domain routing

When working with this codebase, always check existing patterns in similar route files and component implementations.
