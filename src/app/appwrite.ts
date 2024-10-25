export const dynamic = "force-dynamic"

import { Client, Databases } from "appwrite"

const ENDPOINT = "https://cloud.appwrite.io/v1"
const PROJECT_ID = "66f2b298000014fd6163"
const DATABASE_ID_DEV = "66f2bb02000fc3e82db0"
const COLLECTION_ID_USER = "66f2bb6a00195934058f"

const client = new Client()
      .setEndpoint(ENDPOINT)
      .setProject(PROJECT_ID);

const databases = new Databases(client);

export {client, databases, DATABASE_ID_DEV, COLLECTION_ID_USER} 