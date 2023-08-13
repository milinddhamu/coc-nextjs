import { Text, Card, Image, Row, Spacer } from '@nextui-org/react'

const ToolTip = ({ a,level }) => {
  return (
    <>
      <Card css={{
        border: "none",
        marginBottom: "7px",
        marginTop: "2px",
        maxWidth: "350px",
        minWidth: "200px",
        overflow: "visible",
        position: "relative",
        borderRadius:"8px"
      }}
      >
        <Spacer y={7} />
        <div className="absolute z-0 bg-black/20 w-full">
          <Card.Image
            src={a.modelUrl}
            objectFit="contain"
            width="100%"
            height={150}
            className="scale-150"
            alt={a.id}
          />
        </div>
        <Spacer y={1.5} />
        <Card.Body css={{
          backdropFilter: "blur(6px)",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)", padding: "10px 10px"
        }}>
          <Text h6 b size={15}>{a.id}</Text>
          {a.superTroopLevel <= level ? <Text size={13} color="warning">{`Super ${a.id} - available !`}</Text> : a.superTroop ? <><Text size={13} color="warning">{`Unlock Super ${a.id} at Level ${a.superTroopLevel}`}</Text></> : <></>}
          <Text css={{ color: "$accents7", fontWeight: "$hairline", fontSize: "$xs", textAlign: "justify", letterSpacing: "-0.05em", lineHeight: "1", }} >
            {a.des}
          </Text>

        </Card.Body>
      </Card>
    </>
  );
}

export default ToolTip;