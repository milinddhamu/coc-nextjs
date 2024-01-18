import { Card, Text, Table, Grid, Collapse, Spacer, Button, useTheme, Navbar, Dropdown } from "@nextui-org/react";
import { Star, ChevronUp } from "react-iconly";
import { useState, useEffect } from 'react'
import { PiSword } from 'react-icons/pi';
import Image from 'next/image';

const Achievements = ({ data }) => {
  const [achieves, setAchieves] = useState(data?.achievements);

  const sortAchievements = (property, ascending) => {
    const sortedAchievements = [...achieves].sort((a, b) => {
      if (ascending) {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
    setAchieves(sortedAchievements);
  };

  const handleSort = (property, ascending) => {
    sortAchievements(property, ascending);
  };

  const handleOriginalOrder = () => {
    setAchieves(data?.achievements);
  };

  const stars = (a) =>
  (a === 3) ?
    <div className='flex flex-row'>
      <Star key='star-1' set="bold" primaryColor="gold" />
      <Star key='star-2' set="bold" primaryColor="gold" />
      <Star key='star-3' set="bold" primaryColor="gold" />
    </div> : (a === 2) ? <div className='flex flex-row'><Star key='star-4' set="bold" primaryColor="gold" /><Star key='star-5' set="bold" primaryColor="gold" /><Star key='star-6' set="bold" primaryColor="grey" /> </div> : (a === 1) ? <div className='flex flex-row'><Star key='star-7' set="bold" primaryColor="gold" /><Star key='star-8' set="bold" primaryColor="grey" /><Star key='star-9' set="bold" primaryColor="grey" /> </div> : <div className='flex flex-row'><Star key='star-12' set="bold" primaryColor="grey" /><Star key='star-10' set="bold" primaryColor="grey" /><Star key='star-11' set="bold" primaryColor="grey" /></div>

  const handleClickScroll = () => {
    const element = document.getElementById('achievementsScroll');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { isDark } = useTheme();
  const [show, setShow] = useState(false);

  const funcGoToTop = () => {
    if (document.documentElement.scrollTop > 150) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", funcGoToTop);
    window.addEventListener("load", funcGoToTop);
  }, []);

  return (
    <>
      <main className='max-w-5xl'>
        <Collapse.Group shadow css={{
          maxHeight: '600px',
          borderRadius: "20px",
        }} className='MaterialShadow scrollbar-hide relative scrollbar-thin overflow-auto overflow-y-scroll min-w-full'>
          <Collapse id="achievementsScroll" title={<main className="flex flex-row justify-start items-center"><Image src={"/assets/others/Three_Stars.png"} height={35} width={35} alt="Achievements" /><Spacer x={.5}/><Text weight="bold" size={13} >Achievements</Text></main>} className="open-collapse min-w-full p-1" arrowIcon={<PiSword />}>
            <table className="table-auto min-w-full">
              <thead>
                <tr className="border-b-[.5px] border-gray-500/20">
                  <th className="text-center"><Text size={16} weight="extrabold">Name</Text></th>
                  <th className="text-center">
                    <Dropdown key="value">
                      <Dropdown.Button flat color="warning"><Text size={16} weight="extrabold">Value</Text></Dropdown.Button>
                      <Dropdown.Menu variant="flat" color="warning">
                        <Dropdown.Item key="sort button value 1">
                          <button onClick={() => handleSort('value', true)}>Sort Ascending - Value</button>
                        </Dropdown.Item>
                        <Dropdown.Item key="sort button value 2">
                          <button onClick={() => handleSort('value', false)}>Sort Descending - Value</button>
                        </Dropdown.Item>
                        <Dropdown.Item key="sort button value 3">
                          <button onClick={handleOriginalOrder}>Original Order</button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </th>
                  <th className="text-center">
                    <Dropdown key="stars">
                      <Dropdown.Button flat color="warning"><Text size={16} weight="extrabold">Stars</Text></Dropdown.Button>
                      <Dropdown.Menu variant="flat" color="warning">
                        <Dropdown.Item key="sort button stars 1">
                          <button onClick={() => handleSort('stars', true)}>Sort Ascending - Stars</button>
                        </Dropdown.Item>
                        <Dropdown.Item key="sort button stars 2">
                          <button onClick={() => handleSort('stars', false)}>Sort Descending - Stars</button>
                        </Dropdown.Item>
                        <Dropdown.Item key="sort button stars 3">
                          <button onClick={handleOriginalOrder}>Original Order</button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </th>
                </tr>
              </thead>

              <tbody>
                {achieves?.map((a, i) => (
                  <tr key={i} className="border-b-[.5px] border-gray-500/30">
                    <td className="">
                      <Text b size={13} weight="">
                        {a.name}
                      </Text>
                      <Text size={12} weight='hairline'>{a.info}</Text>
                    </td>
                    <td className="">
                      <Text className="px-4" size={15} weight="semibold">
                        {a.value}
                      </Text>
                    </td>
                    <td className="whitespace-nowrap px-6">{stars(a.stars)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Spacer y={0.5} />
            <Button
              className="sticky bottom-0 shadow-none w-full group"
              auto
              onClick={handleClickScroll}
              icon={<ChevronUp set="bold" primaryColor="orange" />}
            >
              <Text size={12} weight="semibold" color="neutral" className="opacity-60 group-hover:opacity-100">
                SCROLL BACK TO TOP
              </Text>
            </Button>
          </Collapse>
        </Collapse.Group>
      </main>
    </>
  );
}

export default Achievements;
