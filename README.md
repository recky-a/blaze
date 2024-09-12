# Blaze Starter 🚀

Blaze Starter is a streamlined boilerplate designed to help you rapidly scaffold a Next.js 14 application with essential features including authentication, database integration, and more. This starter kit leverages Next.js, MySQL, Drizzle ORM, and Auth.js to provide a solid foundation for your next web application.

## Features

- **Next.js 14 with App Router**: Utilize the latest App Router feature of Next.js for enhanced routing and layout capabilities.
- **Authentication**: Secure user authentication implemented using Auth.js.
- **Database**: MySQL database integration with Drizzle ORM for efficient and type-safe database interactions.
- **Docker Support**: Easily set up your database environment using Docker and Docker Compose.
- **TypeScript**: Built with TypeScript for type safety and enhanced development experience.

## Getting Started

Follow these steps to get your Blaze Starter project up and running:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (recommended version: >= 16.x).
- **Docker**: Install Docker and Docker Compose to manage the MySQL database container.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/blaze-starter.git
   cd blaze-starter
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Your application should now be running on [http://localhost:3000](http://localhost:3000).

### Database Setup

Blaze Starter uses MySQL as the database with Drizzle ORM for database management.

1. **Build and Start the Database Container**

   ```bash
   docker-compose build
   docker-compose up
   ```

2. **Generate Database Migrations**

   ```bash
   npm run db:g
   ```

3. **Apply Database Migrations**

   ```bash
   npm run db:m
   ```

## Project Structure

- **/src/app**: Contains the Next.js App Router structure, including pages, layouts, and server components.
- **/src/components**: Reusable UI components.
- **/src/data**: Placeholder for data fetching utilities or static data files.
- **/src/db**: Database configuration, Drizzle ORM models, and migrations.
- **/src/hooks**: Custom React hooks.
- **/src/lib**: Utilities, helpers, and configurations (e.g., Auth.js configuration).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter to check for code quality.
- `npm run db:g`: Generates database migrations.
- `npm run db:m`: Applies the generated migrations.

## Environment Variables

Ensure you set up the following environment variables in your `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=blaze
DB_DATABASE=blaze_db
DB_PASSWORD=password
AUTH_SECRET="yoursecretkey"
DATABASE_URL="mysql://blaze:password@localhost:3306/blaze_db"
EXECUTION_MODE="development"
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Auth.js](https://authjs.dev/)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

---

Happy coding! 🎉
