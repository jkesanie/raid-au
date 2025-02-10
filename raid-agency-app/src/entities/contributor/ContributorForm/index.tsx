import packageJson from "@/../package.json";
import ContributorFormV2 from "./ContributorFormV2";
import ContributorFormV3 from "./ContributorFormV3";

export const ContributorForm =
  packageJson.apiVersion === "3" ? ContributorFormV3 : ContributorFormV2;
