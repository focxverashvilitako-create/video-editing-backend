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
    const { name, email, phone, message } = req.body;

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

    return res.status(201).json({
      message: "Contact message sent successfully",
      contactMessage
    });
  } catch (error) {
    console.error("Create contact message error:", error);

    if (
      error.message.includes("Name must") ||
      error.message.includes("Email must") ||
      error.message.includes("Phone must") ||
      error.message.includes("Message is required")
    ) {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to send contact message"
    });
  }
};

// GET ALL
export const getAllContactMessagesController = async (req, res) => {
  try {
    const contactMessages = await getAllContactMessages();

    return res.status(200).json({
      message: "Contact messages fetched successfully",
      contactMessages
    });
  } catch (error) {
    console.error("Get contact messages error:", error);

    return res.status(500).json({
      message: "Failed to fetch contact messages"
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

    return res.status(200).json({
      message: "Contact message fetched successfully",
      contactMessage
    });
  } catch (error) {
    console.error("Get contact message by ID error:", error);

    if (error.message === "Contact message ID must be a valid UUID") {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to fetch contact message"
    });
  }
};

// UPDATE STATUS
export const updateContactMessageStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    validateContactMessageId({ id });
    validateUpdateContactMessageStatus({ status });

    const contactMessage = await updateContactMessageStatus(id, status);

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found"
      });
    }

    return res.status(200).json({
      message: "Contact message status updated successfully",
      contactMessage
    });
  } catch (error) {
    console.error("Update contact message status error:", error);

    if (
      error.message === "Contact message ID must be a valid UUID" ||
      error.message === "Status must be either new or answered"
    ) {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to update contact message status"
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

    return res.status(200).json({
      message: "Contact message deleted successfully",
      contactMessage
    });
  } catch (error) {
    console.error("Delete contact message error:", error);

    if (error.message === "Contact message ID must be a valid UUID") {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: "Failed to delete contact message"
    });
  }
};