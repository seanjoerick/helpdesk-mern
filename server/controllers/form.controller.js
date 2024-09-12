import FormType from "../models/formtype.model.js";
import { errorHandler } from "../utils/error.js";

export const createFormTicket = async (req, res, next) => {
    const { name, description } = req.body;

    if (!name) return next(errorHandler(400, 'Form name is required!'));
    if (!description) return next(errorHandler(400, 'Description is required!'));

    try {
        const existingForm = await FormType.findOne({ name });
        if (existingForm) return next(errorHandler(400, 'Form Already Exists!'));

        const newForm = new FormType({ name, description });
        await newForm.save();

        res.status(201).json({ message: 'Form is created successfully!', form: newForm });
    } catch (error) {
        next(error);
    }
};

export const updateFormTicket = async (req, res, next) => {
    const { id } = req.params //id url parameters
    const {  name, description} = req.body;

    try {
        const updateForm = await FormType.findByIdAndUpdate(id, { name, description}, { new: true });
        if(!updateForm) return next(errorHandler(404, 'Form not found!'));
        res.status(200).json({message: 'Form updated successfully', form: updateForm});
    } catch (error) {
        next(error);
    }
}

export const deleteForm = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleteForm = await FormType.findByIdAndDelete(id);
        if(!deleteForm) return next(errorHandler(400, 'Form not found!'));

        res.status(200).json({message: 'Form deleted successfully!', form: deleteForm});
    } catch (error) {
        next(error);
    }
} 

export const getAllForms = async (req, res, next) => {
    try {
        const forms = await FormType.find();
        res.status(200).json({forms});
    } catch (error) {
        next(error)
    }
}