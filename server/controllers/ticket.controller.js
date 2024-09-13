// import TicketComment from "../models/comment.model.js";
// import RequestNumber from "../models/serviceno.model.js";
// import { errorHandler } from "../utils/error.js";

// export const createTicketComment = async (req, res, next) => {
//     const { deviceNo, descriptionProblem, formType } = req.body;
//     const userId = req.user.id;

//     if (!deviceNo) return next(errorHandler(400, 'Device Number is required!'));
//     if (!descriptionProblem) return next(errorHandler(400, 'Description of the problem is required!'));
//     if (!formType) return next(errorHandler(400, 'Form type is required!'));

//     try {
//         // Get the current year
//         const currentYear = new Date().getFullYear();

//         // Find or create the request number for the current year
//         let requestNumber = await RequestNumber.findOne({ year: currentYear });

//         if (!requestNumber) {
//             // If not found, create a new record with the starting number
//             requestNumber = new RequestNumber({
//                 year: currentYear,
//                 lastNumber: 1
//             });
//         } else {
//             // Increment the last number
//             requestNumber.lastNumber += 1;
//         }

//         // Save the updated request number
//         await requestNumber.save();

//         // Format the request number
//         const formattedNumber = `${currentYear}-${requestNumber.lastNumber.toString().padStart(3, '0')}`;

//         // Create the ticket comment
//         const newTicketComment = new TicketComment({
//             user: userId,
//             requestNo: formattedNumber,
//             deviceNo: deviceNo,
//             descriptionProblem: descriptionProblem,
//             formType: formType
//         });

//         await newTicketComment.save();

//         res.status(201).json({ message: 'Ticket Comment created successfully!', ticketComment: newTicketComment });
//     } catch (error) {
//         next(error);
//     }
// };

import TicketComment from "../models/comment.model.js";
import RequestNumber from "../models/serviceno.model.js";
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
