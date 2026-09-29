# A synthetic month-end walkthrough

[← Project overview](../README.md) · [Architecture](architecture.md) · [Run the allocation example](../examples/README.md)

This textual scenario uses invented amounts and unit labels. It is not a product screenshot, customer story, or evidence of real financial results.

## 1. Capture operating costs

A staff member assigned to Unit A records a maintenance expense and attaches a receipt. Out-of-pocket payment creates a reimbursement to review. Staff can work within assigned units and their own records; portfolio financial views belong to owners. The ordinary staff edit window is 48 hours.

An owner records a shared expense of ₹100.01 across Units A, B, and C. An equal split produces 3,334, 3,334, and 3,333 paise. The allocation audit explains the split and total. [Run this exact arithmetic](../examples/README.md).

## 2. Review an Airbnb import

The owner uploads a transaction CSV. Raw source rows are preserved while the preview separates new rows, duplicates, changed records, and unknown types. The owner resolves ambiguous listing mappings and inspects totals before committing.

A booking can contribute multiple financial lines. A payout is a separate record. The system does not assume that the nearest payout row belongs to the preceding booking. Approval invokes the transactional Airbnb commit/rollup path.

## 3. Reconcile bank deposits

The owner reviews an ICICI CSV import. Rental-related credits are distinguished from unrelated banking activity. Matching can use amount, date, and reference evidence. A possible bundle of payouts appears as a fuzzy proposal for the owner to confirm or reject; unresolved cases remain available for manual matching.

The owner checks overdue expected payouts and explains exceptions. Importing a non-rental debit alone should not create a missing Airbnb payout problem.

## 4. Close and hand off

The owner reviews unit profitability, shared allocations, reimbursements, monthly-close completeness, and owner settlement. CSV reports provide the recorded facts to an accountant. LedgerKey does not decide tax treatment, calculate GST liability, or calculate depreciation.

If an earnings PDF is attached for validation, the current comparison uses entered summary totals against CSV-derived values. It is not an automatic PDF extraction or second ledger-ingestion pipeline.

## 5. Ask an optional AI question

An owner asks for this month’s expenses or a comparison with last month. Registered tools serve scoped records or deterministic metrics, and the panel shows tool citations. Unsupported or denied queries should produce explicit errors/refusals rather than invented numbers.

An export request prepares an intent. The user presses Download CSV to fetch authorized data and generate the file with the normal exporter. Asking alone does not create or send a report.

## Operator responsibilities

Owners manage membership, unit assignments, import review, and financial exceptions. Technical operators configure server-side integration secrets, examine redacted query/audit logs, and investigate import or notification failures. The showcase publishes no admin endpoint or credentials.
