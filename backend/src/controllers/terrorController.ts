import { Request, Response } from "express";
import { Event } from "../models/Event";


export const getDeadliestAttackTypes = async (req: Request, res: Response) => {
  try {
    const results = await Event.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          totalKilled: { $sum: "$nkill" },
          totalWounded: { $sum: "$nwound" },
        },
      },
      { $sort: { totalKilled: -1 } },
    ]);
     res.json(results);
     return;
  } catch (err) {
    const error = err as Error;
     res.status(500).json({
      message: "Error fetching deadliest attack types",
      error: error.message,
    });
    return;
  }
};


export const getHighestCasualtyRegions = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;
    const matchStage = region ? { region_txt: region } : {};

    const results = await Event.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$region_txt",
          averageKilled: { $avg: "$nkill" },
          averageWounded: { $avg: "$nwound" },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      { $sort: { averageKilled: -1 } },
    ]);

     res.json(results);
     return;
  } catch (err) {
    const error = err as Error;
     res.status(500).json({
      message: "Error fetching highest casualty regions",
      error: error.message,
    });
    return;
  }
};

export const getIncidentTrends = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query;
    const matchStage: any = {};

    if (year) matchStage.iyear = parseInt(year as string);
    if (month) matchStage.imonth = parseInt(month as string);

    const results = await Event.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { year: "$iyear", month: "$imonth" },
          incidentCount: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

     res.json(results);
     return;
  } catch (err) {
    const error = err as Error;
     res.status(500).json({
      message: "Error fetching incident trends",
      error: error.message,
    });
    return;
  }
};


export const getTopGroups = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;
    const query = region ? { region_txt: region } : {};

    const results = await Event.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$gname",
          incidentCount: { $sum: 1 },
          region: { $first: "$region_txt" },
        },
      },
      { $sort: { incidentCount: -1 } },
      { $limit: 5 },
    ]);
    
     res.json(results);
     return;
  } catch (err) {
    const error = err as Error;
     res.status(500).json({
      message: "Error fetching top groups",
      error: error.message,
    });
    return;
  }
};


export const getGroupsByYear = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    const query: any = {};

    if (year) {
      const parsedYear = parseInt(year as string);
      if (!isNaN(parsedYear)) {
        query.iyear = parsedYear;
      }
    }

    const results = await Event.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$gname",
          incidentCount: { $sum: 1 },
          year: { $first: "$iyear" },
        },
      },
      { $sort: { incidentCount: -1 } },
      { $limit: 10 },
    ]);
    
     res.json(results);
     return;
  } catch (err) {
    const error = err as Error;
    
     res.status(500).json({
      message: "Error fetching groups by year",
      error: error.message,
    });
    return;
  }
};


export const getDeadliestRegions = async (req: Request, res: Response) => {
  try {
    const { name_group } = req.query;
    const query = name_group ? { gname: name_group } : {};

    const results = await Event.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$region_txt",
          totalKilled: { $sum: "$nkill" },
          totalWounded: { $sum: "$nwound" },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
          group: { $first: "$gname" },
        },
      },
      { $sort: { totalKilled: -1 } },
    ]);
     res.json(results);
     return;
  } catch (err) {
    const error = err as Error;
     res.status(500).json({
      message: "Error fetching deadliest regions",
      error: error.message,
    });
    return;
  }
};
