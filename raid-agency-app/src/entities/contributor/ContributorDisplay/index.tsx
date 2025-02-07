import raidConfig from "@/../raid.config.json";
import ContributorDisplayV2 from "./ContributorDisplayV2";
import ContributorDisplayV3 from "./ContributorDisplayV3";

export const ContributorDisplay =
  raidConfig.version === "3" ? ContributorDisplayV3 : ContributorDisplayV2;
