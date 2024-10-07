/* tslint:disable */
/* eslint-disable */
/**
 * tech blog hub site의 API
 * 카테고리, 회사, 검색어를 기반으로 한 검색 API (페이징 지원)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
/**
 * RedirectApi - axios parameter creator
 * @export
 */
export const RedirectApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 전달 받은 url로 redirect 합니다. user action logging 을 위한 api.
         * @summary 지정된 URL로 리다이렉트
         * @param {string} url 리다이렉트할 URL
         * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        redirectToUrl: async (url: string, xUserID?: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'url' is not null or undefined
            assertParamExists('redirectToUrl', 'url', url)
            const localVarPath = `/frontend/redirect`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (url !== undefined) {
                localVarQueryParameter['url'] = url;
            }

            if (xUserID != null) {
                localVarHeaderParameter['X-User-ID'] = String(xUserID);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RedirectApi - functional programming interface
 * @export
 */
export const RedirectApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RedirectApiAxiosParamCreator(configuration)
    return {
        /**
         * 전달 받은 url로 redirect 합니다. user action logging 을 위한 api.
         * @summary 지정된 URL로 리다이렉트
         * @param {string} url 리다이렉트할 URL
         * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async redirectToUrl(url: string, xUserID?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.redirectToUrl(url, xUserID, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RedirectApi.redirectToUrl']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RedirectApi - factory interface
 * @export
 */
export const RedirectApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RedirectApiFp(configuration)
    return {
        /**
         * 전달 받은 url로 redirect 합니다. user action logging 을 위한 api.
         * @summary 지정된 URL로 리다이렉트
         * @param {string} url 리다이렉트할 URL
         * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        redirectToUrl(url: string, xUserID?: string, options?: any): AxiosPromise<void> {
            return localVarFp.redirectToUrl(url, xUserID, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RedirectApi - object-oriented interface
 * @export
 * @class RedirectApi
 * @extends {BaseAPI}
 */
export class RedirectApi extends BaseAPI {
    /**
     * 전달 받은 url로 redirect 합니다. user action logging 을 위한 api.
     * @summary 지정된 URL로 리다이렉트
     * @param {string} url 리다이렉트할 URL
     * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RedirectApi
     */
    public redirectToUrl(url: string, xUserID?: string, options?: RawAxiosRequestConfig) {
        return RedirectApiFp(this.configuration).redirectToUrl(url, xUserID, options).then((request) => request(this.axios, this.basePath));
    }
}

