import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SIMPLE VALIDATION
  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  // ✅ SUBMIT FORM (BACKEND CONNECTED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      alert("Form submitted successfully");

      // reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to submit message");
      console.error(error);
    }
  };

  // WHATSAPP MESSAGE
  const whatsappMessage = `Hello, my name is ${formData.name}. ${formData.message}`;
  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="container my-5">
      <div className="row g-4">

        {/* LEFT SIDE */}
        <div className="col-md-5">
          <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
          <p className="text-gray-600 mb-4">Pathway Modeling Agency</p>

          <p>
            <strong>📍 Address:</strong><br />
            2nd Floor, Ballalbagh, junction, Mangaluru, Karnataka 575003
          </p>

          

          <p className="mt-2">
            <strong>📸 Instagram:</strong><br />
            Pathwaymanglore
          </p>

         

          <p className="mt-2">
            <strong>📧 Email:</strong><br />
            pathwaymodeling@gmail.com
          </p>

          <div className="mt-4 rounded overflow-hidden">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=2nd+Floor,+Ballalbagh+Junction,+Mangaluru,+Karnataka+575003&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
          >
            Message on WhatsApp
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-7">
          <div className="border rounded-3xl p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Send us a message</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              <div className="mb-3">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <small className="text-red-500">{errors.message}</small>
                )}
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-black text-white hover:bg-yellow-600 transition"
              >
                Send Message
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-3">
              Thank you for contacting us. Our team will get back to you soon.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
