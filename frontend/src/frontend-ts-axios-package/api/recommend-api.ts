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
// @ts-ignore
import { RecommendResponse } from '../model';
/**
 * RecommendApi - axios parameter creator
 * @export
 */
export const RecommendApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 다른 기사 추천 및 요약 정보 제공
         * @param {string} url 분석할 기사의 URL
         * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        recommendOtherArticles: async (url: string, xUserID?: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'url' is not null or undefined
            assertParamExists('recommendOtherArticles', 'url', url)
            const localVarPath = `/extension/recommend`;
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
 * RecommendApi - functional programming interface
 * @export
 */
export const RecommendApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RecommendApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 다른 기사 추천 및 요약 정보 제공
         * @param {string} url 분석할 기사의 URL
         * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async recommendOtherArticles(url: string, xUserID?: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RecommendResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.recommendOtherArticles(url, xUserID, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RecommendApi.recommendOtherArticles']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RecommendApi - factory interface
 * @export
 */
export const RecommendApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RecommendApiFp(configuration)
    return {
        /**
         * 
         * @summary 다른 기사 추천 및 요약 정보 제공
         * @param {string} url 분석할 기사의 URL
         * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        recommendOtherArticles(url: string, xUserID?: string, options?: any): AxiosPromise<RecommendResponse> {
            return localVarFp.recommendOtherArticles(url, xUserID, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RecommendApi - object-oriented interface
 * @export
 * @class RecommendApi
 * @extends {BaseAPI}
 */
export class RecommendApi extends BaseAPI {
    /**
     * 
     * @summary 다른 기사 추천 및 요약 정보 제공
     * @param {string} url 분석할 기사의 URL
     * @param {string} [xUserID] Local storage에 저장된 UUID v4 형식의 사용자 식별자 (로깅용)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RecommendApi
     */
    public recommendOtherArticles(url: string, xUserID?: string, options?: RawAxiosRequestConfig) {
        return RecommendApiFp(this.configuration).recommendOtherArticles(url, xUserID, options).then((request) => request(this.axios, this.basePath));
    }
}

