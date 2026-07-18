import pool from "../../config/db.js";


const getAdminDashboardData = async () => {

    const totalUsers = await pool.query(
        "SELECT COUNT(*) FROM users"
    );


   
    return { 
        totalUsers: number(totalUsers.rows[0].count)
    };


    const users =await pool.query(
        "SELECT id, first_name, last_name, email, phone, avatar, created_at, role FROM users ORDER BY created_at DESC"
    );

    return { 
        totalUsers: number(totalUsers.rows[0].count),
        users: users.rows
    };

}   
    
