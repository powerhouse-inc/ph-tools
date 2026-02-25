import type { ArchitectureMapIntegrationOperations } from "ph-arch-map/document-models/architecture-map";

export const architectureMapIntegrationOperations: ArchitectureMapIntegrationOperations =
  {
    addIntegrationOperation(state, action) {
      state.integrations.push({
        id: action.input.id,
        modelType: action.input.modelType,
        provider: action.input.provider,
        direction: action.input.direction,
        description: action.input.description || null,
      });
    },
    updateIntegrationOperation(state, action) {
      const integ = state.integrations.find((i) => i.id === action.input.id);
      if (!integ) return;
      if (action.input.modelType) integ.modelType = action.input.modelType;
      if (action.input.provider) integ.provider = action.input.provider;
      if (action.input.direction) integ.direction = action.input.direction;
      if (action.input.description)
        integ.description = action.input.description;
    },
    removeIntegrationOperation(state, action) {
      const idx = state.integrations.findIndex((i) => i.id === action.input.id);
      if (idx !== -1) state.integrations.splice(idx, 1);
    },
  };
