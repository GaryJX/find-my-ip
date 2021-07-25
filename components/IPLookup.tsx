import { Accordion, AccordionPanel, Box, Button, Collapse, Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import { GlobalContext } from 'pages';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import Info from './Info';
import { FormEvent } from 'react';
import axios from 'axios';

const IPLookup = () => {
  const [input, setInput] = useState('');
  const [expandDetails, setExpandDetails] = useState(false);
  const { data, setData } = useContext(GlobalContext);
  const location = useMemo(() => {
    if (data) {
      const city = data.city.name;
      const region = data.area.name;
      const countryCode = data.country.code;

      if (city && region && countryCode) {
        return `${city}, ${region}, ${countryCode}`;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }, [data]);
  const timeZone = useMemo(() => {
    if (data) {
      let utcOffset = data.time.time?.split(' ').pop()!;
      console.log({ utcOffset });

      if (utcOffset) {
        return `UTC${utcOffset.slice(0, 3)}:${utcOffset.slice(3)}`;
      } else {
        return null;
      }
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
          // TODO: Proper error handling
        });
    }
  };

  return (
    <Flex className="image-bg" height="35vh" p={8} flexDirection="column" alignItems="center" position="relative">
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
        {/* <img src={data?.country.flag.file} /> */}
      </form>
      <Flex
        className="search-results"
        position="absolute"
        flexDirection="column"
        alignItems="center"
        bottom="0"
        background="white"
        p={8}
        borderRadius={5}
        gridGap={5}
        transform="translateY(50%)"
        zIndex="10001"
        boxShadow="lg"
      >
        <Flex gridGap={10}>
          <Info title="IP Address" details={data?.ip} />
          <Info title="ISP" details={data?.asn.organisation} />
          <Info title="Location" details={location} />
          <Info title="Time Zone" details={timeZone} />
        </Flex>
        <Box position="relative" width="100%" height="2.5rem">
          <Flex
            position="absolute"
            background="white"
            top="0"
            left="-2rem"
            right="-2rem"
            p="0 2rem 2rem"
            flexDirection="column"
            boxShadow="lg"
            borderRadius={5}
          >
            <Collapse in={expandDetails}>
              <Flex flexDirection="column" mb="1rem">
                <div>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
                <div>Hello World</div>
              </Flex>
            </Collapse>
            <Button className="button" isFullWidth colorScheme="blue" onClick={() => setExpandDetails((prev) => !prev)}>
              <Flex alignItems="center" justifyContent="center" fontWeight="bold" flexDirection="column">
                <p>{expandDetails ? 'Hide' : 'Show'} details</p>
                {/* <ChevronDownIcon /> */}
              </Flex>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default IPLookup;
