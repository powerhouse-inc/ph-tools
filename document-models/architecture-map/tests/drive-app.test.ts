import { generateMock } from "@powerhousedao/codegen";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArchitectureMapDocument,
  addDriveApp,
  updateDriveApp,
  removeDriveApp,
  AddDriveAppInputSchema,
  UpdateDriveAppInputSchema,
  RemoveDriveAppInputSchema,
} from "ph-arch-map/document-models/architecture-map";

describe("DriveAppOperations", () => {
  it("should handle addDriveApp operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddDriveAppInputSchema());

    const updatedDocument = reducer(document, addDriveApp(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_DRIVE_APP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateDriveApp operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateDriveAppInputSchema());

    const updatedDocument = reducer(document, updateDriveApp(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_DRIVE_APP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeDriveApp operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveDriveAppInputSchema());

    const updatedDocument = reducer(document, removeDriveApp(input));

    expect(isArchitectureMapDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_DRIVE_APP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
