import {
  getAdminDashboardData, 
  getStudentGrowth
} from "./admin.services.js";


export const adminDashboard = async (req, res) => {

  try {

    const data = await getAdminDashboardData();
    const studentGrowth = await getStudentGrowth();

    res.json({ ...data, studentGrowth });


  } catch(error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};