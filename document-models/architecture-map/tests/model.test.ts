import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArchitectureMapDocument,
  addModel,
  updateModel,
  removeModel,
  AddModelInputSchema,
  UpdateModelInputSchema,
  RemoveModelInputSchema,
} from "ph-arch-map/document-models/architecture-map";

describe("ModelOperations", () => {
  it("should handle addModel operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddModelInputSchema());

    const updatedDocument = reducer(document, addModel(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_MODEL");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateModel operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateModelInputSchema());

    const updatedDocument = reducer(document, updateModel(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_MODEL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeModel operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveModelInputSchema());

    const updatedDocument = reducer(document, removeModel(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_MODEL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
