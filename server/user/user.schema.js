var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;

var USERs = [
  {
    "id": 1446412739542,
    "name": "Matthieu"
  }, {
    "id": 1446412740883,
    "name": "Jean"
  }
];

var UserType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      id: {
        type: GraphQLFloat
      },
      name: {
        type: GraphQLString
      }
    }
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      users: {
        type: new GraphQLList(UserType),
        resolve: function () {
          return USERs;
        }
      }
    }
  }
});

var MutationCreate = {
  type: new GraphQLList(UserType),
  description: 'Create a User',
  args: {
    name: {
      name: 'User name',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, {name}) => {
    USERs.push({
      id: (new Date()).getTime(),
      name: name
    });
    return USERs;
  }
};

var MutationUpdate = {
  type: new GraphQLList(UserType),
  description: 'Update a User',
  args: {
    id: {
      name: 'User id',
      type: new GraphQLNonNull(GraphQLFloat)
    },
    newName: {
      name: 'New user name',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, {id, newName}) => {
    var selectedUser = USERs.filter(function(user) {
      return user.id === id;
    })[0];
    selectedUser.name = newName;
    return USERs;
  }
};

var MutationDelete = {
  type: new GraphQLList(UserType),
  description: 'Delete a User',
  args: {
    id: {
      name: 'User id',
      type: new GraphQLNonNull(GraphQLFloat)
    }
  },
  resolve: (root, {id}) => {
    USERs = USERs.filter(function(user) {
      return user.id !== id;
    });
    return USERs;
  }
};

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    create: MutationCreate,
    update: MutationUpdate,
    deleteUser: MutationDelete
  }
});

exports.userSchema = new GraphQLSchema({
  query: queryType,
  mutation: MutationType
});
