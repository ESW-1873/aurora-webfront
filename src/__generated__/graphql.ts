import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: string;
  Bytes: string;
};






export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};


export type Donation = {
  __typename?: 'Donation';
  id: Scalars['ID'];
  receiptId: Scalars['BigInt'];
  serialNo: Scalars['Int'];
  sender: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  donateTime: Scalars['Int'];
  donated?: Maybe<PostContent>;
  cancelled?: Maybe<PostContent>;
  refundRequested?: Maybe<PostContent>;
  refunded?: Maybe<PostContent>;
};

export type Donation_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  receiptId?: Maybe<Scalars['BigInt']>;
  receiptId_not?: Maybe<Scalars['BigInt']>;
  receiptId_gt?: Maybe<Scalars['BigInt']>;
  receiptId_lt?: Maybe<Scalars['BigInt']>;
  receiptId_gte?: Maybe<Scalars['BigInt']>;
  receiptId_lte?: Maybe<Scalars['BigInt']>;
  receiptId_in?: Maybe<Array<Scalars['BigInt']>>;
  receiptId_not_in?: Maybe<Array<Scalars['BigInt']>>;
  serialNo?: Maybe<Scalars['Int']>;
  serialNo_not?: Maybe<Scalars['Int']>;
  serialNo_gt?: Maybe<Scalars['Int']>;
  serialNo_lt?: Maybe<Scalars['Int']>;
  serialNo_gte?: Maybe<Scalars['Int']>;
  serialNo_lte?: Maybe<Scalars['Int']>;
  serialNo_in?: Maybe<Array<Scalars['Int']>>;
  serialNo_not_in?: Maybe<Array<Scalars['Int']>>;
  sender?: Maybe<Scalars['Bytes']>;
  sender_not?: Maybe<Scalars['Bytes']>;
  sender_in?: Maybe<Array<Scalars['Bytes']>>;
  sender_not_in?: Maybe<Array<Scalars['Bytes']>>;
  sender_contains?: Maybe<Scalars['Bytes']>;
  sender_not_contains?: Maybe<Scalars['Bytes']>;
  amount?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  donateTime?: Maybe<Scalars['Int']>;
  donateTime_not?: Maybe<Scalars['Int']>;
  donateTime_gt?: Maybe<Scalars['Int']>;
  donateTime_lt?: Maybe<Scalars['Int']>;
  donateTime_gte?: Maybe<Scalars['Int']>;
  donateTime_lte?: Maybe<Scalars['Int']>;
  donateTime_in?: Maybe<Array<Scalars['Int']>>;
  donateTime_not_in?: Maybe<Array<Scalars['Int']>>;
  donated?: Maybe<Scalars['String']>;
  donated_not?: Maybe<Scalars['String']>;
  donated_gt?: Maybe<Scalars['String']>;
  donated_lt?: Maybe<Scalars['String']>;
  donated_gte?: Maybe<Scalars['String']>;
  donated_lte?: Maybe<Scalars['String']>;
  donated_in?: Maybe<Array<Scalars['String']>>;
  donated_not_in?: Maybe<Array<Scalars['String']>>;
  donated_contains?: Maybe<Scalars['String']>;
  donated_not_contains?: Maybe<Scalars['String']>;
  donated_starts_with?: Maybe<Scalars['String']>;
  donated_not_starts_with?: Maybe<Scalars['String']>;
  donated_ends_with?: Maybe<Scalars['String']>;
  donated_not_ends_with?: Maybe<Scalars['String']>;
  cancelled?: Maybe<Scalars['String']>;
  cancelled_not?: Maybe<Scalars['String']>;
  cancelled_gt?: Maybe<Scalars['String']>;
  cancelled_lt?: Maybe<Scalars['String']>;
  cancelled_gte?: Maybe<Scalars['String']>;
  cancelled_lte?: Maybe<Scalars['String']>;
  cancelled_in?: Maybe<Array<Scalars['String']>>;
  cancelled_not_in?: Maybe<Array<Scalars['String']>>;
  cancelled_contains?: Maybe<Scalars['String']>;
  cancelled_not_contains?: Maybe<Scalars['String']>;
  cancelled_starts_with?: Maybe<Scalars['String']>;
  cancelled_not_starts_with?: Maybe<Scalars['String']>;
  cancelled_ends_with?: Maybe<Scalars['String']>;
  cancelled_not_ends_with?: Maybe<Scalars['String']>;
  refundRequested?: Maybe<Scalars['String']>;
  refundRequested_not?: Maybe<Scalars['String']>;
  refundRequested_gt?: Maybe<Scalars['String']>;
  refundRequested_lt?: Maybe<Scalars['String']>;
  refundRequested_gte?: Maybe<Scalars['String']>;
  refundRequested_lte?: Maybe<Scalars['String']>;
  refundRequested_in?: Maybe<Array<Scalars['String']>>;
  refundRequested_not_in?: Maybe<Array<Scalars['String']>>;
  refundRequested_contains?: Maybe<Scalars['String']>;
  refundRequested_not_contains?: Maybe<Scalars['String']>;
  refundRequested_starts_with?: Maybe<Scalars['String']>;
  refundRequested_not_starts_with?: Maybe<Scalars['String']>;
  refundRequested_ends_with?: Maybe<Scalars['String']>;
  refundRequested_not_ends_with?: Maybe<Scalars['String']>;
  refunded?: Maybe<Scalars['String']>;
  refunded_not?: Maybe<Scalars['String']>;
  refunded_gt?: Maybe<Scalars['String']>;
  refunded_lt?: Maybe<Scalars['String']>;
  refunded_gte?: Maybe<Scalars['String']>;
  refunded_lte?: Maybe<Scalars['String']>;
  refunded_in?: Maybe<Array<Scalars['String']>>;
  refunded_not_in?: Maybe<Array<Scalars['String']>>;
  refunded_contains?: Maybe<Scalars['String']>;
  refunded_not_contains?: Maybe<Scalars['String']>;
  refunded_starts_with?: Maybe<Scalars['String']>;
  refunded_not_starts_with?: Maybe<Scalars['String']>;
  refunded_ends_with?: Maybe<Scalars['String']>;
  refunded_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Donation_OrderBy {
  Id = 'id',
  ReceiptId = 'receiptId',
  SerialNo = 'serialNo',
  Sender = 'sender',
  Amount = 'amount',
  DonateTime = 'donateTime',
  Donated = 'donated',
  Cancelled = 'cancelled',
  RefundRequested = 'refundRequested',
  Refunded = 'refunded'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PostContent = {
  __typename?: 'PostContent';
  id: Scalars['ID'];
  metadata: Scalars['String'];
  donee: Scalars['Bytes'];
  capacity: Scalars['Int'];
  periodHours: Scalars['Int'];
  startTime: Scalars['Int'];
  endTime: Scalars['Int'];
  donatedCount: Scalars['Int'];
  donatedSum: Scalars['BigInt'];
  withdrawn: Scalars['BigInt'];
  donations?: Maybe<Array<Donation>>;
  cancelled?: Maybe<Array<Donation>>;
  refundRequested?: Maybe<Array<Donation>>;
  refunded?: Maybe<Array<Donation>>;
};


export type PostContentDonationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Donation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Donation_Filter>;
};


