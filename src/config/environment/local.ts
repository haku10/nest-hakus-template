import { AppConfig } from '../app-config.interface';

import { DeepPartial } from '@/type/object';

export const localAppConfig: DeepPartial<AppConfig> = {
  global: {
    env: 'local',
    envShort: 'loc',
  },
  api: {
    baseUrl: `http://localhost:${
      parseInt(process.env.DOCKER_COMPOSE_HOST_PORT_BACKEND) || 13000
    }`,
    allowedUrls: [
      // swagger用
      `http://localhost:${
        parseInt(process.env._DOCKER_COMPOSE_HOST_PORT_BACKEND) || 13000
      }`,
      // frontend（管理アプリ）用
      `http://localhost:${
        parseInt(process.env._HOST_PORT_FRONTEND_ADMIN) || 3000
      }`,
      // frontend（入会画面）用
      `http://localhost:${
        parseInt(process.env._HOST_PORT_FRONTEND_PARTICIPANT) || 3011
      }`,
    ],
    cookie: {
      secure: false,
      sameSite: 'lax',
    },
  },
  developer: {
    email: process.env._DEVELOPER_EMAIL,
    firstName: process.env._DEVELOPER_FIRSTNAME,
    firstNameKana: process.env._DEVELOPER_FIRSTNAME,
    lastName: process.env._DEVELOPER_LASTNAME,
    lastNameKana: process.env._DEVELOPER_LASTNAME,
  },
};
