function FilesList({ className, children }) {
  return <ul className={`w-auto h-[calc(100vh-60px-16px-48px)] mx-5 my-2 ${className}`}>{children}</ul>;
}

export default FilesList;
