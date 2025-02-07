import raidConfig from "@/../raid.config.json";
import ContributorFormV2 from "./ContributorFormV2";
import ContributorFormV3 from "./ContributorFormV3";

export const ContributorForm =
  raidConfig.version === "3" ? ContributorFormV3 : ContributorFormV2;
