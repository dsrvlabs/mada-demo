const path = require("path");
const axios = require("axios");
const fs = require("fs");

const generatePossibleTypes = async () => {
  const schema = await axios.post("http://localhost:8000/graphql/", {
    variables: {},
    query: `
  {
    __schema {
      types {
        kind
        name
        possibleTypes {
          name
        }
      }
    }
  }`,
    Headers: { "Content-Type": "application/json" },
  });

  const possibleTypes = {};

  schema.data.data.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
    }
  });

  fs.writeFile(
    path.resolve(__dirname, "../../libs/graphql/client/possibleTypes.ts"),
    `/* eslint-disable */\n/* prettier-ignore */\nexport const possibleTypes = ${JSON.stringify(possibleTypes)}`,
    (err) => {
      if (err) {
        console.error("Error writing possibleTypes.json", err);
      } else {
        console.log("Fragment types successfully extracted!");
      }
    },
  );
};

generatePossibleTypes();
