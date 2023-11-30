# Mi-12 Forum

Welcome to Mi-12 Forum, an online platform for meaningful conversations! This project is developed using the MERN stack.

# Live link

[https://forum-fiesta.web.app/](#)  

# Server Link

[https://forum-fiesta.web.app/](#)  

## Table of Contents
- [Features](#features)
  - [Homepage](#homepage)
  - [Membership Page](#membership-page)
  - [User Dashboard](#user-dashboard)
  - [Admin Dashboard](#admin-dashboard)
- [Bonus Tasks](#bonus-tasks)
- [Optional Tasks](#optional-tasks)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Homepage
- **Responsive Design**: The homepage is responsive for mobile, tablet, and desktop.
- **Navbar**: 
  - Includes logo, website name, Home, Membership, Notification icon, and Join Us button.
  - Displays the user's profile picture if logged in.
  - Dropdown with user options: User name, Dashboard, Logout.
- **Search Bar**: In the banner section, with search functionality based on post tags.
- **Tags Section**: Displays all available tags for posts filtering.
- **Announcement Section**: Shows announcements with notification count.
- **Post Listing**: Displays posts from newest to oldest, with author details, post title, tags, time, comments count, and votes count.
- **Sort by Popularity Button**: Sorts posts by total vote counts in descending order.
- **Pagination**: Implements pagination with 5 posts per page.

### Membership Page (Private Route)
- **Payment Page**: Users can pay to become a member and receive a Gold badge.
  
### User Dashboard (Private Route)
- **Dashboard Layout**: Dashboard with routes: My Profile, Add Post, My Posts.
  
#### My Profile
- Displays user's name, image, email, badges, and 3 recent posts.
- Badges: Bronze Badge for registration, Gold Badge for membership.
  
#### Add Post
- Form to add a post with fields like Author Image, Author Name, Post Title, etc.
- Limit normal users to add up to 5 posts. Show "Become a Member" button if the limit is exceeded.
  
#### My Posts
- Lists all posts by the user in a tabular form with details.

### Admin Dashboard (Private Route)
- **Dashboard Layout**: Admin dashboard with routes: Admin Profile, Manage Users, Reported Comments/Activities, Make Announcement.

#### Manage Users
- Tabular form showing user details. Admin can make a user an admin.
- Server-side search functionality.
  
#### Reported Comments/Activities
- Shows reported comments and activities with admin actions.
  
#### Make Announcement
- Form to make announcements displayed on the homepage.

## Additional 
- **tanstack Query**: Implements tanstack query for all GET data fetching.
- **Admin Profile**: Displays admin details, number of posts, comments, and users. Includes a pie chart.
- **JWT Implementation**: Implements JWT on login for both email/password and social logins.

## Optional Tasks (Choose Two)
1. **Like/Dislike Feature**: Users can upvote or downvote, but not both simultaneously.
2. **About Me Section**: Users can add/edit an "About Me" section on their My Profile page.
3. **React-awesome-button and React-select**: Implements these optional packages.
4. **Post Visibility**: Allows users to change post visibility on the My Posts page.
5. **Axios Interceptor**: Implements Axios interceptor for API calls.
6. **Banner Section Background**: Adds background picture and popular searches with results.

## Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables.
4. Run the server and client.



