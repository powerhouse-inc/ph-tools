import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArchitectureMapDocument,
  addIntegration,
  updateIntegration,
  removeIntegration,
  AddIntegrationInputSchema,
  UpdateIntegrationInputSchema,
  RemoveIntegrationInputSchema,
} from "ph-arch-map/document-models/architecture-map";

describe("IntegrationOperations", () => {
  it("should handle addIntegration operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddIntegrationInputSchema());

    const updatedDocument = reducer(document, addIntegration(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_INTEGRATION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateIntegration operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateIntegrationInputSchema());

    const updatedDocument = reducer(document, updateIntegration(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_INTEGRATION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeIntegration operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveIntegrationInputSchema());

    const updatedDocument = reducer(document, removeIntegration(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_INTEGRATION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
