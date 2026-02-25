import { createAction } from "document-model/core";
import {
  AddCategoryInputSchema,
  UpdateCategoryInputSchema,
  RemoveCategoryInputSchema,
} from "../schema/zod.js";
import type {
  AddCategoryInput,
  UpdateCategoryInput,
  RemoveCategoryInput,
} from "../types.js";
import type {
  AddCategoryAction,
  UpdateCategoryAction,
  RemoveCategoryAction,
} from "./actions.js";

export const addCategory = (input: AddCategoryInput) =>
  createAction<AddCategoryAction>(
    "ADD_CATEGORY",
    { ...input },
    undefined,
    AddCategoryInputSchema,
    "global",
  );

export const updateCategory = (input: UpdateCategoryInput) =>
  createAction<UpdateCategoryAction>(
    "UPDATE_CATEGORY",
    { ...input },
    undefined,
    UpdateCategoryInputSchema,
    "global",
  );

export const removeCategory = (input: RemoveCategoryInput) =>
  createAction<RemoveCategoryAction>(
    "REMOVE_CATEGORY",
    { ...input },
    undefined,
    RemoveCategoryInputSchema,
    "global",
  );
