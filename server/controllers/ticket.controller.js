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

export const getMyPendingTickets = async (req, res, next) => {
    const userId = req.user.id; //to track the current user

    try {
        //fetch tickets with pending status
        const pendingTickets = await Ticket.find({
            "comments.user": userId,
            status: "pending"
        }).populate('comments');
        //after succesfull
        res.status(200).json({pendingTickets});
    } catch (error) {
        next(error)
    }
};

export const getMyTotalCompletedTicket = async (req, res, next) => {
    const userId = req.user.id; //to track the current user

    try {
        //fetch tickets with pending status
        const completedTickets = await Ticket.find({
            "comments.user": userId,
            status: "completed"
        }).populate('comments');
        //after succesfull
        res.status(200).json({completedTickets});
    } catch (error) {
        next(error)
    }
};



