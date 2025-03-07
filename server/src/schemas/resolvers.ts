import User, { UserDocument } from '../models/User.js';
import { BookDocument } from '../models/Book.js';

const resolvers = {
  Query: {
    users: async (): Promise<UserDocument[]> => {
      return await User.find({});
    },
    getUser: async (_parent: any, { id, username }: { id?: string; username?: string }): Promise<UserDocument | null> => {
      return await User.findOne({
        $or: [{ _id: id }, { username }],
      });
    },
  },
  Mutation: {
    addUser: async (_parent: any, { username, email, password }: { username: string; email: string; password: string; }): Promise<UserDocument> => {
      return await User.create({ username, email, password });
    },
    login: async (_parent: any, { email }: { email: string }) => {
      const user = await User.findOne({ email });

      return { user }; // Returns { user } to match `AuthPayload`
    },
    saveBook: async (_parent: any, { userId, book }: { userId: string; book: BookDocument }): Promise<UserDocument | null> => {
      return await User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
    },
    removeBook: async (_parent: any, { userId, bookId }: { userId: string; bookId: string }): Promise<UserDocument | null> => {
      return await User.findByIdAndUpdate(
        userId,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
  User: {
    bookCount: (parent: UserDocument) => parent.savedBooks.length, 
  },
};

export default resolvers;
