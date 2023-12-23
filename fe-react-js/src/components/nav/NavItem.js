import { Link } from 'react-router-dom';

function NavItem({ item, active }) {
  return (
    <li className="w-full h-auto leading-auto my-2">
      <Link
        className={`w-full h-full flex items-center hover:bg-[#1F2937] px-2 py-1 rounded-xl ${
          active === item.keyActive && 'bg-[#1F2937]'
        }`}
        to={item.link}
      >
        <div className="w-10 ">{item.icon()}</div>
        <div className="px-2 flex-1 py-auto">{item.name}</div>
      </Link>
    </li>
  );
}

export default NavItem;
