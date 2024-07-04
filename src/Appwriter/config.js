import conf from "../conf/conf";
import {Client , ID , Databases, Query,Storage, ImageGravity } from "appwrite"

export class Service{
  client = new Client();
  account;
  database;
  bucket;

  constructor(){
    this.client
         .setEndpoint(conf.AppwriteUrl)
         .setProject(conf.AppwriteProjectID);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);

  }

  async createPost({title , slug , content ,featuredImage , status,userid}){
    try {
      return await this.database (
        conf.AppwriteDatabaseID,
        conf.AppwriteCollectionID,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
            userid
        }
      ) 
    } catch (error) {
        console.log(error);
    }
  }

  async updatePost(slug , {title  , content ,featuredImage , status}){
    try {
      
 return await this.database.updateDocument(
  conf.AppwriteDatabaseID,
  conf.AppwriteCollectionID,
  slug,
  {
    title,
    featuredImage,
    content,
    status
  },

 )

    } catch (error) {
      console.log("updatePot error : : " ,error);
      
    }

  }

     
  async deletePost(slug){
 
    try {

      await this.database.deleteDocument(
        conf.AppwriteDatabaseID,
        conf.AppwriteCollectionID,
        slug
      )
      return true;
      
    } catch (error) {
      console.log("deletepost error: " , error);
      
    }
    return false

  } 

  async getPost(slug){
    try {
      return await this.database.getDocument(
        conf.AppwriteDatabaseID,
        conf.AppwriteCollectionID,
        slug
      )
    } catch (error) {
      console.log("getpost error: " ,error)
      return false;
      
    }
  }

  async getListPost(quries =[Query.equal("status" , "active")]){
    try {
    
      return await this.database.listDocuments(
        conf.AppwriteDatabaseID,
        conf.AppwriteCollectionID,
        quries,
      
      )

    } catch (error) {
      console.log("get list post : :" , error)
      return false
      
    }
  }

  // file upload services

  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        conf.AppwriteBucketID,
        ID.unique(),
        file,

      )
    } catch (error) {
      console.log("file upload ::" , error)
    
      
    }
  }

  async deletefile(fileId){
    try {
      await this.bucket.deleteFile(
        conf.AppwriteBucketID,
        fileId
      )
      return true;
    } catch (error) {
      console.log("file delete error::" , error)
      return false;
      
    }
  }

  getfilePriview(fileId){
    const response =  this.bucket.getFilePreview(
      conf.AppwriteBucketID,
      fileId,
      ImageGravity.Center, 
    )
    console.log(response);
    return response
  }
}

const service = new Service();//obj

export default service;
