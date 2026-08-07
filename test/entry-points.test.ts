import { describe, expect, test } from "bun:test";
import type { WardSearchOptions } from "../src/current";
import { wards } from "../src/current";
import type { DistrictSearchOptions, PreWardSearchOptions } from "../src/pre";
import { wards as preWards } from "../src/pre";

describe("public search options types", () => {
  test("WardSearchOptions is usable from the current entry point", () => {
    const options: WardSearchOptions = { provinceCode: "01" };

    expect(wards.search("ba dinh", options).length).toBeGreaterThan(0);
  });

  test("DistrictSearchOptions and PreWardSearchOptions are usable from the pre entry point", () => {
    const districtOptions: DistrictSearchOptions = { provinceCode: "01" };
    const wardOptions: PreWardSearchOptions = { provinceCode: "01", districtCode: "001" };

    expect(districtOptions.provinceCode).toBe("01");
    expect(preWards.search("cong vi", wardOptions).length).toBeGreaterThan(0);
  });
});
