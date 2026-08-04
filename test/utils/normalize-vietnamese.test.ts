import { describe, expect, test } from "bun:test";
import { normalizeVietnamese } from "../../src/utils/normalize-vietnamese";

describe("normalizeVietnamese", () => {
  test("strips diacritics and lowercases", () => {
    expect(normalizeVietnamese("Hà Nội")).toBe("ha noi");
    expect(normalizeVietnamese("Đống Đa")).toBe("dong da");
    expect(normalizeVietnamese("Cống Vị")).toBe("cong vi");
  });

  test("collapses whitespace and trims", () => {
    expect(normalizeVietnamese("  Hà   Nội  ")).toBe("ha noi");
  });

  test("leaves ascii unchanged aside from case", () => {
    expect(normalizeVietnamese("Ba Dinh")).toBe("ba dinh");
  });
});
