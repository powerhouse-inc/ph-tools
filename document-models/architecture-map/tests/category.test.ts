import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArchitectureMapDocument,
  addCategory,
  updateCategory,
  removeCategory,
  AddCategoryInputSchema,
  UpdateCategoryInputSchema,
  RemoveCategoryInputSchema,
} from "ph-arch-map/document-models/architecture-map";

describe("CategoryOperations", () => {
  it("should handle addCategory operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddCategoryInputSchema());

    const updatedDocument = reducer(document, addCategory(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_CATEGORY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateCategory operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateCategoryInputSchema());

    const updatedDocument = reducer(document, updateCategory(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_CATEGORY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeCategory operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveCategoryInputSchema());

    const updatedDocument = reducer(document, removeCategory(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_CATEGORY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
