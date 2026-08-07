import { existsSync } from "node:fs";
import { describe, expect, test } from "bun:test";
import { COUNTS } from "./fixtures";

const distExists = existsSync(new URL("../dist/pre.js", import.meta.url));

describe.skipIf(!distExists)("dist entry points", () => {
  test("index.js exports working lookups", async () => {
    const { provinces, wards } = await import("../dist/index.js");
    expect(provinces.all()).toHaveLength(COUNTS.provinces);
    expect(wards.all().length).toBeGreaterThan(0);
  });

  test("current.js exports working lookups", async () => {
    const { provinces } = await import("../dist/current.js");
    expect(provinces.all()).toHaveLength(COUNTS.provinces);
  });

  test("pre.js exports working lookups", async () => {
    const { provinces, districts, wards } = await import("../dist/pre.js");
    expect(provinces.all()).toHaveLength(COUNTS.preProvinces);
    expect(districts.all()).toHaveLength(COUNTS.preDistricts);
    expect(wards.all()).toHaveLength(COUNTS.preWards);
  });
});
