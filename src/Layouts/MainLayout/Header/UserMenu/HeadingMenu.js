export default function HeadingMenu({ icon, title, onClick, description }) {
  return (
    <div className={`mmenu_item`} onClick={() => onClick && onClick()}>
      <div className="small_circle" style={{ width: "50px" }}>
        <i className={icon}></i>
      </div>
      <div className="mmenu_col">
        <span>{title}</span>
        <span className="mmenu_span2">{description}</span>
      </div>
      {onClick && (
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      )}
    </div>
  );
}
