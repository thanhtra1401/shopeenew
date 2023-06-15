function Avatar({
  children,
  className,
}: {
  children: JSX.Element;
  className: string;
}) {
  return (
    <div className={`flex-center cursor-pointer ${className}`}>
      <div className="mr-2 h-6 w-6 flex-shrink-0">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7uUQCPN7lnbXiGu3yjuW82-8lVqCSlsQrg&usqp=CAU"
          alt="avatar"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <p className="text-white/80">nguyenthanhtra</p>
      {children}
    </div>
  );
}

export default Avatar;
