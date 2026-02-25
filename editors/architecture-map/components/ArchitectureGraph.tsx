import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type NodeTypes,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type {
  DocumentModel,
  Relationship,
  Category,
  Integration,
  DriveApp,
} from "../../../document-models/architecture-map/gen/schema/types.js";
import { ModelNode } from "./ModelNode.js";
import { CategoryLegend } from "./CategoryLegend.js";
import { buildNodes, buildEdges } from "../lib/graph-layout.js";
import { CATEGORY_COLORS } from "../lib/types.js";

interface ArchitectureGraphProps {
  models: DocumentModel[];
  relationships: Relationship[];
  categories: Category[];
  integrations: Integration[];
  driveApps: DriveApp[];
  onNodeClick: (modelId: string) => void;
  selectedModelId: string | null;
}

const nodeTypes: NodeTypes = {
  modelNode: ModelNode,
};

export function ArchitectureGraph({
  models,
  relationships,
  categories,
  integrations,
  driveApps,
  onNodeClick,
  selectedModelId,
}: ArchitectureGraphProps) {
  const nodes = useMemo(
    () =>
      buildNodes(models, categories, integrations, driveApps).map((n) => ({
        ...n,
        selected: n.id === selectedModelId,
      })),
    [models, categories, integrations, driveApps, selectedModelId],
  );

  const edges = useMemo(
    () => buildEdges(relationships, models),
    [relationships, models],
  );

  const handleNodeClick: NodeMouseHandler<Node> = useCallback(
    (_event, node) => {
      onNodeClick(node.data.modelId as string);
    },
    [onNodeClick],
  );

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} color="#f1f5f9" />
        <Controls position="top-right" />
        <MiniMap
          position="top-left"
          nodeColor={(node) => {
            const cat = node.data.category as string;
            return (
              CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] || "#e2e8f0"
            );
          }}
          maskColor="rgba(255,255,255,0.7)"
        />
      </ReactFlow>
      <CategoryLegend categories={categories} driveApps={driveApps} />
    </div>
  );
}
