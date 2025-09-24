import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/assets/4.png") center/cover no-repeat;
  position: relative;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 40px 30px;
  width: 350px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Heading = styled(motion.h2)`
  margin-bottom: 25px;
  color: #597c49ff;
  font-family: "Gowun Dodum", cursive;
  font-size: 2rem;
  font-weight: 700;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid black;
  outline: none;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.15);
  color: #1e1e1eff;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(34, 34, 34, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const Select = styled.select`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid black;
  background: rgba(255, 255, 255, 0.15);
  color: #1e1e1eff;
  backdrop-filter: blur(5px);
  outline: none;
  font-size: 14px;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 14px;
  margin-top: 15px;
  border-radius: 12px;
  border: none;
  background: #597c49ff;
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #669751ff;
    transform: scale(1.03);
  }
`;

const ToggleText = styled(motion.p)`
  margin-top: 20px;
  font-size: 14px;
  color: #616161ff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #597c49ff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #669751ff;
    transform: scale(1.05);
  }
`;

const UserTypeSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserTypeButton = styled(motion.button)`
  flex: 1;
  margin: 0 5px;
  padding: 10px 0;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-family: "Quicksand", cursive;
  background: ${({ selected }) => (selected ? "#597c49ff" : "rgba(255,255,255,0.15)")};
  color: ${({ selected }) => (selected ? "#fff" : "#1e1e1eff")};
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: #669751ff;
    color: #fff;
  }
`;

function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState("student");
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 

  const navigate = useNavigate(); // <-- initialize

  const scrollToTop = () => {
    scroller.scrollTo("loading-section", {
      smooth: true,
      duration: 800,
    });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // for now, simulate login/signup success
    setMessage(isSignup ? "Account created successfully!" : "Logged in successfully!");
    setMessageType("success");

    // redirect after 1 second to dashboard
    setTimeout(() => {
      if (userType === "student") {
        navigate("/student-dashboard"); // <-- your route
      } else if (userType === "counselor") {
        navigate("/counselor-dashboard");
      } else if (userType === "admin") {
        navigate("/admin-dashboard");
      }
    }, 1000);
  };

  return (
    <Container name="auth-section">
      <BackButton whileHover={{ scale: 1.05 }} onClick={scrollToTop}>
        <FaChevronLeft />
        Go Back
      </BackButton>

      <Box
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Heading
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </Heading>

        <UserTypeSelector>
          {["student", "counselor", "admin"]
            .filter((type) => !(isSignup && type === "admin")) // hide admin in signup
            .map((type) => (
              <UserTypeButton
                key={type}
                selected={userType === type}
                onClick={() => setUserType(type)}
                whileTap={{ scale: 0.95 }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </UserTypeButton>
            ))}
        </UserTypeSelector>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginBottom: "15px",
              color: messageType === "error" ? "#ff4d4f" : "#4caf50",
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
  {isSignup && userType !== "admin" && <Input name="name" type="text" placeholder="Full Name" required />}
  <Input name="email" type="email" placeholder="Email" required />
  <Input name="password" type="password" placeholder="Password" required />

  {/* Emergency Contact for student signup */}
  {isSignup && userType === "student" && (
    <Input
      name="emergencyContact"
      type="tel"
      placeholder="Emergency Contact Number"
      required
    />
  )}

  {isSignup && userType !== "admin" && (
    <Select
      required
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        marginTop: "10px",
        background: "rgba(255,255,255,0.25)",
        color: "#1e1e1eff",
        border: "1px solid black",
        outline: "none",
        backdropFilter: "blur(5px)",
      }}
    >
      <option value="">Select Institution</option>
      <option value="collegeA">College A</option>
      <option value="collegeB">College B</option>
    </Select>
  )}

  <Button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} type="submit">
    {isSignup ? "Create Account" : "Login"}
  </Button>
</form>


        {/* Hide toggle and signup fields if admin */}
        {userType !== "admin" && (
          <>
            <ToggleText onClick={() => setIsSignup(!isSignup)} whileHover={{ scale: 1.02 }}>
              {isSignup ? "Already have an account? Login" : "New user? Sign up"}
            </ToggleText>
          </>
        )}

      </Box>
    </Container>
  );
}

export default AuthPage;
