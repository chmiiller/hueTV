const QR_COFFEE_URL = `https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/d7/b5/cb/d7b5cbcd-ff98-10d3-5596-5dcc4a8d0eac/source/256x256bb.jpg`;

export const QRCode = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(248, 248, 248, 0.1)',
        width: 200
      }}>
      <img src={QR_COFFEE_URL} alt="Buy me a coffee" style={{
        width: 200,
        height: 200,
        borderRadius: 12
      }}/>
      <p style={{ fontSize: 14, lineHeight: 1}}>buy me a coffee</p>
    </div>
  );
};
