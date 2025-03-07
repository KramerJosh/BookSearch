import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// Start Apollo Server and connect to the database
const startApolloServer = async () => {
  await server.start();
  await db;

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server)
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}!`);
    console.log(`📡 Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Start the server
startApolloServer();
