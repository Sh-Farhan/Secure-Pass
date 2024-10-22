// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";
// import bodyParser from "body-parser";
// export const dynamic = 'force-static'

// const url =  process.env.MONGODB_URI;
// const client = new MongoClient(url)

// const dbName = 'pass-manager-user-db'

// export const GET = async () => {
//     try{
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection('userData');
//         const Result = await collection.find({}).toArray();
//         const data = await JSON.stringify(Result)
//         return new NextResponse(data)
//     } catch(error){
//         return new NextResponse("Error in fetching users" + error.message)
//     }
// }

// export const POST = async (req,res) => {
//     try {
//         const data = await req.json();
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection('userData');
//         const insertResult = await collection.insertOne(data);  // Insert the body (password data)

//         return NextResponse.json({ success: true, result: insertResult });  // Return the result as JSON
//     } catch (error) {
//         return new NextResponse("Error inserting data: " + error.message);
//     } finally {
//         await client.close();  // Ensure the client is closed after the operation
//     }
// };

// export const DELETE = async(req,res) => {
//     try{
//         const data = await req.json();
//         console.log(data);
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection('userData');
//         const Result = await collection.deleteOne(data);
//         return NextResponse.json({succes : true, result: Result,myDel: data})
//     } catch(error){
//         return new NextResponse("Error inserting data: " + error.message);
//     } finally{
//         await client.close();
//     }
// }
// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";
// import bodyParser from "body-parser";
// export const dynamic = 'force-static'

// const url =  process.env.MONGODB_URI;
// const client = new MongoClient(url)

// const dbName = 'pass-manager-user-db'

// export const POST = async (req) => {
//     try{
//         await client.connect();
//         const {user} = await req.json();
//         const db = client.db(dbName);
//         const collection = db.collection(user);
//         const Result = await collection.find({}).toArray();
//         const data = await JSON.stringify(Result)
//         return new NextResponse(data)
//     } catch(error){
//         return new NextResponse("Error in fetching users" + error.message)
//     }
// }

// pages/api/users.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import jwt from "jsonwebtoken"

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'pass-manager-user-db';

let cachedClient = null;

async function connectToDatabase() {
  if (!cachedClient) {
    await client.connect();
    cachedClient = client;
  }
  return cachedClient.db(dbName);
}

export const GET = async (req) => {
  try {
    const token = req.cookies.get("token")?.value || ""; 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken)

    if(!token){
      return NextResponse.json(
        {error: 'Not authenticated'}
      )
    }

    // const { searchParams } = new URL(req.url);
    // const user = searchParams.get('user');
    const user = decodedToken.username

    
    if (!user) {
      return NextResponse.json(
        { error: 'User parameter is required' },
        { status: 400 }
      );
    }


    const db = await connectToDatabase();
    const collection = db.collection(user);
    const result = await collection.find({}).toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error in fetching users: ' + error.message },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const token = req.cookies.get("token")?.value || ""; 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken)

    if(!token){
      return NextResponse.json(
        {error: 'Not authenticated'}
      )
    }
    
    const user = decodedToken.username;

    const data = await req.json();
    console.log("user is the query is")

    console.log(data)


    const db = await connectToDatabase();
    const collection = db.collection(user);
    const result = await collection.insertOne(data);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error in fetching users: ' + error.message },
      { status: 500 }
    );
  }
};


