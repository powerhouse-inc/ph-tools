import { useState } from "react";
import { useSelectedArchitectureMapDocument } from "../../document-models/architecture-map/hooks.js";
import { ArchitectureGraph } from "./components/ArchitectureGraph.js";
import { DetailPanel } from "./components/DetailPanel.js";

export default function Editor() {
  const [document, _dispatch] = useSelectedArchitectureMapDocument();
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const state = document.state.global;
  const selectedModel =
    state.models.find((m) => m.id === selectedModelId) ?? null;

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Architecture Map
            </h1>
            <p className="text-xs text-slate-500">
              {state.models.length} models &middot; {state.relationships.length}{" "}
              relationships &middot; {state.integrations.length} integrations
            </p>
          </div>
        </div>
        <div className="flex-1">
          <ArchitectureGraph
            models={state.models}
            relationships={state.relationships}
            categories={state.categories}
            integrations={state.integrations}
            driveApps={state.driveApps}
            onNodeClick={setSelectedModelId}
            selectedModelId={selectedModelId}
          />
        </div>
      </div>
      {selectedModel && (
        <DetailPanel
          model={selectedModel}
          relationships={state.relationships}
          integrations={state.integrations}
          driveApps={state.driveApps}
          models={state.models}
          onClose={() => setSelectedModelId(null)}
        />
      )}
    </div>
  );
}
