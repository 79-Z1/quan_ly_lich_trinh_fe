declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_MESSENGER_PAGE_ID: string;
    NEXT_PUBLIC_GOOGLE_TRACKING: string;
    NEXT_PUBLIC_SEGMENT_TRACKING: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_EXPIRES_IN: string;
    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_DATADOG_APPLICATION_ID: string;
    NEXT_PUBLIC_DATADOG_CLIENT_TOKEN: string;
    NEXT_PUBLIC_DATADOG_SERVICE: string;
    NEXT_PUBLIC_DATADOG_ENV: string;
    NEXT_PUBLIC_OPENAI_API_KEY: string;
    NEXT_PUBLIC_OPENAI_MODELS: string;
    NEXT_PUBLIC_OPENAI_ENDPOINT: string;
    NEXT_PUBLIC_WEBHOOKS_PAYMENT: string;
  }
}