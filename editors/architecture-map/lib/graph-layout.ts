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
  type CategoryHeaderNode,
} from "./types.js";

const COLUMN_STRIDE = 380;
const NODE_HEIGHT = 105;
const NODE_GAP = 30;
const HEADER_HEIGHT = 48;
const HEADER_GAP = 20;
const PADDING_X = 20;
const PADDING_Y = 20;

const CATEGORY_ORDER: ModelCategory[] = [
  "Finance",
  "Identity",
  "Services",
  "Projects",
];

const CATEGORY_COL_INDEX = new Map<ModelCategory, number>(
  CATEGORY_ORDER.map((cat, i) => [cat, i]),
);

// --- Barycenter ordering to minimize edge crossings ---

function computeBarycenter(
  model: DocumentModel,
  relationships: Relationship[],
  modelByType: Map<string, DocumentModel>,
  colOf: Map<string, number>,
  rowOf: Map<string, number>,
): number {
  const myCol = colOf.get(model.id) ?? 0;
  const neighborRows: number[] = [];

  for (const rel of relationships) {
    const source = modelByType.get(rel.sourceModelType);
    const target = modelByType.get(rel.targetModelType);
    if (!source || !target) continue;

    if (source.id === model.id && colOf.get(target.id) !== myCol) {
      neighborRows.push(rowOf.get(target.id) ?? 0);
    }
    if (target.id === model.id && colOf.get(source.id) !== myCol) {
      neighborRows.push(rowOf.get(source.id) ?? 0);
    }
  }

  if (neighborRows.length === 0) return rowOf.get(model.id) ?? 0;
  return neighborRows.reduce((a, b) => a + b, 0) / neighborRows.length;
}

function sortColumn(
  group: DocumentModel[],
  relationships: Relationship[],
  modelByType: Map<string, DocumentModel>,
  colOf: Map<string, number>,
  rowOf: Map<string, number>,
): void {
  if (group.length <= 1) return;

  group.sort(
    (a, b) =>
      computeBarycenter(a, relationships, modelByType, colOf, rowOf) -
      computeBarycenter(b, relationships, modelByType, colOf, rowOf),
  );

  for (const [i, model] of group.entries()) {
    rowOf.set(model.id, i);
  }
}

function optimizeNodeOrder(
  grouped: Map<ModelCategory, DocumentModel[]>,
  relationships: Relationship[],
  models: DocumentModel[],
): void {
  const modelByType = new Map(models.map((m) => [m.type, m]));
  const colOf = new Map<string, number>();
  const rowOf = new Map<string, number>();

  for (const [colIdx, cat] of CATEGORY_ORDER.entries()) {
    for (const [rowIdx, model] of (grouped.get(cat) ?? []).entries()) {
      colOf.set(model.id, colIdx);
      rowOf.set(model.id, rowIdx);
    }
  }

  for (let pass = 0; pass < 3; pass++) {
    for (const cat of CATEGORY_ORDER) {
      const group = grouped.get(cat);
      if (group) sortColumn(group, relationships, modelByType, colOf, rowOf);
    }
    for (const cat of [...CATEGORY_ORDER].reverse()) {
      const group = grouped.get(cat);
      if (group) sortColumn(group, relationships, modelByType, colOf, rowOf);
    }
  }
}

// Track row indices for edge routing (populated by buildNodes, read by buildEdges)
let _modelRows = new Map<string, number>();

// --- Node building ---

export function buildNodes(
  models: DocumentModel[],
  relationships: Relationship[],
  categories: Category[],
  integrations: Integration[],
  driveApps: DriveApp[],
): (ModelNode | CategoryHeaderNode)[] {
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
  for (const cat of CATEGORY_ORDER) grouped.set(cat, []);
  for (const model of models) {
    const group = grouped.get(model.category);
    if (group) group.push(model);
  }

  optimizeNodeOrder(grouped, relationships, models);

  const nodes: (ModelNode | CategoryHeaderNode)[] = [];
  _modelRows = new Map();

  for (const [colIndex, cat] of CATEGORY_ORDER.entries()) {
    const catInfo = categoryMap.get(
      categories.find((c) => c.name.startsWith(cat.slice(0, 4)))?.name ?? "",
    );
    const color = catInfo?.color ?? CATEGORY_BORDER_COLORS[cat];
    const group = grouped.get(cat) ?? [];

    // Category header node
    nodes.push({
      id: `header-${cat}`,
      type: "categoryHeader",
      position: {
        x: PADDING_X + colIndex * COLUMN_STRIDE,
        y: PADDING_Y,
      },
      data: {
        name: catInfo?.name ?? cat,
        color,
        borderColor: CATEGORY_BORDER_COLORS[cat],
        modelCount: group.length,
      },
      selectable: false,
      draggable: false,
    });

    // Model nodes
    for (const [rowIndex, model] of group.entries()) {
      _modelRows.set(model.id, rowIndex);

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
          x: PADDING_X + colIndex * COLUMN_STRIDE,
          y:
            PADDING_Y +
            HEADER_HEIGHT +
            HEADER_GAP +
            rowIndex * (NODE_HEIGHT + NODE_GAP),
        },
        data: nodeData,
      });
    }
  }

  return nodes;
}

// --- Edge building ---

const EDGE_COLORS: Record<string, string> = {
  Reference: "#94a3b8",
  Dependency: "#f97316",
  DataFlow: "#3b82f6",
};

export function buildEdges(
  relationships: Relationship[],
  models: DocumentModel[],
  selectedModelId: string | null,
): Edge[] {
  const modelByType = new Map(models.map((m) => [m.type, m]));
  const edges: Edge[] = [];

  for (const rel of relationships) {
    const source = modelByType.get(rel.sourceModelType);
    const target = modelByType.get(rel.targetModelType);
    if (!source || !target) continue;

    const sourceCol = CATEGORY_COL_INDEX.get(source.category) ?? 0;
    const targetCol = CATEGORY_COL_INDEX.get(target.category) ?? 0;

    let sourceHandle: string;
    let targetHandle: string;

    if (sourceCol < targetCol) {
      sourceHandle = "source-right";
      targetHandle = "target-left";
    } else if (sourceCol > targetCol) {
      sourceHandle = "source-left";
      targetHandle = "target-right";
    } else {
      // Same column — route based on vertical position
      const sourceRow = _modelRows.get(source.id) ?? 0;
      const targetRow = _modelRows.get(target.id) ?? 0;
      if (sourceRow <= targetRow) {
        sourceHandle = "source-bottom";
        targetHandle = "target-top";
      } else {
        sourceHandle = "source-top";
        targetHandle = "target-bottom";
      }
    }

    const color = EDGE_COLORS[rel.relationshipType] ?? EDGE_COLORS.Reference;
    const isConnected =
      selectedModelId != null &&
      (source.id === selectedModelId || target.id === selectedModelId);
    const opacity = selectedModelId == null ? 0.3 : isConnected ? 1 : 0.08;

    edges.push({
      id: rel.id,
      source: source.id,
      target: target.id,
      type: "smoothstep",
      sourceHandle,
      targetHandle,
      animated: rel.relationshipType === "DataFlow" && isConnected,
      style: {
        stroke: color,
        strokeWidth: isConnected ? 2.5 : 1.5,
        strokeDasharray:
          rel.relationshipType === "Dependency" ? "6 3" : undefined,
        opacity,
        transition: "opacity 0.2s, stroke-width 0.2s",
      },
      zIndex: isConnected ? 10 : 0,
    });
  }

  return edges;
}
