import {
  addMemberToGroup,
  getAllGroupMembers,
  getGroupMemberById,
  getMembersByGroupId,
  removeMemberFromGroup
} from "./liveGroupMembersServices.js";

import {
  validateAddMember,
  validateLiveGroupMemberId,
  validateGroupId
} from "./liveGroupMembersValidations.js";



export const addMemberToGroupController = async (req, res) => {

  try {

    const {
      groupId,
      userId
    } = req.body;


    validateAddMember({
      groupId,
      userId
    });


    const member = await addMemberToGroup({
      groupId,
      userId
    });


    res.status(201).json({
      message: "User added to live group successfully",
      member
    });

  } catch (error) {

    console.error(error);


    if (
      error.message === "Live group not found" ||
      error.message === "User not found"
    ) {
      return res.status(404).json({
        message: error.message
      });
    }


    if (
      error.message ===
        "User is already a member of this group" ||
      error.message ===
        "Live group is full"
    ) {
      return res.status(409).json({
        message: error.message
      });
    }


    res.status(400).json({
      message: error.message
    });

  }
};

export const getAllGroupMembersController = async (
  req,
  res
) => {

  try {

    const members = await getAllGroupMembers();


    res.status(200).json({
      message: "Live group members fetched successfully",
      members
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};



export const getGroupMemberByIdController = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    validateLiveGroupMemberId({
      id
    });


    const member = await getGroupMemberById(id);


    if (!member) {
      return res.status(404).json({
        message: "Group member not found"
      });
    }


    res.status(200).json({
      message: "Group member fetched successfully",
      member
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};



export const getMembersByGroupIdController = async (
  req,
  res
) => {

  try {

    const { groupId } = req.params;


    validateGroupId({
      groupId
    });


    const members = await getMembersByGroupId(
      groupId
    );


    res.status(200).json({
      message: "Live group members fetched successfully",
      members
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};



export const removeMemberFromGroupController = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    validateLiveGroupMemberId({
      id
    });


    const member = await removeMemberFromGroup(id);


    if (!member) {
      return res.status(404).json({
        message: "Group member not found"
      });
    }


    res.status(200).json({
      message: "User removed from live group successfully",
      member
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};