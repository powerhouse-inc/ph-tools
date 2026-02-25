import type { ArchitectureMapDriveAppOperations } from "ph-arch-map/document-models/architecture-map";

export const architectureMapDriveAppOperations: ArchitectureMapDriveAppOperations =
  {
    addDriveAppOperation(state, action) {
      state.driveApps.push({
        id: action.input.id,
        name: action.input.name,
        slug: action.input.slug,
        description: action.input.description || null,
        color: action.input.color || null,
        modelTypes: [...action.input.modelTypes],
      });
    },
    updateDriveAppOperation(state, action) {
      const app = state.driveApps.find((a) => a.id === action.input.id);
      if (!app) return;
      if (action.input.name) app.name = action.input.name;
      if (action.input.slug) app.slug = action.input.slug;
      if (action.input.description) app.description = action.input.description;
      if (action.input.color) app.color = action.input.color;
      if (action.input.modelTypes)
        app.modelTypes = [...action.input.modelTypes];
    },
    removeDriveAppOperation(state, action) {
      const idx = state.driveApps.findIndex((a) => a.id === action.input.id);
      if (idx !== -1) state.driveApps.splice(idx, 1);
    },
  };
