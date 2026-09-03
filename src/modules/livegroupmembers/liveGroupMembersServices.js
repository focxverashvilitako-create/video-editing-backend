import pool from "../../config/database.js";

export const addMemberToGroup = async ({ groupId, userId }) => {
  
  const groupResult = await pool.query(
    `SELECT *
     FROM live_groups
     WHERE id = $1`,
    [groupId]
  );

  if (groupResult.rows.length === 0) {
    throw new Error("Live group not found");
  }

  const group = groupResult.rows[0];

 
  const userResult = await pool.query(
    `SELECT *
     FROM users
     WHERE id = $1`,
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }


  const memberResult = await pool.query(
    `SELECT *
     FROM live_group_members
     WHERE group_id = $1 AND user_id = $2`,
    [groupId, userId]
  );

  if (memberResult.rows.length > 0) {
    throw new Error("User is already a member of this group");
  }


  if (
    group.max_students !== null &&
    group.current_students >= group.max_students
  ) {
    throw new Error("Live group is full");
  }

 
  const result = await pool.query(
    `INSERT INTO live_group_members
      (group_id, user_id, joined_at)
     VALUES ($1, $2, NOW())
     RETURNING *`,
    [groupId, userId]
  );

 
  await pool.query(
    `UPDATE live_groups
     SET current_students = COALESCE(current_students, 0) + 1
     WHERE id = $1`,
    [groupId]
  );

  return result.rows[0];
};

export const getAllGroupMembers = async () => {
  const result = await pool.query(
    `SELECT *
     FROM live_group_members
     ORDER BY joined_at DESC`
  );

  return result.rows;
};

export const getGroupMemberById = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM live_group_members
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const getMembersByGroupId = async (groupId) => {
  const result = await pool.query(
    `SELECT *
     FROM live_group_members
     WHERE group_id = $1
     ORDER BY joined_at DESC`,
    [groupId]
  );

  return result.rows;
};

export const removeMemberFromGroup = async (id) => {
  const memberResult = await pool.query(
    `SELECT *
     FROM live_group_members
     WHERE id = $1`,
    [id]
  );

  if (memberResult.rows.length === 0) {
    return null;
  }

  const member = memberResult.rows[0];

  await pool.query(
    `DELETE FROM live_group_members
     WHERE id = $1`,
    [id]
  );

  await pool.query(
    `UPDATE live_groups
     SET current_students = GREATEST(COALESCE(current_students, 0) - 1, 0)
     WHERE id = $1`,
    [member.group_id]
  );

  return member;
};