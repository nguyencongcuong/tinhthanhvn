import { describe, expect, test } from "bun:test";
import { normalizeVietnamese } from "../../src/utils/normalize-vietnamese";

/** Every Vietnamese letter with all tone marks (base + huyền + sắc + hỏi + ngã + nặng). */
const VIETNAMESE_ALPHABET_VARIANTS =
  "aàáảãạăằắẳẵặâầấẩẫậ" +
  "eèéẻẽẹêềếểễệ" +
  "iìíỉĩị" +
  "oòóỏõọôồốổỗộơờớởỡợ" +
  "uùúủũụưừứửữự" +
  "yỳýỷỹỵ" +
  "dđ" +
  "AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬ" +
  "EÈÉẺẼẸÊỀẾỂỄỆ" +
  "IÌÍỈĨỊ" +
  "OÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢ" +
  "UÙÚỦŨỤƯỪỨỬỮỰ" +
  "YỲÝỶỸỴ" +
  "DĐ";

const NORMALIZED_ALPHABET = `${"a".repeat(18) + "e".repeat(12) + "i".repeat(6) + "o".repeat(18) + "u".repeat(12) + "y".repeat(6)}dd`;

describe("normalizeVietnamese", () => {
  test("strips all Vietnamese alphabet tone variants", () => {
    expect(normalizeVietnamese(VIETNAMESE_ALPHABET_VARIANTS)).toBe(NORMALIZED_ALPHABET + NORMALIZED_ALPHABET);
  });

  test("strips diacritics and lowercases in place names", () => {
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
