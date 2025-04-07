"use server"

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 ;

export async function signUp(params:SignUpParams){

    const {uid,name,email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success:false,
                message:"User already exits. Please sign in instead"
            }
        }
        await db.collection('users').doc(uid).set({
            name,email
        })
        return {
            success:true,
            message:"User created successfully,Please Sign in"
        }
    } catch (e:any) {
        console.error('Error creating a user',e);
        
        if (e.code === 'auth/email-alredy-exists') {
            return{
                success:false,
                message:"This email is already in use"
            }
        }
        return{
            success:false,
            message:"An error occurred while creating the user"
    }
}
}

export async function signIn(params:SignInParams){
    const {email,idToken}= params;

    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success:false,
                message:"User not found. Please sign up"
            }
        }
        await setSessionCookie(idToken);
    } catch (e) {
        console.log(e);
        
        return{
            success:false,
            message:"An error occurred while signing in"    
        }
    }
}

export async function setSessionCookie(idToken:string){
    const cookieStore = await cookies();

    const sessionCokie = await auth.createSessionCookie(idToken,{
        expiresIn: ONE_WEEK * 1000
    });
    cookieStore.set('session',sessionCokie,{
        maxAge:ONE_WEEK,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        path:'/',
        sameSite:'lax'
    });
}

export async function getCurrentUser(){

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);
       
     const userRecord = await db.collection('users').doc(decodedClaims.u_id).get();
     if (!userRecord.exists) {
        return null;
     }

        return {
            ...userRecord.data(),
            id:decodedClaims.id,
        } as User
    } catch (e) {
        console.error('Error verifying session cookie',e);
        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    if (!user) {
        return false;
    }
    return true;
}
