// import * as clc from 'cli-color';
// import bare from 'cli-color/bare';
// import safeStringify from 'fast-safe-stringify';
// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';

// import { appConfig } from '..';

// const nestLikeColorScheme: Record<string, bare.Format> = {
//   info: clc.green,
//   error: clc.red,
//   warn: clc.yellow,
//   debug: clc.magentaBright,
//   verbose: clc.cyanBright,
// };

// export const winstonLogger = WinstonModule.createLogger({
//   level: appConfig.api.logLevel,
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         ...[
//           winston.format.timestamp(),
//           winston.format.printf(({ context, level, timestamp, message, ...meta }) => {
//             const color = nestLikeColorScheme[level] || ((text: string): string => text);

//             return (
//               ('undefined' !== typeof timestamp
//                 ? `${new Date(timestamp).toLocaleString()}  `
//                 : '') +
//               `${clc.yellow(level.toUpperCase())}  ` +
//               ('undefined' !== typeof context ? `${clc.yellow('[' + context + ']')}  ` : '') +
//               `${color(message)} - ` +
//               `${safeStringify(meta)}`
//             );
//           }),
//           ...(['staging', 'production'].includes(appConfig.global.env)
//             ? [winston.format.uncolorize()]
//             : []),
//         ],
//       ),
//     }),
//   ],
// });
