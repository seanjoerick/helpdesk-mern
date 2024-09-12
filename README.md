Helpdesk/Ticket System
Overview
This Small Project is a comprehensive solution designed to manage and track tickets within an organization. It allows users to submit tickets and admins to manage and address these tickets. The system includes functionalities for creating and managing tickets, assigning tickets to departments, and commenting on tickets.




Features
User Management: Users can create tickets and view their status. Admins can manage users and their roles.
Ticket Creation: Users can create new tickets specifying the type of request, department, and comments.
Ticket Management: Admins can update the status of tickets, assign them to different departments, and track progress.
Comments: Users can add comments to tickets, and admins can respond and update tickets with actions taken.

Models
User
username: The username for login.
email: The email address of the user.
password: The password for authentication (hashed).
avatar: URL for the user's avatar.
roles: Array specifying the roles of the user (admin, user).
department: Reference to the department the user belongs to.
status: Status of the user (active, inactive).

Ticket
service_request_no: Unique identifier for the ticket.
requested_by: Reference to the User who created the ticket.
date_started: Timestamp when the ticket was created.
date_finished: Timestamp when the ticket was completed.
status: Current status of the ticket (pending, ongoing, completed).
department: Reference to the Department associated with the ticket.
comments: Array of references to TicketComment documents related to the ticket

TicketComment
user: Reference to the User who made the comment.
comment_text: The text of the comment.
device_no: Identifier of the device associated with the comment.
ticket: Reference to the Ticket to which this comment belongs.
Department
departmentName: Name of the department (e.g., "Human Resources").

Usage
Create a User: Admins can create users who will have access to the system. Users can then create tickets and add comments.
Create a Ticket: Users can submit tickets, specifying the type of request and department.
Manage Tickets: Admins can view, update, and manage tickets. They can also assign tickets to different departments.
Add Comments: Users and admins can add comments to tickets to provide updates or additional information.
Contributing
Feel free to open issues or submit pull requests if you have any suggestions or improvements for the system.

