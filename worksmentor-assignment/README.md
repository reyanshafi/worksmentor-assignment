# Works Mentor - Frontend Developer Assignment

## 🎯 Objective
This project is a redesign and enhancement of the Works Mentor "Find Work" experience. The goal was to create a modern, high-converting interface for professionals to find projects, improving upon the existing user flow.

## 🚀 Key Improvements

### 1. UI/UX Overhaul
- **Modern Aesthetic:** Switched from a basic table-like layout to a card-based grid system inspired by modern SaaS applications (simulating a React/Shadcn UI feel).
- **Typography:** Implemented the `Inter` font family with a clear typographic hierarchy to improve readability.
- **Visual Depth:** Used layered `box-shadows` and rounded corners to create a premium, polished look that builds trust with users.
- **Micro-Interactions:** Added subtle hover states on cards and buttons to make the interface feel responsive and "alive".

### 2. Feature Implementation: Advanced Filtering
- **Dynamic Filtering:** Users can filter projects by **Category**, **Location**, and **Minimum Budget**.
- **Real-time Sorting:** Added sorting functionality (Newest, Price High-Low) to help users find relevant work faster.
- **Responsive Design:** The entire layout, including the sidebar filter, is fully responsive. On mobile, the navigation adapts smoothly.

### 4. NEW: Homepage Design
- Created a high-converting **Homepage** (`index.html`) based on modern design principles (Hero split layout, Stats proof, trustworthy testimonials).
- Ensures a cohesive brand experience from "Landing" to "Finding Work".

### 3. Technical Approach
- **Stack:** HTML5, Tailwind CSS (via CDN), Vanilla JavaScript.
- **Reasoning:** 
  - **Tailwind CSS** was chosen for its utility-first approach, allowing for rapid UI development and easy maintenance of a consistent design system.
  - **Vanilla JS** ensures high performance and zero build-step complexity for this assignment, while still demonstrating clean state management and DOM manipulation logic.
  - **Code Quality:** The code is modular, with clear separation of concerns (data vs. render logic) and uses modern ES6+ features.

## 🛠️ How to Run
1. Simply open the `index.html` file in any modern web browser.
2. No build step or `npm install` required (Tailwind is loaded via CDN for portability).

## 📂 Deliverables
- `index.html`: **New** Homepage with modern hero and features.
- `projects.html`: The main assignment (Project Listing with Filters).
- `js/main.js`: Logic for rendering, filtering, and state management.
- `homepage.png`: Screenshot of the new Homepage.
- `before.png`: Reference of original site style.
- `after.png`: Screenshot of the redesigned Project Page.
