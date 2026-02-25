import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ModelNode as ModelNodeType } from "../lib/types.js";

const hiddenHandle = "!bg-transparent !border-0 !w-1 !h-1 !min-w-0 !min-h-0";
const visibleHandle = "!bg-slate-300 !w-1.5 !h-1.5 !border-0";

export function ModelNode({ data, selected }: NodeProps<ModelNodeType>) {
  return (
    <div
      className="rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
      style={{
        borderLeft: `4px solid ${data.categoryColor}`,
        outline: selected ? `2px solid ${data.categoryColor}` : "none",
        minWidth: 220,
      }}
    >
      {/* Vertical handles (same-column connections) */}
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        className={visibleHandle}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="source-top"
        className={visibleHandle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        className={visibleHandle}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target-bottom"
        className={visibleHandle}
      />

      {/* Horizontal handles (cross-column connections) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className={hiddenHandle}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="source-left"
        className={hiddenHandle}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="target-right"
        className={hiddenHandle}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className={hiddenHandle}
      />

      <div className="px-3 py-2">
        <div className="text-sm font-semibold text-slate-800 truncate">
          {data.name}
        </div>
        <div className="text-xs text-slate-400 font-mono truncate">
          {data.type}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <span className="text-xs bg-slate-100 text-slate-600 rounded px-1.5 py-0.5">
            {data.operationCount} ops
          </span>
          {data.hasTypedState && (
            <span className="text-xs bg-green-50 text-green-700 rounded px-1.5 py-0.5">
              typed
            </span>
          )}
          {data.integrationCount > 0 && (
            <span className="text-xs bg-amber-50 text-amber-700 rounded px-1.5 py-0.5">
              {data.integrationCount} ext
            </span>
          )}
        </div>
        {(data.driveApps as { name: string; color: string }[]).length > 0 && (
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            {(data.driveApps as { name: string; color: string }[]).map(
              (app) => (
                <span
                  key={app.name}
                  className="text-[10px] rounded px-1 py-0.5 font-medium"
                  style={{
                    backgroundColor: `${app.color}20`,
                    color: app.color,
                    border: `1px solid ${app.color}40`,
                  }}
                >
                  {app.name}
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
