import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "a9y0mdbm",
  dataset: "production",
  apiVersion: "2025-02-27",
  useCdn: false,
};

const client = createClient(config);

export default client;
