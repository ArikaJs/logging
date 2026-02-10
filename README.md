
## Arika Logging

`@arikajs/logging` provides a flexible, channel-based logging system for the ArikaJS framework.

It allows applications to write logs to multiple destinations (console, files, external services) using a unified API, inspired by Laravel’s logging system.

---

## ✨ Features

- **Multiple log channels**: Separate outputs for different needs
- **Driver-based architecture**: Pluggable backends (console, file, etc.)
- **Log levels**: Compatible with standard levels (debug, info, warning, error, etc.)
- **Stackable channels**: Combine multiple channels
- **File & console drivers (v1)**: Essential logging outputs
- **Contextual logging**: Pass metadata with log messages
- **TypeScript-first**: Strongly typed interface

---

## 📦 Installation

```bash
npm install @arikajs/logging
# or
yarn add @arikajs/logging
# or
pnpm add @arikajs/logging
```

---

## 🚀 Basic Usage

```ts
import { Log } from '@arikajs/logging';

Log.info('Application started');
Log.error('Something went wrong', { userId: 1 });
```

### 📂 Log Channels

```ts
Log.channel('daily').warning('Low disk space');
```

---

## ⚙️ Configuration

```ts
export default {
  default: process.env.LOG_CHANNEL || 'stack',

  channels: {
    stack: {
      driver: 'stack',
      channels: ['single'],
    },

    single: {
      driver: 'file',
      path: './storage/logs/arika.log',
      level: process.env.LOG_LEVEL || 'debug',
    },

    daily: {
      driver: 'daily',
      path: './storage/logs/arika.log',
      level: process.env.LOG_LEVEL || 'debug',
      days: 14,
    },

    console: {
      driver: 'console',
      level: process.env.LOG_LEVEL || 'debug',
    },
  },
};
```

---

## 🔌 Supported Drivers (v1)

| Driver | Status | Description |
| :--- | :--- | :--- |
| **Console** | ✅ Supported | Standard output logging |
| **File** | ✅ Supported | Single file logging |
| **Daily** | ✅ Supported | Date-based rotating log files |
| **Stack** | ✅ Supported | Multi-channel composite logging |
| External services | ⏳ Planned | Slack, Papertrail, etc. |

---

## 🔗 Integration

- **`@arikajs/http`** → request logs
- **`@arikajs/queue`** → job logs
- **`@arikajs/events`** → event logs
- **`@arikajs/auth`** → security logs

---

## 🧠 Architecture (High Level)

```
logging/
├── src/
│   ├── LogManager.ts
│   ├── Logger.ts
│   ├── Drivers/
│   │   ├── ConsoleDriver.ts
│   │   └── FileDriver.ts
│   ├── Contracts/
│   │   └── Logger.ts
│   └── index.ts
├── tests/
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

---

## 📄 License

`@arikajs/logging` is open-source software licensed under the **MIT License**.

---

## 🧭 Philosophy

> "Logs tell the story your app can’t."
