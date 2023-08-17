/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: Order;
  createProduct?: Maybe<Product>;
  createProvider?: Maybe<Provider>;
  createUser?: Maybe<User>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  markNotificationAsRead?: Maybe<Notification>;
};


export type MutationCreateOrderArgs = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCreateProductArgs = {
  brand: Scalars['String']['input'];
  category: Scalars['String']['input'];
  name: Scalars['String']['input'];
  providerId: Scalars['ID']['input'];
  unit_price: Scalars['Float']['input'];
};


export type MutationCreateProviderArgs = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID']['output'];
  brand: Scalars['String']['output'];
  category: Scalars['String']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  state: OrderStat;
  unit_price: Scalars['Float']['output'];
};

export type OrderStat = {
  __typename?: 'OrderStat';
  numberOfOrdersByState: Scalars['Int']['output'];
  numberOfProviders: Scalars['Int']['output'];
  ordersCount: Scalars['Float']['output'];
  totalCostOfPayedOrders: Scalars['Float']['output'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  brand: Scalars['String']['output'];
  category: Scalars['String']['output'];
  name: Scalars['String']['output'];
  provider?: Maybe<Provider>;
  unit_price: Scalars['Float']['output'];
};

export type Provider = {
  __typename?: 'Provider';
  _id: Scalars['ID']['output'];
  address: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type ProviderWithProducts = {
  __typename?: 'ProviderWithProducts';
  _id: Scalars['ID']['output'];
  address: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  notifications: Array<Notification>;
  orderStats: OrderStat;
  orders: Array<Maybe<Order>>;
  ordersByState: Array<Maybe<Order>>;
  product?: Maybe<Product>;
  products: Array<Maybe<Product>>;
  provider?: Maybe<Provider>;
  providers?: Maybe<Array<Maybe<Provider>>>;
  providersWithProducts?: Maybe<Array<Maybe<ProviderWithProducts>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryOrderStatsArgs = {
  state: Scalars['String']['input'];
};


export type QueryOrdersByStateArgs = {
  state: Scalars['String']['input'];
};


export type QueryProductArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProviderArgs = {
  _id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  primary_key?: Maybe<Scalars['String']['output']>;
};
