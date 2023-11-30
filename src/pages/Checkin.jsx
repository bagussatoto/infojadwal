import { Box, Button, Center, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { store } from '../server api/checkin';

export default function Checkin() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const inputStyle = () => {
    if (!isValid) {
      return {
        bg: 'white',
        borderColor: 'red',
      };
    }

    if (email === "" && !isTyping) {
      return {
        bg: 'gray.200',
      }
    }

    if (email !== "" && !isTyping) {
      return {
        bg: "white",
        borderColor: "#D9019C",
      };
    }
  }

  const handleEmail = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsTyping(true);
    setIsValid(isEmailValid(inputEmail));
  }

  const isEmailValid = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  const handleLogin = async () => {
    if (isEmailValid(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
      return;
    }

    try {
      const payload = {
        email: email,
      };
      await store(payload);
      localStorage.setItem("email", email);
      window.location.href = `/dashboard`; 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Center>
      <Box
        display="flex"
        marginTop="54px"
        padding="48px 65px"
        flexDirection="column"
        gap="10px"
        borderRadius="12px"
        background="white"
        boxShadow="0px 6px 10px rgba(0, 0, 0, .1)"
        width="491px"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "53px",
          }}
        >
          <Text
            display="flex"
            flexDirection="column"
            alignItems="center"
            alignSelf="stretch"
            color="black"
            textAlign="center"
            fontSize="24px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
            data-cy="text-login"
          >
            Check In
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "7px",
                alignSelf: "stretch",
              }}
            >
              <Text
                display="flex"
                flex-direction="column"
                alignSelf="stretch"
                color="black"
                fontSize="16px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="normal"
                data-cy="text-username"
              >
                Email
              </Text>
              <Input
                type="email"
                placeholder="Masukkan email anda"
                width="361px"
                padding="12px 15px"
                display="flex"
                borderRadius="6px"
                {...inputStyle()}
                focusBorderColor="#D9019C"
                data-cy="input-email"
                value={email}
                onChange={handleEmail}
                onFocus={() => setIsTyping(true)}
              />
              {!isValid && isTyping && (
                <div
                  style={{ display: "flex", gap: "7px", alignItems: "center" }}
                >
                  <img
                    src="/static/icons/ep-warning-filled.svg"
                    alt="error"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <span>
                    <Text
                      data-cy="error-email"
                      color="red"
                      fontSize="14px"
                      fontStyle="normal"
                      fontWeight="normal"
                      lineHeight="normal"
                    >
                      Format email tidak sesuai
                    </Text>
                  </span>
                </div>
              )}
            </div>
            <Button
              disabled={email === "" || !isValid}
              width="361px"
              padding="12px 15px"
              borderRadius="47px"
              background="#D9019C"
              color="white"
              data-cy="btn-login"
              onClick={handleLogin}
            >
              Mulai Sesi
            </Button>
          </div>
        </div>
      </Box>
    </Center>
  );
}
