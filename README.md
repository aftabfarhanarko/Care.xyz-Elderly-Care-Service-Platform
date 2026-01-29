# 🏥 Care.xyz (Care.IO)

### Baby Sitting & Elderly Care Service Platform

## Live Demo:[Care.xyz](https://baby-sitting-pi.vercel.app)

## 🧡 About Care.xyz

Care.xyz (also known as Care.IO) is a service-oriented web application designed to bridge the gap between families and trusted caregiving professionals. The platform focuses on providing **safe, reliable, and easily accessible care services** for children, elderly individuals, and sick or special-needs family members within the comfort of their own homes.

In today’s fast-paced lifestyle, many families struggle to find dependable caregivers at the right time. Care.xyz solves this problem by offering a **centralized digital platform** where users can discover, book, and manage caregiving services based on their **specific needs, preferred duration, and location**.

The application ensures transparency and trust by allowing users to view detailed service information, calculate costs dynamically before booking, and track booking status in real time. From babysitting and elderly care to sick patient assistance, Care.xyz is built to support families during their most critical moments.

Care.xyz is developed using **React and Next.js (JavaScript)** with a scalable and modular architecture. The system includes secure authentication, private route protection, dynamic booking workflows, and automated email invoice delivery. The project follows modern web development best practices, ensuring responsiveness, security, and future extensibility.

The ultimate vision of Care.xyz is to make caregiving **simple, dependable, and stress-free**, empowering families to focus on what truly matters—caring for their loved ones with confidence and peace of mind.

---

## 🎯 Project Objective

The main objective of this project is to make caregiving:

- Easy
- Secure
- Reliable
- Accessible for everyone

Users can book services based on **duration, location, and service type** with transparent pricing and booking status tracking.

---

## 🛠️ Technology Stack

### Frontend

- React
- Next.js (App Router)
- JavaScript (ES6+)
- CSS / Tailwind CSS (optional)

### Backend

- Next.js API Routes
- Authentication system
- Booking management
- Email invoice service

### Optional Integrations

- Stripe Payment Gateway
- Admin Dashboard

---

## ✨ Key Features

- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 🔐 User Authentication
  - Email & Password Login
  - Google Social Login
- 📅 Dynamic Booking System
  - Select duration (hours/days)
  - Location selection (Division → District → City → Area)
  - Address input
- 💰 Automatic Cost Calculation
  - Duration × Service Charge
- 📌 Booking Status Tracking
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- 📂 My Bookings Page
  - View all bookings
  - Track booking status
  - Cancel booking
- 📄 Service Detail Pages
- 🧠 SEO Metadata (Home & Service Pages)
- 📧 Email Invoice after booking

---

## 🧭 Pages & Routes

### 🏠 Home Page (`/`)

- Banner / Slider
- About Section
- Services Overview
- Testimonials / Success Metrics

### 🧸 Service Detail Page (`/services/:service_id`)

- Detailed service information
- Book Service button

### 📅 Booking Page (`/booking/:service_id`) 🔒

- Select duration
- Location & address input
- Dynamic total cost
- Confirm booking

### 🔐 Authentication

- Login Page (`/auth/login`)
- Registration Page (`/auth/register`)
  - NID No
  - Name
  - Email
  - Contact
  - Password validation (6+ characters, uppercase & lowercase)

### 📋 My Bookings (`/my-bookings`) 🔒

- Service name
- Duration
- Location
- Total cost
- Booking status
- Cancel booking option

### ❌ Error Page (`/404`)

- Not Found message
- Back to Home button

---

## 🔒 Private Route Protection

Protected routes:

- `/booking/*`
- `/my-bookings`
- `/dashboard/*` (Admin – Optional)

Logged-in users remain authenticated even after page reload.

---

## 📧 Email Invoice Workflow

1. User confirms booking
2. Booking saved with status **Pending**
3. Invoice generated
4. Invoice sent to user email

---

## 💳 Optional Features

- Stripe Payment Integration
- Booking creation after successful payment
- Admin Dashboard
  - View bookings
  - Payment history
  - Booking management

---

---

## 🧪 Assignment Highlights

- Built using **React with JavaScript**
- Uses **Next.js App Router**
- Secure authentication & private routes
- Real-world caregiving service use case
- Clean and scalable folder structure

---

## 📌 Conclusion

Care.xyz is a complete caregiving service platform demonstrating:

- Modern React & Next.js development
- Secure authentication
- Dynamic booking system
- Email-based invoice system
- Industry-standard project architecture

This project is suitable for **academic assignment submission**, **viva presentation**, and **portfolio showcase**.

---

## 👤 Author

**Name:** Aftab Farhan  
**Course:** Diploma in Engineering (CST)  
**Semester:** 6th Semester