export type PostContentCancelledArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Donation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Donation_Filter>;
};


export type PostContentRefundRequestedArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Donation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Donation_Filter>;
};


export type PostContentRefundedArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Donation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Donation_Filter>;
};

export type PostContent_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  metadata?: Maybe<Scalars['String']>;
  metadata_not?: Maybe<Scalars['String']>;
  metadata_gt?: Maybe<Scalars['String']>;
  metadata_lt?: Maybe<Scalars['String']>;
  metadata_gte?: Maybe<Scalars['String']>;
  metadata_lte?: Maybe<Scalars['String']>;
  metadata_in?: Maybe<Array<Scalars['String']>>;
  metadata_not_in?: Maybe<Array<Scalars['String']>>;
  metadata_contains?: Maybe<Scalars['String']>;
  metadata_not_contains?: Maybe<Scalars['String']>;
  metadata_starts_with?: Maybe<Scalars['String']>;
  metadata_not_starts_with?: Maybe<Scalars['String']>;
  metadata_ends_with?: Maybe<Scalars['String']>;
  metadata_not_ends_with?: Maybe<Scalars['String']>;
  donee?: Maybe<Scalars['Bytes']>;
  donee_not?: Maybe<Scalars['Bytes']>;
  donee_in?: Maybe<Array<Scalars['Bytes']>>;
  donee_not_in?: Maybe<Array<Scalars['Bytes']>>;
  donee_contains?: Maybe<Scalars['Bytes']>;
  donee_not_contains?: Maybe<Scalars['Bytes']>;
  capacity?: Maybe<Scalars['Int']>;
  capacity_not?: Maybe<Scalars['Int']>;
  capacity_gt?: Maybe<Scalars['Int']>;
  capacity_lt?: Maybe<Scalars['Int']>;
  capacity_gte?: Maybe<Scalars['Int']>;
  capacity_lte?: Maybe<Scalars['Int']>;
  capacity_in?: Maybe<Array<Scalars['Int']>>;
  capacity_not_in?: Maybe<Array<Scalars['Int']>>;
  periodHours?: Maybe<Scalars['Int']>;
  periodHours_not?: Maybe<Scalars['Int']>;
  periodHours_gt?: Maybe<Scalars['Int']>;
  periodHours_lt?: Maybe<Scalars['Int']>;
  periodHours_gte?: Maybe<Scalars['Int']>;
  periodHours_lte?: Maybe<Scalars['Int']>;
  periodHours_in?: Maybe<Array<Scalars['Int']>>;
  periodHours_not_in?: Maybe<Array<Scalars['Int']>>;
  startTime?: Maybe<Scalars['Int']>;
  startTime_not?: Maybe<Scalars['Int']>;
  startTime_gt?: Maybe<Scalars['Int']>;
  startTime_lt?: Maybe<Scalars['Int']>;
  startTime_gte?: Maybe<Scalars['Int']>;
  startTime_lte?: Maybe<Scalars['Int']>;
  startTime_in?: Maybe<Array<Scalars['Int']>>;
  startTime_not_in?: Maybe<Array<Scalars['Int']>>;
  endTime?: Maybe<Scalars['Int']>;
  endTime_not?: Maybe<Scalars['Int']>;
  endTime_gt?: Maybe<Scalars['Int']>;
  endTime_lt?: Maybe<Scalars['Int']>;
  endTime_gte?: Maybe<Scalars['Int']>;
  endTime_lte?: Maybe<Scalars['Int']>;
  endTime_in?: Maybe<Array<Scalars['Int']>>;
  endTime_not_in?: Maybe<Array<Scalars['Int']>>;
  donatedCount?: Maybe<Scalars['Int']>;
  donatedCount_not?: Maybe<Scalars['Int']>;
  donatedCount_gt?: Maybe<Scalars['Int']>;
  donatedCount_lt?: Maybe<Scalars['Int']>;
  donatedCount_gte?: Maybe<Scalars['Int']>;
  donatedCount_lte?: Maybe<Scalars['Int']>;
  donatedCount_in?: Maybe<Array<Scalars['Int']>>;
  donatedCount_not_in?: Maybe<Array<Scalars['Int']>>;
  donatedSum?: Maybe<Scalars['BigInt']>;
  donatedSum_not?: Maybe<Scalars['BigInt']>;
  donatedSum_gt?: Maybe<Scalars['BigInt']>;
  donatedSum_lt?: Maybe<Scalars['BigInt']>;
  donatedSum_gte?: Maybe<Scalars['BigInt']>;
  donatedSum_lte?: Maybe<Scalars['BigInt']>;
  donatedSum_in?: Maybe<Array<Scalars['BigInt']>>;
  donatedSum_not_in?: Maybe<Array<Scalars['BigInt']>>;
  withdrawn?: Maybe<Scalars['BigInt']>;
  withdrawn_not?: Maybe<Scalars['BigInt']>;
  withdrawn_gt?: Maybe<Scalars['BigInt']>;
  withdrawn_lt?: Maybe<Scalars['BigInt']>;
  withdrawn_gte?: Maybe<Scalars['BigInt']>;
  withdrawn_lte?: Maybe<Scalars['BigInt']>;
  withdrawn_in?: Maybe<Array<Scalars['BigInt']>>;
  withdrawn_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum PostContent_OrderBy {
  Id = 'id',
  Metadata = 'metadata',
  Donee = 'donee',
  Capacity = 'capacity',
  PeriodHours = 'periodHours',
  StartTime = 'startTime',
  EndTime = 'endTime',
  DonatedCount = 'donatedCount',
  DonatedSum = 'donatedSum',
  Withdrawn = 'withdrawn',
  Donations = 'donations',
  Cancelled = 'cancelled',
  RefundRequested = 'refundRequested',
  Refunded = 'refunded'
}

