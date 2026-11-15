/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface MemberLoginDto {
  /**
   * @format email
   * @example "alice@example.com"
   */
  email: string;
  /** @example "password1" */
  password: string;
}

export interface AdminLoginDto {
  /** @example "admin" */
  username: string;
  /** @example "admin" */
  password: string;
}

export interface RegisterMemberDto {
  /**
   * @maxLength 128
   * @example "Alice Tan"
   */
  fullName: string;
  /**
   * @format email
   * @maxLength 256
   * @example "alice@example.com"
   */
  email: string;
  /**
   * @minLength 6
   * @maxLength 256
   * @example "password1"
   */
  password: string;
  /**
   * @maxLength 32
   * @example "+65 9123 0001"
   */
  phone?: string;
  address?: string;
}

export interface PetType {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  name: string;
  type: PetType | null;
  breed: string | null;
  ageYears: number | null;
  gender: PetGenderEnum;
  summaryDesc: string | null;
  fullDesc: string | null;
  /**
   * Stored as a JSON string: `{"type":"api"|"external"|"site","uri":"…"}`.
   * Use the `photo` getter/setter for typed access.
   */
  photoRef: string | null;
  isAvailable: boolean;
  /** @format date-time */
  createdAt: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  pets: Pet[];
}

export interface PhotoRefDto {
  type: PhotoRefDtoTypeEnum;
  /**
   * For "api": the upload image id. For "external": full URL. For "site": /public relative path.
   * @maxLength 512
   */
  uri: string;
}

export interface CreatePetDto {
  /**
   * @maxLength 128
   * @example "Max"
   */
  name: string;
  /** Pet type id */
  typeId?: number;
  /** @maxLength 128 */
  breed?: string;
  /**
   * @min 0
   * @max 999
   * @example 3
   */
  ageYears?: number;
  gender?: CreatePetDtoGenderEnum;
  /** @maxLength 128 */
  summaryDesc?: string;
  fullDesc?: string;
  photo?: PhotoRefDto;
  tagIds?: number[];
}

export interface UpdatePetDto {
  /** @maxLength 128 */
  name?: string;
  typeId?: number;
  /** @maxLength 128 */
  breed?: string;
  /**
   * @min 0
   * @max 100
   */
  ageYears?: number;
  gender?: UpdatePetDtoGenderEnum;
  /** @maxLength 128 */
  summaryDesc?: string;
  fullDesc?: string;
  photo?: PhotoRefDto;
  isAvailable?: boolean;
  tagIds?: number[];
}

export interface SubmitReleaseDto {
  /**
   * @maxLength 128
   * @example "Buddy"
   */
  petName: string;
  /** Pet type id */
  petTypeId?: number;
  /** @maxLength 128 */
  breed?: string;
  /**
   * @min 0
   * @max 999
   */
  ageYears?: number;
  gender?: SubmitReleaseDtoGenderEnum;
  photo?: PhotoRefDto;
  /**
   * Short summary (max 128 chars)
   * @maxLength 128
   */
  summaryDesc?: string;
  petDesc?: string;
  reasonDesc?: string;
}

export interface Member {
  id: number;
  fullName: string;
  email: string;
  passwordHash: string;
  phone: string | null;
  address: string | null;
  /** @format date-time */
  joinedAt: string;
  isActive: boolean;
}

export interface ReleasedPet {
  id: number;
  petName: string;
  petType: PetType | null;
  member: Member;
  breed: string | null;
  ageYears: number | null;
  gender: ReleasedPetGenderEnum;
  photoRef: string | null;
  summaryDesc: string | null;
  petDesc: string | null;
  reasonDesc: string | null;
  status: ReleasedPetStatusEnum;
  /** @format date-time */
  submittedAt: string;
  /** @format date-time */
  reviewedAt: string | null;
  adminNotes: string | null;
}

export interface ReviewReleaseDto {
  status: ReviewReleaseDtoStatusEnum;
  adminNotes?: string;
}

export interface CreateAdoptionDto {
  /**
   * Pet id to apply for
   * @min 1
   */
  petId: number;
  /** @maxLength 256 */
  livingSituation?: string;
  experienceDesc?: string;
  message?: string;
}

export interface AdoptionApplication {
  id: number;
  member: Member;
  pet: Pet;
  livingSituation: string | null;
  experienceDesc: string | null;
  message: string | null;
  status: AdoptionApplicationStatusEnum;
  /** @format date-time */
  submittedAt: string;
  /** @format date-time */
  reviewedAt: string | null;
  adminNotes: string | null;
}

