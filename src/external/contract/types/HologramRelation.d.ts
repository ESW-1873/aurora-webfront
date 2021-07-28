/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface HologramRelationInterface extends ethers.utils.Interface {
  functions: {
    "availableCredit(address)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "baseCredit()": FunctionFragment;
    "burnableCredit(address)": FunctionFragment;
    "claimAndBurn(address)": FunctionFragment;
    "claimAndBurnByForwarder(address)": FunctionFragment;
    "claimableCredit(address)": FunctionFragment;
    "creditAddress()": FunctionFragment;
    "imposed(address)": FunctionFragment;
    "imposedBlockLine(address)": FunctionFragment;
    "initialize()": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
    "issue()": FunctionFragment;
    "issueByForwarder()": FunctionFragment;
    "nameRegistryAddress()": FunctionFragment;
    "oracleAddress()": FunctionFragment;
    "owner()": FunctionFragment;
    "penalty(address)": FunctionFragment;
    "poolAddress()": FunctionFragment;
    "relation(address,address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "restake(address,address,uint256)": FunctionFragment;
    "stackReward(address)": FunctionFragment;
    "stake(address,uint256)": FunctionFragment;
    "stakeByForwarder(address,uint256)": FunctionFragment;
    "stakedCredits(address)": FunctionFragment;
    "stakingCredits(address)": FunctionFragment;
    "stakingReward(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unstake(address,uint256)": FunctionFragment;
    "unstakeByForwarder(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "availableCredit",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "baseCredit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "burnableCredit",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimAndBurn",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimAndBurnByForwarder",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimableCredit",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "creditAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "imposed", values: [string]): string;
  encodeFunctionData(
    functionFragment: "imposedBlockLine",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "issue", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "issueByForwarder",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nameRegistryAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "oracleAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "penalty", values: [string]): string;
  encodeFunctionData(
    functionFragment: "poolAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "relation",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "restake",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "stackReward", values: [string]): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeByForwarder",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakedCredits",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingCredits",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unstake",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakeByForwarder",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "availableCredit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "baseCredit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "burnableCredit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimAndBurn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimAndBurnByForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimableCredit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "creditAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "imposed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "imposedBlockLine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "issue", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "issueByForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nameRegistryAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "oracleAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "penalty", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poolAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "relation", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "restake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stackReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakeByForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakedCredits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingCredits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unstakeByForwarder",
    data: BytesLike
  ): Result;

  events: {
    "Claim(address,uint256)": EventFragment;
    "Issue(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Restake(address,address,address,uint256)": EventFragment;
    "Stake(address,address,uint256)": EventFragment;
    "Unstake(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Issue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Restake"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Stake"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unstake"): EventFragment;
}

export class HologramRelation extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: HologramRelationInterface;

  functions: {
    availableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    baseCredit(overrides?: CallOverrides): Promise<[BigNumber]>;

    burnableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    claimAndBurn(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimAndBurnByForwarder(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    creditAddress(overrides?: CallOverrides): Promise<[string]>;

    imposed(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    imposedBlockLine(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    issueByForwarder(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nameRegistryAddress(overrides?: CallOverrides): Promise<[string]>;

    oracleAddress(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    penalty(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    poolAddress(overrides?: CallOverrides): Promise<[string]>;

    relation(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    restake(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stackReward(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    stake(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakedCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [
        ([string, string, BigNumber, boolean, BigNumber] & {
          from: string;
          to: string;
          amount: BigNumber;
          positive: boolean;
          blockNumber: BigNumber;
        })[]
      ]
    >;

    stakingCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      [
        ([string, string, BigNumber, boolean, BigNumber] & {
          from: string;
          to: string;
          amount: BigNumber;
          positive: boolean;
          blockNumber: BigNumber;
        })[]
      ]
    >;

    stakingReward(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstake(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unstakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  availableCredit(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  baseCredit(overrides?: CallOverrides): Promise<BigNumber>;

  burnableCredit(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  claimAndBurn(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimAndBurnByForwarder(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimableCredit(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  creditAddress(overrides?: CallOverrides): Promise<string>;

  imposed(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  imposedBlockLine(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isTrustedForwarder(
    forwarder: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  issue(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  issueByForwarder(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nameRegistryAddress(overrides?: CallOverrides): Promise<string>;

  oracleAddress(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  penalty(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  poolAddress(overrides?: CallOverrides): Promise<string>;

  relation(
    from: string,
    to: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  restake(
    from: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stackReward(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  stake(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakeByForwarder(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakedCredits(
    account: string,
    overrides?: CallOverrides
  ): Promise<
    ([string, string, BigNumber, boolean, BigNumber] & {
      from: string;
      to: string;
      amount: BigNumber;
      positive: boolean;
      blockNumber: BigNumber;
    })[]
  >;

  stakingCredits(
    account: string,
    overrides?: CallOverrides
  ): Promise<
    ([string, string, BigNumber, boolean, BigNumber] & {
      from: string;
      to: string;
      amount: BigNumber;
      positive: boolean;
      blockNumber: BigNumber;
    })[]
  >;

  stakingReward(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstake(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unstakeByForwarder(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    availableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    baseCredit(overrides?: CallOverrides): Promise<BigNumber>;

    burnableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimAndBurn(account: string, overrides?: CallOverrides): Promise<void>;

    claimAndBurnByForwarder(
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    claimableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditAddress(overrides?: CallOverrides): Promise<string>;

    imposed(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    imposedBlockLine(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(overrides?: CallOverrides): Promise<void>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    issue(overrides?: CallOverrides): Promise<void>;

    issueByForwarder(overrides?: CallOverrides): Promise<void>;

    nameRegistryAddress(overrides?: CallOverrides): Promise<string>;

    oracleAddress(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    penalty(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    poolAddress(overrides?: CallOverrides): Promise<string>;

    relation(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    restake(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stackReward(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    stake(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakedCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      ([string, string, BigNumber, boolean, BigNumber] & {
        from: string;
        to: string;
        amount: BigNumber;
        positive: boolean;
        blockNumber: BigNumber;
      })[]
    >;

    stakingCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<
      ([string, string, BigNumber, boolean, BigNumber] & {
        from: string;
        to: string;
        amount: BigNumber;
        positive: boolean;
        blockNumber: BigNumber;
      })[]
    >;

    stakingReward(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unstake(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    unstakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Claim(
      sender?: null,
      blockNumber?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { sender: string; blockNumber: BigNumber }
    >;

    Issue(account?: null): TypedEventFilter<[string], { account: string }>;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    Restake(
      sender?: null,
      from?: null,
      to?: null,
      amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { sender: string; from: string; to: string; amount: BigNumber }
    >;

    Stake(
      from?: null,
      to?: null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; amount: BigNumber }
    >;

    Unstake(
      from?: null,
      to?: null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; amount: BigNumber }
    >;
  };

  estimateGas: {
    availableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    baseCredit(overrides?: CallOverrides): Promise<BigNumber>;

    burnableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimAndBurn(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimAndBurnByForwarder(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    creditAddress(overrides?: CallOverrides): Promise<BigNumber>;

    imposed(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    imposedBlockLine(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    issueByForwarder(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nameRegistryAddress(overrides?: CallOverrides): Promise<BigNumber>;

    oracleAddress(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    penalty(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    poolAddress(overrides?: CallOverrides): Promise<BigNumber>;

    relation(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    restake(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stackReward(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    stake(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakedCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stakingCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stakingReward(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstake(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unstakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    availableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    baseCredit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    burnableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimAndBurn(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimAndBurnByForwarder(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimableCredit(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    creditAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    imposed(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    imposedBlockLine(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    issueByForwarder(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nameRegistryAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    oracleAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    penalty(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    poolAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    relation(
      from: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    restake(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stackReward(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stake(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakedCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stakingCredits(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stakingReward(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstake(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unstakeByForwarder(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
