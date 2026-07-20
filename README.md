<div align="center">

# ⚡ ZEUS PANEL

[![Version](https://img.shields.io/badge/Version-v1.9.8-blue.svg?style=for-the-badge&logo=cloudflare)](https://github.com/zeus-panel/ZEUS-PANEL)
[![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers-f38020.svg?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Database](https://img.shields.io/badge/Database-Cloudflare%20D1%20SQL-F38020.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://developers.cloudflare.com/d1/)
[![Protocol](https://img.shields.io/badge/Protocol-VLESS%20%2F%20WebSocket-00c7b7.svg?style=for-the-badge)](https://github.com/zeus-panel/ZEUS-PANEL)
[![License](https://img.shields.io/badge/License-Proprietary%20(Non--Commercial)-red.svg?style=for-the-badge)](https://github.com/zeus-panel/ZEUS-PANEL/blob/main/LICENSE)
[![Telegram](https://img.shields.io/badge/Community-PANEL__ZEUS-2CA5E0.svg?style=for-the-badge&logo=telegram)](https://t.me/PANEL_ZEUS)

**A high-performance, multi-tenant network proxy management platform engineered for edge deployment on Cloudflare Workers and D1 Serverless SQL.**

[Key Features](#️-key-features) • [Deployment Guide](#-quick-deployment-guide) • [Donate](#-donate--support) • [Credits](#️-credits--copyright)

</div>

---

## ⚡️ Key Features

* 🌐 **Fixed IP & Geolocation:** Seamlessly bind specific countries or static proxy IPs to individual users.
* 👥 **Advanced User Management:** Enforce strict limits based on traffic volume (GB), time expiration (Days), total requests, and concurrent devices.
* ♻️ **Automated Quota Resets:** Scheduled auto-reset capabilities for volume and request counters based on specified timeframes.
* 🛠 **Bulk Operations:** Comprehensive multi-select tools for batch user editing, deletion, and quota resets.
* 🛡 **Anti-Filtering Mechanisms:** Built-in TLS Fragment support and custom ClientHello Fingerprint simulators to bypass DPI.
* 📱 **Modern UI:** A responsive, mobile-friendly interface built with Tailwind CSS, featuring full AMOLED Dark Mode.
* 🛑 **Smart Content Blocker:** Integrated DNS-over-HTTPS (DoH) engine to actively intercept and block NSFW content and advertisements.
* 📡 **Custom Proxy Routing:** Support for configuring upstream proxy chaining and VIP residential proxies.
* 🌐 **Dynamic IP Rotation:** Automated rotation of clean Cloudflare edge IPs at custom, user-defined intervals.
* 📊 **Live Quota Monitoring:** Real-time tracking of Cloudflare Worker requests to proactively prevent account bans or suspensions.
* 🔗 **Self-Service Portals:** Auto-generation of Subscription Links, QR codes, and dedicated real-time status pages for every user.
* 🔄 **OTA Core Updates:** Automated edge deployment system updating the panel directly without database or data loss.
* 🗄 **Complete Backup System:** Full JSON export and import utility covering the entire database and server configuration state.
* 🚀 **One-Click Deployment:** Complete provisioning of the panel, subdomain, and D1 database directly via the Telegram Bot.
* 🤖 **Multi-Account Bot Management:** Simultaneously manage multiple Cloudflare accounts, execute panel updates, and recover passwords using the Telegram Bot.

---

## 🚀 Quick Deployment Guide

<div align="center">

<a href="https://dash.cloudflare.com/" target="_blank">
<img src="https://img.shields.io/badge/Cloudflare_Dashboard-Login-f38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Dashboard" height="40">
</a>

<div align="center">
First, log into your Cloudflare dashboard. Ensure you are using a verified email address (avoid temporary/fake emails), then proceed with one of the deployment methods below.
</div>

<br>

<a href="https://t.me/ZEUS_PANEL_BOT" target="_blank">
<img src="https://img.shields.io/badge/Zeus_Telegram_Bot-Start_Bot-0088cc?style=for-the-badge&logo=telegram&logoColor=white" alt="Zeus Telegram Bot" height="40">
</a>

</div>

<br>

### 🤖 Method 1: Deploy via Telegram Bot (Recommended)

1. 🌐 Access the **[ZEUS Telegram Bot](https://t.me/ZEUS_PANEL_BOT)** and click `Start`.
2. 👤 From the main menu, click on **"➕ Register Cloudflare Account"**.
3. 🔗 Click the inline button **"🔑 Get Cloudflare Token"** to be redirected to your Cloudflare account.
4. 🟦 Scroll to the bottom of the Cloudflare page, click the blue `Continue to summary` button, and then click `Create Token`.
5. 🔑 Copy the generated token and **send it directly in the bot chat**.
6. ⚡️ Once the token is verified, return to the main menu, click **"🚀 Build New Panel"**, and select your account. Your D1 database and panel will be automatically deployed.

---

<div align="center">

<a href="https://zeus-panel.ir-netlify.workers.dev/paneI" target="_blank">
<img src="https://img.shields.io/badge/Launch_Zeus_Panel-Deployer_Site-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Deploy Zeus" height="40">
</a>

</div>

<br>

### 🌐 Method 2: Deploy via Web Installer

1. 🌐 Access the **[Web Deployer Site](https://zeus-panel.ir-netlify.workers.dev/paneI)**.
2. 🟧 Click the orange **"Get Token"** button to be redirected to your Cloudflare account.
3. 🟦 Similar to the previous method, scroll to the bottom of the page, click the blue `Continue to summary` button, confirm the token creation, and copy the code.
4. 🔑 Return to the Deployer site and paste the copied token into the input field.
5. ⚡️ Click the green **"Build Panel"** button and wait for your panel to be fully deployed.

---

> [!CAUTION]
> **CRITICAL SECURITY NOTE:** Ensure you securely save the initial administrative password you set during your first login to the panel. Do not lose it!

---


## 💰 Donate & Support

<p align="center">Built with ❤️</p>

<p align="center"><a href="https://donatonion.ir-netlify.workers.dev"><b>https://donatonion.ir-netlify.workers.dev</b></a></p>

<p align="center">Thank you for your support in keeping this open-source project alive and actively developed! 🙏</p>

---

## ⚖️ License & Copyright

**Copyright (c) 2026 ZEUS PANEL Contributors. All Rights Reserved.**

This software is provided for **personal, non-commercial use only**. By downloading or using this software, you agree to the following strict conditions:

1. 🚫 **No Resale or Monetization:** You may not sell, rent, or lease this software, nor use it to provide commercial services (e.g., selling panel access or configurations).
2. 🚫 **No Modifications or Derivatives:** You are strictly prohibited from modifying, adapting, translating, or creating derivative works based on this source code.
3. 🚫 **No Redistribution:** You may not host, publish, or redistribute this software on any other repository, platform, or service without explicit written permission.

The source code is published solely for transparency and personal deployment. For the full legal terms, please read the [LICENSE](LICENSE) file included in this repository.

---

### Credits
This panel was originally conceptualized and authored by Arad and Morgan. The current version represents an extended, highly optimized, and heavily refactored iteration of that core logic.

* **Original Authors:** The baseline concept and initial framework belong to [AG-Morgan](https://github.com/AG-Morgan) and [aradava](https://github.com/aradava).
* **Current Maintainer:** The system upgrades, advanced network capabilities, UI redesign, and automated deployment infrastructure have been developed and maintained by [PANEL_ZEUS](https://t.me/PANEL_ZEUS).
