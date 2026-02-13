import React, { useState } from "react";

const Apply = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    age: "",
    height: "",
    instagram: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Payload matches backend schema EXACTLY
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      instagram: formData.instagram,
      address: formData.address,
      height: formData.height,
      message: "New modeling application", // ✅ REQUIRED
      status: "pending",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert("Application submitted successfully");

      setFormData({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        age: "",
        height: "",
        instagram: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="border p-4 shadow-sm rounded">

            <div className="text-center mb-4">
              <h1 className="fw-bold fs-4 fs-md-3">
                Pathway Modeling Agency
              </h1>
              <p className="text-muted">
                Please fill your contact details
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">

                <div className="col-12 col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    className="form-control"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-8">
                  <label className="form-label">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    className="form-control"
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 w-md-auto px-5 py-2"
                  >
                    Submit Application
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
