import TicketComment from "../models/comment.model.js";
import Ticket from "../models/ticket.model.js";
import { errorHandler } from "../utils/error.js";

export const createTicketComment = async (req, res, next) => {
    const { deviceNo, descriptionProblem, formType } = req.body;
    const userId = req.user.id;

    if (!deviceNo) return next(errorHandler(400, 'Device Number is required!'));
    if (!descriptionProblem) return next(errorHandler(400, 'Description of the problem is required!'));
    if (!formType) return next(errorHandler(400, 'Form type is required!'));

    try {
        const newTicketComment = new TicketComment({
            user: userId,
            deviceNo: deviceNo,
            descriptionProblem: descriptionProblem,
            formType: formType
        });

        await newTicketComment.save();

        res.status(201).json({ message: 'Ticket Comment created successfully!', ticketComment: newTicketComment });
    } catch (error) {
        next(error);
    }
};
