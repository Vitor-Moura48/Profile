import type { Metadata } from "next";
import { metadata as metadataConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: metadataConfig.HOME.title,
  description: metadataConfig.HOME.description,
  openGraph: {
    title: metadataConfig.HOME.title,
    description: metadataConfig.HOME.description,
    type: "website",
  },
};
