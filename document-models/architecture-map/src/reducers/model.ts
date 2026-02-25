import type { ArchitectureMapModelOperations } from "ph-arch-map/document-models/architecture-map";

export const architectureMapModelOperations: ArchitectureMapModelOperations = {
  addModelOperation(state, action) {
    state.models.push({
      id: action.input.id,
      name: action.input.name,
      type: action.input.type,
      category: action.input.category,
      description: action.input.description || null,
      operationCount: action.input.operationCount,
      hasTypedState: action.input.hasTypedState,
      externalIntegrations: (action.input.externalIntegrations ?? []).map(
        (i) => ({
          provider: i.provider,
          direction: i.direction,
          description: i.description || null,
        }),
      ),
    });
  },
  updateModelOperation(state, action) {
    const model = state.models.find((m) => m.id === action.input.id);
    if (!model) return;
    if (action.input.name) model.name = action.input.name;
    if (action.input.type) model.type = action.input.type;
    if (action.input.category) model.category = action.input.category;
    if (action.input.description) model.description = action.input.description;
    if (
      action.input.operationCount !== undefined &&
      action.input.operationCount !== null
    )
      model.operationCount = action.input.operationCount;
    if (
      action.input.hasTypedState !== undefined &&
      action.input.hasTypedState !== null
    )
      model.hasTypedState = action.input.hasTypedState;
    if (action.input.externalIntegrations) {
      model.externalIntegrations = action.input.externalIntegrations.map(
        (i) => ({
          provider: i.provider,
          direction: i.direction,
          description: i.description || null,
        }),
      );
    }
  },
  removeModelOperation(state, action) {
    const idx = state.models.findIndex((m) => m.id === action.input.id);
    if (idx !== -1) state.models.splice(idx, 1);
  },
};
