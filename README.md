# Populate Firebase DB with Dummy Data

## Usage

1. Firebase admin-sdk requires a stable version of Node to avoid errors.
2. Go to firebase console to **project settings > service accounts > Firebase Admin SDK** and **generate a new private key**
3. Add generated .json file from step 2 to the root of this directory as `serviceAccountKey.json` so script can initialise with firebase admin.

### Install Dependencies and Run

```
git clone https://github.com/LaSav/fb-populate-db
npm install
node index.js
```
