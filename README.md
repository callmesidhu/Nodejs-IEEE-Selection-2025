# Task for Assessment

# **Workspace Reservation & Approval System**

## **Overview**

Design and develop a back-end system where employees can book a meeting room for a specific day.

Each booking request goes through a **multi-level approval process** before being finalized.

---

## **Approval Flow**

1. **Employee** creates and submits a booking request to the **Team Manager**.
2. **Team Manager** reviews the request and can **approve or reject** it.
3. If **approved by the Team Manager**, the request is sent to the **Admin**.
4. **Admin** reviews the request and can **approve or reject** it.
5. Once **approved by the Admin**, the **room is successfully booked** for the employee.
6. This **flow cannot be bypassed** (e.g., an **Admin cannot approve a request without Team Manager’s approval**).

---

## **Assumptions for Simplicity**

- There is **only one room** in the office.
- Only **employees** can create booking requests.
- **No rework or reversal** of rejected requests.
- **No limit** on the number of users who can book the room on the same day.

---

## APIs

1. API for creating Employee, Team Manager and Admin.
2. API for login.
3. API for creating request from employee.
4. API for list all requests and its status.
5. API for Team Manager to approve/reject request.
6. API for Admin to approve/reject request.

---

Use Express JS for back-end development and MySQL/PostgreSQL as the database.

Using **TypeScript** and writing **test cases** will be an added advantage.