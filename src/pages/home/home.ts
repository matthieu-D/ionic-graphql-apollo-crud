import { Component } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document

interface Response {
  users: any,
  create: any,
  deleteUser: any,
  update: any
}

const createUser = gql`
  mutation create($name: String!) {
    create(name: $name) {
      id
      name
    }
  }`

const Users = gql`
  query users {
    users {
      id
      name
    }
  }
`;

const updateUser = gql`
  mutation update($id: Float!, $newName: String!) {
    update(id: $id , newName: $newName) {
      id
      name
    }
  }`

const deleteUser = gql`
    mutation deleteUser($id: Float!) {
      deleteUser(id: $id ) {
      id
      name
    }
  }`

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.data = this.apollo.watchQuery<Response>({ query: Users })
  }

  createUser(name) {
    this.apollo.mutate<Response>({
      mutation: createUser,
      variables: {
        name: name
      },
      update: (store, {data: { create }}) => {
        let data = store.readQuery({ query: Users });
        (<any> data).users = create;
        store.writeQuery({ query: Users, data });
      }
    })
  }

  updateUser(user) {
    this.apollo.mutate<Response>({
      mutation: updateUser,
      variables: {
        id: user.id,
        newName: user.name
      },
      update: (store, { data: { update }}) => {
        let data = store.readQuery({ query: Users });
        (<any> data).users = update;
        store.writeQuery({ query: Users, data });
      }
    })
  }

  deleteUser(id) {
    this.apollo.mutate<Response>({
      mutation: deleteUser,
      variables: {
        id: id
      },
      update: (store, { data: { deleteUser } }) => {
        let data = store.readQuery({ query: Users });
        (<any> data).users = deleteUser;
        store.writeQuery({ query: Users, data});
      }
    })
  }
}
