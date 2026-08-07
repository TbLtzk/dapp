interface L0ListMember {
  mainAccount: string;
}

export function countActiveQuorumSigners (
  signers: L0ListMember[] | undefined,
  activeRoots: L0ListMember[] | undefined,
): number {
  if (!signers?.length || !activeRoots?.length) {
    return 0;
  }

  const activeMainAccounts = new Set(
    activeRoots.map(({ mainAccount }) => mainAccount.toLowerCase()),
  );

  const signedActiveMainAccounts = new Set<string>();

  for (const { mainAccount } of signers) {
    const normalizedMainAccount = mainAccount.toLowerCase();

    if (activeMainAccounts.has(normalizedMainAccount)) {
      signedActiveMainAccounts.add(normalizedMainAccount);
    }
  }

  return signedActiveMainAccounts.size;
}

export function getActiveQuorumSigningProgress ({
  signers,
  activeRoots,
  activeRootPercentage,
}: {
  signers: L0ListMember[] | undefined;
  activeRoots: L0ListMember[] | undefined;
  activeRootPercentage?: number | null;
}) {
  const quorumSize = activeRoots?.length ?? 0;
  const signedCount = countActiveQuorumSigners(signers, activeRoots);

  const percentage = quorumSize > 0
    ? (activeRootPercentage ?? (signedCount / quorumSize * 100))
    : 0;

  return { signedCount, quorumSize, percentage };
}
