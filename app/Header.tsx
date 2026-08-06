"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IcCard, IcDots, IcBubble, IcLockTiny, IcClose, IcMenuUser, IcMenuHelp, IcMenuFeedback, IcLogout } from "./account/icons";

export default function Header({ 
  onMessengerClick, 
  onManageAccountClick 
}: { 
  onMessengerClick?: () => void; 
  onManageAccountClick?: () => void; 
}) {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="acc-top">
        <div className="acc-balance">
          <span className="b-alfa">Альфа</span>
          <span className="b-div" />
          <span className="b-amount"><IcCard /> 490 000 ₽</span>
          <span className="b-div" />
          <img src="/img/Overdraft.png" alt="Overdraft" style={{ width: 25, height: 16, display: "block", objectFit: "contain" }} />
        </div>
        <div className="acc-top-right">
          <button className="acc-iconbtn"><IcDots /></button>
          <button className="acc-iconbtn" onClick={() => {
            if (onMessengerClick) onMessengerClick();
          }}><img src="/img/Messenger.png" alt="Messenger" style={{ width: 20, height: 20, display: "block" }} /></button>
          <img
            className="acc-avatar"
            src="/img/avatar-sm.png"
            alt=""
            onClick={() => setMenu((v) => !v)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {menu && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 55 }} onClick={() => setMenu(false)} />
          <div className="acc-menu">
            <div className="mn-top">
              <span className="mn-lock"><img src="/img/user-menu/Lock.png" alt="" width={18} height={18} style={{ display: "block" }} /></span>
              <button className="mn-x" onClick={() => setMenu(false)}><IcClose size={18} /></button>
              <img className="mn-av" src="/img/avatar.png" alt="" />
              <div className="mn-name">Иван Вознесенский</div>
              <div className="mn-phone">+7 913 ***-**-96</div>
            </div>
            <div className="mn-sep" />
            <Link
              href="/account"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setMenu(false);
                if (onManageAccountClick) {
                  onManageAccountClick();
                }
              }}
            >
              <img src="/img/user-menu/Account.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} /> Управление аккаунтом
            </Link>
            <Link href="/company" style={{ cursor: "pointer" }} onClick={() => setMenu(false)}>
              <img src="/img/vneshtat12/People.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} /> Компания
            </Link>
            <a style={{cursor: 'pointer'}}>
              <img src="/img/user-menu/Help.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} /> Справка
            </a>
            <a style={{cursor: 'pointer'}}>
              <img src="/img/user-menu/Messenger.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} /> Обратная связь
            </a>
            <Link href="/" className="red"><IcLogout /> Выйти из аккаунта</Link>
          </div>
        </>
      )}
    </>
  );
}
