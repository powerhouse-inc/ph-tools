export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Address: { input: `${string}:0x${string}`; output: `${string}:0x${string}` };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Attachment: { input: string; output: string };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Unknown: { input: unknown; output: unknown };
  Upload: { input: File; output: File };
};

export type AddCategoryInput = {
  color: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type AddDriveAppInput = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  modelTypes: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  slug: Scalars["String"]["input"];
};

export type AddIntegrationInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  direction: IntegrationDirection;
  id: Scalars["ID"]["input"];
  modelType: Scalars["String"]["input"];
  provider: Scalars["String"]["input"];
};

export type AddModelInput = {
  category: ModelCategory;
  description?: InputMaybe<Scalars["String"]["input"]>;
  externalIntegrations?: InputMaybe<Array<ExternalIntegrationInput>>;
  hasTypedState: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
  operationCount: Scalars["Int"]["input"];
  type: Scalars["String"]["input"];
};

export type AddRelationshipInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  fieldName: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
  relationshipType: RelationshipType;
  sourceModelType: Scalars["String"]["input"];
  targetModelType: Scalars["String"]["input"];
};

export type ArchitectureMapState = {
  categories: Array<Category>;
  driveApps: Array<DriveApp>;
  integrations: Array<Integration>;
  models: Array<DocumentModel>;
  relationships: Array<Relationship>;
};

export type Category = {
  color: Scalars["String"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type DocumentModel = {
  category: ModelCategory;
  description: Maybe<Scalars["String"]["output"]>;
  externalIntegrations: Array<ExternalIntegration>;
  hasTypedState: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  operationCount: Scalars["Int"]["output"];
  type: Scalars["String"]["output"];
};

export type DriveApp = {
  color: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  modelTypes: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type ExternalIntegration = {
  description: Maybe<Scalars["String"]["output"]>;
  direction: IntegrationDirection;
  provider: Scalars["String"]["output"];
};

export type ExternalIntegrationInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  direction: IntegrationDirection;
  provider: Scalars["String"]["input"];
};

export type Integration = {
  description: Maybe<Scalars["String"]["output"]>;
  direction: IntegrationDirection;
  id: Scalars["ID"]["output"];
  modelType: Scalars["String"]["output"];
  provider: Scalars["String"]["output"];
};

export type IntegrationDirection = "Inbound" | "Outbound";

export type ModelCategory = "Finance" | "Identity" | "Projects" | "Services";

export type Relationship = {
  description: Maybe<Scalars["String"]["output"]>;
  fieldName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  relationshipType: RelationshipType;
  sourceModelType: Scalars["String"]["output"];
  targetModelType: Scalars["String"]["output"];
};

export type RelationshipType = "DataFlow" | "Dependency" | "Reference";

export type RemoveCategoryInput = {
  id: Scalars["ID"]["input"];
};

export type RemoveDriveAppInput = {
  id: Scalars["ID"]["input"];
};

export type RemoveIntegrationInput = {
  id: Scalars["ID"]["input"];
};

export type RemoveModelInput = {
  id: Scalars["ID"]["input"];
};

export type RemoveRelationshipInput = {
  id: Scalars["ID"]["input"];
};

export type UpdateCategoryInput = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateDriveAppInput = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  modelTypes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateIntegrationInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  direction?: InputMaybe<IntegrationDirection>;
  id: Scalars["ID"]["input"];
  modelType?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateModelInput = {
  category?: InputMaybe<ModelCategory>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  externalIntegrations?: InputMaybe<Array<ExternalIntegrationInput>>;
  hasTypedState?: InputMaybe<Scalars["Boolean"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  operationCount?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateRelationshipInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  fieldName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  relationshipType?: InputMaybe<RelationshipType>;
  sourceModelType?: InputMaybe<Scalars["String"]["input"]>;
  targetModelType?: InputMaybe<Scalars["String"]["input"]>;
};
