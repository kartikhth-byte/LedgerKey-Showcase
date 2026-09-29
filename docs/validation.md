# Validation and evidence

[← Project overview](../README.md) · [Machine-readable evidence](../evidence/metrics.json)

## Publication checks

The application checks below ran locally on 2026-09-29. The tested application files match the pushed source revision used for this showcase; unrelated working documentation was excluded. Only aggregate results are published. Raw logs, private fixtures, tenant identifiers, and financial records are excluded.

| Check | Method and observed result | What it establishes |
|---|---|---|
| Application unit/component suites | `npm test -- --reporter=json`: 306 passed, 0 failed, 0 skipped, across 39 files | The collected tests passed in this environment |
| Lint | `npm run lint`: 0 errors, 4 Fast Refresh warnings | Static lint checks passed with warnings |
| Build | `npm run build`: TypeScript checks and Vite build succeeded | The app type-checks and bundles locally |
| Business tool inventory | 15 JSON tool-definition mirrors inspected against the registered v0/v1 roster | Implemented business-tool scope; excludes a separate refusal marker |
| Metrics contract | 13 named metrics in the inspected contract | Supported query vocabulary, not accuracy |
| Public allocation example | `node --test examples/allocation.test.mjs`: 6 passed | The selected production functions meet the tested allocation invariants |

The build warns about a JavaScript chunk above 500 kB. Lint warnings concern mixed component/non-component exports. No performance, uptime, load-test, business-impact, or user-count claims are made.

## What the tests cover

The application suites include CSV parsing/import modeling, money allocation, dashboard/report calculations, reconciliation presentation helpers, permissions-related helpers, AI dispatch/response contracts, and the client half of metric parity. This inventory does not imply full branch coverage. Vitest excludes the Playwright directory; the 306 tests are not 306 end-to-end journeys or unique customer samples.

The shared metric fixture covers month-spanning bookings, archived and cancelled records, overlapping unavailable dates, odd-paise splits, custom-percentage ties, deleted expenses, and period exclusions. The client and SQL suites use the same expectations. Only the client suite ran in this publication session; the database parity half was inspected but not rerun.

## AI evaluation scope

The private project contains 21 live evaluation cases. The active task record reports a historical 21/21 pass for the July 2026 tool wave. That is a recorded smoke result, not a fresh measurement: no raw live-run artifact was independently verified here, and the live model was not called for this publication.

The runner checks response shape, allowed tools, structured citations, export-intent shape, and case-specific expectations. Some checks are advisory. A case pass is not a field-level financial accuracy score, a prompt-injection guarantee, or an end-to-end product-quality percentage. No model accuracy number is published in the headline results.

## Public example method

Six named tests cover equal splits, unequal percentages, tie order, zero, reordered allocations, and a deterministic conservation sweep. The sweep tests each total from 0 through 10,000 paise against three valid allocation configurations: 10,001 distinct totals and 30,003 synthetic configurations, inside one test. These are generated arithmetic cases, not real expense samples or repeated model trials.

The example functions require validated inputs and stable ordering. They are not standalone financial write endpoints. [Preconditions and expected output](../examples/README.md) · [View tests](../examples/allocation.test.mjs).

## Checks not rerun

- Database RLS and SQL parity suites: require a local database with the project migrations and authenticated-role test setup.
- Full product Playwright journeys: require a configured synthetic application environment.
- Live AI evaluations and Telegram delivery: require configured external integrations.
- Production deployment, concurrency, retention enforcement, penetration testing, and large-tenant performance were not validated here.

The repository includes SQL tests that use authenticated-role/JWT claim impersonation for access assertions; service-role bootstrap is not evidence of RLS correctness. None of the source suite inventory is presented as a freshly passing database test run.

Receipt OCR, vendor CSV import, and PDF export documents are feasibility/need assessments that led to deferral. They contain no measured OCR dataset or extraction-accuracy benchmark.
