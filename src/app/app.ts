import { MemoryStorage, MessageFactory, TurnContext } from "botbuilder";
import * as path from "path";
import config from "../config";
import fs from 'fs';
import * as restify from "restify";

// See https://aka.ms/teams-ai-library to learn more about the Teams AI library.
import { Application, ActionPlanner, OpenAIModel, PromptManager } from "@microsoft/teams-ai";

// Create AI components
const model = new OpenAIModel({
  azureApiKey: config.azureOpenAIKey,
  azureDefaultDeployment: config.azureOpenAIDeploymentName,
  azureEndpoint: config.azureOpenAIEndpoint,
  azureApiVersion: "2024-02-15-preview",

  useSystemMessages: true,
  logRequests: true,
});
const prompts = new PromptManager({
  promptsFolder: path.join(__dirname, "../prompts"),
});
const planner = new ActionPlanner({
  model,
  prompts,
  defaultPrompt: async () => {
    try {
      const template = await prompts.getPrompt('chat');
      const skprompt = fs.readFileSync(path.join(__dirname, '..', 'prompts', 'chat', 'skprompt.txt'));

      const dataSources = (template.config.completion as any)['data_sources'];

      dataSources.forEach((dataSource: any) => {
        if (dataSource.type === 'azure_search') {
          dataSource.parameters.authentication.key = config.azureSearchKey;
          dataSource.parameters.endpoint = config.azureSearchEndpoint;
          dataSource.parameters.indexName = config.indexName;
          dataSource.parameters.embedding_dependency.deployment_name =
            config.azureOpenAIEmbeddingDeploymentName;
          dataSource.parameters.role_information = `${skprompt.toString('utf-8')}`;
        }
      });

      return template;
    } catch (error) {
      console.error("Error in defaultPrompt:", error.message);
      throw new Error("Failed to generate default prompt. Please check your configuration and API parameters.");
    }
  },
});

// Define storage and application
const storage = new MemoryStorage();
const app = new Application({
  storage,
  ai: {
    planner,
    enable_feedback_loop: true,
  },
});

app.feedbackLoop(async (context, state, feedbackLoopData) => {
  //add custom feedback process logic here
  console.log("Your feedback is " + JSON.stringify(context.activity.value));
});

// Create a local server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

// Define the endpoint for Teams messages
server.post("/api/messages", async (req, res) => {
  try {
    await app.run(req, res);
  } catch (error) {
    console.error("[onTurnError] Unhandled error:", error);
    res.status(500);
    res.send("An error occurred while processing the request.");
  }
});

// Start the server
const PORT = process.env.port || 3978;
server.listen(PORT, () => {
  console.log(`Bot is running locally on http://localhost:${PORT}`);
  console.log("Use a tunneling service like ngrok to expose this endpoint for Teams.");
});

export default app;
