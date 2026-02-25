import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/architecture-map",
  name: "ArchitectureMap",
  extension: "pham",
  description:
    "A living registry of Powerhouse document models, their relationships, external integrations, and categorical organization across the Switchboard ecosystem.",
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            "enum ModelCategory {\n    Finance\n    Identity\n    Services\n    Projects\n}\n\nenum RelationshipType {\n    Reference\n    Dependency\n    DataFlow\n}\n\nenum IntegrationDirection {\n    Inbound\n    Outbound\n}\n\ntype ExternalIntegration {\n    provider: String!\n    direction: IntegrationDirection!\n    description: String\n}\n\ntype DocumentModel {\n    id: ID!\n    name: String!\n    type: String!\n    category: ModelCategory!\n    description: String\n    operationCount: Int!\n    hasTypedState: Boolean!\n    externalIntegrations: [ExternalIntegration!]!\n}\n\ntype Relationship {\n    id: ID!\n    sourceModelType: String!\n    targetModelType: String!\n    fieldName: String!\n    relationshipType: RelationshipType!\n    description: String\n}\n\ntype Integration {\n    id: ID!\n    modelType: String!\n    provider: String!\n    direction: IntegrationDirection!\n    description: String\n}\n\ntype Category {\n    id: ID!\n    name: String!\n    color: String!\n    description: String\n}\n\ntype DriveApp {\n    id: ID!\n    name: String!\n    slug: String!\n    description: String\n    color: String\n    modelTypes: [String!]!\n}\n\ntype ArchitectureMapState {\n    models: [DocumentModel!]!\n    relationships: [Relationship!]!\n    integrations: [Integration!]!\n    categories: [Category!]!\n    driveApps: [DriveApp!]!\n}",
          initialValue:
            '{"categories":[{"id":"cat-finance","name":"Finance & Accounting","color":"#fff3e0","description":"Financial tracking, reporting, billing, and invoicing models"},{"id":"cat-identity","name":"Organization & Identity","color":"#e8f5e9","description":"Builder profiles, organizational hubs, and network identity models"},{"id":"cat-services","name":"Services & Subscriptions","color":"#f3e5f5","description":"Service catalog, subscription management, and resource provisioning models"},{"id":"cat-projects","name":"Projects & Procurement","color":"#e0f7fa","description":"Project scoping, procurement workflows, and payment terms models"}],"models":[{"id":"m-accounts","name":"Accounts","type":"powerhouse/accounts","category":"Finance","description":"Document model for managing accounts with KYC/AML status tracking","operationCount":4,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-account-transactions","name":"AccountTransactions","type":"powerhouse/account-transactions","category":"Finance","description":"Tracks and manages all transactions associated with various accounts including crypto and bank transactions","operationCount":10,"hasTypedState":true,"externalIntegrations":[{"provider":"Alchemy","direction":"Inbound","description":"Fetches Ethereum transactions by wallet address"}]},{"id":"m-snapshot-report","name":"Snapshot Report","type":"powerhouse/snapshot-report","category":"Finance","description":"Creates snapshot reports that track fund flows through categorized accounts over a specified accounting period","operationCount":18,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-expense-report","name":"ExpenseReport","type":"powerhouse/expense-report","category":"Finance","description":"Contains expenses across wallets and dimensions including expense types and categories with billing statement integration","operationCount":18,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-billing-statement","name":"Billing Statement","type":"powerhouse/billing-statement","category":"Finance","description":"Captures a contributor\'s issued charges with itemized line entries and auto-calculated totals in cash and POWT","operationCount":7,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-invoice","name":"Invoice","type":"powerhouse/invoice","category":"Finance","description":"Allows a contributor to request compensation based on their contributions with on-chain payment execution","operationCount":31,"hasTypedState":true,"externalIntegrations":[{"provider":"Gnosis Safe","direction":"Outbound","description":"Executes on-chain multisig payments"},{"provider":"Request Finance","direction":"Outbound","description":"Creates payment requests"},{"provider":"PDF upload","direction":"Inbound","description":"Chunked PDF file attachment"}]},{"id":"m-builder-profile","name":"BuilderProfile","type":"powerhouse/builder-profile","category":"Identity","description":"A builder profile document representing individual contributors in the ecosystem","operationCount":12,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-builders","name":"Builders","type":"powerhouse/builders","category":"Identity","description":"Registry of builders that references individual builder profiles","operationCount":2,"hasTypedState":false,"externalIntegrations":[]},{"id":"m-operational-hub-profile","name":"OperationalHubProfile","type":"powerhouse/operational-hub-profile","category":"Identity","description":"Profile document for Operational Hubs managing operator team assignment and subteam relationships","operationCount":4,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-network-profile","name":"NetworkProfile","type":"powerhouse/network-profile","category":"Identity","description":"Network-level profile configuration and settings","operationCount":11,"hasTypedState":false,"externalIntegrations":[]},{"id":"m-facet","name":"Facet","type":"powerhouse/facet","category":"Services","description":"Defines categorical options used to customize service offerings such as SNO Function, Legal Entity Type, and Team configurations","operationCount":6,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-resource-template","name":"ResourceTemplate","type":"powerhouse/resource-template","category":"Services","description":"Defines resource templates with core product info, target audiences, facet configurations, and service definitions","operationCount":28,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-service-offering","name":"ServiceOffering","type":"powerhouse/service-offering","category":"Services","description":"Defines operator service offerings with subscription tiers, multi-billing cycle pricing, facet bindings, and usage limits for the ACHRA Marketplace","operationCount":51,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-service-subscription","name":"ServiceSubscription","type":"powerhouse/service-subscription","category":"Services","description":"Tracks a customer\'s subscription to a service offering including usage, billing projections, and auto-renewal","operationCount":12,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-subscription-instance","name":"Subscription Instance","type":"powerhouse/subscription-instance","category":"Services","description":"Tracks subscription instances for customers including services, usage metrics, and billing projections","operationCount":39,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-resource-instance","name":"ResourceInstance","type":"powerhouse/resource-instance","category":"Services","description":"Represents a customer\'s configured resource instance based on template and facet selections","operationCount":19,"hasTypedState":true,"externalIntegrations":[]},{"id":"m-scope-of-work","name":"Scope of Work","type":"powerhouse/scope-of-work","category":"Projects","description":"Defines project scope including deliverables, milestones, and acceptance criteria","operationCount":33,"hasTypedState":false,"externalIntegrations":[]},{"id":"m-workstream","name":"Workstream","type":"powerhouse/workstream","category":"Projects","description":"Manages work streams linking RFPs, scoping, and payment flows","operationCount":9,"hasTypedState":false,"externalIntegrations":[]},{"id":"m-request-for-proposals","name":"Request for Proposals","type":"powerhouse/request-for-proposals","category":"Projects","description":"Manages the proposal solicitation process for project procurement","operationCount":6,"hasTypedState":false,"externalIntegrations":[]},{"id":"m-payment-terms","name":"Payment Terms","type":"powerhouse/payment-terms","category":"Projects","description":"Defines payment schedules, terms, and conditions for project compensation","operationCount":16,"hasTypedState":false,"externalIntegrations":[]}],"relationships":[{"id":"r-np-ohp","sourceModelType":"powerhouse/network-profile","targetModelType":"powerhouse/operational-hub-profile","fieldName":"association","relationshipType":"Reference","description":"Network profile associates with operational hub profiles"},{"id":"r-ohp-bp-team","sourceModelType":"powerhouse/operational-hub-profile","targetModelType":"powerhouse/builder-profile","fieldName":"operatorTeam","relationshipType":"Reference","description":"Operational hub assigns builder profiles as operator team members"},{"id":"r-ohp-bp-sub","sourceModelType":"powerhouse/operational-hub-profile","targetModelType":"powerhouse/builder-profile","fieldName":"subteams","relationshipType":"Reference","description":"Operational hub organizes builder profiles into subteams"},{"id":"r-bp-ohp","sourceModelType":"powerhouse/builder-profile","targetModelType":"powerhouse/operational-hub-profile","fieldName":"opHubMember","relationshipType":"Reference","description":"Builder profile references its operational hub membership"},{"id":"r-bld-bp","sourceModelType":"powerhouse/builders","targetModelType":"powerhouse/builder-profile","fieldName":"addBuilder","relationshipType":"Reference","description":"Builders registry references individual builder profiles"},{"id":"r-acc-at","sourceModelType":"powerhouse/accounts","targetModelType":"powerhouse/account-transactions","fieldName":"accountTransactionsId","relationshipType":"Reference","description":"Account links to its transaction history"},{"id":"r-sr-acc","sourceModelType":"powerhouse/snapshot-report","targetModelType":"powerhouse/accounts","fieldName":"accountsDocumentId","relationshipType":"Reference","description":"Snapshot report references accounts for fund flow tracking"},{"id":"r-sr-at","sourceModelType":"powerhouse/snapshot-report","targetModelType":"powerhouse/account-transactions","fieldName":"accountTransactionsId","relationshipType":"Reference","description":"Snapshot report references transaction data"},{"id":"r-er-acc","sourceModelType":"powerhouse/expense-report","targetModelType":"powerhouse/accounts","fieldName":"accountDocumentId","relationshipType":"Reference","description":"Expense report references accounts for expense tracking"},{"id":"r-er-at","sourceModelType":"powerhouse/expense-report","targetModelType":"powerhouse/account-transactions","fieldName":"accountTransactionsDocId","relationshipType":"Reference","description":"Expense report references transaction data"},{"id":"r-bs-bp","sourceModelType":"powerhouse/billing-statement","targetModelType":"powerhouse/builder-profile","fieldName":"contributor","relationshipType":"Reference","description":"Billing statement references the contributor builder profile"},{"id":"r-sr-bp","sourceModelType":"powerhouse/snapshot-report","targetModelType":"powerhouse/builder-profile","fieldName":"ownerIds","relationshipType":"Reference","description":"Snapshot report references owner builder profiles"},{"id":"r-er-bp","sourceModelType":"powerhouse/expense-report","targetModelType":"powerhouse/builder-profile","fieldName":"ownerId","relationshipType":"Reference","description":"Expense report references owner builder profile"},{"id":"r-rt-fac","sourceModelType":"powerhouse/resource-template","targetModelType":"powerhouse/facet","fieldName":"facetBindings","relationshipType":"Reference","description":"Resource template binds to facets for configuration"},{"id":"r-so-fac","sourceModelType":"powerhouse/service-offering","targetModelType":"powerhouse/facet","fieldName":"facetBindings","relationshipType":"Reference","description":"Service offering binds to facets for customization"},{"id":"r-so-rt","sourceModelType":"powerhouse/service-offering","targetModelType":"powerhouse/resource-template","fieldName":"resourceTemplateId","relationshipType":"Reference","description":"Service offering references its resource template"},{"id":"r-so-bp","sourceModelType":"powerhouse/service-offering","targetModelType":"powerhouse/builder-profile","fieldName":"operatorId","relationshipType":"Reference","description":"Service offering references its operator"},{"id":"r-rt-bp","sourceModelType":"powerhouse/resource-template","targetModelType":"powerhouse/builder-profile","fieldName":"operatorId","relationshipType":"Reference","description":"Resource template references its operator"},{"id":"r-ss-so","sourceModelType":"powerhouse/service-subscription","targetModelType":"powerhouse/service-offering","fieldName":"serviceOfferingId","relationshipType":"Reference","description":"Subscription references the service offering"},{"id":"r-ss-rt","sourceModelType":"powerhouse/service-subscription","targetModelType":"powerhouse/resource-template","fieldName":"resourceTemplateId","relationshipType":"Reference","description":"Subscription references the resource template"},{"id":"r-ss-bp","sourceModelType":"powerhouse/service-subscription","targetModelType":"powerhouse/builder-profile","fieldName":"customerId","relationshipType":"Reference","description":"Subscription references the customer builder profile"},{"id":"r-si-so","sourceModelType":"powerhouse/subscription-instance","targetModelType":"powerhouse/service-offering","fieldName":"serviceOfferingId","relationshipType":"Reference","description":"Subscription instance references the service offering"},{"id":"r-si-ri","sourceModelType":"powerhouse/subscription-instance","targetModelType":"powerhouse/resource-instance","fieldName":"resource","relationshipType":"Reference","description":"Subscription instance references its resource instance"},{"id":"r-si-bp-op","sourceModelType":"powerhouse/subscription-instance","targetModelType":"powerhouse/builder-profile","fieldName":"operatorId","relationshipType":"Reference","description":"Subscription instance references the operator"},{"id":"r-si-bp-cust","sourceModelType":"powerhouse/subscription-instance","targetModelType":"powerhouse/builder-profile","fieldName":"customerId","relationshipType":"Reference","description":"Subscription instance references the customer"},{"id":"r-ri-rt","sourceModelType":"powerhouse/resource-instance","targetModelType":"powerhouse/resource-template","fieldName":"resourceTemplateId","relationshipType":"Reference","description":"Resource instance references its resource template"},{"id":"r-ri-bp","sourceModelType":"powerhouse/resource-instance","targetModelType":"powerhouse/builder-profile","fieldName":"customerId","relationshipType":"Reference","description":"Resource instance references the customer"},{"id":"r-ws-rfp","sourceModelType":"powerhouse/workstream","targetModelType":"powerhouse/request-for-proposals","fieldName":"requestForProposal","relationshipType":"Reference","description":"Workstream references its request for proposals"},{"id":"r-ws-inv","sourceModelType":"powerhouse/workstream","targetModelType":"powerhouse/invoice","fieldName":"paymentRequests","relationshipType":"DataFlow","description":"Workstream routes payment requests to invoices"}],"integrations":[{"id":"i-at-alchemy","modelType":"powerhouse/account-transactions","provider":"Alchemy","direction":"Inbound","description":"Fetches Ethereum transactions by wallet address via Alchemy API"},{"id":"i-inv-gnosis","modelType":"powerhouse/invoice","provider":"Gnosis Safe","direction":"Outbound","description":"Executes on-chain multisig payments via Gnosis Safe"},{"id":"i-inv-reqfi","modelType":"powerhouse/invoice","provider":"Request Finance","direction":"Outbound","description":"Creates payment requests via Request Finance"},{"id":"i-inv-pdf","modelType":"powerhouse/invoice","provider":"PDF upload","direction":"Inbound","description":"Chunked PDF file attachment for invoice documentation"}],"driveApps":[{"id":"da-contributor-billing","name":"Contributor Billing","slug":"contributor-billing","description":"Drive app for contributor invoicing, billing statements, and expense management","color":"#fbbf24","modelTypes":["powerhouse/invoice","powerhouse/billing-statement","powerhouse/expense-report","powerhouse/accounts","powerhouse/resource-instance","powerhouse/subscription-instance"]},{"id":"da-builder-team-admin","name":"Builder Team Admin","slug":"builder-team-admin","description":"Drive app for managing builder profiles, service offerings, and team resources","color":"#34d399","modelTypes":["powerhouse/builder-profile","powerhouse/expense-report","powerhouse/snapshot-report","powerhouse/resource-template","powerhouse/service-offering","powerhouse/resource-instance","powerhouse/subscription-instance"]},{"id":"da-network-admin","name":"Network Admin","slug":"network-admin","description":"Drive app for network governance, workstreams, and procurement workflows","color":"#60a5fa","modelTypes":["powerhouse/workstream","powerhouse/request-for-proposals","powerhouse/payment-terms","powerhouse/network-profile"]},{"id":"da-finances","name":"Finances","slug":"finances","description":"Drive app for account management and transaction tracking","color":"#f472b6","modelTypes":["powerhouse/accounts","powerhouse/account-transactions"]}]}',
          examples: [],
        },
        local: {
          schema: "",
          initialValue: "",
          examples: [],
        },
      },
      modules: [
        {
          id: "mod-model",
          name: "model",
          description:
            "Operations for managing document model entries in the architecture map",
          operations: [
            {
              id: "op-add-model",
              name: "ADD_MODEL",
              description:
                "Adds a new document model entry to the architecture map",
              schema:
                "input ExternalIntegrationInput {\n    provider: String!\n    direction: IntegrationDirection!\n    description: String\n}\n\ninput AddModelInput {\n    id: ID!\n    name: String!\n    type: String!\n    category: ModelCategory!\n    description: String\n    operationCount: Int!\n    hasTypedState: Boolean!\n    externalIntegrations: [ExternalIntegrationInput!]\n}",
              template:
                "Adds a new document model entry to the architecture map",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-model",
              name: "UPDATE_MODEL",
              description: "Updates an existing document model entry",
              schema:
                "input UpdateModelInput {\n    id: ID!\n    name: String\n    type: String\n    category: ModelCategory\n    description: String\n    operationCount: Int\n    hasTypedState: Boolean\n    externalIntegrations: [ExternalIntegrationInput!]\n}",
              template: "Updates an existing document model entry",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-model",
              name: "REMOVE_MODEL",
              description:
                "Removes a document model entry from the architecture map",
              schema: "input RemoveModelInput {\n    id: ID!\n}",
              template:
                "Removes a document model entry from the architecture map",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-relationship",
          name: "relationship",
          description:
            "Operations for managing relationships between document models",
          operations: [
            {
              id: "op-add-rel",
              name: "ADD_RELATIONSHIP",
              description: "Adds a relationship between two document models",
              schema:
                "input AddRelationshipInput {\n    id: ID!\n    sourceModelType: String!\n    targetModelType: String!\n    fieldName: String!\n    relationshipType: RelationshipType!\n    description: String\n}",
              template: "Adds a relationship between two document models",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-rel",
              name: "UPDATE_RELATIONSHIP",
              description: "Updates an existing relationship",
              schema:
                "input UpdateRelationshipInput {\n    id: ID!\n    sourceModelType: String\n    targetModelType: String\n    fieldName: String\n    relationshipType: RelationshipType\n    description: String\n}",
              template: "Updates an existing relationship",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-rel",
              name: "REMOVE_RELATIONSHIP",
              description: "Removes a relationship from the architecture map",
              schema: "input RemoveRelationshipInput {\n    id: ID!\n}",
              template: "Removes a relationship from the architecture map",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-integration",
          name: "integration",
          description:
            "Operations for managing external integrations with document models",
          operations: [
            {
              id: "op-add-integ",
              name: "ADD_INTEGRATION",
              description:
                "Adds an external integration entry for a document model",
              schema:
                "input AddIntegrationInput {\n    id: ID!\n    modelType: String!\n    provider: String!\n    direction: IntegrationDirection!\n    description: String\n}",
              template:
                "Adds an external integration entry for a document model",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-integ",
              name: "UPDATE_INTEGRATION",
              description: "Updates an existing integration entry",
              schema:
                "input UpdateIntegrationInput {\n    id: ID!\n    modelType: String\n    provider: String\n    direction: IntegrationDirection\n    description: String\n}",
              template: "Updates an existing integration entry",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-integ",
              name: "REMOVE_INTEGRATION",
              description:
                "Removes an integration entry from the architecture map",
              schema: "input RemoveIntegrationInput {\n    id: ID!\n}",
              template:
                "Removes an integration entry from the architecture map",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-category",
          name: "category",
          description: "Operations for managing model categories",
          operations: [
            {
              id: "op-add-cat",
              name: "ADD_CATEGORY",
              description: "Adds a new model category",
              schema:
                "input AddCategoryInput {\n    id: ID!\n    name: String!\n    color: String!\n    description: String\n}",
              template: "Adds a new model category",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-cat",
              name: "UPDATE_CATEGORY",
              description: "Updates an existing category",
              schema:
                "input UpdateCategoryInput {\n    id: ID!\n    name: String\n    color: String\n    description: String\n}",
              template: "Updates an existing category",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-cat",
              name: "REMOVE_CATEGORY",
              description: "Removes a category from the architecture map",
              schema: "input RemoveCategoryInput {\n    id: ID!\n}",
              template: "Removes a category from the architecture map",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-drive-app",
          name: "driveApp",
          description: "Operations for managing drive app groupings",
          operations: [
            {
              id: "op-add-drive-app",
              name: "ADD_DRIVE_APP",
              description: "Adds a new drive app entry",
              schema:
                "input AddDriveAppInput {\n    id: ID!\n    name: String!\n    slug: String!\n    description: String\n    color: String\n    modelTypes: [String!]!\n}",
              template: "Adds a new drive app entry",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-drive-app",
              name: "UPDATE_DRIVE_APP",
              description: "Updates an existing drive app entry",
              schema:
                "input UpdateDriveAppInput {\n    id: ID!\n    name: String\n    slug: String\n    description: String\n    color: String\n    modelTypes: [String!]\n}",
              template: "Updates an existing drive app entry",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-drive-app",
              name: "REMOVE_DRIVE_APP",
              description: "Removes a drive app entry",
              schema: "input RemoveDriveAppInput {\n    id: ID!\n}",
              template: "Removes a drive app entry",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
    },
  ],
};
