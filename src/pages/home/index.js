import { useRef, useState } from "react";
import { useClickOutside } from "../../helpers/clickOutside";
import Header from "../../components/Header";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const el = useRef(null);
  useClickOutside(el, () => setVisible(false));
  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
}
