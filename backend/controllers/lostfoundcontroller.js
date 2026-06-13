import fs from "fs";
import LostFoundModel from "../models/lostfound.js";

export const createReport = async (req, res) => {

  try {
     console.log("Received report data:", req.body);
     console.log("Received files:", req.files);
    const {
      reportType,
      title,
      description,
      category,
      location,
      date,
      urgency,
      contactMethod,
      questions,
    } = req.body;

    if (
      !reportType?.trim() ||
      !title?.trim() ||
      !description?.trim() ||
      !category?.trim() ||
      !location?.trim() ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let parsedQuestions = [];

    try {
      parsedQuestions = questions ? JSON.parse(questions) : [];
    } catch {
      parsedQuestions = [];
    }

    const uploadedPhotos = [];

    if (req.files?.length > 0) {
      req.files.forEach((file) => {
        uploadedPhotos.push(file.path);
      });
    }
      console.log("body data:", req.body);
      console.log("files data:", req.files);
    
      console.log("User ID :",req.userId);

    const newReport = new LostFoundModel({
      userId: req.userId,
      reportType,
      title,
      description,
      category,
      location,
      date,
      urgency: urgency || "medium",
      photos: uploadedPhotos,
      questions: parsedQuestions,
      contactMethod: contactMethod || "chat",
    });
   console.log("NEW REPORT OBJECT:", newReport);
    await newReport.save();
    console.log("REPORT SAVED");

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("full error",error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await LostFoundModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error("GET REPORTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    console.log("PARAMS:", req.params);

    const { id } = req.params;

    const report = await LostFoundModel.findById(id);

    console.log("REPORT:", report);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    console.log("GET REPORT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};