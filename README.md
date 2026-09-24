# 📦 TrackFlow — Professional Order Tracking System

A modern, high-fidelity Order Tracking application built with **Next.js** and **Tailwind CSS**. This project demonstrates a seamless logistics experience with separate **Admin** and **Customer** dashboards, handling complex delivery scenarios with real-time state management.

## 🚀 Live Demo

**[Live URL here](https://your-live-url.vercel.app)**

## 🌟 Key Features

### 1. Multi-Role Dashboard

- **Admin Panel:** Allows dispatchers to update order dates and status (Processing, Shipped, Out for Delivery, Delivered).
- **Customer View:** A mobile-optimized tracking screen that reflects real-time updates from the admin.

### 2. Intelligent Handling of Edge Cases (Task Requirements)

- **Tracking Not Available Yet:** Implemented a "Preparing your order" simulation. Upon login, customers see a professional loading state for 5 seconds before tracking data is initialized.
- **Delayed Order Logic:** Automatic detection of delays. If the duration between 'Order Placed' and 'Out for Delivery' exceeds 3 days, a "Heavy Traffic" warning is displayed to the customer.
- **Delivery Feedback Loop (Delivered but Not Received):**
  - Once marked as 'Delivered', customers can confirm receipt.
  - If the customer selects "Not Received," they are prompted to provide a phone number.
  - This report is instantly sent to the Admin Panel with the customer's contact details for immediate action.

### 3. Professional UI/UX

- Responsive design optimized for **360px–430px mobile widths**.
- Clean typography, meaningful icons (Lucide-React), and smooth animations.
- Interactive timeline with visual progress indicators.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide-React
- **State Management:** React Hooks (`useState`, `useEffect`)

## 🔑 Mock Credentials

To test the full flow, use the following credentials:

| Role         | Email            | Password   |
| :----------- | :--------------- | :--------- |
| **Admin**    | `admin@test.com` | `admin123` |
| **Customer** | `user@test.com`  | `user123`  |

## ⚙️ Setup & Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/YOUR_USERNAME/order-tracking-system.git
   cd order-tracking-system
```

2. **Install dependencies:**

```bash
   npm install
```

3. **Run the development server:**

```bash
   npm run dev
```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**

```bash
   npm run build
```

## 📝 Design Decisions

- **Mobile-First:** Prioritized the mobile experience as per the task requirement while ensuring a clean layout on desktop.
- **No Backend Needed:** Used React State to simulate a real-time database connection between Admin and Customer views.
- **User Empathy:** Added a 5-second "Preparing" state to mimic real-world processing times, reducing "Empty State" anxiety for users.
