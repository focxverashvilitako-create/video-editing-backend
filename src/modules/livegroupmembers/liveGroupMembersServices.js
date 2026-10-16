import pool from "../../config/db.js";

// ADD MEMBER TO GROUP
export const addMemberToGroup = async ({ groupId, userId }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock the group row to prevent concurrent capacity checks.
    const groupResult = await client.query(
      `
      SELECT id, max_students, current_students
      FROM live_groups
      WHERE id = $1
      FOR UPDATE
      `,
      [groupId]
    );

    if (groupResult.rows.length === 0) {
      throw new Error("Live group not found");
    }

    const group = groupResult.rows[0];

    const userResult = await client.query(
      `
      SELECT id
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }

    const memberResult = await client.query(
      `
      SELECT id
      FROM live_group_members
      WHERE group_id = $1 AND user_id = $2
      `,
      [groupId, userId]
    );

    if (memberResult.rows.length > 0) {
      throw new Error("User is already a member of this group");
    }

    const currentStudents = Number(group.current_students ?? 0);

    if (
      group.max_students !== null &&
      currentStudents >= Number(group.max_students)
    ) {
      throw new Error("Live group is full");
    }

    const result = await client.query(
      `
      INSERT INTO live_group_members
        (group_id, user_id, joined_at)
      VALUES ($1, $2, NOW())
      RETURNING *
      `,
      [groupId, userId]
    );

    await client.query(
      `
      UPDATE live_groups
      SET current_students = COALESCE(current_students, 0) + 1
      WHERE id = $1
      `,
      [groupId]
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// GET ALL GROUP MEMBERS
export const getAllGroupMembers = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM live_group_members
    ORDER BY joined_at DESC, id DESC
    `
  );

  return result.rows;
};

// GET MEMBER BY ID
export const getGroupMemberById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM live_group_members
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// GET MEMBERS BY GROUP ID
export const getMembersByGroupId = async (groupId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM live_group_members
    WHERE group_id = $1
    ORDER BY joined_at DESC, id DESC
    `,
    [groupId]
  );

  return result.rows;
};

// REMOVE MEMBER FROM GROUP
export const removeMemberFromGroup = async (id) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const memberResult = await client.query(
      `
      SELECT *
      FROM live_group_members
      WHERE id = $1
      FOR UPDATE
      `,
      [id]
    );

    if (memberResult.rows.length === 0) {
      await client.query("COMMIT");
      return null;
    }

    const member = memberResult.rows[0];

    await client.query(
      `
      DELETE FROM live_group_members
      WHERE id = $1
      `,
      [id]
    );

    await client.query(
      `
      UPDATE live_groups
      SET current_students = GREATEST(
        COALESCE(current_students, 0) - 1,
        0
      )
      WHERE id = $1
      `,
      [member.group_id]
    );

    await client.query("COMMIT");

    return member;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};