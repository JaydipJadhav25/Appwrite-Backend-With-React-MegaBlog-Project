const conf ={
    AppwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    AppwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteBucketID : String(import.meta.env.VITE_APPWRITE_DUCKET_ID),
}



export default conf;