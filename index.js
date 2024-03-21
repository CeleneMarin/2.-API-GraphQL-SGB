//instalador
//npm install apollo-server

const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');

const schema = fs.readFileSync('./schema.graphql', 'utf8');

const books = [
  { id: "1", title: "The Hitchhiker's Guide to the Galaxy", authorId: "1", isbn: "9780345391803", publicationYear: 1979 },
  { id: "2", title: "1984", authorId: "2", isbn: "9780451524935", publicationYear: 1949 },
  { id: "3", title: "To Kill a Mockingbird", authorId: "3", isbn: "9780061120084", publicationYear: 1960 },
  // Other books...
];

const authors = [
  { id: "1", name: "Douglas Adams", nationality: "British" },
  { id: "2", name: "George Orwell", nationality: "British" },
  { id: "3", name: "Harper Lee", nationality: "American" },
  // Other authors...
];

const loans = [
  { id: "1", bookId: "1", user: "Alice", loanDate: "2024-03-21", returnDate: null },
  // Other loans...
];

const resolvers = {
  Query: {
    allBooks: () => books,
    bookById: (_, { id }) => books.find(book => book.id === id),
    allAuthors: () => authors,
    allLoans: () => loans,
  },
  Book: {
    author: (parent) => authors.find(author => author.id === parent.authorId),
  },
};

const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Servidor corriendo en ${url}`);
});
