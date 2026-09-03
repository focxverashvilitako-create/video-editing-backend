import * as settingsService from "./settingsServices.js";


export const createSettingsController = async (req, res) => {
  try {
    const {
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    } = req.body;

    const settings = await settingsService.createSettings(
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    );

    res.status(201).json({
      message: "Settings created successfully",
      settings
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


export const getSettingsController = async (req, res) => {
  try {
    const settings = await settingsService.getSettings();

    res.json({
      settings
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


export const updateSettingsController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    } = req.body;

    const settings = await settingsService.updateSettings(
      id,
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    );

    res.json({
      message: "Settings updated successfully",
      settings
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


export const deleteSettingsController = async (req, res) => {
  try {
    const { id } = req.params;

    const settings = await settingsService.deleteSettings(id);

    res.json({
      message: "Settings deleted successfully",
      settings
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};