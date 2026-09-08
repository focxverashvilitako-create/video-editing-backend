import * as settingsService from "./settingsServices.js";

import {
  validateCreateSettings,
  validateUpdateSettings,
  validateSettingsId
} from "./settingsValidations.js";


// CREATE
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


    validateCreateSettings({
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    });


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

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};


// GET
export const getSettingsController = async (req, res) => {

  try {

    const settings = await settingsService.getSettings();


    res.status(200).json({
      message: "Settings fetched successfully",
      settings
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};


// UPDATE
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


    validateSettingsId({
      id
    });


    validateUpdateSettings({
      site_name,
      phone,
      email,
      address,
      facebook,
      instagram,
      youtube
    });


    const settings = await settingsService.updateSettings(
      id,
      {
        site_name,
        phone,
        email,
        address,
        facebook,
        instagram,
        youtube
      }
    );


    if (!settings) {
      return res.status(404).json({
        message: "Settings not found"
      });
    }


    res.status(200).json({
      message: "Settings updated successfully",
      settings
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};


// DELETE
export const deleteSettingsController = async (req, res) => {

  try {

    const { id } = req.params;


    validateSettingsId({
      id
    });


    const settings = await settingsService.deleteSettings(id);


    if (!settings) {
      return res.status(404).json({
        message: "Settings not found"
      });
    }


    res.status(200).json({
      message: "Settings deleted successfully",
      settings
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message
    });

  }
};