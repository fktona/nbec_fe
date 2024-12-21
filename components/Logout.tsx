"use client";
import React from "react";
import { Button } from "./ui/button";

function Logout() {
  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          // Handle logout
          localStorage.removeItem("studentLoggedIn");
          window.location.href = "/student/login";
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
