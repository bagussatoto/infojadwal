import { Box, Button, Container, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export default function Header({ title }) {
	const location = useLocation();

	return (
    <>
      {location.pathname === "/" ? (
        <Box
          data-cy="header"
          bg="prime.900"
          padding="32px 608px"
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Text data-cy="header-title" textStyle="h1" color="white">
            {title}
          </Text>
        </Box>
      ) : (
        <Box
          data-cy="header"
          bg="prime.900"
          height={105}
          display="flex"
          alignItems="center"
        >
          <Container maxW="5xl" display="flex" justifyContent="space-between">
            <Text data-cy="header-title" textStyle="h2" color="white">
              {title}
            </Text>
            <Button
              padding="10px 16px"
              alignItems="center"
              gap="10px"
              borderRadius="12px"
              background="#D9019C"
              onClick={() => {
                {
                  localStorage.removeItem("email");
                  window.location.href = "/";
                }
              }}
              data-cy="btn-logout"
            >
              <Text
                color="white"
                textAlign="right"
                fontSize="16px"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
              >
                Check out | {localStorage.getItem("email")}
              </Text>
            </Button>
          </Container>
        </Box>
      )}
    </>
  );
}
