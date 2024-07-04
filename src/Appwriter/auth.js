import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";




export class AuthServices{
    client = new Client();
    account;

    constructor(){
             this.client
             .setEndpoint(conf.AppwriteUrl) // Your API Endpoint
             .setProject(conf.AppwriteProjectID); // Your project ID
    
             this.account = new Account(this.client);
            }

     //functions
     //obj througth data yenenar
    async  createUser({name , email, passwrod}) {

        try {
           const useraccount = this.account.create(ID.unique(), email,
        passwrod , name); 
           if(useraccount){
            //call another method 
            // return useraccount
           return this.login({email, passwrod}); //directly login 
           }else{

             return useraccount;

           }
        } catch (error) {
            console.log("user creating error: " , error);
            return error;
        }
        
     }

    async login({email , passwrod}){
        try {
         return  await this.account.createEmailPasswordSession(email, passwrod);
        } catch (error) {
            console.log(error)
            return error;
            
        }
     }
    
    async getCurrentUser(){

        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite serive :: getCurrentser :: error :: ", error);

            
        }

        return null;

    } 
    
    async logout(){
        try {

         return await this.account.deleteSessions();

        } catch (error) {
            console.log("appwrite seriver ::logout::" , error);
            
        }
    }
}


const authservices = new AuthServices(); //obj of class

export default authservices;