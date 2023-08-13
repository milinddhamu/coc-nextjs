import { Text, Image,Textarea,Dropdown,Spacer,Badge,Grid,Container,Input,Card,Button,Row,Col } from "@nextui-org/react";

const CommentsCard = () => {
  return (
    <Card  className="border-[.5px] border-gray-500/20">
      <div className="flex flex-col px-4 pb-3 pt-2 w-full justify-center items-center">
        <div className="w-full flex flex-row justify-between">
          <Text size={12}>Avatar and name</Text>
          <Text size={12}>July 18, 2023</Text>
        </div>
        <div className="text-justify p-1 border-l border-gray-500/90">
        <Text size={14}>
Labore esse reprehenderit aliquip eu ipsum quis reprehenderit elit ex labore sunt magna. Laborum ullamco reprehenderit ea ex incididunt commodo. Do cillum Lorem voluptate id sunt. Et amet mollit proident pariatur qui esse aliquip enim dolor quis consequat quis irure proident.</Text></div>
      </div>
    </Card>
  );
}

export default CommentsCard;