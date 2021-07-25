import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

const Info: React.FC<{ title: string; details: React.ReactNode }> = ({ title, details }) => {
  details = details ?? 'Not Found';

  return (
    <div className="info-container">
      <Heading fontSize="0.75rem" textTransform="uppercase" color="gray.600">
        {title}
      </Heading>
      <Text fontWeight="bold" fontSize="1.5rem" title={details as string}>
        {details}
      </Text>
    </div>
  );
};

export default Info;
