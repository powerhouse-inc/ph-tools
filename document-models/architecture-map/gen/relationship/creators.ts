import { createAction } from "document-model/core";
import {
  AddRelationshipInputSchema,
  UpdateRelationshipInputSchema,
  RemoveRelationshipInputSchema,
} from "../schema/zod.js";
import type {
  AddRelationshipInput,
  UpdateRelationshipInput,
  RemoveRelationshipInput,
} from "../types.js";
import type {
  AddRelationshipAction,
  UpdateRelationshipAction,
  RemoveRelationshipAction,
} from "./actions.js";

export const addRelationship = (input: AddRelationshipInput) =>
  createAction<AddRelationshipAction>(
    "ADD_RELATIONSHIP",
    { ...input },
    undefined,
    AddRelationshipInputSchema,
    "global",
  );

export const updateRelationship = (input: UpdateRelationshipInput) =>
  createAction<UpdateRelationshipAction>(
    "UPDATE_RELATIONSHIP",
    { ...input },
    undefined,
    UpdateRelationshipInputSchema,
    "global",
  );

export const removeRelationship = (input: RemoveRelationshipInput) =>
  createAction<RemoveRelationshipAction>(
    "REMOVE_RELATIONSHIP",
    { ...input },
    undefined,
    RemoveRelationshipInputSchema,
    "global",
  );
