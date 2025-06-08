"use client";

import { createTheme, MantineProvider } from '@mantine/core';
import { Provider } from "jotai";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from 'dayjs';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache(),
});

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'green',
});

dayjs.extend(customParseFormat);

export default function Providers({ children }) {
  return (
    <MantineProvider theme={theme}>
        <Provider>
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        </Provider>
    </MantineProvider>
  );
}
