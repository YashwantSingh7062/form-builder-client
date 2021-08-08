import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";
import moment from 'moment';

const SITE_URL = "/"

const ErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
            if (extensions.code === "AUTHENTICATION_ERROR") {
                // Remove your token form localStorage.
            }
            toast(message, { type: "error" });
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }

    if (networkError) {
        toast(networkError, { type: "error" });
        console.log(`[Network error]: ${networkError}`);
    }
});

const link = new HttpLink({
    uri: `${SITE_URL}graphql`,
});

const client = new ApolloClient({
    link: from([ErrorLink, link]),
    cache: new InMemoryCache({
        typePolicies: {
            Form: {
                fields: {
                    createdAt: {
                        read(createdAt) {
                            return moment(createdAt).format('DD MMMM YYYY');
                        }
                    }
                }
            },
        },
    }),
});

export default client;
