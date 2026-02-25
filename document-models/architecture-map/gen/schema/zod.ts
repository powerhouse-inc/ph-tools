import * as z from "zod";
import type {
  AddCategoryInput,
  AddDriveAppInput,
  AddIntegrationInput,
  AddModelInput,
  AddRelationshipInput,
  ArchitectureMapState,
  Category,
  DocumentModel,
  DriveApp,
  ExternalIntegration,
  ExternalIntegrationInput,
  Integration,
  IntegrationDirection,
  ModelCategory,
  Relationship,
  RelationshipType,
  RemoveCategoryInput,
  RemoveDriveAppInput,
  RemoveIntegrationInput,
  RemoveModelInput,
  RemoveRelationshipInput,
  UpdateCategoryInput,
  UpdateDriveAppInput,
  UpdateIntegrationInput,
  UpdateModelInput,
  UpdateRelationshipInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const IntegrationDirectionSchema = z.enum(["Inbound", "Outbound"]);

export const ModelCategorySchema = z.enum([
  "Finance",
  "Identity",
  "Projects",
  "Services",
]);

export const RelationshipTypeSchema = z.enum([
  "DataFlow",
  "Dependency",
  "Reference",
]);

export function AddCategoryInputSchema(): z.ZodObject<
  Properties<AddCategoryInput>
> {
  return z.object({
    color: z.string(),
    description: z.string().nullish(),
    id: z.string(),
    name: z.string(),
  });
}

export function AddDriveAppInputSchema(): z.ZodObject<
  Properties<AddDriveAppInput>
> {
  return z.object({
    color: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    modelTypes: z.array(z.string()),
    name: z.string(),
    slug: z.string(),
  });
}

export function AddIntegrationInputSchema(): z.ZodObject<
  Properties<AddIntegrationInput>
> {
  return z.object({
    description: z.string().nullish(),
    direction: IntegrationDirectionSchema,
    id: z.string(),
    modelType: z.string(),
    provider: z.string(),
  });
}

export function AddModelInputSchema(): z.ZodObject<Properties<AddModelInput>> {
  return z.object({
    category: ModelCategorySchema,
    description: z.string().nullish(),
    externalIntegrations: z
      .array(z.lazy(() => ExternalIntegrationInputSchema()))
      .nullish(),
    hasTypedState: z.boolean(),
    id: z.string(),
    name: z.string(),
    operationCount: z.number(),
    type: z.string(),
  });
}

export function AddRelationshipInputSchema(): z.ZodObject<
  Properties<AddRelationshipInput>
> {
  return z.object({
    description: z.string().nullish(),
    fieldName: z.string(),
    id: z.string(),
    relationshipType: RelationshipTypeSchema,
    sourceModelType: z.string(),
    targetModelType: z.string(),
  });
}

export function ArchitectureMapStateSchema(): z.ZodObject<
  Properties<ArchitectureMapState>
> {
  return z.object({
    __typename: z.literal("ArchitectureMapState").optional(),
    categories: z.array(z.lazy(() => CategorySchema())),
    driveApps: z.array(z.lazy(() => DriveAppSchema())),
    integrations: z.array(z.lazy(() => IntegrationSchema())),
    models: z.array(z.lazy(() => DocumentModelSchema())),
    relationships: z.array(z.lazy(() => RelationshipSchema())),
  });
}

export function CategorySchema(): z.ZodObject<Properties<Category>> {
  return z.object({
    __typename: z.literal("Category").optional(),
    color: z.string(),
    description: z.string().nullish(),
    id: z.string(),
    name: z.string(),
  });
}

export function DocumentModelSchema(): z.ZodObject<Properties<DocumentModel>> {
  return z.object({
    __typename: z.literal("DocumentModel").optional(),
    category: ModelCategorySchema,
    description: z.string().nullish(),
    externalIntegrations: z.array(z.lazy(() => ExternalIntegrationSchema())),
    hasTypedState: z.boolean(),
    id: z.string(),
    name: z.string(),
    operationCount: z.number(),
    type: z.string(),
  });
}

export function DriveAppSchema(): z.ZodObject<Properties<DriveApp>> {
  return z.object({
    __typename: z.literal("DriveApp").optional(),
    color: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    modelTypes: z.array(z.string()),
    name: z.string(),
    slug: z.string(),
  });
}

export function ExternalIntegrationSchema(): z.ZodObject<
  Properties<ExternalIntegration>
> {
  return z.object({
    __typename: z.literal("ExternalIntegration").optional(),
    description: z.string().nullish(),
    direction: IntegrationDirectionSchema,
    provider: z.string(),
  });
}

export function ExternalIntegrationInputSchema(): z.ZodObject<
  Properties<ExternalIntegrationInput>
> {
  return z.object({
    description: z.string().nullish(),
    direction: IntegrationDirectionSchema,
    provider: z.string(),
  });
}

export function IntegrationSchema(): z.ZodObject<Properties<Integration>> {
  return z.object({
    __typename: z.literal("Integration").optional(),
    description: z.string().nullish(),
    direction: IntegrationDirectionSchema,
    id: z.string(),
    modelType: z.string(),
    provider: z.string(),
  });
}

export function RelationshipSchema(): z.ZodObject<Properties<Relationship>> {
  return z.object({
    __typename: z.literal("Relationship").optional(),
    description: z.string().nullish(),
    fieldName: z.string(),
    id: z.string(),
    relationshipType: RelationshipTypeSchema,
    sourceModelType: z.string(),
    targetModelType: z.string(),
  });
}

export function RemoveCategoryInputSchema(): z.ZodObject<
  Properties<RemoveCategoryInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveDriveAppInputSchema(): z.ZodObject<
  Properties<RemoveDriveAppInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveIntegrationInputSchema(): z.ZodObject<
  Properties<RemoveIntegrationInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveModelInputSchema(): z.ZodObject<
  Properties<RemoveModelInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveRelationshipInputSchema(): z.ZodObject<
  Properties<RemoveRelationshipInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function UpdateCategoryInputSchema(): z.ZodObject<
  Properties<UpdateCategoryInput>
> {
  return z.object({
    color: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function UpdateDriveAppInputSchema(): z.ZodObject<
  Properties<UpdateDriveAppInput>
> {
  return z.object({
    color: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    modelTypes: z.array(z.string()).nullish(),
    name: z.string().nullish(),
    slug: z.string().nullish(),
  });
}

export function UpdateIntegrationInputSchema(): z.ZodObject<
  Properties<UpdateIntegrationInput>
> {
  return z.object({
    description: z.string().nullish(),
    direction: IntegrationDirectionSchema.nullish(),
    id: z.string(),
    modelType: z.string().nullish(),
    provider: z.string().nullish(),
  });
}

export function UpdateModelInputSchema(): z.ZodObject<
  Properties<UpdateModelInput>
> {
  return z.object({
    category: ModelCategorySchema.nullish(),
    description: z.string().nullish(),
    externalIntegrations: z
      .array(z.lazy(() => ExternalIntegrationInputSchema()))
      .nullish(),
    hasTypedState: z.boolean().nullish(),
    id: z.string(),
    name: z.string().nullish(),
    operationCount: z.number().nullish(),
    type: z.string().nullish(),
  });
}

export function UpdateRelationshipInputSchema(): z.ZodObject<
  Properties<UpdateRelationshipInput>
> {
  return z.object({
    description: z.string().nullish(),
    fieldName: z.string().nullish(),
    id: z.string(),
    relationshipType: RelationshipTypeSchema.nullish(),
    sourceModelType: z.string().nullish(),
    targetModelType: z.string().nullish(),
  });
}
