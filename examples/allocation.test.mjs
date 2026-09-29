import assert from "node:assert/strict";
import test from "node:test";
import { splitMinorUnitsEvenly, splitMinorUnitsByBasisPoints } from "./allocation.ts";

const rows = (weights) => weights.map((percentage, index) => ({ unitId: String(index), percentage }));
const values = (result) => [...result.values()];

test("equal split conserves an odd-paise total", () => {
  assert.deepEqual(values(splitMinorUnitsEvenly(10001, ["A", "B", "C"])), [3334, 3334, 3333]);
});
test("weighted split awards the largest remainder", () => {
  assert.deepEqual(values(splitMinorUnitsByBasisPoints(10001, rows([5000, 3000, 2000]))), [5001, 3000, 2000]);
});
test("percentage ties preserve row order", () => {
  assert.deepEqual(values(splitMinorUnitsByBasisPoints(101, rows([5000, 5000]))), [51, 50]);
});
test("zero produces zero shares", () => {
  assert.deepEqual(values(splitMinorUnitsEvenly(0, ["A", "B"])), [0, 0]);
  assert.deepEqual(values(splitMinorUnitsByBasisPoints(0, rows([5000, 5000]))), [0, 0]);
});
test("reordering a tie changes the recipient but preserves the total", () => {
  const allocations = [{ unitId: "B", percentage: 5000 }, { unitId: "A", percentage: 5000 }];
  assert.deepEqual([...splitMinorUnitsByBasisPoints(101, allocations)], [["B", 51], ["A", 50]]);
});
test("generated valid inputs conserve money and rounding bounds", () => {
  for (let amount = 0; amount <= 10000; amount += 1) {
    const equal = values(splitMinorUnitsEvenly(amount, ["A", "B", "C"]));
    assert.equal(equal.reduce((sum, value) => sum + value, 0), amount);
    assert.ok(Math.max(...equal) - Math.min(...equal) <= 1);
    for (const weights of [[5000, 3000, 2000], [3333, 3333, 3334]]) {
      const split = values(splitMinorUnitsByBasisPoints(amount, rows(weights)));
      assert.equal(split.reduce((sum, value) => sum + value, 0), amount);
      split.forEach((value, i) => {
        assert.ok(Number.isInteger(value) && value >= 0);
        assert.ok(Math.abs(value - amount * weights[i] / 10000) < 1);
      });
    }
  }
});
