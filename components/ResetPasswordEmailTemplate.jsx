import React from "react";

const ResetPasswordEmailTemplate = (token) => {
  return (
    <div style={{width:"100%", textAlign:"center", marginTop:"20px", marginBottom:"40px"}}>
      <span
        style={{ width: "100%", marginBottom:"20px", textAlign: "center", color:"#000" }}
      >
        Click on the link below
      </span>
      <div
        style={{
          width: "200px",
          textAlign: "center",
          margin: "0 auto",
          backgroundColor: "blue",
          padding: "10px",
          borderRadius: "5px",
          marginTop:"20px"
        }}
      >
        <a href={`http://localhost:3000/updatepassword?token=${token}`}>
          <span
            style={{
              color: "#fff",
              fontSize: "21px",
            }}
          >
            Reset Password
          </span>
        </a>
      </div>
    </div>
  );
};

export default ResetPasswordEmailTemplate;
