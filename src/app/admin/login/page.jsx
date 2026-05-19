"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [form, setForm] = useState({

    email: "",
    password: "",

  });

  const [loading, setLoading] = useState(false);

  // CLEAR FORM ON PAGE LOAD
  useEffect(() => {

    setForm({

      email: "",
      password: "",

    });

  }, []);

  // LOGIN
  const handleLogin = async () => {

    setLoading(true);

    try {

      const res = await fetch(
        "/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {

        // CLEAR INPUTS AFTER LOGIN

        setForm({

          email: "",
          password: "",

        });

        router.push("/admin");

      } else {

        alert("Invalid Credentials");
      }

    } catch (err) {

      console.log(err);

      alert("Login Failed");
    }

    setLoading(false);
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >

      <div
        style={{
          width: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >

        {/* TITLE */}
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "40px",
            fontWeight: "700",
            color: "#111827",
            textAlign: "center",
          }}
        >
          Admin Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"

          name="email"

          autoComplete="off"

          spellCheck="false"

          placeholder="Email"

          value={form.email}

          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }

          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "15px",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"

          name="password"

          autoComplete="new-password"

          placeholder="Password"

          value={form.password}

          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }

          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "14px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "15px",
          }}
        />

        {/* FORGOT PASSWORD */}
        <div
          style={{
            textAlign: "right",
            marginBottom: "20px",
          }}
        >

          <button
            style={{
              background: "transparent",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}

            onClick={() => {

              alert(
                "Forgot Password functionality can be connected with Gmail OTP or Reset Link system."
              );
            }}
          >
            Forgot Password?
          </button>

        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}

          disabled={loading}

          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </div>

    </div>
  );
}