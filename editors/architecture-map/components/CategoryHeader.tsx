import type { NodeProps } from "@xyflow/react";
import type { CategoryHeaderNode } from "../lib/types.js";

export function CategoryHeader({ data }: NodeProps<CategoryHeaderNode>) {
  return (
    <div
      className="rounded-lg px-4 py-2.5"
      style={{
        backgroundColor: `${data.color}40`,
        borderLeft: `3px solid ${data.borderColor}`,
        minWidth: 240,
      }}
    >
      <div className="text-sm font-bold" style={{ color: data.borderColor }}>
        {data.name}
      </div>
      <div className="text-[11px] text-slate-500">
        {data.modelCount} {data.modelCount === 1 ? "model" : "models"}
      </div>
    </div>
  );
}
