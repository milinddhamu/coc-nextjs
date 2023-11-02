import { Button } from "@nextui-org/react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex flex-row w-full justify-center p-6 gap-2">
        <Link href="https://github.com/milinddhamu/coc-nextjs">
            <Button
              id="github"
              auto
              bordered
              css={{borderWidth:"0.5px",borderColor:"#6b728050"}}
              color="neutral"
              icon={<AiFillGithub className="scale-125"/>}
            />
          </Link>
          <Link href="https://github.com/milinddhamu/coc-nextjs">  
            <Button
              id="twitter"
              auto
              bordered
              css={{borderWidth:"0.5px",borderColor:"#6b728050"}}
              color="neutral"
              icon={<FaXTwitter className="scale-125"/>} >
                @milind_dhamu
            </Button>
            </Link>
      </div>
  );
}

export default Footer;