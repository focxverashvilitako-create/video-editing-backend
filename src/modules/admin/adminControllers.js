import {
  getAdminDashboardData,
  getStudentGrowth
} from "./adminServices.js";

export const adminDashboard = async (req, res) => {
  try {
    const data = await getAdminDashboardData();

    res.status(200).json(data);
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

export const studentGrowthController = async (req, res) => {
  try {
    const studentGrowth = await getStudentGrowth();

    res.status(200).json({
      studentGrowth
    });
  } catch (error) {
    console.error("Student growth error:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};