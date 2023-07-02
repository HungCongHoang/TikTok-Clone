import { SanityClient } from "@sanity/client";
import { createClient } from "next-sanity";
//export default SanityClient({
export const client = createClient({
  projectId: "65scayt7",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
