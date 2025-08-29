# ReLife: Empowering sustainable living through digital innovation

ReLife is a web application that aims to facilitate sustainable living by empowering individuals and households through digital innovation. By leveraging its features, users can earn rewards, participate in challenges, and shop eco-friendly products from a marketplace.

## Tech Stack
- **Frontend**: React (JavaScript library for building user interfaces) and Vite (fast build tool for modern web projects)
- **Backend**: Django (high-level Python web framework that encourages rapid development and clean, pragmatic design) and Django REST Framework (API)
- **Database**: PostgreSQL (extensible open-source object-relational database system)
- **Styling**: Tailwind CSS (utility-first CSS framework for rapidly building custom designs)

## Features

### User Management
- **Registration and Login**: Users can create an account and log in securely.
- **Profile Management**: Users can manage their personal information, including changing password and email.

### Challenges and Rewards
- **Challenge Management**: Admins can create and manage challenges for users to participate in.
- **Reward Management**: Admins can create and manage rewards for users to earn.
- **Points and Rewards System**: Users can earn points for participating in challenges and redeem them for rewards.

### Marketplace
- **Product Browsing**: Users can browse and search for eco-friendly products.
- **Product Purchase**: Users can purchase products securely.

## Setup
1. **Clone the repository**: `git clone https://github.com/your-username/relife.git`
2. **Install dependencies**:
   - In the frontend directory, run `npm install` to install React and Vite dependencies.
   - In the backend directory, run `pip install -r requirements.txt` to install Django and its dependencies.
3. **Set up the database**:
   - Run `python manage.py migrate` in the backend directory to create the necessary database tables.
4. **Start the development servers**:
   - In the frontend directory, run `npm run dev` to start the frontend development server.
   - In the backend directory, run `python manage.py runserver` to start the backend development server.
5. **Access the application**:
   - Open your web browser and go to `http://localhost:3000` to access the frontend.
   - You can access the API endpoints at `http://localhost:8000/api` and the Django admin panel at `http://localhost:8000/admin`.

That's it! You have successfully set up ReLife. Now you can start using the application and explore its features.
