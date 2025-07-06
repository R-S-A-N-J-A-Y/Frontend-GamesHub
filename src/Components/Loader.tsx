const Loader = () => {
  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <section
        className="spinner-border"
        role="status"
        style={{ width: "3rem", height: "3rem", borderWidth: "8px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </section>
    </section>
  );
};

export default Loader;
