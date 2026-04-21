# BPO Management System - Project Documentation

## 1. SYSTEM OVERVIEW
**Aim:** To design and implement a comprehensive Business Process Outsourcing (BPO) Management System to streamline ticketing, agent allocation, and customer support processes.

**Description:** 
The BPO Management System is a centralized platform designed to handle large volumes of customer queries (tickets) efficiently. It allows customers to raise issues, which are then categorized and assigned to specialized agents by an administrator. The system tracks the lifecycle of each ticket from creation to resolution, ensuring high-quality service and accountability.

**Key Features:**
- **Ticket Handling:** Creation, tracking, and prioritization of customer issues.
- **Agent Management:** Maintaining agent profiles, skills, and availability.
- **Customer Support:** User-friendly interface for customers to interact with the support team.
- **Reporting:** Real-time dashboards and reports on ticket status and agent performance.

**Actors:**
1. **Customer:** Raises tickets, tracks status, and provides feedback upon resolution.
2. **Agent:** Views assigned tickets, updates progress, and resolves issues.
3. **Admin:** Manages agents, assigns tasks, monitors system performance, and generates reports.

---

## 2. USE CASE DIAGRAM
**Description for Manual Drawing:**
- Draw three stick figures: **Customer**, **Admin**, and **Agent**.
- Draw a large rectangle representing the **System Boundary**.
- Inside the box, draw ovals (Use Cases) and connect them to actors:
    - **Customer:** Login, View Profile, Raise Ticket, Track Ticket.
    - **Agent:** Login, View Assigned Tasks, Update Ticket Status, Resolve Issue.
    - **Admin:** Login, Manage Users (Agents/Customers), Assign Tickets, Generate Reports.
- Connect **Login** to all actors.
- include `<<include>>` relationship from "Raise Ticket" to "Authentication" if needed.

**Use Case Explanations:**
1. **Login:** Authenticates the user based on credentials (UID/Password).
2. **Raise Ticket:** Allows a customer to submit a description of their issue.
3. **Assign Task:** Admin assigns a pending ticket to an available agent.
4. **Resolve Issue:** Agent provides a solution and marks the ticket as resolved.
5. **Generate Reports:** Admin fetches statistical data about resolution times and agent efficiency.

---

## 3. UML INTERACTION DIAGRAMS

### A. Sequence Diagram
**Flow Description:**
1. **Customer** sends `raiseTicket(details)` to the **System**.
2. **System** creates a record in the **Database** and sends `ticketNotify` to **Admin**.
3. **Admin** sends `assignAgent(agentID)` to the **System**.
4. **System** updates **Database** and sends `taskNotify` to **Agent**.
5. **Agent** sends `updateStatus(inProgress)` and finally `resolveTicket()`.
6. **System** sends `resolutionAlert` back to **Customer** and updates **Database**.

### B. Collaboration Diagram
**Structure Description:**
- Objects are nodes: `1: Customer`, `2: System`, `3: Admin`, `4: Agent`, `5: Database`.
- Numbered Links:
    - 1 -> 2: `1. Request Help`
    - 2 -> 5: `2. Store Ticket`
    - 2 -> 3: `3. Notify Admin`
    - 3 -> 2: `4. Assign Staff`
    - 2 -> 4: `5. Assign Task`
    - 4 -> 2: `6. Submit Resolution`

---

## 4. UML STATE CHART + ACTIVITY DIAGRAM

### A. State Chart (Ticket Lifecycle)
**States:**
- **New:** Ticket just created by customer.
- **Assigned:** Admin has linked the ticket to an agent.
- **In Progress:** Agent is actively working on the issue.
- **On Hold:** Waiting for additional info from customer or external vendor.
- **Resolved:** Agent has provided a fix.
- **Closed:** Customer confirms satisfaction or auto-closes after a period.

**Transitions:**
- `create` -> New
- `assign` -> Assigned
- `startWork` -> In Progress
- `provideSolution` -> Resolved
- `confirm` -> Closed

### B. Activity Diagram
**Workflow:**
1. **Start** Node.
2. **User Login** (Activity).
3. **Decision Diamond:** Valid User? 
    - No: Back to Login.
    - Yes: Proceed.
4. **Dashboard Loaded** (Activity).
5. **If Customer:** Activity "Raise Ticket".
6. **If Admin:** Activity "Check New Tickets" -> "Assign Agent".
7. **If Agent:** Activity "Open Task" -> "Resolve Issue".
8. **Merge** at "Update Database".
9. **End** Node.

---

## 5. UML COMPONENT + DEPLOYMENT DIAGRAM

### A. Component Diagram
- **UI Component:** Handles frontend views.
- **Logic Module:** Processes business rules (assignment logic).
- **Auth Module:** Manages security and roles.
- **Database Module:** Interfaces with SQL/NoSQL storage.
- **Notification Service:** Handles emails/SMS alerts.
- *Dependencies:* UI depends on Logic; Logic depends on Auth and Database.

### B. Deployment Diagram
- **Client Tier (Web Browser):** Runs on user devices (PC/Mobile).
- **Web Server:** Hosts the static files (HTML/CSS/JS).
- **Application Server (Node.js/Java):** Runs the backend logic and REST APIs.
- **Database Server (MySQL/PostgreSQL):** Persistent storage layer.
- *Network:* Connected via HTTPS/Internet.

---

## 6. TESTING
| Use Case ID | Scenario | Input | Expected Output | Actual Output | Result |
|-------------|----------|-------|-----------------|---------------|--------|
| TC01 | Valid Login | Valid Email/Pass | Redirect to Dashboard | User Dashboard shown | Pass |
| TC02 | Invalid Login | Wrong Password | Error message shown | "Invalid credentials" | Pass |
| TC03 | Ticket Creation | Issue description | Ticket ID generated | ID #1024 created | Pass |
| TC04 | Empty Ticket | Null description | Field validation error | "Description required"| Pass |
| TC05 | Assignment | Ticket + AgentID | Status changes to Assigned | Status: Assigned | Pass |
| TC06 | Resolution | Status -> Resolved | Customer notified | Link sent to customer| Pass |

**Conclusion:** All critical paths were tested. The system handles standard workflows and edge cases (empty inputs) effectively.

---

## 7. IMPLEMENTATION DETAILS

**Tech Stack:**
- **Frontend:** React.js, Tailwind CSS (for modern UI).
- **Backend:** Node.js + Express (for API handling).
- **Database:** MongoDB (for flexible ticket schemas).

**Database Tables (Schema):**
- **Users:** `id, name, email, role (Admin/Agent/Customer), password_hash`
- **Tickets:** `id, customer_id, agent_id, title, description, status, priority, created_at`
- **AuditLogs:** `id, ticket_id, action, timestamp, performed_by`

---

**Conclusion:**
The BPO Management System successfully digitizes the manual ticketing process, reducing overhead and improving customer response times. This project demonstrates the practical application of UML modeling in designing enterprise-grade software.
