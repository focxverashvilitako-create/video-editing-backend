import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessageStatus,
  deleteContactMessage
} from "./contactMessagesServices.js";

import {
  validateCreateContactMessage,
  validateContactMessageId,
  validateUpdateContactMessageStatus
} from "./contactMessagesValidations.js";


// CREATE
export const createContactMessageController = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message
    } = req.body;

    validateCreateContactMessage({
      name,
      email,
      phone,
      message
    });

    const contactMessage = await createContactMessage({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({
      message: "Contact message sent successfully",
      contactMessage
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// GET ALL
export const getAllContactMessagesController = async (req, res) => {
  try {
    const contactMessages = await getAllContactMessages();

    res.status(200).json({
      message: "Contact messages fetched successfully",
      contactMessages
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// GET BY ID
export const getContactMessageByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    validateContactMessageId({ id });

    const contactMessage = await getContactMessageById(id);

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found"
      });
    }

    res.status(200).json({
      message: "Contact message fetched successfully",
      contactMessage
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE STATUS
export const updateContactMessageStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    validateContactMessageId({ id });

    validateUpdateContactMessageStatus({
      status
    });

    const contactMessage = await updateContactMessageStatus(
      id,
      status
    );

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found"
      });
    }

    res.status(200).json({
      message: "Contact message status updated successfully",
      contactMessage
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE
export const deleteContactMessageController = async (req, res) => {
  try {
    const { id } = req.params;

    validateContactMessageId({ id });

    const contactMessage = await deleteContactMessage(id);

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found"
      });
    }

    res.status(200).json({
      message: "Contact message deleted successfully",
      contactMessage
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message
    });
  }
};