import express from "express";
import {
  getDeadliestAttackTypes,
  getHighestCasualtyRegions,
  getIncidentTrends,
  getTopGroups,
  getGroupsByYear,
  getDeadliestRegions,
} from "../controllers/terrorController";

const router = express.Router();


router.get("/deadliest-attack-types", getDeadliestAttackTypes);

router.get("/highest-casualty-regions", getHighestCasualtyRegions);

router.get("/incident-trends", getIncidentTrends);

router.get("/top-groups", getTopGroups);

router.get("/groups-by-year", getGroupsByYear);

router.get("/deadliest-regions", getDeadliestRegions);

export default router;
