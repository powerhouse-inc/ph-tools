import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type {
  ArchitectureMapGlobalState,
  ArchitectureMapLocalState,
} from "./types.js";
import type { ArchitectureMapPHState } from "./types.js";
import { reducer } from "./reducer.js";
import { architectureMapDocumentType } from "./document-type.js";
import {
  isArchitectureMapDocument,
  assertIsArchitectureMapDocument,
  isArchitectureMapState,
  assertIsArchitectureMapState,
} from "./document-schema.js";

export const initialGlobalState: ArchitectureMapGlobalState = {
  categories: [
    {
      id: "cat-finance",
      name: "Finance & Accounting",
      color: "#fff3e0",
      description:
        "Financial tracking, reporting, billing, and invoicing models",
    },
    {
      id: "cat-identity",
      name: "Organization & Identity",
      color: "#e8f5e9",
      description:
        "Builder profiles, organizational hubs, and network identity models",
    },
    {
      id: "cat-services",
      name: "Services & Subscriptions",
      color: "#f3e5f5",
      description:
        "Service catalog, subscription management, and resource provisioning models",
    },
    {
      id: "cat-projects",
      name: "Projects & Procurement",
      color: "#e0f7fa",
      description:
        "Project scoping, procurement workflows, and payment terms models",
    },
  ],
  models: [
    {
      id: "m-accounts",
      name: "Accounts",
      type: "powerhouse/accounts",
      category: "Finance",
      description:
        "Document model for managing accounts with KYC/AML status tracking",
      operationCount: 4,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-account-transactions",
      name: "AccountTransactions",
      type: "powerhouse/account-transactions",
      category: "Finance",
      description:
        "Tracks and manages all transactions associated with various accounts including crypto and bank transactions",
      operationCount: 10,
      hasTypedState: true,
      externalIntegrations: [
        {
          provider: "Alchemy",
          direction: "Inbound",
          description: "Fetches Ethereum transactions by wallet address",
        },
      ],
    },
    {
      id: "m-snapshot-report",
      name: "Snapshot Report",
      type: "powerhouse/snapshot-report",
      category: "Finance",
      description:
        "Creates snapshot reports that track fund flows through categorized accounts over a specified accounting period",
      operationCount: 18,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-expense-report",
      name: "ExpenseReport",
      type: "powerhouse/expense-report",
      category: "Finance",
      description:
        "Contains expenses across wallets and dimensions including expense types and categories with billing statement integration",
      operationCount: 18,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-billing-statement",
      name: "Billing Statement",
      type: "powerhouse/billing-statement",
      category: "Finance",
      description:
        "Captures a contributor's issued charges with itemized line entries and auto-calculated totals in cash and POWT",
      operationCount: 7,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-invoice",
      name: "Invoice",
      type: "powerhouse/invoice",
      category: "Finance",
      description:
        "Allows a contributor to request compensation based on their contributions with on-chain payment execution",
      operationCount: 31,
      hasTypedState: true,
      externalIntegrations: [
        {
          provider: "Gnosis Safe",
          direction: "Outbound",
          description: "Executes on-chain multisig payments",
        },
        {
          provider: "Request Finance",
          direction: "Outbound",
          description: "Creates payment requests",
        },
        {
          provider: "PDF upload",
          direction: "Inbound",
          description: "Chunked PDF file attachment",
        },
      ],
    },
    {
      id: "m-builder-profile",
      name: "BuilderProfile",
      type: "powerhouse/builder-profile",
      category: "Identity",
      description:
        "A builder profile document representing individual contributors in the ecosystem",
      operationCount: 12,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-builders",
      name: "Builders",
      type: "powerhouse/builders",
      category: "Identity",
      description:
        "Registry of builders that references individual builder profiles",
      operationCount: 2,
      hasTypedState: false,
      externalIntegrations: [],
    },
    {
      id: "m-operational-hub-profile",
      name: "OperationalHubProfile",
      type: "powerhouse/operational-hub-profile",
      category: "Identity",
      description:
        "Profile document for Operational Hubs managing operator team assignment and subteam relationships",
      operationCount: 4,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-network-profile",
      name: "NetworkProfile",
      type: "powerhouse/network-profile",
      category: "Identity",
      description: "Network-level profile configuration and settings",
      operationCount: 11,
      hasTypedState: false,
      externalIntegrations: [],
    },
    {
      id: "m-facet",
      name: "Facet",
      type: "powerhouse/facet",
      category: "Services",
      description:
        "Defines categorical options used to customize service offerings such as SNO Function, Legal Entity Type, and Team configurations",
      operationCount: 6,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-resource-template",
      name: "ResourceTemplate",
      type: "powerhouse/resource-template",
      category: "Services",
      description:
        "Defines resource templates with core product info, target audiences, facet configurations, and service definitions",
      operationCount: 28,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-service-offering",
      name: "ServiceOffering",
      type: "powerhouse/service-offering",
      category: "Services",
      description:
        "Defines operator service offerings with subscription tiers, multi-billing cycle pricing, facet bindings, and usage limits for the ACHRA Marketplace",
      operationCount: 51,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-service-subscription",
      name: "ServiceSubscription",
      type: "powerhouse/service-subscription",
      category: "Services",
      description:
        "Tracks a customer's subscription to a service offering including usage, billing projections, and auto-renewal",
      operationCount: 12,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-subscription-instance",
      name: "Subscription Instance",
      type: "powerhouse/subscription-instance",
      category: "Services",
      description:
        "Tracks subscription instances for customers including services, usage metrics, and billing projections",
      operationCount: 39,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-resource-instance",
      name: "ResourceInstance",
      type: "powerhouse/resource-instance",
      category: "Services",
      description:
        "Represents a customer's configured resource instance based on template and facet selections",
      operationCount: 19,
      hasTypedState: true,
      externalIntegrations: [],
    },
    {
      id: "m-scope-of-work",
      name: "Scope of Work",
      type: "powerhouse/scope-of-work",
      category: "Projects",
      description:
        "Defines project scope including deliverables, milestones, and acceptance criteria",
      operationCount: 33,
      hasTypedState: false,
      externalIntegrations: [],
    },
    {
      id: "m-workstream",
      name: "Workstream",
      type: "powerhouse/workstream",
      category: "Projects",
      description:
        "Manages work streams linking RFPs, scoping, and payment flows",
      operationCount: 9,
      hasTypedState: false,
      externalIntegrations: [],
    },
    {
      id: "m-request-for-proposals",
      name: "Request for Proposals",
      type: "powerhouse/request-for-proposals",
      category: "Projects",
      description:
        "Manages the proposal solicitation process for project procurement",
      operationCount: 6,
      hasTypedState: false,
      externalIntegrations: [],
    },
    {
      id: "m-payment-terms",
      name: "Payment Terms",
      type: "powerhouse/payment-terms",
      category: "Projects",
      description:
        "Defines payment schedules, terms, and conditions for project compensation",
      operationCount: 16,
      hasTypedState: false,
      externalIntegrations: [],
    },
  ],
  relationships: [
    {
      id: "r-np-ohp",
      sourceModelType: "powerhouse/network-profile",
      targetModelType: "powerhouse/operational-hub-profile",
      fieldName: "association",
      relationshipType: "Reference",
      description: "Network profile associates with operational hub profiles",
    },
    {
      id: "r-ohp-bp-team",
      sourceModelType: "powerhouse/operational-hub-profile",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "operatorTeam",
      relationshipType: "Reference",
      description:
        "Operational hub assigns builder profiles as operator team members",
    },
    {
      id: "r-ohp-bp-sub",
      sourceModelType: "powerhouse/operational-hub-profile",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "subteams",
      relationshipType: "Reference",
      description: "Operational hub organizes builder profiles into subteams",
    },
    {
      id: "r-bp-ohp",
      sourceModelType: "powerhouse/builder-profile",
      targetModelType: "powerhouse/operational-hub-profile",
      fieldName: "opHubMember",
      relationshipType: "Reference",
      description: "Builder profile references its operational hub membership",
    },
    {
      id: "r-bld-bp",
      sourceModelType: "powerhouse/builders",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "addBuilder",
      relationshipType: "Reference",
      description: "Builders registry references individual builder profiles",
    },
    {
      id: "r-acc-at",
      sourceModelType: "powerhouse/accounts",
      targetModelType: "powerhouse/account-transactions",
      fieldName: "accountTransactionsId",
      relationshipType: "Reference",
      description: "Account links to its transaction history",
    },
    {
      id: "r-sr-acc",
      sourceModelType: "powerhouse/snapshot-report",
      targetModelType: "powerhouse/accounts",
      fieldName: "accountsDocumentId",
      relationshipType: "Reference",
      description: "Snapshot report references accounts for fund flow tracking",
    },
    {
      id: "r-sr-at",
      sourceModelType: "powerhouse/snapshot-report",
      targetModelType: "powerhouse/account-transactions",
      fieldName: "accountTransactionsId",
      relationshipType: "Reference",
      description: "Snapshot report references transaction data",
    },
    {
      id: "r-er-acc",
      sourceModelType: "powerhouse/expense-report",
      targetModelType: "powerhouse/accounts",
      fieldName: "accountDocumentId",
      relationshipType: "Reference",
      description: "Expense report references accounts for expense tracking",
    },
    {
      id: "r-er-at",
      sourceModelType: "powerhouse/expense-report",
      targetModelType: "powerhouse/account-transactions",
      fieldName: "accountTransactionsDocId",
      relationshipType: "Reference",
      description: "Expense report references transaction data",
    },
    {
      id: "r-bs-bp",
      sourceModelType: "powerhouse/billing-statement",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "contributor",
      relationshipType: "Reference",
      description:
        "Billing statement references the contributor builder profile",
    },
    {
      id: "r-sr-bp",
      sourceModelType: "powerhouse/snapshot-report",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "ownerIds",
      relationshipType: "Reference",
      description: "Snapshot report references owner builder profiles",
    },
    {
      id: "r-er-bp",
      sourceModelType: "powerhouse/expense-report",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "ownerId",
      relationshipType: "Reference",
      description: "Expense report references owner builder profile",
    },
    {
      id: "r-rt-fac",
      sourceModelType: "powerhouse/resource-template",
      targetModelType: "powerhouse/facet",
      fieldName: "facetBindings",
      relationshipType: "Reference",
      description: "Resource template binds to facets for configuration",
    },
    {
      id: "r-so-fac",
      sourceModelType: "powerhouse/service-offering",
      targetModelType: "powerhouse/facet",
      fieldName: "facetBindings",
      relationshipType: "Reference",
      description: "Service offering binds to facets for customization",
    },
    {
      id: "r-so-rt",
      sourceModelType: "powerhouse/service-offering",
      targetModelType: "powerhouse/resource-template",
      fieldName: "resourceTemplateId",
      relationshipType: "Reference",
      description: "Service offering references its resource template",
    },
    {
      id: "r-so-bp",
      sourceModelType: "powerhouse/service-offering",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "operatorId",
      relationshipType: "Reference",
      description: "Service offering references its operator",
    },
    {
      id: "r-rt-bp",
      sourceModelType: "powerhouse/resource-template",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "operatorId",
      relationshipType: "Reference",
      description: "Resource template references its operator",
    },
    {
      id: "r-ss-so",
      sourceModelType: "powerhouse/service-subscription",
      targetModelType: "powerhouse/service-offering",
      fieldName: "serviceOfferingId",
      relationshipType: "Reference",
      description: "Subscription references the service offering",
    },
    {
      id: "r-ss-rt",
      sourceModelType: "powerhouse/service-subscription",
      targetModelType: "powerhouse/resource-template",
      fieldName: "resourceTemplateId",
      relationshipType: "Reference",
      description: "Subscription references the resource template",
    },
    {
      id: "r-ss-bp",
      sourceModelType: "powerhouse/service-subscription",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "customerId",
      relationshipType: "Reference",
      description: "Subscription references the customer builder profile",
    },
    {
      id: "r-si-so",
      sourceModelType: "powerhouse/subscription-instance",
      targetModelType: "powerhouse/service-offering",
      fieldName: "serviceOfferingId",
      relationshipType: "Reference",
      description: "Subscription instance references the service offering",
    },
    {
      id: "r-si-ri",
      sourceModelType: "powerhouse/subscription-instance",
      targetModelType: "powerhouse/resource-instance",
      fieldName: "resource",
      relationshipType: "Reference",
      description: "Subscription instance references its resource instance",
    },
    {
      id: "r-si-bp-op",
      sourceModelType: "powerhouse/subscription-instance",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "operatorId",
      relationshipType: "Reference",
      description: "Subscription instance references the operator",
    },
    {
      id: "r-si-bp-cust",
      sourceModelType: "powerhouse/subscription-instance",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "customerId",
      relationshipType: "Reference",
      description: "Subscription instance references the customer",
    },
    {
      id: "r-ri-rt",
      sourceModelType: "powerhouse/resource-instance",
      targetModelType: "powerhouse/resource-template",
      fieldName: "resourceTemplateId",
      relationshipType: "Reference",
      description: "Resource instance references its resource template",
    },
    {
      id: "r-ri-bp",
      sourceModelType: "powerhouse/resource-instance",
      targetModelType: "powerhouse/builder-profile",
      fieldName: "customerId",
      relationshipType: "Reference",
      description: "Resource instance references the customer",
    },
    {
      id: "r-ws-rfp",
      sourceModelType: "powerhouse/workstream",
      targetModelType: "powerhouse/request-for-proposals",
      fieldName: "requestForProposal",
      relationshipType: "Reference",
      description: "Workstream references its request for proposals",
    },
    {
      id: "r-ws-inv",
      sourceModelType: "powerhouse/workstream",
      targetModelType: "powerhouse/invoice",
      fieldName: "paymentRequests",
      relationshipType: "DataFlow",
      description: "Workstream routes payment requests to invoices",
    },
  ],
  integrations: [
    {
      id: "i-at-alchemy",
      modelType: "powerhouse/account-transactions",
      provider: "Alchemy",
      direction: "Inbound",
      description:
        "Fetches Ethereum transactions by wallet address via Alchemy API",
    },
    {
      id: "i-inv-gnosis",
      modelType: "powerhouse/invoice",
      provider: "Gnosis Safe",
      direction: "Outbound",
      description: "Executes on-chain multisig payments via Gnosis Safe",
    },
    {
      id: "i-inv-reqfi",
      modelType: "powerhouse/invoice",
      provider: "Request Finance",
      direction: "Outbound",
      description: "Creates payment requests via Request Finance",
    },
    {
      id: "i-inv-pdf",
      modelType: "powerhouse/invoice",
      provider: "PDF upload",
      direction: "Inbound",
      description: "Chunked PDF file attachment for invoice documentation",
    },
  ],
  driveApps: [
    {
      id: "da-contributor-billing",
      name: "Contributor Billing",
      slug: "contributor-billing",
      description:
        "Drive app for contributor invoicing, billing statements, and expense management",
      color: "#fbbf24",
      modelTypes: [
        "powerhouse/invoice",
        "powerhouse/billing-statement",
        "powerhouse/expense-report",
        "powerhouse/accounts",
        "powerhouse/resource-instance",
        "powerhouse/subscription-instance",
      ],
    },
    {
      id: "da-builder-team-admin",
      name: "Builder Team Admin",
      slug: "builder-team-admin",
      description:
        "Drive app for managing builder profiles, service offerings, and team resources",
      color: "#34d399",
      modelTypes: [
        "powerhouse/builder-profile",
        "powerhouse/expense-report",
        "powerhouse/snapshot-report",
        "powerhouse/resource-template",
        "powerhouse/service-offering",
        "powerhouse/resource-instance",
        "powerhouse/subscription-instance",
      ],
    },
    {
      id: "da-network-admin",
      name: "Network Admin",
      slug: "network-admin",
      description:
        "Drive app for network governance, workstreams, and procurement workflows",
      color: "#60a5fa",
      modelTypes: [
        "powerhouse/workstream",
        "powerhouse/request-for-proposals",
        "powerhouse/payment-terms",
        "powerhouse/network-profile",
      ],
    },
    {
      id: "da-finances",
      name: "Finances",
      slug: "finances",
      description: "Drive app for account management and transaction tracking",
      color: "#f472b6",
      modelTypes: ["powerhouse/accounts", "powerhouse/account-transactions"],
    },
  ],
};
export const initialLocalState: ArchitectureMapLocalState = {};

export const utils: DocumentModelUtils<ArchitectureMapPHState> = {
  fileExtension: "pham",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = architectureMapDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isArchitectureMapState(state);
  },
  assertIsStateOfType(state) {
    return assertIsArchitectureMapState(state);
  },
  isDocumentOfType(document) {
    return isArchitectureMapDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsArchitectureMapDocument(document);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromInput = utils.loadFromInput;
export const isStateOfType = utils.isStateOfType;
export const assertIsStateOfType = utils.assertIsStateOfType;
export const isDocumentOfType = utils.isDocumentOfType;
export const assertIsDocumentOfType = utils.assertIsDocumentOfType;
