import { CompSaved } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved",
  description: "Save all the posts you like on the saved page",
};

const SavedPage = () => <CompSaved />;

export default SavedPage;
