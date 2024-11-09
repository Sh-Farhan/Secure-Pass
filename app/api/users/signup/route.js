// import {connect} from '@/dbConfig/dbConfig'
// import User from '@/models/userModel'
// import {NextRequest, NextResponse} from 'next/server'
// import bcrypt from 'bcryptjs/dist/bcrypt'   
// import { sendEmail } from '@/helpers/mailer'

// connect()

// export async function POST(req){
//     try {
//         const reqBody = await req.json();
//         const {username,email,password} = reqBody;
//         // validation
//         console.log(reqBody);

//         const user = await User.findOne({email})

//         if(user) {return NextResponse.json({error: "User already exists!"},{status: 400})}

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword
//         })

//         const savedUser = await newUser.save()
//         console.log(savedUser)

//         await sendEmail({email,emailType: "VERIFY", userId: savedUser._id})

//         return NextResponse.json({
//             message: "User registered successfully",
//             success: true,
//             savedUser
//         })


//     } catch (error) {
//         return NextResponse.json({error: error.message},
//             {status: 500}
//         )
//     }
// }
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists!" }, { status: 400 });
        }

        // Hash password with reduced salt rounds if needed
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send email without awaiting to avoid blocking
        sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
            .catch(err => console.error("Email error:", err));

        // Respond immediately after saving user
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
