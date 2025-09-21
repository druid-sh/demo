import { DruidClient } from "@druid-sh/sdk";

if (!process.env.NEXT_PUBLIC_DRUID_API_KEY) {
  throw new Error("DRUID_API_KEY environment variable not set");
}

export const druid = new DruidClient({
  apiKey: process.env.NEXT_PUBLIC_DRUID_API_KEY,
  basePath: "/blog",
  siteName: "Druid SDK Demo",
  projectId: "cmfs7908t0000z30cjuy8uca0",
});
