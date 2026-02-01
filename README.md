# WhatsApp Campaign

A dashboard providing insights into WhatsApp campaign performance.

This repository contains the codebase for a WhatsApp campaign analytics application designed to visualize, analyze, and explore messaging campaign data for marketing, notifications, or internal communication use cases.

---

## 🧠 Project Overview

The goal of this project is to provide clear visibility into WhatsApp campaign performance through a clean and extensible dashboard.

Key objectives:

- Surface insights and metrics related to WhatsApp campaigns
- Enable exploration of campaign performance over time
- Provide a scalable foundation for analytics and reporting
- Support integration with WhatsApp APIs or third-party data sources

This project is intended for monitoring and analysis purposes only and does not handle campaign creation, message sending, or automation.

---

## 🚀 Features

- Campaign-based message organization
- Reusable message templates
- Scalable architecture for automation
- Ready for API-based WhatsApp integrations
- Clean and extensible project structure

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm**, **yarn**, or **pnpm**
- Access to a WhatsApp API provider (if applicable)

### Installation

Clone the repository:

```bash
git clone https://github.com/Ismail-Rhoulam/whatsapp-campaign.git
cd whatsapp-campaign
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the project in development mode:

```bash
npm run dev
# or
yarn dev
```

---

## 📦 Available Scripts

| Script | Description |
|------|-------------|
| `dev` | Run the app in development mode |
| `build` | Build the app for production |
| `start` | Run the production build |
| `lint` | Run linting |

---

## 📁 Project Structure

```text
src/                  Application source code
public/               Static assets
config/               Configuration files
package.json          Project metadata and scripts
tsconfig.json         TypeScript configuration
```

---

## 🔌 WhatsApp Integration

This project is designed to work with WhatsApp messaging providers such as:

- WhatsApp Business API
- Cloud-based WhatsApp APIs
- Third-party messaging platforms

Integration details depend on the provider and are intentionally decoupled from the core campaign logic.

---

## 🌍 Deployment

The application can be deployed on any Node.js-compatible hosting platform.

Typical deployment steps:

- Build the project using `npm run build`
- Deploy the output to your hosting provider
- Configure environment variables for API credentials

---

## 🤝 Contributing

Contributions are welcome.

Suggested workflow:

- Fork the repository
- Create a feature branch
- Commit your changes
- Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.
