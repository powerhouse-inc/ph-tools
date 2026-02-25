// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { ArchitectureMapPHState } from "ph-arch-map/document-models/architecture-map";

import { architectureMapModelOperations } from "../src/reducers/model.js";
import { architectureMapRelationshipOperations } from "../src/reducers/relationship.js";
import { architectureMapIntegrationOperations } from "../src/reducers/integration.js";
import { architectureMapCategoryOperations } from "../src/reducers/category.js";
import { architectureMapDriveAppOperations } from "../src/reducers/drive-app.js";

import {
  AddModelInputSchema,
  UpdateModelInputSchema,
  RemoveModelInputSchema,
  AddRelationshipInputSchema,
  UpdateRelationshipInputSchema,
  RemoveRelationshipInputSchema,
  AddIntegrationInputSchema,
  UpdateIntegrationInputSchema,
  RemoveIntegrationInputSchema,
  AddCategoryInputSchema,
  UpdateCategoryInputSchema,
  RemoveCategoryInputSchema,
  AddDriveAppInputSchema,
  UpdateDriveAppInputSchema,
  RemoveDriveAppInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<ArchitectureMapPHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "ADD_MODEL": {
      AddModelInputSchema().parse(action.input);

      architectureMapModelOperations.addModelOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_MODEL": {
      UpdateModelInputSchema().parse(action.input);

      architectureMapModelOperations.updateModelOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_MODEL": {
      RemoveModelInputSchema().parse(action.input);

      architectureMapModelOperations.removeModelOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_RELATIONSHIP": {
      AddRelationshipInputSchema().parse(action.input);

      architectureMapRelationshipOperations.addRelationshipOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_RELATIONSHIP": {
      UpdateRelationshipInputSchema().parse(action.input);

      architectureMapRelationshipOperations.updateRelationshipOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_RELATIONSHIP": {
      RemoveRelationshipInputSchema().parse(action.input);

      architectureMapRelationshipOperations.removeRelationshipOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_INTEGRATION": {
      AddIntegrationInputSchema().parse(action.input);

      architectureMapIntegrationOperations.addIntegrationOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_INTEGRATION": {
      UpdateIntegrationInputSchema().parse(action.input);

      architectureMapIntegrationOperations.updateIntegrationOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_INTEGRATION": {
      RemoveIntegrationInputSchema().parse(action.input);

      architectureMapIntegrationOperations.removeIntegrationOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_CATEGORY": {
      AddCategoryInputSchema().parse(action.input);

      architectureMapCategoryOperations.addCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_CATEGORY": {
      UpdateCategoryInputSchema().parse(action.input);

      architectureMapCategoryOperations.updateCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_CATEGORY": {
      RemoveCategoryInputSchema().parse(action.input);

      architectureMapCategoryOperations.removeCategoryOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_DRIVE_APP": {
      AddDriveAppInputSchema().parse(action.input);

      architectureMapDriveAppOperations.addDriveAppOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_DRIVE_APP": {
      UpdateDriveAppInputSchema().parse(action.input);

      architectureMapDriveAppOperations.updateDriveAppOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_DRIVE_APP": {
      RemoveDriveAppInputSchema().parse(action.input);

      architectureMapDriveAppOperations.removeDriveAppOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer = createReducer<ArchitectureMapPHState>(stateReducer);
