![Project Banner](https://user-images.githubusercontent.com/68379239/270390331-2d91111e-018c-46ed-b224-2f2df1d9bd92.jpg)

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

#### Link - https://coc-nextjs.vercel.app/

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
