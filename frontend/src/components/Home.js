// Home.js
import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import "./Home.css"
const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
        <div className="home-container"> {/* Add a wrapper div for custom styling */}
    <Tabs index={tabIndex} onChange={handleTabChange} variant="soft-rounded" colorScheme="teal">
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Signup />
        </TabPanel>
      </TabPanels>
    </Tabs>
</div>
  );
};

export default Home;
