import { L0ExclusionListItem } from '@q-dev/q-js-sdk';

export function hasActiveExclusionList (
  active: L0ExclusionListItem | null | undefined,
): boolean {
  return Boolean(active?.exclusions?.length);
}
