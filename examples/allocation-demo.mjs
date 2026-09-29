import assert from "node:assert/strict";
import { splitMinorUnitsEvenly, splitMinorUnitsByBasisPoints } from "./allocation.ts";

const amount = 10001;
const equal = splitMinorUnitsEvenly(amount, ["A", "B", "C"]);
const weighted = splitMinorUnitsByBasisPoints(amount, [
  { unitId: "A", percentage: 5000 },
  { unitId: "B", percentage: 3000 },
  { unitId: "C", percentage: 2000 },
]);
console.log(`Shared expense: ${amount} paise`);
for (const [label, allocation] of [["Equal", equal], ["Weighted", weighted]]) {
  const total = [...allocation.values()].reduce((sum, value) => sum + value, 0);
  assert.equal(total, amount);
  console.log(`${label}: ${[...allocation].map(([id, value]) => `${id}=${value}`).join(", ")}; total=${total}`);
}
console.log("All totals conserved.");
