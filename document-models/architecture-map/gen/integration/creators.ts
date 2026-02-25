import { createAction } from "document-model/core";
import {
  AddIntegrationInputSchema,
  UpdateIntegrationInputSchema,
  RemoveIntegrationInputSchema,
} from "../schema/zod.js";
import type {
  AddIntegrationInput,
  UpdateIntegrationInput,
  RemoveIntegrationInput,
} from "../types.js";
import type {
  AddIntegrationAction,
  UpdateIntegrationAction,
  RemoveIntegrationAction,
} from "./actions.js";

export const addIntegration = (input: AddIntegrationInput) =>
  createAction<AddIntegrationAction>(
    "ADD_INTEGRATION",
    { ...input },
    undefined,
    AddIntegrationInputSchema,
    "global",
  );

export const updateIntegration = (input: UpdateIntegrationInput) =>
  createAction<UpdateIntegrationAction>(
    "UPDATE_INTEGRATION",
    { ...input },
    undefined,
    UpdateIntegrationInputSchema,
    "global",
  );

export const removeIntegration = (input: RemoveIntegrationInput) =>
  createAction<RemoveIntegrationAction>(
    "REMOVE_INTEGRATION",
    { ...input },
    undefined,
    RemoveIntegrationInputSchema,
    "global",
  );
