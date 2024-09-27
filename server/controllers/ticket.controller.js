import TicketComment from "../models/comment.model.js";
import Ticket from "../models/ticket.model.js";
import { errorHandler } from "../utils/error.js";
import moment from "moment";

export const createTicketComment = async (req, res, next) => {
    const { deviceNo, formType, descriptionProblem } = req.body;
    const userId = req.user.id;

    if (!deviceNo) return next(errorHandler(400, 'Device Number is required!'));
    if (!formType) return next(errorHandler(400, 'Form type is required!'));
    if (!descriptionProblem) return next(errorHandler(400, 'Description of the problem is required!'));

    try {
        // Create new ticket   
        const newTicket = new Ticket({
            requestNo: Math.floor(100000 + Math.random() * 900000),
            status: 'pending',
            user: userId, // Associate the ticket with the user
            comments: [],
        });

        await newTicket.save();
        
        // Create ticket comment from user
        const newTicketComment = new TicketComment({
            user: userId,
            deviceNo: deviceNo,
            descriptionProblem: descriptionProblem,
            formType: formType,
        });
        
        await newTicketComment.save();

        // Push the new comment's ID into the ticket's comments array
        newTicket.comments.push(newTicketComment._id);

        await newTicket.save();
        
        const updatedTicket = await Ticket.findById(newTicket._id).populate('comments');

        res.status(201).json({
            message: 'Ticket and comment created successfully!',
            ticket: updatedTicket,
        });
    } catch (error) {
        next(error);
    }
};


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
                path: 'conducted_by', 
                select: 'username',  
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username',
                    populate: {
                        path: 'department',
                        select: 'name'  
                    }
                }
            });

        res.status(200).json({ tickets });
    } catch (error) {
        next(error);
    }
};

  export const getLatestRequest = async (req, res, next) => {
    try {
        const latestTicket = await Ticket.findOne()
            .sort({ createdAt: -1 })
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username', 
                    populate: {
                        path: 'department',
                        select: 'name'  
                    }
                }
            });

        if (!latestTicket) {
            return res.status(404).json({ message: 'No tickets found!' });
        }

        res.status(200).json({
            message: 'Latest request fetched successfully!',
            ticket: latestTicket,
        });
    } catch (error) {
        next(error);
    }
};

export const getTotalPending = async (req, res, next) => {
    try {
        const totalPending = await Ticket.countDocuments({ status: 'pending' });

        res.status(200).json({
            message: 'Total pending tickets fetched successfully!',
            count: totalPending,
        });
    } catch (error) {
        next(error);
    }
};


export const getTotalCompleted = async (req, res, next) => {
    try {
        const totalCompleted = await Ticket.countDocuments({ status: 'completed' });

        res.status(200).json({
            message: 'Total completed tickets fetched successfully!',
            count: totalCompleted,
        });
    } catch (error) {
        next(error);
    }
};


export const getTotalRequestsByFormType = async (req, res, next) => {
    try {
        const totalRequests = await TicketComment.aggregate([
            {
                $group: {
                    _id: '$formType',
                    total: { $sum: 1 } 
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);

        if (totalRequests.length === 0) {
            return res.status(200).json({
                message: 'No requests found for any form type.',
                data: []
            });
        }

        res.status(200).json({
            message: 'Total requests by form type fetched successfully!',
            data: totalRequests,
        });
    } catch (error) {
        next(error);
    }
};

export const getTotalCommentsThisMonth = async (req, res, next) => {
    try {
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate(); 

        const totalCommentsThisMonth = await TicketComment.countDocuments({
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        });

        res.status(200).json({
            message: 'Total comments for the current month fetched successfully!',
            total: totalCommentsThisMonth,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyPendingTicketsAndCount = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const [pendingTickets, pendingTicketCount] = await Promise.all([
            Ticket.find({ 
                user: userId, 
                status: 'pending'
            }).populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username', 
                    populate: {
                        path: 'department',
                        select: 'name'  
                    }
                }
            }),
            Ticket.countDocuments({ 
                user: userId, 
                status: 'pending'
            })
        ]);

        res.status(200).json({
            message: 'Pending tickets and count fetched successfully!',
            tickets: pendingTickets,
            count: pendingTicketCount,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyCompletedTicketsAndCount = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const [completedTickets, completedTicketCount] = await Promise.all([
            Ticket.find({ 
                user: userId, 
                status: 'completed'
            }).populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username', 
                }
            }).populate({
                path: 'conducted_by', 
                select: 'username'    
            }),
            Ticket.countDocuments({ 
                user: userId, 
                status: 'completed'
            })
        ]);

        res.status(200).json({
            message: 'Completed tickets and count fetched successfully!',
            tickets: completedTickets,
            count: completedTicketCount,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyLastRequest = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const lastTicketRequest = await Ticket.findOne({ 
            user: userId 
        })
        .sort({ updatedAt: -1 })
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'username', 
            }
        })
        .populate({
            path: 'conducted_by', 
            select: 'username'
        });

        if (!lastTicketRequest) {
            return res.status(404).json({
                message: 'No requests found for this user.',
            });
        }

        res.status(200).json({
            message: 'Last request fetched successfully!',
            ticket: lastTicketRequest,
        });
    } catch (error) {
        next(error);
    }
};

