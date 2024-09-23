import TicketComment from "../models/comment.model.js";
import Ticket from "../models/ticket.model.js";
import { errorHandler } from "../utils/error.js";

export const createTicketComment = async (req, res, next) => {
    const { deviceNo, formType, descriptionProblem } = req.body;
    const userId = req.user.id

    if(!deviceNo) return next(errorHandler(400, 'Device Number is required!'));
    if(!formType) return next(errorHandler(400, 'Form type is required!'));
    if(!descriptionProblem) return next(errorHandler(400, 'Description of the problem is required!'));

    try {
        //create new ticket   
        const newTicket = new Ticket({
            requestNo: Math.floor(100000 + Math.random() * 900000),
            status: 'pending',
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
        
        const updatedTicket = await Ticket.findById(newTicket._id);

        res.status(201).json({
            message: 'Ticket and comment created successfully!',
            ticket: updatedTicket,
        });
    } catch (error) {
        next(error)
    }
}

export const takeActionOnTicket = async (req, res, next) => {
    const { ticketId } = req.params; // Get ticketId from URL params

    try {
        // Find and update the ticket
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $set: {
                    status: 'ongoing',
                    conducted_by: req.user.id,
                    date_started: new Date(), 
                }
            },
            { new: true } 
        ).populate('comments'); 

        if (!updatedTicket) {
            return next(errorHandler(404, 'Ticket not found!'));
        }

        res.status(200).json({ message: 'Ticket updated successfully!', ticket: updatedTicket });
    } catch (error) {
        next(error);
    }
};

export const takeActionOnTicketCompleted = async (req, res, next) => {
    const { action_taken, recommendation } = req.body;
    const { ticketId } = req.params;

    try {
        // Find and update the ticket
        const updateToCompleted = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $set: {
                    status: 'completed',
                    action_taken: action_taken,
                    recommendation: recommendation,
                    date_finished: new Date(), 
                }
            },
            { new: true } 
        ).populate('comments'); 

        if (!updateToCompleted) {
            return next(errorHandler(404, 'Ticket not found!'));
        }

        res.status(200).json({ message: 'Ticket updated successfully!', ticket: updateToCompleted });
    } catch (error) {
        next(error);
    }
};


export const getPendingTickets = async (req, res, next) => {
    try {
        // Fetch tickets with status 'pending'
        const pendingTickets = await Ticket.find({ status: 'pending' }).populate('comments');
        
        res.status(200).json({
            message: 'Pending tickets fetched successfully!',
            tickets: pendingTickets,
        });
    } catch (error) {
        next(error);
    }
};


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
      const tickets = await Ticket.find()
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            populate: {
              path: 'department' 
            }
          }
        })
  
      res.status(200).json({ tickets });
    } catch (error) {
      next(error);
    }
  };
  