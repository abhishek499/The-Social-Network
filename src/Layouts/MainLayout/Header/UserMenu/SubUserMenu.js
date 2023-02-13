import { useDispatch, useSelector } from "react-redux";
import { setVisibleMenu } from "store/headerSlice";
import HeadingMenu from "./HeadingMenu";
import MenuItem from "./MenuItem";

export default function SubUserMenu() {
  const Menu = useSelector((state) => state.header.activeMenuData);
  const Name = useSelector((state) => state.header.visibleMenu);
  const dispatch = useDispatch();
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() =>
            dispatch(
              setVisibleMenu({ menu: null, data: [{ icon: "", title: "" }] })
            )
          }
        >
          <i className="arrow_back_icon"></i>
        </div>
        {Name}
      </div>
      {Menu.map((item) => (
        <>
          {!item.subOption ? (
            <MenuItem icon={item.icon} title={item.title} />
          ) : (
            <>
              <HeadingMenu
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
              <label htmlFor="darkOff" className="hover1">
                <span>Off</span>
                <input type="radio" name="dark" id="darkOff" />
              </label>
              <label htmlFor="darkOn" className="hover1">
                <span>On</span>
                <input type="radio" name="dark" id="darkOn" />
              </label>
            </>
          )}
        </>
      ))}
    </div>
  );
}
