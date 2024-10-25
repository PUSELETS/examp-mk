export const dynamic = "force-dynamic"

import { ID } from "appwrite";

import { Client, Databases } from "appwrite"

const ENDPOINT = "https://cloud.appwrite.io/v1"
const PROJECT_ID = "66f2b298000014fd6163"
const DATABASE_ID_DEV = "66f2bb02000fc3e82db0"
const COLLECTION_ID_USER = "66f2bb6a00195934058f"
const COLLECTION_ID_PRODUCTS = ""

const client = new Client()
     .setEndpoint(ENDPOINT) 
     .setProject(PROJECT_ID);

const databases = new Databases(client);

export {client, databases, DATABASE_ID_DEV, COLLECTION_ID_USER} 


const collections = [
   {
       'databaseId':DATABASE_ID_DEV,
       'id':COLLECTION_ID_USER,
       'name':'user'
   },

]

const db = {} as any

collections.forEach( col =>{
   db[col.name] = {
       create: (data:any, id = ID.unique())=> databases.createDocument(
           col.databaseId,
           col.id,
           id,
           data
       ),

       update: (data:any, id: string) => databases.updateDocument(
           col.databaseId,
           col.id,
           id,
           data
       ),

       get: (id: string) => databases.getDocument(
           col.databaseId,
           col.id,
           id
       ),

       list: (queries: any)=> databases.listDocuments(
           col.databaseId,
           col.id,
           queries
       ),

       delete: (id:string)=> databases.deleteDocument(
           col.databaseId,
           col.id,
           id
       )
    }
})



export {db}