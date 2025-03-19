// eslint-disable-next-line @typescript-eslint/no-var-requires
const QR_COFFEE_URL = require(`./qrbmc.png`);

export const QRCode = (): React.ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(248, 248, 248, 0.1)",
        width: 200,
      }}
    >
      <img
        src={QR_COFFEE_URL}
        alt="Buy me a coffee"
        style={{
          width: 200,
          height: 200,
          borderRadius: 12,
        }}
      />
      <p style={{ fontSize: 14, lineHeight: 1 }}>buy me a coffee</p>
    </div>
  );
};
