import { DruidClient } from "@druid-sh/sdk";

if (!process.env.NEXT_PUBLIC_DRUID_API_KEY) {
  throw new Error("NEXT_PUBLIC_DRUID_API_KEY environment variable not set");
}

export const druid = new DruidClient({
  apiKey: process.env.NEXT_PUBLIC_DRUID_API_KEY,
  basePath: "/blog",
  siteName: "Druid SDK Demo",
  projectId: "cmftu6fr20000340cumkdxrre",
});
