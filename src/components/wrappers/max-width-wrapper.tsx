const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-xl w-full mx-auto flex items-center justify-center">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
