# Apollo cache issue example

## Installation

```bash
yarn
```

## Run dev

```bash
yarn dev
```

Open the dev server which is served at: `http://localhost:3002`

# Demostration

- Once loaded the page will initialize the Apollo client with `InMemoryCache` cache.
- On mount the App component will use `useQuery` with the `getPageQuery`, which will query for page panel data.
- When data is fetched it will be printed on to the page.
- Compare the data on the page (or look inside the client cache in the inspector) with the actual data that we receive over the network.

# The issue

The data received over the network and the data we get from the Apollo cache/response does not align, data is missing from Apollo.
