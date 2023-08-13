import { Card, Text, Table, Grid, Collapse, Spacer, Button, useTheme, Navbar, Dropdown } from "@nextui-org/react";
import { Star, ChevronUp } from "react-iconly";
import { useState, useEffect } from 'react'
import { PiSword } from 'react-icons/pi';

const Achievements = ({ data }) => {
  const [achieves, setAchieves] = useState([])
  useEffect(() => {
    setAchieves(data?.achievements)
  }, [])
  const handleSortStarsA = () => {
    const newAchieves = [...achieves].sort((a, b) => a.stars < b.stars) 
    setAchieves(newAchieves)
  }
  const handleSortStarsD = () => {
    const newAchieves = [...achieves].sort((a, b) => a.stars > b.stars)
        setAchieves(newAchieves)

  }
  const handleSortValueD = () => {
    const newAchieves = [...achieves].sort((a, b) => a.value < b.value)
        setAchieves(newAchieves)

  }
  const handleSortValueA = () => {
    const newAchieves = [...achieves].sort((a, b) => a.value > b.value)
        setAchieves(newAchieves)
  }
  const handleOriginalOrder = () => {
    setAchieves(data?.achievements)
  }

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
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { isDark } = useTheme();
  const [show, setShow] = useState(false);
  const funcGoToTop = () => {
    if (document.documentElement.scrollTop > 150) {
      setShow(true);
      return;
    }

    setShow(false);
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
          shadow:"$lg",
          borderRadius:"8px"
        }} className='scrollbar-hide  relative scrollbar-thin overflow-auto overflow-y-scroll min-w-full'>
          <Collapse id="achievementsScroll" title='Achievements' className="open-collapse min-w-full" arrowIcon={<PiSword />}
          >
              <table className="table-auto min-w-full">
            <thead>
              <tr className="border-b-[.5px] border-gray-500/20">
                <th className="text-center"><Text size={16} weight="extrabold">Name</Text></th>
                <th className="text-center"><Dropdown key="value" >
                      <Dropdown.Button flat color="warning" ><Text size={16} weight="extrabold">Value</Text></Dropdown.Button>
                      <Dropdown.Menu variant="shadow" color="warning" >
                        <Dropdown.Item key="sort button value 1"><button onClick={handleSortValueA}>Sort Ascending - Value</button></Dropdown.Item>
                        <Dropdown.Item key="sort button value 2"><button onClick={handleSortValueD}>Sort descending - Value</button></Dropdown.Item>
                        <Dropdown.Item key="sort button value 3"><button onClick={handleOriginalOrder}>Original Order</button></Dropdown.Item>
                        
                      </Dropdown.Menu>
                    </Dropdown></th>
                <th className="text-center"><Dropdown key="stars">
                      <Dropdown.Button flat color="warning" ><Text size={16} weight="extrabold">Stars</Text></Dropdown.Button>
                      <Dropdown.Menu variant="shadow" color="warning">
                        <Dropdown.Item key="sort button stars 1" ><button onClick={handleSortStarsA}>Sort Ascending - Stars</button></Dropdown.Item>
                        <Dropdown.Item key="sort button stars 2" ><button onClick={handleSortStarsD}>Sort descending - Stars</button></Dropdown.Item>
                        <Dropdown.Item key="sort button stars 3" ><button onClick={handleOriginalOrder}>Original Order</button></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown></th>
              </tr>
            </thead>
            
            <tbody>
            {achieves?.map((a, i) =>
                  (achieves) ?
                  <tr key={i} className="border-b-[.5px] border-gray-500/30">
                    <td className="">
                      <Text b size={13}
                        weight=""
                      >{a.name}</Text>
                      <Text size={12} weight='hairline'>{a.info}</Text>
                    </td>
                    <td className="">
                      <Text className="px-4" size={15} weight="semibold">{a.value}</Text>                      
                    </td>
                    <td className="whitespace-nowrap px-6">
                        {stars(a.stars)}
                    </td>  
                  </tr>: 
                  <tr key={"No Data"} className="">
                    <td> <Text size={18} weight="hairline">{"No Data"}</Text>
                      <Text size={12} weight='hairline'>{"No Data"}</Text>
                    </td>
                    <td>
                      <Text size={15} weight="semibold">{"No Data"}</Text>
                    </td>
                    <td >
                        {stars(3)}
                    </td>
                  </tr>
                  
                )}
              
              </tbody>
              </table>
              <Spacer y={0.5} />
              <Button
                className="sticky bottom-0 shadow-none w-full group"
                auto
                onClick={handleClickScroll}
                icon={<ChevronUp set="bold" primaryColor="grey"/>}
              > <Text size={10} weight="semibold" color="primary" className="opacity-60 group-hover:opacity-100">SCROLL BACK TO TOP</Text>
              </Button>
          </Collapse>
        </Collapse.Group>
      </main>
    </>
  );
}

export default Achievements;