import TicketComment from "../models/comment.model.js";
import Ticket from "../models/ticket.model.js";
import { errorHandler } from "../utils/error.js";

export const createTicketComment = async (req, res, next) => {
    const { deviceNo, formType, descriptionProblem } = req.body;
    const userId = req.user.id //current user

    if(!deviceNo) return next(errorHandler(400, 'Device Number is required!'));
    if(!formType) return next(errorHandler(400, 'Form type is required!'));
    if(!descriptionProblem) return next(errorHandler(400, 'Description of the problem is required!'));

    try {
        //create new ticket   
        const newTicket = new Ticket({
            requestNo: `REQ${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            comments: [],
        });
        //save the ticket in ticketCollection
        await newTicket.save();
        
        //create ticketcomment from user
        const newTicketComment = new TicketComment({
            user: userId,
            deviceNo: deviceNo,
            descriptionProblem: descriptionProblem,
            formType: formType,
        });
        
        //save the ticket in ticketCommentCollection
        await newTicketComment.save();

        //push the newticket comments in the ticket collection!
        newTicket.comments.push(newTicketComment._id);

        await newTicket.save();
        
        const updatedTicket = await Ticket.findById(newTicket._id).populate('comments');

        res.status(201).json({
            message: 'Ticket and comment created successfully!',
            ticket: updatedTicket,
        });
    } catch (error) {
        next(error)
    }
}

export const getAllTicketComments = async (req, res, next) => {
    try {
        const ticketComments = await TicketComment.find();
        res.status(200).json({ticketComments}); 
    } catch (error) {
        next(error)
    }
}

export const getAllTickets = async (req, res, next) => {
    try {
        const Alltickets = await Ticket.find();
        res.status(200).json({Alltickets}); 
    } catch (error) {
        next(error)
    }
}


