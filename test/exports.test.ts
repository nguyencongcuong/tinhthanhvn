import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("package exports", () => {
  test("declares current and pre subpaths", () => {
    const pkg = JSON.parse(readFileSync(resolve(import.meta.dir, "../package.json"), "utf8")) as {
      exports?: Record<string, unknown>;
    };

    expect(pkg.exports?.["."]).toBeDefined();
    expect(pkg.exports?.["./current"]).toBeDefined();
    expect(pkg.exports?.["./pre"]).toBeDefined();
  });
});

describe("entry modules", () => {
  test("current entry exposes current lookups without nested pre", async () => {
    const current = await import("../src/current");

    expect(current.provinces.all()).toHaveLength(34);
    expect(current.wards.all()).toHaveLength(3321);
    expect("pre" in current.provinces).toBe(false);
    expect("pre" in current.wards).toBe(false);
    expect("districts" in current).toBe(false);
  });

  test("pre entry exposes flat pre-merger lookups", async () => {
    const pre = await import("../src/pre");

    expect(pre.provinces.all()).toHaveLength(63);
    expect(pre.districts.all()).toHaveLength(696);
    expect(pre.wards.all()).toHaveLength(10035);
    expect("pre" in pre.provinces).toBe(false);
    expect("pre" in pre.districts).toBe(false);
    expect("pre" in pre.wards).toBe(false);
  });

  test("default entry matches current (no nested pre)", async () => {
    const root = await import("../src/index");
    const current = await import("../src/current");

    expect(root.provinces).toBe(current.provinces);
    expect(root.wards).toBe(current.wards);
    expect("pre" in root.provinces).toBe(false);
    expect("districts" in root).toBe(false);
  });
});
