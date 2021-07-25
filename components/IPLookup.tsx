import { Box, Button, Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import { GlobalContext } from 'pages';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import Info from './Info';
import { FormEvent } from 'react';
import axios from 'axios';

const IPLookup = () => {
  const [input, setInput] = useState('');
  const { data, setData } = useContext(GlobalContext);
  const location = useMemo(() => {
    return data?.city.name;
  }, [data]);
  const timeZone = useMemo(() => {
    if (data) {
      return `${data.time.timezone} (${data.time.time})`;
    } else {
      return null;
    }
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== '') {
      axios
        .get(`/api/ip/${input}`)
        .then((response) => {
          console.log({ response: response.data });
          setData(response.data);
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  return (
    <Flex
      className="test"
      height="35vh"
      // background="#F8F7FD"
      p={8}
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Heading mb={8} color="white">
        Find My IP Address
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Flex justifyContent="center">
          <Input
            background="white"
            isRequired
            maxWidth="30rem"
            borderRightRadius={0}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            type="submit"
            colorScheme="blackAlpha"
            borderLeftRadius={0}
            aria-label="Search IP Address"
            icon={<SearchIcon />}
          />
        </Flex>
      </form>
      <Flex
        position="absolute"
        bottom="0"
        gridGap={10}
        background="white"
        p={8}
        borderRadius={5}
        transform="translateY(50%)"
        zIndex="1000"
        boxShadow="lg"
      >
        <Info title="IP Address" details={data?.ip} />
        <Info title="ISP" details={data?.asn.organisation} />
        <Info title="Location" details={location} />
        <Info title="Time Zone" details={data?.time.timezone} />
      </Flex>
    </Flex>
  );
};

export default IPLookup;
