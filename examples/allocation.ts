// Production excerpt: two unchanged functions from the LedgerKey dashboard.
// Inputs must already satisfy the preconditions documented in README.md.

export function splitMinorUnitsEvenly(amountPaise: number, unitIds: string[]) {
  if (unitIds.length === 0) {
    return new Map<string, number>();
  }

  const baseShare = Math.floor(amountPaise / unitIds.length);
  let remainder = amountPaise - baseShare * unitIds.length;
  const splits = new Map<string, number>();

  unitIds.forEach((unitId) => {
    const nextAmount = baseShare + (remainder > 0 ? 1 : 0);
    remainder = Math.max(0, remainder - 1);
    splits.set(unitId, nextAmount);
  });

  return splits;
}

export function splitMinorUnitsByBasisPoints(
  amountPaise: number,
  allocations: Array<{ unitId: string; percentage: number }>
) {
  const provisional = allocations.map((allocation, index) => {
    const exactNumerator = amountPaise * allocation.percentage;
    const floorAmount = Math.floor(exactNumerator / 10000);

    return {
      index,
      unitId: allocation.unitId,
      amountPaise: floorAmount,
      remainder: exactNumerator - floorAmount * 10000,
    };
  });
  let remainder =
    amountPaise -
    provisional.reduce((total, allocation) => total + allocation.amountPaise, 0);

  provisional
    .slice()
    .sort((left, right) => right.remainder - left.remainder || left.index - right.index)
    .forEach((allocation) => {
      if (remainder <= 0) {
        return;
      }

      allocation.amountPaise += 1;
      remainder -= 1;
    });

  return new Map(
    provisional.map((allocation) => [allocation.unitId, allocation.amountPaise])
  );
}
