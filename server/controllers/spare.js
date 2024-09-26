//createTicketLogic
// export const createTicketComment = async (req, res, next) => {
//     const { deviceNo, formType, descriptionProblem } = req.body;
//     const userId = req.user.id

//     if(!deviceNo) return next(errorHandler(400, 'Device Number is required!'));
//     if(!formType) return next(errorHandler(400, 'Form type is required!'));
//     if(!descriptionProblem) return next(errorHandler(400, 'Description of the problem is required!'));

//     try {
//         //create new ticket   
//         const newTicket = new Ticket({
//             requestNo: Math.floor(100000 + Math.random() * 900000),
//             status: 'pending',
//             comments: [],
//           });

//         //save the ticket in ticketCollection
//         await newTicket.save();
        
//         //create ticketcomment from user
//         const newTicketComment = new TicketComment({
//             user: userId,
//             deviceNo: deviceNo,
//             descriptionProblem: descriptionProblem,
//             formType: formType,
//         });
        
//         //save the ticket in ticketCommentCollection
//         await newTicketComment.save();

//         //push the newticket comments in the ticket collection!
//         newTicket.comments.push(newTicketComment._id);

//         await newTicket.save();
        
//         const updatedTicket = await Ticket.findById(newTicket._id);

//         res.status(201).json({
//             message: 'Ticket and comment created successfully!',
//             ticket: updatedTicket,
//         });
//     } catch (error) {
//         next(error)
//     }
// }

//old model ticket

// import mongoose from 'mongoose';

// const ticketSchema = new mongoose.Schema({
//   requestNo: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   date_started: {
//     type: Date,
//   },
//   date_finished: {
//     type: Date,
//   },
//   conducted_by: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', 
//   },
//   action_taken: { 
//     type: String,
//   },
//   recommendation: { 
//     type: String,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'ongoing', 'completed'],
//     default: 'pending',
//   },
//   comments: [{ 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'TicketComment',
//   }],
// }, { timestamps: true });

// const Ticket = mongoose.model('Ticket', ticketSchema);

// export default Ticket;
