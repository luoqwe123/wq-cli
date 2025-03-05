// src/utils/request.ts
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
    AxiosError,
  } from 'axios';
  import type { Canceler } from 'axios';
  
  // 定义通用响应数据结构
  interface ApiResponse<T = any> {
    code: number;
    data: T;
    message?: string;
  }
  
  // 定义自定义配置选项
  interface CustomAxiosConfig extends AxiosRequestConfig {
    retry?: number;
    retryDelay?: number;
    showLoading?: boolean;
    _retryCount?: number;
  }
  
  // 定义错误处理函数类型
  type ErrorHandler = (error: AxiosError) => void;
  
  class HttpClient {
    private instance: AxiosInstance;
    private pendingRequests: Map<string, Canceler> = new Map();
  
    constructor(baseConfig: CustomAxiosConfig = {}) {
      this.instance = axios.create({
        baseURL: baseConfig.baseURL || '/api',
        timeout: baseConfig.timeout || 10000,
        headers: baseConfig.headers || { 'Content-Type': 'application/json' },
        ...baseConfig,
      });
  
      this.instance.interceptors.request.use(
        this.requestInterceptor,
        this.requestErrorHandler,
      );
  
      this.instance.interceptors.response.use(
        this.responseInterceptor,
        this.responseErrorHandler,
      );
    }
  
    private requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const key = this.generateRequestKey(config);
      this.cancelPendingRequest(key);
      config.cancelToken = new axios.CancelToken((cancel) => {
        this.pendingRequests.set(key, cancel);
      });
  
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    };
  
    private requestErrorHandler = (error: AxiosError): Promise<AxiosError> => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    };
  
    private responseInterceptor = (response: AxiosResponse): any => {
      const { config } = response;
      const key = this.generateRequestKey(config);
      this.pendingRequests.delete(key);
  
      const data = response.data as ApiResponse<any>;
      if (data.code !== 0) {
        throw new Error(data.message || 'Request failed');
      }
      return data.data;
    };
  
    private responseErrorHandler = async (error: AxiosError): Promise<any> => {
      const config = error.config as CustomAxiosConfig | undefined;
  
      if (!config) {
        console.error('Response Error: Config not found', error);
        return Promise.reject(error);
      }
  
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        return Promise.reject(error);
      }
  
      if (config.retry) {
        config._retryCount = config._retryCount ?? 0;
        if (config._retryCount < config.retry) {
          config._retryCount += 1;
          await new Promise((resolve) => setTimeout(resolve, config.retryDelay || 1000));
          return this.instance(config);
        }
      }
  
      console.error('Response Error:', error);
      return Promise.reject(error);
    };
  
    private generateRequestKey(config: AxiosRequestConfig): string {
      return `${config.method}-${config.url}-${JSON.stringify(config.params)}-${JSON.stringify(config.data)}`;
    };
  
    private cancelPendingRequest(key: string) {
      const cancel = this.pendingRequests.get(key);
      if (cancel) {
        cancel('Request canceled due to new request');
        this.pendingRequests.delete(key);
      }
    }
  
    // 修改 request 方法
    public async request<T = any>(config: CustomAxiosConfig): Promise<T> {
      const response = await this.instance.request<ApiResponse<T>>(config);
      // 由于拦截器返回的是 data.data，直接返回 response.data.data
      const data = response.data as ApiResponse<T>;
      return data.data;
    }
  
    public get<T = any>(url: string, config: CustomAxiosConfig = {}): Promise<T> {
      return this.request<T>({ ...config, method: 'GET', url });
    }
  
    public post<T = any>(url: string, data?: any, config: CustomAxiosConfig = {}): Promise<T> {
      return this.request<T>({ ...config, method: 'POST', url, data });
    }
  
    public upload<T = any>(url: string, file: File, config: CustomAxiosConfig = {}): Promise<T> {
      const formData = new FormData();
      formData.append('file', file);
      return this.request<T>({
        ...config,
        method: 'POST',
        url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
  
    public cancelAllRequests() {
      this.pendingRequests.forEach((cancel) => cancel('All requests canceled'));
      this.pendingRequests.clear();
    }
  }
  
  const httpClient = new HttpClient({
    baseURL: import.meta.env.VITE_API_URL,
  });
  
  export default httpClient;