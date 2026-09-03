import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessageStatus,
  deleteContactMessage,
} from "./contactMessagesServices.js";

export const createContactMessageController = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    const contactMessage = await createContactMessage({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Contact message sent successfully",
      contactMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create contact message",
    });
  }
};

export const getAllContactMessagesController = async (req, res) => {
  try {
    const contactMessages = await getAllContactMessages();

    res.json(contactMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get contact messages",
    });
  }
};

export const getContactMessageByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const contactMessage = await getContactMessageById(id);

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    res.json(contactMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get contact message",
    });
  }
};

export const updateContactMessageStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["new", "answered"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either new or answered",
      });
    }

    const contactMessage = await updateContactMessageStatus(id, status);

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    res.json({
      message: "Contact message status updated successfully",
      contactMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update contact message status",
    });
  }
};

export const deleteContactMessageController = async (req, res) => {
  try {
    const { id } = req.params;

    const contactMessage = await deleteContactMessage(id);

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    res.json({
      message: "Contact message deleted successfully",
      contactMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete contact message",
    });
  }
};