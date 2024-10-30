import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/tokenData';

// for updating the user email,and password
export async function PUT(req){
    const token = req.cookies.get("token")?.value || ""; 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' });
    }

    const user = decodedToken.username;
    const data = await req.json();
    console.log(data);

    const db = await connectToDatabase();
    const collection = db.collection(user);
}