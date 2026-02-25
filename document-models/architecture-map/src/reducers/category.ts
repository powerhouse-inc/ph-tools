import type { ArchitectureMapCategoryOperations } from "ph-arch-map/document-models/architecture-map";

export const architectureMapCategoryOperations: ArchitectureMapCategoryOperations =
  {
    addCategoryOperation(state, action) {
      state.categories.push({
        id: action.input.id,
        name: action.input.name,
        color: action.input.color,
        description: action.input.description || null,
      });
    },
    updateCategoryOperation(state, action) {
      const cat = state.categories.find((c) => c.id === action.input.id);
      if (!cat) return;
      if (action.input.name) cat.name = action.input.name;
      if (action.input.color) cat.color = action.input.color;
      if (action.input.description) cat.description = action.input.description;
    },
    removeCategoryOperation(state, action) {
      const idx = state.categories.findIndex((c) => c.id === action.input.id);
      if (idx !== -1) state.categories.splice(idx, 1);
    },
  };
