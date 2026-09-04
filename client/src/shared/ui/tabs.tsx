export const TabCategory = () => {
  return (
    <ul className="flex items-center gap-2">
      <li className="p-4 rounded-full hover:bg-foreground hover:text-background cursor-pointer duration-100">Пиццы</li>
      <li className="p-4 rounded-full hover:bg-foreground hover:text-background cursor-pointer duration-100">Комбо</li>
      <li className="p-4 rounded-full hover:bg-foreground hover:text-background cursor-pointer duration-100">Закуски</li>
      <li className="p-4 rounded-full hover:bg-foreground hover:text-background cursor-pointer duration-100">Напитки</li>
    </ul>
  );
};
