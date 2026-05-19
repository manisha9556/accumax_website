import { NextResponse }
from "next/server";

import bcrypt from "bcryptjs";

import { connectDB }
from "@/lib/mongodb";

import Admin
from "@/models/Admin";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const {
      email,
      password,
    } = body;

    // CHECK EXISTING

    const existing =
      await Admin.findOne({
        email,
      });

    if (existing) {

      return NextResponse.json({

        success: false,

        message:
          "Admin already exists",
      });
    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // SAVE

    const admin =
      await Admin.create({

        email,

        password:
          hashedPassword,
      });

    return NextResponse.json({

      success: true,

      data: admin,
    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({

      success: false,
    });
  }
}