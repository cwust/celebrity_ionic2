export interface ApplicationConfig {
  apiEndpoint: string;
}

// Configuration values for our app
const LOCAL_CONFIG: ApplicationConfig = {
  apiEndpoint: 'http://localhost:3000'
};

export const APP_CONFIG = LOCAL_CONFIG;