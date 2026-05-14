import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ChatWidget from "@/components/ChatWidget/ChatWidget";

export default async function ProductDetail({ params }) {

  const { slug } = await params;

  await connectDB();

  const product = await Product.findOne({ slug });

  if (!product) {
    return (
      <div style={{ padding: "50px" }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div
        style={{
          maxWidth: "1400px",
          margin: "auto",
          padding: "40px 20px",
        }}
      >

        {/* MAIN LAYOUT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "40px",
          }}
        >

          {/* LEFT CONTENT */}

          <div>

            {/* TITLE */}

            <h1
              style={{
                fontSize: "42px",
                fontWeight: "700",
                marginBottom: "10px",
                color: "#0f172a",
              }}
            >
              {product.title}
            </h1>

            {/* CATEGORY */}

            <p
              style={{
                color: "#2563eb",
                fontWeight: "600",
                marginBottom: "30px",
              }}
            >
              {product.category}
            </p>

            {/* IMAGES */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >

              {product.images?.map((img, i) => (

                <img
                  key={i}
                  src={img}
                  alt={product.title}
                  style={{
                    width: "100%",
                    borderRadius: "14px",
                    objectFit: "cover",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                  }}
                />

              ))}

            </div>

            {/* DESCRIPTION */}

            <div
              style={{
                marginTop: "40px",
                lineHeight: "1.9",
                color: "#334155",
                fontSize: "17px",
              }}
            >
              {product.description}
            </div>

          </div>

          {/* SIDEBAR */}

          <div>

            {/* ENQUIRY BOX */}

            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "14px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                marginBottom: "30px",
                position: "sticky",
                top: "120px",
              }}
            >

              <h2
                style={{
                  marginBottom: "20px",
                  color: "#0f172a",
                }}
              >
                Send Enquiry
              </h2>

              <form>

                <input
                  type="text"
                  placeholder="Your Name"
                  style={inputStyle}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  style={inputStyle}
                />

                <textarea
                  placeholder="Requirement"
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "none",
                  }}
                />

                <button
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Submit Enquiry
                </button>

              </form>

            </div>

            {/* BROCHURE */}

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "14px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >

              <img
                src="/assets/CatelogFrontPage.jpeg"
                alt="Catalogue"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />

              <h3
                style={{
                  marginBottom: "10px",
                }}
              >
                Product Catalogue
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  marginBottom: "15px",
                }}
              >
                Download our latest company catalogue PDF.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >

                <a
                  href="/assets/Accumax Brochure.pdf"
                  target="_blank"
                  style={{ flex: 1 }}
                >
                  <button style={catalogBtn}>
                    View
                  </button>
                </a>

                <a
                  href="/assets/Accumax Brochure.pdf"
                  download
                  style={{ flex: 1 }}
                >
                  <button style={catalogBtn}>
                    Download
                  </button>
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
      <ChatWidget />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "15px",
  border: "1px solid #dbeafe",
  borderRadius: "8px",
  outline: "none",
};

const catalogBtn = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};