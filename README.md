<!-- PROJECT LOGO -->
<div align="center">
  <h1 align="center">Find My IP</h3>
  <img src="public/demo.jpg" style="border-radius: 4px;">
</div>

<!-- ABOUT THE PROJECT -->

## About This Project

A web application for finding public information regarding your IP address, including ISP, location, and time zone. View live demo at <a href="https://garyjx-find-my-ip.vercel.app/" target="_blank">garyjx-find-my-ip.vercel.app</a>

#### Built With

- TypeScript
- React
- Next.js
- [Geo Location IP API](https://getgeoapi.com/)

<!-- GETTING STARTED -->

## Getting Started

#### Installation and Set Up

1. Clone the repository.
   ```sh
   git clone https://github.com/GaryJX/find-my-ip.git
   ```
2. `cd` into the project root directory.
   ```sh
   cd find-my-ip
   ```
3. Install dependencies.
   ```sh
   npm install
   ```
4. Create `.env.local` by copying the template file `.env.sample`.
   ```sh
   cp .env.sample .env.local
   ```
5. Go to https://getgeoapi.com/ to sign up for an account and get a free API key.
   <br>
6. Update `.env.local` with your API key.

   ```
   # .env.local

   IP_API_KEY=<YOUR_API_KEY>
   ```

7. Start the development server.
   ```sh
   npm run dev
   ```
8. Open the application at http://localhost:3000/
