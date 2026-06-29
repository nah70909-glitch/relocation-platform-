// ============================================================
// LISTING DETAIL PAGE — /listings/[id]
// ============================================================
// Server Component that pre-renders static paths for listing details
// and imports ListingDetailClient to handle client side interactions.
// ============================================================

import { listings } from '@/data/seedData';
import ListingDetailClient from '@/components/listings/ListingDetailClient';

// Pre-render paths for static export
export function generateStaticParams() {
  return listings.map((listing) => ({
    id: listing._id,
  }));
}

export default function ListingDetailPage({ params }) {
  const { id } = params;
  return <ListingDetailClient id={id} />;
}
