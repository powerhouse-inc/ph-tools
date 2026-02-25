import type { DriveApp } from "../../../document-models/architecture-map/gen/schema/types.js";

interface CategoryLegendProps {
  driveApps: DriveApp[];
}

export function CategoryLegend({ driveApps }: CategoryLegendProps) {
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md px-4 py-2.5 flex gap-4 z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-0 border-t-2 border-slate-400" />
          <span className="text-xs text-slate-500">Reference</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-0 border-t-2 border-dashed border-orange-400" />
          <span className="text-xs text-slate-500">Dependency</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-0 border-t-2 border-blue-400" />
          <span className="text-xs text-slate-500">DataFlow</span>
        </div>
      </div>
      {driveApps.length > 0 && (
        <div className="border-l border-slate-200 pl-3 flex items-center gap-3">
          {driveApps.map((app) => (
            <div key={app.id} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: app.color ?? "#94a3b8" }}
              />
              <span className="text-xs text-slate-600 font-medium">
                {app.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
