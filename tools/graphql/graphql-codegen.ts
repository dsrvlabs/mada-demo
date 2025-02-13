import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "libs/graphql/schema.graphql",
  documents: [],
  generates: {
    "libs/graphql/client/src/lib/requests/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      documents: ["libs/graphql/client/src/lib/requests/**/*.ts"],
    },
  },
  ignoreNoDocuments: true,
  config: {
    skipTypename: true,
    namingConvention: {
      enumValues: "change-case-all#upperCase",
    },
    enumsAsTypes: true,
  },
};

export default config;
