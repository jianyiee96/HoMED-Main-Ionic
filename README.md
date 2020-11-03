# HoMED-Main-Ionic

HoMED Ionic Client targeted for HomeTeam Servicemen.

# Commands
npm install
ionic cordova prepare android

ionic cordova run android -l

# File Generation
- When generating new page, append 'Screen' to name of page and apply Pascal Casing (e.g. StartScreen, LoginScreen)
```bash
ionic g page screens/StartScreen
```
- When generating new modal, append 'Modal' to name of page and apply Pascal Casing (e.g. EditProfileModal)
```bash
ionic g page modals/EditProfileModal
```
- When generating new service, just the object name would suffice in Pascal Casing (e.g. Serviceman, Session, Utility, FormTemplate)
```bash
ionic g service services/medicalcentre/MedicalCentre
```
- When generating new class, just the object name would suffice (e.g. Serviceman, Appointment)
```bash
ionic g class classes/serviceman/Serviceman
```
- When creating new enum, just the object name would suffice on lowercase and append '-enum' (e.g. gender, bloodtype)
```bash
// create file with name: bloodtype-enum.ts
```
- When creating new standalone TS file, seperate each subword by period, and all lower casing (e.g. HttpConfigInterceptor)
```bash
// create file with name: http.config.interceptor.ts
```
# Coding Conventions

- Organize import statements according to their respective frameworks. (e.g. @ionic, @angular, local directories)
- As much as possible, place styling in .scss file rather than inline
- Apart from import statements, avoid putting ';' when coding in TypeScript
- Enforce access modifiers to be as secure as possible
- Make sure image also has 'alt' text (preferably same as file name)