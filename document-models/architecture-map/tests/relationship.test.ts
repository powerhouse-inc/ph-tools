import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArchitectureMapDocument,
  addRelationship,
  updateRelationship,
  removeRelationship,
  AddRelationshipInputSchema,
  UpdateRelationshipInputSchema,
  RemoveRelationshipInputSchema,
} from "ph-arch-map/document-models/architecture-map";

describe("RelationshipOperations", () => {
  it("should handle addRelationship operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddRelationshipInputSchema());

    const updatedDocument = reducer(document, addRelationship(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_RELATIONSHIP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateRelationship operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateRelationshipInputSchema());

    const updatedDocument = reducer(document, updateRelationship(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_RELATIONSHIP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeRelationship operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveRelationshipInputSchema());

    const updatedDocument = reducer(document, removeRelationship(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_RELATIONSHIP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
