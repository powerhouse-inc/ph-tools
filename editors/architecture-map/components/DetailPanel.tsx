import type {
  DocumentModel,
  DriveApp,
  Integration,
  Relationship,
} from "../../../document-models/architecture-map/gen/schema/types.js";
import { CATEGORY_BORDER_COLORS } from "../lib/types.js";

interface DetailPanelProps {
  model: DocumentModel;
  relationships: Relationship[];
  integrations: Integration[];
  driveApps: DriveApp[];
  models: DocumentModel[];
  onClose: () => void;
}

export function DetailPanel({
  model,
  relationships,
  integrations,
  driveApps,
  models,
  onClose,
}: DetailPanelProps) {
  const modelsByType = new Map(models.map((m) => [m.type, m]));
  const modelDriveApps = driveApps.filter((app) =>
    app.modelTypes.includes(model.type),
  );

  const outbound = relationships.filter(
    (r) => r.sourceModelType === model.type,
  );
  const inbound = relationships.filter((r) => r.targetModelType === model.type);
  const modelIntegrations = integrations.filter(
    (i) => i.modelType === model.type,
  );

  const borderColor = CATEGORY_BORDER_COLORS[model.category];

  return (
    <div className="w-[350px] border-l border-slate-200 bg-white overflow-y-auto flex flex-col">
      <div
        className="px-4 py-3 border-b border-slate-200 flex items-center justify-between"
        style={{ borderTop: `3px solid ${borderColor}` }}
      >
        <h2 className="text-base font-semibold text-slate-800 truncate">
          {model.name}
        </h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-lg leading-none"
        >
          &times;
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 text-sm">
        <div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Type
          </span>
          <p className="font-mono text-slate-700 mt-0.5">{model.type}</p>
        </div>

        <div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Category
          </span>
          <p className="text-slate-700 mt-0.5">{model.category}</p>
        </div>

        {modelDriveApps.length > 0 && (
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Drive Apps
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {modelDriveApps.map((app) => (
                <span
                  key={app.id}
                  className="text-xs rounded-full px-2.5 py-0.5 font-medium"
                  style={{
                    backgroundColor: `${app.color ?? "#94a3b8"}20`,
                    color: app.color ?? "#94a3b8",
                    border: `1px solid ${app.color ?? "#94a3b8"}40`,
                  }}
                >
                  {app.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {model.description && (
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Description
            </span>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              {model.description}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Operations
            </span>
            <p className="text-lg font-semibold text-slate-800 mt-0.5">
              {model.operationCount}
            </p>
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Typed State
            </span>
            <p className="text-lg font-semibold text-slate-800 mt-0.5">
              {model.hasTypedState ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {modelIntegrations.length > 0 && (
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              External Integrations
            </span>
            <ul className="mt-1 space-y-1.5">
              {modelIntegrations.map((integ) => (
                <li
                  key={integ.id}
                  className="bg-amber-50 rounded px-2.5 py-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-amber-800">
                      {integ.provider}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        integ.direction === "Inbound"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {integ.direction}
                    </span>
                  </div>
                  {integ.description && (
                    <p className="text-xs text-amber-700 mt-0.5">
                      {integ.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {outbound.length > 0 && (
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Outbound References ({outbound.length})
            </span>
            <ul className="mt-1 space-y-1">
              {outbound.map((rel) => {
                const target = modelsByType.get(rel.targetModelType);
                return (
                  <li
                    key={rel.id}
                    className="bg-slate-50 rounded px-2.5 py-1.5"
                  >
                    <span className="font-mono text-xs text-slate-500">
                      {rel.fieldName}
                    </span>
                    <span className="text-slate-400 mx-1">&rarr;</span>
                    <span className="text-slate-700">
                      {target?.name ?? rel.targetModelType}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">
                      ({rel.relationshipType})
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {inbound.length > 0 && (
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Inbound References ({inbound.length})
            </span>
            <ul className="mt-1 space-y-1">
              {inbound.map((rel) => {
                const source = modelsByType.get(rel.sourceModelType);
                return (
                  <li
                    key={rel.id}
                    className="bg-slate-50 rounded px-2.5 py-1.5"
                  >
                    <span className="text-slate-700">
                      {source?.name ?? rel.sourceModelType}
                    </span>
                    <span className="text-slate-400 mx-1">&rarr;</span>
                    <span className="font-mono text-xs text-slate-500">
                      {rel.fieldName}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">
                      ({rel.relationshipType})
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
