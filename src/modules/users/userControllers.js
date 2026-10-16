import pool from "../../config/db.js";

// GET PROFILE
export const profile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        role,
        avatar,
        email_verified_at,
        created_at,
        updated_at,
        registration_completed
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
};

// GET DASHBOARD
export const dashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        role,
        avatar,
        registration_completed
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Dashboard fetched successfully",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Get dashboard error:", error);

    return res.status(500).json({
      message: "Failed to fetch dashboard"
    });
  }
};
