import {
  addMemberToGroup,
  getAllGroupMembers,
  getGroupMemberById,
  getMembersByGroupId,
  removeMemberFromGroup,
} from "./liveGroupMembersServices.js";


export const addMemberToGroupController = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    if (!groupId || !userId) {
      return res.status(400).json({
        message: "groupId and userId are required",
      });
    }

    const member = await addMemberToGroup({
      groupId,
      userId,
    });

    res.status(201).json({
      message: "User added to live group successfully",
      member,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "Live group not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "User not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.message === "User is already a member of this group") {
      return res.status(409).json({
        message: error.message,
      });
    }

    if (error.message === "Live group is full") {
      return res.status(409).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to add user to live group",
    });
  }
};


export const getAllGroupMembersController = async (req, res) => {
  try {
    const members = await getAllGroupMembers();

    res.json(members);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get live group members",
    });
  }
};


export const getGroupMemberByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await getGroupMemberById(id);

    if (!member) {
      return res.status(404).json({
        message: "Group member not found",
      });
    }

    res.json(member);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get group member",
    });
  }
};


export const getMembersByGroupIdController = async (req, res) => {
  try {
    const { groupId } = req.params;

    const members = await getMembersByGroupId(groupId);

    res.json(members);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get group members",
    });
  }
};


export const removeMemberFromGroupController = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await removeMemberFromGroup(id);

    if (!member) {
      return res.status(404).json({
        message: "Group member not found",
      });
    }

    res.json({
      message: "User removed from live group successfully",
      member,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove user from live group",
    });
  }
};