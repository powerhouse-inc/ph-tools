import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ModelNode as ModelNodeType } from "../lib/types.js";

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
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-slate-400 !w-2 !h-2"
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
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-slate-400 !w-2 !h-2"
      />
    </div>
  );
}
