import type { ArchitectureMapRelationshipOperations } from "ph-arch-map/document-models/architecture-map";

export const architectureMapRelationshipOperations: ArchitectureMapRelationshipOperations =
  {
    addRelationshipOperation(state, action) {
      state.relationships.push({
        id: action.input.id,
        sourceModelType: action.input.sourceModelType,
        targetModelType: action.input.targetModelType,
        fieldName: action.input.fieldName,
        relationshipType: action.input.relationshipType,
        description: action.input.description || null,
      });
    },
    updateRelationshipOperation(state, action) {
      const rel = state.relationships.find((r) => r.id === action.input.id);
      if (!rel) return;
      if (action.input.sourceModelType)
        rel.sourceModelType = action.input.sourceModelType;
      if (action.input.targetModelType)
        rel.targetModelType = action.input.targetModelType;
      if (action.input.fieldName) rel.fieldName = action.input.fieldName;
      if (action.input.relationshipType)
        rel.relationshipType = action.input.relationshipType;
      if (action.input.description) rel.description = action.input.description;
    },
    removeRelationshipOperation(state, action) {
      const idx = state.relationships.findIndex(
        (r) => r.id === action.input.id,
      );
      if (idx !== -1) state.relationships.splice(idx, 1);
    },
  };
