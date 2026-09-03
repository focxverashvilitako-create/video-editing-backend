import pool from "../../config/db.js";

export const enrollUserInGroup = async (userId, groupId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

   
    const groupResult = await client.query(
      `
      SELECT *
      FROM live_groups
      WHERE id = $1
      FOR UPDATE
      `,
      [groupId]
    );

    const group = groupResult.rows[0];

    if (!group) {
      throw new Error("Live group not found");
    }

   
    if (
      group.status !== "upcoming" &&
      group.status !== "active"
    ) {
      throw new Error("Enrollment is not available for this group");
    }

    
    const existingMemberResult = await client.query(
      `
      SELECT *
      FROM live_group_members
      WHERE group_id = $1
        AND user_id = $2
      `,
      [groupId, userId]
    );

    if (existingMemberResult.rows.length > 0) {
      throw new Error("User is already enrolled in this group");
    }

    
    if (group.current_students >= group.max_students) {
      throw new Error("Live group is full");
    }

    
    const memberResult = await client.query(
      `
      INSERT INTO live_group_members (
        group_id,
        user_id,
        joined_at
      )
      VALUES ($1, $2, NOW())
      RETURNING *
      `,
      [groupId, userId]
    );

    
    await client.query(
      `
      UPDATE live_groups
      SET current_students = current_students + 1
      WHERE id = $1
      `,
      [groupId]
    );

    await client.query("COMMIT");

    return memberResult.rows[0];

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
};