export interface ReviewAdoptionDto {
  status: ReviewAdoptionDtoStatusEnum;
  adminNotes?: string;
}

export enum PetGenderEnum {
  Male = "male",
  Female = "female",
  Unknown = "unknown",
}

export enum PhotoRefDtoTypeEnum {
  Api = "api",
  External = "external",
  Site = "site",
}

export enum CreatePetDtoGenderEnum {
  Male = "male",
  Female = "female",
  Unknown = "unknown",
}

export enum UpdatePetDtoGenderEnum {
  Male = "male",
  Female = "female",
  Unknown = "unknown",
}

export enum SubmitReleaseDtoGenderEnum {
  Male = "male",
  Female = "female",
  Unknown = "unknown",
}

export enum ReleasedPetGenderEnum {
  Male = "male",
  Female = "female",
  Unknown = "unknown",
}

export enum ReleasedPetStatusEnum {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum ReviewReleaseDtoStatusEnum {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum AdoptionApplicationStatusEnum {
  Pending = "pending",
  Rejected = "rejected",
  Approved = "approved",
}

export enum ReviewAdoptionDtoStatusEnum {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export enum PetsControllerFindAllParamsAvailableEnum {
  True = "true",
  False = "false",
}

export enum ReleasesControllerFindAllParamsStatusEnum {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum AdoptionsControllerFindAllParamsStatusEnum {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Pet Heaven Society API
 * @version 0.0.1
 * @contact
 *
 * REST API for Pet Heaven Society — pet listings, member registration, adoption applications, and pet surrender forms.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerMemberLogin
     * @summary Member login – returns JWT
     * @request POST:/auth/member/login
     */
    authControllerMemberLogin: (
      data: MemberLoginDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/member/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerAdminLogin
     * @summary Admin login – returns JWT
     * @request POST:/auth/admin/login
     */
    authControllerAdminLogin: (
      data: AdminLoginDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/admin/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  members = {
    /**
     * No description
     *
     * @tags members
     * @name MembersControllerRegister
     * @summary Register as a member / supporter
     * @request POST:/members/register
     */
    membersControllerRegister: (
      data: RegisterMemberDto,
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/members/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags members
     * @name MembersControllerGetMine
     * @summary Get own member profile
     * @request GET:/members/me
     * @secure
     */
    membersControllerGetMine: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/members/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags members
     * @name MembersControllerFindAll
     * @summary [Admin] List all members
     * @request GET:/members
     * @secure
     */
    membersControllerFindAll: (params: RequestParams = {}) =>
      this.request<object[], any>({
        path: `/members`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags members
     * @name MembersControllerFindOne
     * @summary [Admin] Get one member
     * @request GET:/members/{id}
     * @secure
     */
    membersControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/members/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  pets = {
    /**
     * No description
     *
     * @tags pets
     * @name PetsControllerFindAll
     * @summary List pets (filterable by type, tags, name search)
     * @request GET:/pets
     */
    petsControllerFindAll: (
      query?: {
        typeId?: string;
        /** Comma-separated tag IDs */
        tagIds?: string;
        /** Name substring search */
        search?: string;
        available?: PetsControllerFindAllParamsAvailableEnum;
      },
      params: RequestParams = {},
    ) =>
      this.request<Pet[], any>({
        path: `/pets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name PetsControllerCreate
     * @summary [Admin] Add a pet
     * @request POST:/pets
     * @secure
     */
    petsControllerCreate: (data: CreatePetDto, params: RequestParams = {}) =>
      this.request<Pet, any>({
        path: `/pets`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name PetsControllerFindAllTypes
     * @summary List all pet types
     * @request GET:/pets/types
     */
    petsControllerFindAllTypes: (params: RequestParams = {}) =>
      this.request<PetType[], any>({
        path: `/pets/types`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name PetsControllerFindAllTags
     * @summary List all tags
     * @request GET:/pets/tags
     */
    petsControllerFindAllTags: (params: RequestParams = {}) =>
      this.request<Tag[], any>({
        path: `/pets/tags`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name PetsControllerFindOne
     * @summary Get one pet by ID
     * @request GET:/pets/{id}
     */
    petsControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<Pet, any>({
        path: `/pets/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name PetsControllerUpdate
     * @summary [Admin] Update a pet
     * @request PATCH:/pets/{id}
     * @secure
     */
    petsControllerUpdate: (
      id: number,
      data: UpdatePetDto,
      params: RequestParams = {},
    ) =>
      this.request<Pet, any>({
        path: `/pets/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pets
     * @name PetsControllerRemove
     * @summary [Admin] Delete a pet
     * @request DELETE:/pets/{id}
     * @secure
     */
    petsControllerRemove: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/pets/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  releases = {
    /**
     * No description
     *
     * @tags releases
     * @name ReleasesControllerSubmit
     * @summary Submit a pet surrender form (member only)
     * @request POST:/releases
     * @secure
     */
    releasesControllerSubmit: (
      data: SubmitReleaseDto,
      params: RequestParams = {},
    ) =>
      this.request<ReleasedPet, any>({
        path: `/releases`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags releases
     * @name ReleasesControllerFindAll
     * @summary [Admin] List all surrender requests
     * @request GET:/releases
     * @secure
     */
    releasesControllerFindAll: (
      query?: {
        status?: ReleasesControllerFindAllParamsStatusEnum;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReleasedPet[], any>({
        path: `/releases`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags releases
     * @name ReleasesControllerFindMine
     * @summary Get own surrender submissions
     * @request GET:/releases/me
     * @secure
     */
    releasesControllerFindMine: (params: RequestParams = {}) =>
      this.request<ReleasedPet[], any>({
        path: `/releases/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags releases
     * @name ReleasesControllerFindOne
     * @summary [Admin] Get one surrender request
     * @request GET:/releases/{id}
     * @secure
     */
    releasesControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<ReleasedPet, any>({
        path: `/releases/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags releases
     * @name ReleasesControllerReview
     * @summary [Admin] Review a surrender request
     * @request PATCH:/releases/{id}/review
     * @secure
     */
    releasesControllerReview: (
      id: number,
      data: ReviewReleaseDto,
      params: RequestParams = {},
    ) =>
      this.request<ReleasedPet, any>({
        path: `/releases/${id}/review`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  adoptions = {
    /**
     * No description
     *
     * @tags adoptions
     * @name AdoptionsControllerCreate
     * @summary Submit an adoption application (member only)
     * @request POST:/adoptions
     * @secure
     */
    adoptionsControllerCreate: (
      data: CreateAdoptionDto,
      params: RequestParams = {},
    ) =>
      this.request<AdoptionApplication, any>({
        path: `/adoptions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags adoptions
     * @name AdoptionsControllerFindAll
     * @summary [Admin] List all adoption applications
     * @request GET:/adoptions
     * @secure
     */
    adoptionsControllerFindAll: (
      query?: {
        status?: AdoptionsControllerFindAllParamsStatusEnum;
      },
      params: RequestParams = {},
    ) =>
      this.request<AdoptionApplication[], any>({
        path: `/adoptions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags adoptions
     * @name AdoptionsControllerFindMine
     * @summary Get own adoption applications
     * @request GET:/adoptions/me
     * @secure
     */
    adoptionsControllerFindMine: (params: RequestParams = {}) =>
      this.request<AdoptionApplication[], any>({
        path: `/adoptions/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags adoptions
     * @name AdoptionsControllerFindOne
     * @summary [Admin] Get one adoption application
     * @request GET:/adoptions/{id}
     * @secure
     */
    adoptionsControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<AdoptionApplication, any>({
        path: `/adoptions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags adoptions
     * @name AdoptionsControllerReview
     * @summary [Admin] Review an adoption application
     * @request PATCH:/adoptions/{id}/review
     * @secure
     */
    adoptionsControllerReview: (
      id: number,
      data: ReviewAdoptionDto,
      params: RequestParams = {},
    ) =>
      this.request<AdoptionApplication, any>({
        path: `/adoptions/${id}/review`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  upload = {
    /**
     * @description Returns `{ id, type: "api", path }`. Use returned `id` as `uri` in a PhotoRef `{ type: "api", uri: "<id>" }`.
     *
     * @tags upload
     * @name UploadControllerUploadImage
     * @summary Upload an image and receive ID to the compressed WebP (member or admin)
     * @request POST:/upload/image
     * @secure
     */
    uploadControllerUploadImage: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/upload/image`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
}
