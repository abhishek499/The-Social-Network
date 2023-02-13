export default function MenuItem({ icon, title, onClick }) {
  return (
    <div className={`mmenu_item hover3`} onClick={() => onClick && onClick()}>
      <div className="small_circle">
        <i className={icon}></i>
      </div>
      <span>{title}</span>
      {onClick && (
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      )}
    </div>
  );
}
