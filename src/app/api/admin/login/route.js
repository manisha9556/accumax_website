import { NextResponse }
from "next/server";

import bcrypt from "bcryptjs";

import { connectDB }
from "@/lib/mongodb";

import Admin
from "@/models/Admin";

import { createToken }
from "@/lib/auth";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const {
      email,
      password,
    } = body;

    // FIND ADMIN

    const admin =
      await Admin.findOne({
        email,
      });

    if (!admin) {

      return NextResponse.json({

        success: false,

        message:
          "Admin not found",
      });
    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {

      return NextResponse.json({

        success: false,

        message:
          "Wrong password",
      });
    }

    // JWT

    const token =
      createToken({

        id: admin._id,

        email:
          admin.email,
      });

    const response =
      NextResponse.json({

        success: true,
      });

    response.cookies.set({

      name: "admin_token",

      value: token,

      httpOnly: true,

      secure: false,

      sameSite: "lax",

      path: "/",

      maxAge:
        60 * 60 * 24 * 7,
    });

    return response;

  } catch (err) {

    console.log(err);

    return NextResponse.json({

      success: false,
    });
  }
}