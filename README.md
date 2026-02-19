# Angular v20 Enterprise Demo

[![Angular Version](https://img.shields.io/badge/Angular-v20-DD0031?style=flat&logo=angular)](https://angular.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A high-performance, scalable web application showcasing the cutting-edge features of **Angular 20**, **Tailwind CSS 4**, and **Angular Material**. This project is designed as a professional technical portfolio focusing on enterprise-grade patterns and secure communication.

---

## Tech Stack & Key Features

* **Core Framework:** Angular v20 (Utilizing Signals and modern Control Flow).
* **Styling:** Tailwind CSS 4 & Angular Material components.
* **Security:** JWT Authentication with **HttpOnly Cookies** (OWASP best practices).
* **Reliability:** **Idempotency** logic implemented in API interceptors to prevent duplicate transactions.
* **Clean Code:** Minimal boilerplate architecture using reusable logic and advanced TypeScript patterns.

---

### Secure Session & Auth
Unlike standard tutorials that use `localStorage`, this demo implements a secure flow:
* **JWT & Cookies:** Handling tokens via HttpOnly cookies to mitigate XSS/CSRF risks.
* **Auth Interceptors:** Automatic token attachment and 401/403 error handling.

### API Idempotency
I've implemented a robust strategy for `POST/PATCH` requests. By generating and managing unique **Idempotency Keys**, the application ensures that network retries do not result in duplicate server-side actions—a critical requirement for financial and enterprise systems.

### Reduced Boilerplate
By leveraging **Angular Signals** and custom **Structural Directives**, I have optimized the codebase to be DRY (Don't Repeat Yourself), making it easier to maintain and faster to scale.

---

## Getting Started

### Prerequisites
* Node.js (LTS version recommended)
* Angular CLI `^20.0.0`

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Demo-Angular-NestJS/angular-demo.git](https://github.com/Demo-Angular-NestJS/angular-demo)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    ng serve
    ```
4.  Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

---

## 🧪 Testing & Quality
* **Unit Tests:** Run `ng test` to execute business logic validation.
* **Build for Production:** Run `ng build` to generate optimized artifacts in the `dist/` directory.

---

## Contact & Portfolio
I am a Frontend Developer dedicated to building secure, performant, and user-centric web applications. 

* **GitHub:** [@judeth82](https://github.com/judeth82)
* **LinkedIn:** [Abel Judeth Cota Nevarez](www.linkedin.com/in/abel-cota)

---
*This project was built to demonstrate proficiency in modern Angular ecosystems and enterprise security standards.*
