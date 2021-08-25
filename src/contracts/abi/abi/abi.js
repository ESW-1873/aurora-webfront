"use strict";
exports.__esModule = true;
exports.ownable = exports.postManager = exports.donationPost = void 0;
exports.donationPost = [
    {
        inputs: [
            {
                internalType: 'string',
                name: 'name_',
                type: 'string'
            },
            {
                internalType: 'string',
                name: 'symbol_',
                type: 'string'
            },
            {
                internalType: 'string',
                name: 'baseURI_',
                type: 'string'
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'approved',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'Approval',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'approved',
                type: 'bool'
            },
        ],
        name: 'ApprovalForAll',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'Transfer',
        type: 'event'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address'
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'getApproved',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
        ],
        name: 'isApprovedForAll',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'name',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: '_data',
                type: 'bytes'
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                internalType: 'bool',
                name: 'approved',
                type: 'bool'
            },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: 'interfaceId',
                type: 'bytes4'
            },
        ],
        name: 'supportsInterface',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'tokenURI',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
];
exports.postManager = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'donationReceiptAddress',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'donationPost',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'refundRequest',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'hologramAccumulator',
                type: 'address'
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'donee',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
        ],
        name: 'CancelDonation',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'serialId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'applyer',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
        ],
        name: 'Donate',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'metadata',
                type: 'string'
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'donee',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'capacity',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'periodHours',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256'
            },
        ],
        name: 'NewPost',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address'
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'capacity',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'donatedCount',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'donatedSum',
                type: 'uint256'
            },
        ],
        name: 'ReachCapacity',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'requestId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'sender',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
        ],
        name: 'RequestRefund',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'donee',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
        ],
        name: 'Withdraw',
        type: 'event'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        name: 'allDonations',
        outputs: [
            {
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'serialNum',
                type: 'uint256'
            },
            {
                internalType: 'address',
                name: 'sender',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'donateTime',
                type: 'uint256'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        name: 'allPosts',
        outputs: [
            {
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                internalType: 'string',
                name: 'metadata',
                type: 'string'
            },
            {
                internalType: 'address',
                name: 'donee',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'capacity',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'periodHours',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'donatedCount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'donatedSum',
                type: 'uint256'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
        ],
        name: 'cancel',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
        ],
        name: 'cancelableAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'metadata',
                type: 'string'
            },
            {
                internalType: 'uint256',
                name: 'blockNumber',
                type: 'uint256'
            },
        ],
        name: 'computePostId',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        stateMutability: 'pure',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256'
            },
        ],
        name: 'computeReceiptId',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        stateMutability: 'pure',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
        ],
        name: 'computeRefundRequestId',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        stateMutability: 'pure',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
        ],
        name: 'donate',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'metadata',
                type: 'string'
            },
            {
                internalType: 'uint256',
                name: 'capacity',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'periodHours',
                type: 'uint256'
            },
        ],
        name: 'newPost',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'refund',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        name: 'refundRequests',
        outputs: [
            {
                internalType: 'address',
                name: 'claimer',
                type: 'address'
            },
            {
                internalType: 'bool',
                name: 'refuned',
                type: 'bool'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'receiptId',
                type: 'uint256'
            },
        ],
        name: 'requestRefund',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalValueLocked',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address'
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'postId',
                type: 'uint256'
            },
        ],
        name: 'withdrawalAmount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
];
exports.ownable = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address'
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event'
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            },
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address'
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
];
