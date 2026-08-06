import Link from "next/link";
import {
  IcDesk, IcChat, IcSearch, IcOrders, IcWidgets, IcCalendar, IcArchive, IcPlane,
} from "./icons";

export default function Sidebar({ active, tripTitle }: { active?: string; tripTitle?: string }) {
  const cls = (name: string) => (active === name ? "active" : undefined);
  return (
    <aside className="acc-side">
      <div className="acc-logo">
        <img src="/img/Union.png" alt="" />
        <span>Внештат</span>
      </div>
      <nav className="acc-nav">
        <Link href="/dashboard" className={cls("desk")}><IcDesk /> Рабочий стол</Link>
        <Link href="/chat" className={cls("chat")}><IcChat /> Новый чат</Link>
        <Link href="/search" className={cls("search")}><IcSearch /> Поиск в чатах</Link>
        <Link href="/orders" className={cls("orders")}><IcOrders /> Заказы</Link>
        <div className="acc-sep" />
        <Link href="/widgets" className={cls("widgets")}><IcWidgets /> Виджеты</Link>
        <a className={cls("calendar")}><IcCalendar /> Календарь</a>
        <div className="acc-sep" />
      </nav>
      <nav className="acc-nav acc-trip">
        <Link href="/trip" className={cls("trip")}>Поездка <span><IcPlane /></span></Link>
        <a>Идея поездки <span><IcPlane /></span></a>
        {tripTitle ? (
          <a className="active">{tripTitle} <span><IcPlane /></span></a>
        ) : (
          <a>Новый чат</a>
        )}
      </nav>
      <div className="acc-side-bottom">
        <div className="acc-sep" />
        <nav className="acc-nav">
          <a><IcArchive /> Archive</a>
        </nav>
      </div>
    </aside>
  );
}
