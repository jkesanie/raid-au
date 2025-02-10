import packageJson from "@/../package.json";
import ContributorDisplayV2 from "./ContributorDisplayV2";
import ContributorDisplayV3 from "./ContributorDisplayV3";

export const ContributorDisplay =
packageJson.apiVersion === "3" ? ContributorDisplayV3 : ContributorDisplayV2;
