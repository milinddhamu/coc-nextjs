![Project Banner](https://user-images.githubusercontent.com/68379239/270390331-2d91111e-018c-46ed-b224-2f2df1d9bd92.jpg)

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

#### Link - https://quiz-app-delta-six.vercel.app/

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Demo](#demo)
- [Setup](#setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Clash of Clans Profile Tracker is a web application built using Next.js, Tailwind CSS, Next UI, and Framer. It allows gamers and friends to track player and clan data from Clash of Clans. While there are many profile trackers available, this project aims to provide a unique experience by offering custom profile sorting for player experience and a user-friendly interface with dark and light themes, along with smooth animations.

The project also incorporates comment features and team creation, enhancing the social and collaborative aspects of gaming.

## Features

- Fetch and display Clash of Clans player and clan data using the Clash of Clans API.
- Custom profile sorting based on player experience.
- User-friendly interface designed with Next UI and Framer, offering both dark and light themes.
- Comment feature for users to interact and discuss profiles.
- Team creation functionality for collaborative gaming experiences.
- Firebase integration for data storage.
- Authentication using next-auth for team creation , comments and boookmarks. 

## Technologies Used

- Next.js
- Tailwind CSS
- Recoil.js (making player data global inside app)
- Next UI (built in framer-motion)
- Next-auth (currently Auth.js)
- Express (for API data fetching)
- Firebase (for data storage)

## Screenshots

![Home page](https://user-images.githubusercontent.com/68379239/270390264-2065b9a5-a01f-4d12-b6ff-38e3adbe02f9.png)

<p align="center"> Home Page <br></br> </p>

![Search page](https://user-images.githubusercontent.com/68379239/270390282-831ec684-4644-44e0-a579-469faf1d1394.png)

<div style='text-align: center; font-style: italic;'> Search page <br></br> </div>

![Profile page](https://user-images.githubusercontent.com/68379239/270390294-a4783fb1-c30e-4d62-9922-77b5ca929da3.png)

<div style='text-align: center; font-style: italic;'> Profile page <br></br> </div>


![Clan page](https://user-images.githubusercontent.com/68379239/270390307-de540ff4-b9d2-4e1d-ad9f-acb3f3172c88.png)

<div id="ClanPage" style='text-align: center; font-style: italic;'>Clan page<br></br> </div>

![Login page](https://user-images.githubusercontent.com/68379239/270390310-67b69976-c9e1-4012-a345-1f8c07540adb.png)

<div style='text-align: center; font-style: italic;'> Login page <br></br> </div>

![Team creation](https://user-images.githubusercontent.com/68379239/270390321-33743c55-27f1-4cd4-9f4f-6b5bcfdb5a77.png)

<div style='text-align: center; font-style: italic;'> Team creation <br></br> </div>

![Created Teams](https://user-images.githubusercontent.com/68379239/270390326-fe359026-8cdb-4f06-92e6-17a85898da53.png)

<div style='text-align: center; font-style: italic;'> Created teams (required authentication) <br></br> </div>



## Setup

If someone wants to run your project locally, provide detailed instructions on how to do so. Include any dependencies that need to be installed, environment setup, or configuration steps.

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git

# Navigate to the project folder
cd your-repo

# Install dependencies
npm install

# Configure environment variables
# Create a .env.local file and add your Firebase configuration
# For Firebase, you'll need API keys and credentials.

# Run the development server
npm run dev
```
## Contributing

If you'd like to contribute to this project, please follow these guidelines:

    Fork the project.
    Create your feature branch: git checkout -b feature/feature-name.
    Commit your changes: git commit -m 'Add some feature'.
    Push to the branch: git push origin feature/feature-name.
    Submit a pull request.
