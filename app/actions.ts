'use server';

import { revalidateTag } from 'next/cache';
import { GET_LAST_SWAPS_TAG } from 'services';

export default async function refreshLatestSwaps() {
  revalidateTag(GET_LAST_SWAPS_TAG);
}
