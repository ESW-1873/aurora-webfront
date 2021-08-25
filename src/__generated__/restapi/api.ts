/* tslint:disable */
/* eslint-disable */
/**
 * aurora-backend-restapi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from './configuration'
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios'
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from './common'
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from './base'

/**
 *
 * @export
 * @interface Image
 */
export interface Image {
  /**
   *
   * @type {string}
   * @memberof Image
   */
  data: string
  /**
   *
   * @type {string}
   * @memberof Image
   */
  contentType: string
}
/**
 *
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
  /**
   *
   * @type {string}
   * @memberof InlineObject
   */
  title: string
  /**
   *
   * @type {string}
   * @memberof InlineObject
   */
  description: string
  /**
   *
   * @type {Image}
   * @memberof InlineObject
   */
  image: Image
}
/**
 *
 * @export
 * @interface InlineObject1
 */
export interface InlineObject1 {
  /**
   *
   * @type {string}
   * @memberof InlineObject1
   */
  postId: string
}
/**
 *
 * @export
 * @interface InlineObject2
 */
export interface InlineObject2 {
  /**
   *
   * @type {string}
   * @memberof InlineObject2
   */
  amount: string
  /**
   *
   * @type {string}
   * @memberof InlineObject2
   */
  postId: string
  /**
   * address of a wallet
   * @type {string}
   * @memberof InlineObject2
   */
  address: string
}
/**
 *
 * @export
 * @interface Metadata
 */
export interface Metadata {
  /**
   *
   * @type {string}
   * @memberof Metadata
   */
  metadata: string
  /**
   *
   * @type {string}
   * @memberof Metadata
   */
  imageUrl: string
}
/**
 *
 * @export
 * @interface PostResponse
 */
export interface PostResponse {
  /**
   *
   * @type {string}
   * @memberof PostResponse
   */
  imageUrl: string
  /**
   *
   * @type {string}
   * @memberof PostResponse
   */
  metadata: string
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @summary Upload Post
     * @param {InlineObject} [inlineObject]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postPost: async (
      inlineObject?: InlineObject,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/post`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      localVarHeaderParameter['Content-Type'] = 'application/json'

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        inlineObject,
        localVarRequestOptions,
        configuration,
      )

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     *
     * @summary Upload receipt
     * @param {InlineObject2} [inlineObject2]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postReceipt: async (
      inlineObject2?: InlineObject2,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/receipt`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      localVarHeaderParameter['Content-Type'] = 'application/json'

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        inlineObject2,
        localVarRequestOptions,
        configuration,
      )

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     *
     * @summary Upload refund request
     * @param {InlineObject1} [inlineObject1]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postRefund: async (
      inlineObject1?: InlineObject1,
      options: any = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/refund`
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      localVarHeaderParameter['Content-Type'] = 'application/json'

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      }
      localVarRequestOptions.data = serializeDataIfNeeded(
        inlineObject1,
        localVarRequestOptions,
        configuration,
      )

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
  }
}

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
  return {
    /**
     *
     * @summary Upload Post
     * @param {InlineObject} [inlineObject]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async postPost(
      inlineObject?: InlineObject,
      options?: any,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PostResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.postPost(
        inlineObject,
        options,
      )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      )
    },
    /**
     *
     * @summary Upload receipt
     * @param {InlineObject2} [inlineObject2]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async postReceipt(
      inlineObject2?: InlineObject2,
      options?: any,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metadata>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.postReceipt(
        inlineObject2,
        options,
      )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      )
    },
    /**
     *
     * @summary Upload refund request
     * @param {InlineObject1} [inlineObject1]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async postRefund(
      inlineObject1?: InlineObject1,
      options?: any,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metadata>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.postRefund(
        inlineObject1,
        options,
      )
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      )
    },
  }
}

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = DefaultApiFp(configuration)
  return {
    /**
     *
     * @summary Upload Post
     * @param {InlineObject} [inlineObject]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postPost(
      inlineObject?: InlineObject,
      options?: any,
    ): AxiosPromise<PostResponse> {
      return localVarFp
        .postPost(inlineObject, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Upload receipt
     * @param {InlineObject2} [inlineObject2]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postReceipt(
      inlineObject2?: InlineObject2,
      options?: any,
    ): AxiosPromise<Metadata> {
      return localVarFp
        .postReceipt(inlineObject2, options)
        .then((request) => request(axios, basePath))
    },
    /**
     *
     * @summary Upload refund request
     * @param {InlineObject1} [inlineObject1]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postRefund(
      inlineObject1?: InlineObject1,
      options?: any,
    ): AxiosPromise<Metadata> {
      return localVarFp
        .postRefund(inlineObject1, options)
        .then((request) => request(axios, basePath))
    },
  }
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
  /**
   *
   * @summary Upload Post
   * @param {InlineObject} [inlineObject]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public postPost(inlineObject?: InlineObject, options?: any) {
    return DefaultApiFp(this.configuration)
      .postPost(inlineObject, options)
      .then((request) => request(this.axios, this.basePath))
  }

  /**
   *
   * @summary Upload receipt
   * @param {InlineObject2} [inlineObject2]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public postReceipt(inlineObject2?: InlineObject2, options?: any) {
    return DefaultApiFp(this.configuration)
      .postReceipt(inlineObject2, options)
      .then((request) => request(this.axios, this.basePath))
  }

  /**
   *
   * @summary Upload refund request
   * @param {InlineObject1} [inlineObject1]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public postRefund(inlineObject1?: InlineObject1, options?: any) {
    return DefaultApiFp(this.configuration)
      .postRefund(inlineObject1, options)
      .then((request) => request(this.axios, this.basePath))
  }
}
