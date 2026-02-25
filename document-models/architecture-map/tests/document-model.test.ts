/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  architectureMapDocumentType,
  isArchitectureMapDocument,
  assertIsArchitectureMapDocument,
  isArchitectureMapState,
  assertIsArchitectureMapState,
} from "ph-arch-map/document-models/architecture-map";
import { ZodError } from "zod";

describe("ArchitectureMap Document Model", () => {
  it("should create a new ArchitectureMap document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(architectureMapDocumentType);
  });

  it("should create a new ArchitectureMap document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isArchitectureMapDocument(document)).toBe(true);
    expect(isArchitectureMapState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ArchitectureMap document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsArchitectureMapDocument(wrongDocumentType)).toThrow();
      expect(isArchitectureMapDocument(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isArchitectureMapState(wrongState.state)).toBe(false);
    expect(assertIsArchitectureMapState(wrongState.state)).toThrow();
    expect(isArchitectureMapDocument(wrongState)).toBe(false);
    expect(assertIsArchitectureMapDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isArchitectureMapState(wrongInitialState.state)).toBe(false);
    expect(assertIsArchitectureMapState(wrongInitialState.state)).toThrow();
    expect(isArchitectureMapDocument(wrongInitialState)).toBe(false);
    expect(assertIsArchitectureMapDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isArchitectureMapDocument(missingIdInHeader)).toBe(false);
    expect(assertIsArchitectureMapDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isArchitectureMapDocument(missingNameInHeader)).toBe(false);
    expect(assertIsArchitectureMapDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isArchitectureMapDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsArchitectureMapDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isArchitectureMapDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsArchitectureMapDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
