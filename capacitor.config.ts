import type { CapacitorConfig } from '@capacitor/cli';
import { Camera } from '@capacitor/camera';

const config: CapacitorConfig = {
  plugins: {
    Camera: {
      permission: 'user',
      preserveAspectRatio: true
    }
  },
  appId: 'com.e.mart',
  appName: 'E Mart',
  webDir: 'www'
};

export default config;
