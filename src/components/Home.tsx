function Home() {
  return (
    <div className="container">
      <div className="text-center">
        <h1>Simple Flashcard</h1>
        <h5>Powered with React + Firebase🔥</h5>
      </div>
      <div className="card mt-5 text-center">
        <div className="card-body">
          <h5 className="card-title">Simple Flashcard</h5>
          <p className="card-text">
            Simple Flashcard dibuat karena gabut aja :P
          </p>
          <a href="/latihan" className="btn btn-primary">
            Let's Start
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
