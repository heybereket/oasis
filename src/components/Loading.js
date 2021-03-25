const Loading = ({ message }) => {
  return (
    <>
      <p className="loading">
        <strong>loading {message}...</strong>
      </p>

      <style jsx>
        {`
          .loading {
            text-align: center; 
          }
        `}
      </style>
    </>
  );
};

export default Loading;
