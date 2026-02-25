import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
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
import { CategoryHeader } from "./CategoryHeader.js";
import { CategoryLegend } from "./CategoryLegend.js";
import { buildNodes, buildEdges } from "../lib/graph-layout.js";
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
  categoryHeader: CategoryHeader,
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
      buildNodes(
        models,
        relationships,
        categories,
        integrations,
        driveApps,
      ).map((n) => ({
        ...n,
        selected: n.id === selectedModelId,
      })),
    [
      models,
      relationships,
      categories,
      integrations,
      driveApps,
      selectedModelId,
    ],
  );

  const edges = useMemo(
    () => buildEdges(relationships, models, selectedModelId),
    [relationships, models, selectedModelId],
  );

  const handleNodeClick: NodeMouseHandler<Node> = useCallback(
    (_event, node) => {
      if (node.type === "categoryHeader") return;
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
      </ReactFlow>
      <CategoryLegend driveApps={driveApps} />
    </div>
  );
}
