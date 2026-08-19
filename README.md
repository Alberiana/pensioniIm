# Face Liveness & Identity Verification

A mobile identity-verification application built with **React Native, Expo and JavaScript**.

The application provides a verification flow that guides users through registration, login, identity-document capture and face capture.

## Technologies

* React Native
* Expo
* JavaScript
* React Navigation
* Expo Camera
* React Native Vision Camera
* React Native Image Picker
* Biometric authentication
* Identity verification SDKs
* SQLite

## Features

* User registration and login
* Welcome and terms screens
* Identity document capture
* Front and back ID capture
* Face capture
* Identity verification flow
* Camera integration
* Biometric functionality
* Navigation between verification steps
* Local data storage

## Application Flow

The main application flow is organized into separate screens:

`Welcome → Terms → Login / Sign Up → ID Verification → Back ID Capture → Face Capture → Main Screen`

The application uses React Navigation to manage the screen flow.

## Project Structure

```text
mobile/
├── screens/
│   ├── welcomeScreen.js
│   ├── termsScreen.js
│   ├── loginScreen.js
│   ├── SignUpScreen.js
│   ├── idIdentification.js
│   ├── backIdIdentification.js
│   ├── faceCaptureScreen.js
│   └── MainScreen.js
├── App.js
├── app.json
└── package.json
```

The project contains dedicated screens for ID and face capture, rather than putting the complete verification flow into a single component.

## Getting Started

### Prerequisites

* Node.js
* npm or Yarn
* Expo development environment
* Android Studio for Android development

### Installation

```bash
git clone https://github.com/Alberiana/pensioniIm.git
cd pensioniIm/mobile
npm install
```

Start the Expo development server:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

## Purpose

This project was created to gain practical experience in **React Native, Expo and mobile application development**, while implementing a real-world identity-verification workflow involving document and face capture.
