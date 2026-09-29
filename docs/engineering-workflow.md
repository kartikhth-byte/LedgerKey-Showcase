# Engineering workflow

[← Project overview](../README.md) · [Architecture](architecture.md) · [Validation](validation.md)

## From specification to evidence

The project uses a frozen product specification, a small current-task queue, scoped repository instructions, and handoffs that state changes, checks, limitations, and human smoke steps. AI-assisted implementation is followed by domain review, automated checks, and human acceptance. Repository task rules require explicit commit timing and prohibit treating an agent’s own review as human approval.

The engineering scope represented here includes data modeling, transactional boundaries, parser semantics, tenant authorization, reporting parity, and constrained AI integration. This showcase describes observable implementation and decisions; it does not infer individual authorship percentages from Git history.

## A concrete integration failure

An earlier Airbnb import flow could set an ingestion to committed without building the derived bookings and payouts. Tests that invoked rollup directly did not exercise that UI-to-database seam.

The resulting change was an owner-only `commit_airbnb_import` RPC: lock the ingestion, validate its tenant/type/state, change status and run the rollup in the same transaction. If rollup fails, the status change rolls back. A committed ingestion can be rerun through the idempotent rollup for recovery. The lesson is specific: test the entry point users invoke, not only its individual helpers.

## One financial definition across surfaces

The dashboard’s metric definitions were ported into a versioned SQL contract for AI consumers. Client and SQL tests share fixture expectations, including rounding order and archived-unit behavior. That makes disagreement detectable without allowing the model to invent arithmetic.

The current browser computation and SQL contract are still separate implementations. Parity is tested on finite fixtures, and only the client half was rerun for this publication. Consolidating consumers onto the contract remains a migration concern, not a completed simplification.

## Deliberate deferrals

Receipt OCR was deferred until entry volume or errors justify it. Vendor CSV expense import was deferred until an observed vendor format exists. Dedicated PDF export was deferred because the intended accountant handoff uses CSV. These are scope decisions, not unsuccessful benchmarks.

## How the showcase was prepared

A fresh repository was assembled from an explicit file allowlist. Documentation was rewritten for public readers; only two data-free allocation functions were copied from the implementation. Their source-byte provenance is recorded in the aggregate evidence. Synthetic fixtures are inline in the demo and tests. Private history, source datasets, personal records, environment files, and raw evaluation logs were excluded.

Public diagrams summarize inspected paths and distinguish optional AI from required ledger operations. They do not imply automated financial approvals, retraining, or production scale.