export type Query = {
  __typename?: 'Query';
  postContent?: Maybe<PostContent>;
  postContents: Array<PostContent>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryPostContentArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryPostContentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostContent_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PostContent_Filter>;
  block?: Maybe<Block_Height>;
};


export type QueryDonationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type QueryDonationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Donation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Donation_Filter>;
  block?: Maybe<Block_Height>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type Subscription = {
  __typename?: 'Subscription';
  postContent?: Maybe<PostContent>;
  postContents: Array<PostContent>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionPostContentArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionPostContentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostContent_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PostContent_Filter>;
  block?: Maybe<Block_Height>;
};


export type SubscriptionDonationArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
};


export type SubscriptionDonationsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Donation_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Donation_Filter>;
  block?: Maybe<Block_Height>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetPostContentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostContentQuery = { __typename?: 'Query', postContent?: Maybe<{ __typename?: 'PostContent', id: string, metadata: string, donee: string, capacity: number, periodHours: number, startTime: number, endTime: number, donatedCount: number, donatedSum: string, withdrawn: string, donations?: Maybe<Array<{ __typename?: 'Donation', id: string, receiptId: string, sender: string, amount: string }>>, refundRequested?: Maybe<Array<{ __typename?: 'Donation', id: string, sender: string }>>, refunded?: Maybe<Array<{ __typename?: 'Donation', id: string, sender: string }>> }> };


export const GetPostContentDocument = gql`
    query GetPostContent($id: ID!) {
  postContent(id: $id) {
    id
    metadata
    donee
    capacity
    periodHours
    startTime
    endTime
    donatedCount
    donatedSum
    withdrawn
    donations {
      id
      receiptId
      sender
      amount
    }
    refundRequested {
      id
      sender
    }
    refunded {
      id
      sender
    }
  }
}
    `;

export function useGetPostContentQuery(options: Omit<Urql.UseQueryArgs<GetPostContentQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostContentQuery>({ query: GetPostContentDocument, ...options });
};