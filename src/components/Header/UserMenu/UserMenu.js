import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setVisibleMenu } from "store/headerSlice";
import MenuItem from "./MenuItem";
import SubUserMenu from "./SubUserMenu";

export default function UserMenu({ user }) {
  const visibleMenu = useSelector((state) => state.header.visibleMenu);
  const dispatch = useDispatch();

  return (
    <div className="mmenu">
      {visibleMenu === null && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="" />
            <div className="mmenu_col">
              <span>
                {user?.first_name}
                {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Give feedback</div>
              <div className="mmenu_span2">Help us improve facebook</div>
            </div>
          </div>
          <div className="mmenu_splitter"></div>

          <MenuItem
            icon={"settings_filled_icon"}
            title={"Settings & privacy"}
            onClick={() =>
              dispatch(
                setVisibleMenu({
                  menu: "Settings & privacy",
                  data: [
                    { icon: "settings_filled_icon", title: "Settings" },
                    { icon: "privacy_checkup_icon", title: "Privacy Checkup" },
                    {
                      icon: "privacy_shortcuts_icon",
                      title: "Privacy Shortcuts",
                    },
                    { icon: "activity_log_icon", title: "Activity log" },
                    { icon: "news_icon", title: "News Feed Prefrences" },
                    { icon: "language_icon", title: "Language" },
                  ],
                })
              )
            }
            visible={visibleMenu}
          />
          <MenuItem
            icon={"help_filled_icon"}
            title={"Help & support"}
            onClick={() =>
              dispatch(
                setVisibleMenu({
                  menu: "Help & support",
                  data: [
                    { icon: "help_center_icon", title: "Help Center" },
                    { icon: "email_icon", title: "Support Inbox" },
                    {
                      icon: "info_filled_icon",
                      title: "Report a Problem",
                    },
                  ],
                })
              )
            }
          />
          <MenuItem
            icon={"dark_filled_icon"}
            title={"Display & Accessibility"}
            onClick={() =>
              dispatch(
                setVisibleMenu({
                  menu: "Display & Accessibility",
                  data: [
                    {
                      icon: "dark_filled_icon",
                      title: "Dark Mode",
                      description:
                        "Adjust the appearance of Facebook to reduce glare and give your eyes a break.",
                      subOption: [{ off: true }, { on: false }],
                    },
                    {
                      icon: "compact_icon",
                      title: "Compact mode",
                      description:
                        "Make your font size smaller so more content can fit on the screen.",
                      subOption: [{ off: true }, { on: false }],
                    },
                  ],
                })
              )
            }
          />
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visibleMenu !== null && <SubUserMenu />}
    </div>
  );
}
