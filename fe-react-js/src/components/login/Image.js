function Image({ logo, title, width, height, mode }) {
  return (
    <div
      className={`flex flex-col justify-center text-center justify-items-center m-auto w-auto h-auto lg:w-[80%] lg:h-[80%] $${mode}`}
    >
      <h2 className="text-center sm:text-xl md:text-2xl lg:text-3xl font-bold">{title}</h2>
      <div className="flex justify-center">
        <img className="sm:w-[60%] md:w-[40%] lg:w-[100%]" src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Image;
