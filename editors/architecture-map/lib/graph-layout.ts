import type { Edge } from "@xyflow/react";
import type {
  DocumentModel,
  Relationship,
  Category,
  Integration,
  DriveApp,
  ModelCategory,
} from "../../../document-models/architecture-map/gen/schema/types.js";
import {
  CATEGORY_BORDER_COLORS,
  type DriveAppBadge,
  type ModelNode,
  type ModelNodeData,
} from "./types.js";

const COLUMN_WIDTH = 320;
const NODE_HEIGHT = 90;
const NODE_GAP = 24;
const HEADER_HEIGHT = 50;
const PADDING_X = 40;
const PADDING_Y = 20;

const CATEGORY_ORDER: ModelCategory[] = [
  "Finance",
  "Identity",
  "Services",
  "Projects",
];

export function buildNodes(
  models: DocumentModel[],
  categories: Category[],
  integrations: Integration[],
  driveApps: DriveApp[],
): ModelNode[] {
  const categoryMap = new Map(categories.map((c) => [c.name, c]));
  const integrationsByModel = new Map<string, number>();
  for (const integ of integrations) {
    integrationsByModel.set(
      integ.modelType,
      (integrationsByModel.get(integ.modelType) ?? 0) + 1,
    );
  }

  const driveAppsByModel = new Map<string, DriveAppBadge[]>();
  for (const app of driveApps) {
    for (const modelType of app.modelTypes) {
      const existing = driveAppsByModel.get(modelType) ?? [];
      existing.push({ name: app.name, color: app.color ?? "#94a3b8" });
      driveAppsByModel.set(modelType, existing);
    }
  }

  const grouped = new Map<ModelCategory, DocumentModel[]>();
  for (const cat of CATEGORY_ORDER) {
    grouped.set(cat, []);
  }
  for (const model of models) {
    const group = grouped.get(model.category);
    if (group) group.push(model);
  }

  const nodes: ModelNode[] = [];

  for (const [colIndex, cat] of CATEGORY_ORDER.entries()) {
    const group = grouped.get(cat) ?? [];
    const catInfo = categoryMap.get(
      categories.find((c) => c.name.startsWith(cat.slice(0, 4)))?.name ?? "",
    );
    const color = catInfo?.color ?? CATEGORY_BORDER_COLORS[cat];

    for (const [rowIndex, model] of group.entries()) {
      const nodeData: ModelNodeData = {
        modelId: model.id,
        name: model.name,
        type: model.type,
        category: model.category,
        categoryColor: color,
        operationCount: model.operationCount,
        hasTypedState: model.hasTypedState,
        integrationCount: integrationsByModel.get(model.type) ?? 0,
        description: model.description ?? null,
        driveApps: driveAppsByModel.get(model.type) ?? [],
      };

      nodes.push({
        id: model.id,
        type: "modelNode",
        position: {
          x: PADDING_X + colIndex * COLUMN_WIDTH,
          y: PADDING_Y + HEADER_HEIGHT + rowIndex * (NODE_HEIGHT + NODE_GAP),
        },
        data: nodeData,
      });
    }
  }

  return nodes;
}

const EDGE_STYLES: Record<
  string,
  { stroke: string; strokeDasharray?: string; animated?: boolean }
> = {
  Reference: { stroke: "#94a3b8" },
  Dependency: { stroke: "#f97316", strokeDasharray: "6 3" },
  DataFlow: { stroke: "#3b82f6" },
};

export function buildEdges(
  relationships: Relationship[],
  models: DocumentModel[],
): Edge[] {
  const modelByType = new Map(models.map((m) => [m.type, m]));
  const edges: Edge[] = [];

  for (const rel of relationships) {
    const source = modelByType.get(rel.sourceModelType);
    const target = modelByType.get(rel.targetModelType);
    if (!source || !target) continue;

    const style = EDGE_STYLES[rel.relationshipType] ?? EDGE_STYLES.Reference;

    edges.push({
      id: rel.id,
      source: source.id,
      target: target.id,
      label: rel.fieldName,
      animated: rel.relationshipType === "DataFlow",
      style: {
        stroke: style.stroke,
        strokeDasharray: style.strokeDasharray,
        strokeWidth: 1.5,
      },
      labelStyle: { fontSize: 10, fill: "#64748b" },
      labelBgStyle: { fill: "#fff", fillOpacity: 0.85 },
      labelBgPadding: [4, 2] as [number, number],
    });
  }

  return edges;
}
