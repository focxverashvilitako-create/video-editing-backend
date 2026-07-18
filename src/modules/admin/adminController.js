import {
  getAdminDashboardData
} from "./admin.service.js";


export const adminDashboard = async (req, res) => {

  try {

    const data = await getAdminDashboardData();

    res.json(data);


  } catch(error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};