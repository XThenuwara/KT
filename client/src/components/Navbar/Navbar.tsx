import React from "react";
import NotificationSlide from "./NotificationSlide";

const Navbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center my-3 mb-4">
      <h3 className="text-dark">
        <code className="fw-bold text-dark">Student Management Module</code>
      </h3>
      <NotificationSlide />
    </div>
  );
};

export default Navbar;
