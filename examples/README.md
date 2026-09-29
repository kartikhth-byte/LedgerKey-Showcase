# Exact shared-expense allocation

[← Project overview](../README.md) · [View production excerpt](allocation.ts) · [View demo](allocation-demo.mjs) · [View tests](allocation.test.mjs)

`allocation.ts` contains two unchanged production functions from the LedgerKey dashboard. Only the header is new. The driver and tests were written for this showcase and use entirely synthetic values; they are not production endpoints or a full application export.

## Run

Prerequisite: Node.js 24 or newer (verified with Node.js 24.5.0). No packages, database, API keys, or network access are needed.

From the repository root:

```sh
node examples/allocation-demo.mjs
node --test examples/allocation.test.mjs
```

Expected demo output:

```text
Shared expense: 10001 paise
Equal: A=3334, B=3334, C=3333; total=10001
Weighted: A=5001, B=3000, C=2000; total=10001
All totals conserved.
```

The test runner reports 6 passing tests; timing and TAP formatting can vary by Node version.

## Contract and tradeoff

Equal splits floor the base share and give remaining paise to the first units. Percentage splits floor each exact share and give remaining paise to the largest fractional remainders, breaking ties by input order. The caller must supply stable ordering; sorting arbitrarily in another layer can change which unit receives a remainder.

These helpers assume upstream validation: nonnegative integer paise, unique unit IDs, a nonempty allocation for distributing a total, nonnegative integer basis points summing to 10,000, and products within JavaScript’s safe-integer range. The helpers do not enforce those conditions. Empty equal-allocation input returns an empty map. Invalid input is outside this excerpt’s contract; do not use it as a write-validation boundary.

The real application validates write payloads and database invariants separately. The snippet has no persistence, authentication, audit log, or receipt data. A stronger standalone library would add explicit input validation and an enforced numeric range before exposing this interface.
