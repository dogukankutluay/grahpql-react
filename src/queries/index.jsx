import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(data: { username: $username, password: $password }) {
      token
    }
  }
`;
export const SIGN_IN = gql`
  mutation ($username: String!, $password: String!) {
    signIn(data: { username: $username, password: $password }) {
      token
    }
  }
`;
export const GET_ACTIVE_USER = gql`
  query {
    activeUser {
      username
      _id
      createdAt
    }
  }
`;
export const GET_SNAPS = gql`
  query {
    snaps {
      _id
      text
      createdAt
      user {
        _id
        createdAt
        username
      }
    }
  }
`;
export const CREATE_SNAP = gql`
  mutation ($text: String!, $user_id: ID!) {
    createSnap(data: { text: $text, user_id: $user_id }) {
      text
      _id
      createdAt
      user {
        _id
        username
        createdAt
      }
    }
  }
`;
