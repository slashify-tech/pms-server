const Policy = require("../model/Policies");
const Teams = require("../model/TeamsModel");
const { monthMapping } = require("../Utility/utilityFunc");
const fs = require("fs");
const path = require("path");
const { parse: json2csv } = require("json2csv");

exports.getTeamData = async (req, res) => {
  try {
    const teams = await Teams.find({});
    res.status(200).json({ message: "Data fetched successfully", teams });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateTeamData = async (req, res) => {
  const { employeeName, location, leadName, teamName } = req.query;

  try {
    if (!employeeName ) {
      return res.status(400).json({ message: "All team fields are required." });
    }

    const newTeam = new Teams({
      employeeName,
      location,
      leadName,
      teamName,
    });

    const savedTeam = await newTeam.save();

    res.status(201).json({
      message: "Team data saved successfully",
      data: savedTeam,
    });
  } catch (err) {
    console.error("Error updating team data:", err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};

exports.topPerformerLists = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search = "",
    location,
    teamName,
    leadName,
    startMonth,
    endMonth,
    year,
    endYear,
  } = req.query;

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();
    const selectedEndYear = endYear ? parseInt(endYear) : null;
    const matchConditions = {
      policyType: "MB",
      isDisabled: false,
      policyStatus: { $in: ["approved"] },
    };

    if (search) {
      matchConditions["teams.employeeName"] = { $regex: search, $options: "i" };
    }

    if (location) {
      matchConditions["teams.location"] = location;
    }

    if (teamName) {
      matchConditions["teams.teamName"] = teamName;
    }
    if (leadName) {
      matchConditions["teams.leadName"] = leadName;
    }
    let startDate = new Date(`${selectedYear}-01-01T00:00:00.000Z`);
    let endDate = selectedEndYear
      ? new Date(`${selectedEndYear}-12-31T23:59:59.999Z`)
      : new Date(`${selectedYear}-12-31T23:59:59.999Z`);
      if (startMonth && endMonth) {
        const startMonthIndex = monthMapping[startMonth];
        const endMonthIndex = monthMapping[endMonth];
  
        if (startMonthIndex !== undefined && endMonthIndex !== undefined) {
          startDate = new Date(`${selectedYear}-${(startMonthIndex + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`);
          endDate = new Date(`${selectedEndYear || selectedYear}-${(endMonthIndex + 1).toString().padStart(2, '0')}-31T23:59:59.999Z`);
        }
      } else if (startMonth) {
        const startMonthIndex = monthMapping[startMonth];
        if (startMonthIndex !== undefined) {
          startDate = new Date(`${selectedYear}-${(startMonthIndex + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`);
        }
      } else if (endMonth) {
        const endMonthIndex = monthMapping[endMonth];
        if (endMonthIndex !== undefined) {
          endDate = new Date(`${selectedEndYear || selectedYear}-${(endMonthIndex + 1).toString().padStart(2, '0')}-31T23:59:59.999Z`);
        }
      }
    const pipeline = [
      { $match: matchConditions },
      { $unwind: "$teams" },
      {
        $group: {
          _id: {
            employeeName: "$teams.employeeName",
            teamName: "$teams.teamName",
            location: "$teams.location",
            leadName: "$teams.leadName",

          },
          totalPrice: { $sum: "$totalPrice" },
          documentCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          employeeName: "$_id.employeeName",
          teamName: "$_id.teamName",
          location: "$_id.location",
          leadName: "$_id.leadName",
          totalPrice: 1,
          documentCount: 1,
        },
      },
      { $sort: { documentCount: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ];

    const data = await Policy.aggregate(pipeline);

    const totalCountPipeline = [
      { $match: matchConditions },
      { $unwind: "$teams" },
      {
        $group: {
          _id: {
            employeeName: "$teams.employeeName",
          },
        },
      },
      { $count: "totalCount" },
    ];

    const totalCountResult = await Policy.aggregate(totalCountPipeline);
    const totalCount = totalCountResult[0]?.totalCount || 0;

    return res.status(200).json({
      message: "Data fetched successfully",
      data,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching top performer lists:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};




exports.topLeadLists = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search = "",
    location,
    teamName,
    leadRole,
    startMonth,
    endMonth,
    year,
    endYear,
  } = req.query;

  try {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();
    const selectedEndYear = endYear ? parseInt(endYear) : selectedYear;
    const matchConditions = {
      policyType: "MB",
      isDisabled: false,
      policyStatus: { $in: ["approved"] },
      createdAt: {
        $gte: new Date(`${selectedYear}-01-01T00:00:00.000Z`),
        $lte: new Date(`${selectedEndYear}-12-31T23:59:59.999Z`)
      }
    };

    if (search) {
      matchConditions["teams.leadName"] = { $regex: search, $options: "i" };
    }

    if (location) {
      matchConditions["teams.location"] = location;
    }

    if (teamName) {
      matchConditions["teams.teamName"] = teamName;
    }
    if (leadRole) {
      const roleRegex = new RegExp(`\\(\\s*${leadRole}\\s*\\)$`, "i");
      matchConditions["teams.leadName"] = { $regex: roleRegex };
    }
    if (startMonth || endMonth) {
      const startMonthIndex = startMonth ? monthMapping[startMonth] : 0;
      const endMonthIndex = endMonth ? monthMapping[endMonth] : 11;
      
      if (startMonthIndex !== undefined && endMonthIndex !== undefined) {
        matchConditions.createdAt = {
          $gte: new Date(`${selectedYear}-${(startMonthIndex + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`),
          $lte: new Date(`${selectedEndYear}-${(endMonthIndex + 1).toString().padStart(2, '0')}-31T23:59:59.999Z`)
        };
      }
    }
   
    
    const pipeline = [
      { $match: matchConditions },
      { $unwind: "$teams" },
      {
        $group: {
          _id: "$teams.leadName",
          location: { $first: "$teams.location" },
          teamName: { $first: "$teams.teamName" },
          employees: { $addToSet: "$teams.employeeName" },
          totalPolicies: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          leadName: "$_id",
          teamName: 1,
          location: 1,
          employees: 1,
          totalPolicies: 1,
          totalAmount: 1,
        },
      },
      { $sort: { totalPolicies: -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ];

    const data = await Policy.aggregate(pipeline);
    
    const totalCountPipeline = [
      { $match: matchConditions },
      { $unwind: "$teams" },
      {
        $group: {
          _id: "$teams.leadName",
        },
      },
      { $count: "totalCount" },
    ];

    const totalCountResult = await Policy.aggregate(totalCountPipeline);
    const totalCount = totalCountResult[0]?.totalCount || 0;

    return res.status(200).json({
      message: "Data fetched successfully",
      data,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
      },
    });
  } catch (error) {
    console.error("Error fetching top lead lists:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
  

exports.downloadTopPerformerCsv = async (req, res) => {
  try {
    const matchConditions = {
      policyType: "MB",
      isDisabled: false, 
      policyStatus: { $ne: "rejected" },
    };
   const pipeline = [
      { $match: matchConditions },
      { $unwind: "$teams" },
      {
        $group: {
          _id: {
            employeeName: "$teams.employeeName",
            teamName: "$teams.teamName",
            location: "$teams.location",
          },
          totalPrice: { $sum: "$totalPrice" },
          documentCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          employeeName: "$_id.employeeName",
          teamName: "$_id.teamName",
          location: "$_id.location",
          totalPrice: 1,
          documentCount: 1,
        },
      },
      { $sort: { documentCount: -1 } },
    ];

    const data = await Policy.aggregate(pipeline);
    const csvData = data.map((policy) => ({
   
      "Employee Name": policy.employeeName || "",
      "Team Name": policy.teamName || "",
      "Location": policy.location || "",
      "Policy Count": policy.documentCount || "",
      "Total Price": policy.totalPrice || "",

    }));

    const csvDataString = json2csv(csvData, {
      fields: [  
        "Employee Name",
        "Team Name",
        "Location",
        "Policy Count",
        "Total Price",
      ],
    });

    const folderPath = path.join(__dirname, "..", "csv");
    const filePath = path.join(folderPath, "exportedData.csv");

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    fs.writeFileSync(filePath, csvDataString);

    res.download(filePath, "TopPerformers.csv", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Internal Server Error");
      } else {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
          }
        });
      }
    });
  } catch (error) {
    console.error("Error downloading CSV:", error);
    res.status(500).send("Internal Server Error");
  }
};
