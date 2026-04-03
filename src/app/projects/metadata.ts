import type { Metadata } from "next";
import { metadata as metadataConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: metadataConfig.PROJECTS.title,
  description: metadataConfig.PROJECTS.description,
  openGraph: {
    title: metadataConfig.PROJECTS.title,
    description: metadataConfig.PROJECTS.description,
    type: "website",
  },
};
