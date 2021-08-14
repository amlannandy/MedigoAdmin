# Medigo Admin

Medigo Admin is a Web-based Teleconsultation and Electronic Medical Record (EMR) system. It's built to assist doctors in preserving their medical reports, patient files in digital format. It also provides them with the ability to create appointment sessions online and interact with their patients using Text Messaging and Audio/Video Calling.

## Technology Stack

1. `React.js`
    * The web application has built using `React.js` with `TypeScript`.
    * It exclusively uses class-based components.
    * It uses `redux` for state management.
    * For building the interface, `Semantic UI React` has been used along with some custom CSS.
2. `Firebase`
    * Serves as the backend of the project.
    * The JavaScript SDK for firebase has been used in this project.
    * Features used are -
        * Email Authentication
        * Cloud Firestore as database
        * Cloud Storage for storing images and documents
        * Cloud Functions
4. `Agora SDK`
    * Used for enabling audio and video calling in the web application

## Features

Medigo is intented to be a one-stop solution for Doctors, especially those who have their own clinic, to manage their patient records, organize clinic data, create appointment schedules and consult patients online. It provides the following features -
* Register your clinic where users can book offline appointments.
* Create appointment slots for the next 7 days which users can book for either offline/online consultations.
* Consult patients only via `text messaging` or `audio/video calling`.
* After a consultation, issue a prescription to the patient with your digital signature.
* Maintain patient records and medical reports.

## Local Development Setup

> **NOTE** - A Firebase Project and Google Maps API Key is required for running this project.

1. Clone the repository

```
git clone https://github.com/amlannandy/MedigoAdmin.git
```

2. Go inside the project directory

```
cd MedigoAdmin
```

3. Create a `.env` file and add the following values from your Firebase project along with the Google Maps API Key

```
REACT_APP_mode=dev

REACT_APP_apiKey=
REACT_APP_authDomain=
REACT_APP_databaseURL=
REACT_APP_projectId=
REACT_APP_storageBucket=
REACT_APP_messagingSenderId=
REACT_APP_appId=
REACT_APP_measurementId=

REACT_APP_GOOGLE_MAPS_API_KEY=
```

4. Install project dependencies

```
npm install
```

5. Run the application

```
npm start
```

## Screenshots

![add_patient](https://user-images.githubusercontent.com/45410599/129363923-c87a7c40-c880-42d1-b507-cd9f4929f816.png)
![clinic](https://user-images.githubusercontent.com/45410599/129363933-5d7f6272-61d6-4e1a-ad7d-59688cfc1a98.png)
![patients](https://user-images.githubusercontent.com/45410599/129363939-ef4949a9-91be-4f6c-bc19-bae3e7d7f0fd.png)
![update_clinic_details](https://user-images.githubusercontent.com/45410599/129363945-01dc67c5-6c57-431d-8fa0-5d6a461b9016.png)
![update_clinic_photo](https://user-images.githubusercontent.com/45410599/129363947-a24f5bb0-3be6-4853-b0ae-702546f4dfeb.png)
![update_password](https://user-images.githubusercontent.com/45410599/129363950-96167f4c-4b8b-4937-afbc-174ddbc7882b.png)
