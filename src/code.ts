// @ts-nocheck

/**
 * Figma simple parameters suggestions
 *
 * Note:
 * - To simplify the code we will ignore all typescript errors by writing @ts-nocheck at the top of the file :)
 *
 * 1. Menu configuration
 * - The visuals in the command palette are powered by two things:
 * - 1. the menu options defined in the manifest
 * - 2. the suggestions returned from the parameter 'input' event
 * - You can configure the menu options to allow for:
 * - - a single / multiple options
 * - - free form input
 * - - whether it's required
 *
 * 2. Responding to input / presenting suggestions
 * - The on input event function is called everytime a user types in the command palette
 * - We can use the command context and input query to return suggestions to the user
 * -- i.e. if the user is typing in a font name, we can return a list of fonts that match the query
 *
 * 3. Running the plugin
 * - Once all of the required menu options have been set by the user, the plugin will run
 * - At that point the "run" event will be triggered
 * - Within that function we have access to the command context and the set parameters
 * - Now we can execute our plugin logic
 * - Remember we have access to the figma global in this file so we can create text nodes etc.
 *
 * References:
 * - DOCS: https://www.figma.com/plugin-docs/plugin-parameters/
 */
const DEFAULT_FONT_CONFIG = { family: "Inter", style: "Regular" };

let suggestions = () => {
  return ["A", "B", "C"];
};

// https://www.figma.com/plugin-docs/api/figma-parameters/#suggestionresults
// - the key needs to match the parameter key from the manifest
figma.parameters.on("input", ({ key, query, result }) => {
  console.log("User typed: ", query);
  switch (key) {
    case "paramOne":
      result.setSuggestions(suggestions());
      break;
    case "paramThree":
      result.setSuggestions(suggestions());
      break;
    default:
      return;
  }
});

/**
 * Perform action after all parameters have been added
 * - DOCS: https://www.figma.com/plugin-docs/plugin-parameters/#run
 */
figma.on("run", async ({ command, parameters }) => {
  if (parameters) {
    console.log(
      "User made these selections:",
      JSON.stringify(
        {
          command,
          parameters: parameters
        },
        null,
        2
      )
    );

    switch (command) {
      case "commandOne":
        break;
      case "commandTwo":
        break;

      default:
        break;
    }
  }

  figma.closePlugin();
});

export {};
