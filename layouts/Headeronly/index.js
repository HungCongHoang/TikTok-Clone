import Header from "../../layouts/components/Header/Header";

function Headeronly({ children }) {
  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "60px",
          backgroundColor: "rgb(248, 248, 248)",
          //height: '618px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Headeronly;
