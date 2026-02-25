import type { Node } from "@xyflow/react";
import type { ModelCategory } from "../../../document-models/architecture-map/gen/schema/types.js";

export interface DriveAppBadge {
  name: string;
  color: string;
}

export interface ModelNodeData extends Record<string, unknown> {
  modelId: string;
  name: string;
  type: string;
  category: ModelCategory;
  categoryColor: string;
  operationCount: number;
  hasTypedState: boolean;
  integrationCount: number;
  description: string | null;
  driveApps: DriveAppBadge[];
}

export type ModelNode = Node<ModelNodeData, "modelNode">;

export interface CategoryHeaderData extends Record<string, unknown> {
  name: string;
  color: string;
  borderColor: string;
  modelCount: number;
}

export type CategoryHeaderNode = Node<CategoryHeaderData, "categoryHeader">;

export const CATEGORY_COLORS: Record<ModelCategory, string> = {
  Finance: "#fff3e0",
  Identity: "#e8f5e9",
  Services: "#f3e5f5",
  Projects: "#e0f7fa",
};

export const CATEGORY_BORDER_COLORS: Record<ModelCategory, string> = {
  Finance: "#e65100",
  Identity: "#2e7d32",
  Services: "#6a1b9a",
  Projects: "#00695c",
};
