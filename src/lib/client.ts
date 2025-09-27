import { DruidClient } from "@druid-sh/sdk";

if (!process.env.NEXT_PUBLIC_DRUID_API_KEY) {
  throw new Error("NEXT_PUBLIC_DRUID_API_KEY environment variable not set");
}

export const druid = new DruidClient({
  apiKey: process.env.NEXT_PUBLIC_DRUID_API_KEY,
  basePath: "/blog",
  siteName: "Druid Demo",
  projectId: "cmfuwykoc0000tr0cilyke3ld",
  paginationLimit: 10,
});
