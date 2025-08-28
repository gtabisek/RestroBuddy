# RestroBuddy

Restaurant Billing POS that does so much MORE\!

Successful Food Businesses run on Restro Buddy Billing, Online Orders, Inventory & Customer Relations - all on a Centralised Dashboard.

A restaurant POS software that offers everything An online Point of Sale (POS) system designed for restaurants is a critical tool for managing the front-of-house and back-of-house operations efficiently. Below is a detailed description of the key features typically found in a modern online POS system for restaurants.

-----

## Features

  * **Order Management**:
      * **Table Service**: Manage orders for dine-in customers by assigning tables, splitting bills, and tracking order progress.
      * **Takeout and Delivery**: Process orders for customers who prefer takeout or delivery, including address management and delivery tracking.
  * **Menu Management**: Easily update and customize your menu, including pricing, descriptions, and images. Add modifiers for menu items, allowing for customer-specific modifications or substitutions.
  * **Inventory Management**: Automatically update inventory levels as items are sold, helping to prevent overordering or running out of popular dishes. Maintain a list of preferred suppliers for easy reordering.
  * **Table Reservation**: Accept and manage reservations, assign tables, and send confirmation messages to customers.
  * **Billing & Payment**:
      * **Split Bills**: Divide a check among multiple customers and accept various payment methods, including cash, credit cards, mobile payments, and even split payments.
      * **Automatic Tax Calculation**: Calculate taxes and gratuities based on the order and local regulations.
  * **Reporting & Analytics**:
      * **Sales Reports**: Generate daily, weekly, and monthly sales reports, helping you track performance and make data-driven decisions.
      * **Inventory Reports**: Monitor inventory levels, sales trends, and waste to optimize your supply chain.
  * **Employee Management**:
      * **Access Control**: Assign different user roles and permissions to control access to sensitive information.
      * **Time and Attendance**: Record employee work hours and manage schedules.

-----

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  * **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
  * **npm**: npm is distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer.
  * **IDE**: A modern IDE like VSCode, Sublime Text, or WebStorm is recommended.

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/gtabisek/restrobuddy.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd restrobuddy
    ```
3.  **Install backend dependencies**:
    ```bash
    cd restaurantbackend
    npm install
    ```
4.  **Install frontend dependencies**:
    ```bash
    cd ../restaurantfrontend
    npm install
    ```

-----

## Running the Application

### Backend

To start the backend server, run the following command from the `restaurantbackend` directory:

```bash
npm start
```

The backend will start on the default port (usually 3000 or specified in `bin/www`).

### Frontend

To start the frontend application, run the following command from the `restaurantfrontend` directory:

```bash
npm start
```

This will open the application in your default browser at `http://localhost:3000`.

-----

## Built With

  * **Frontend**: React, Redux, Material-UI
  * **Backend**: Node.js, Express.js
  * **Database**: MySQL
