"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ReactNode } from "react";
import clsx from "clsx"

import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();

  return (
    <div className={clsx("main-layout")}>
      {/* Header */}
      <header className={clsx("header")}>
        <nav className="navbar navbar-expand-lg border-bottom px-4 py-2">
          <Link className="navbar-brand fw-bold" href="/">
            <Image
              src="/images/logo-lg.png"
              alt="WX logo"
              width={50}
              height={50}
              priority 
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            ☰
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto gap-4">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  {t("layout.header.home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Vision & Mission
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about-us">
                  About us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Shop/Buy <span style={{ marginLeft: "1rem" }}>▼</span>
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/product-list">
                      Suit
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Trouser Only
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Shirt Only
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Blog
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  <img src="/images/icons/Search.png" alt="search icon" /> Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                <img src="/images/icons/ShoppingCart.png" alt="shopping cart icon" /> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                <img src="/images/icons/Person.png" alt="person icon" /> Profile
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className={clsx("main-content", "container-fluid p-0")}>{children}</main>

      <footer className={clsx("main-footer","py-4")}>
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div>
            <Image
              src="/images/logo-lg.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>

          {/* Left Links */}
          <ul className="list-unstyled text-start">
            <li className="mb-2">
              <Link href="/" className="text-decoration-none">
                VyvyStyles.shop
              </Link>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Vision & Mission
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                About us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Product
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Blog
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Contact
              </a>
            </li>
          </ul>

          {/* Right Links */}
          <ul className="list-unstyled text-start">
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Style & Trends
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                The Bespoke Experience
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Professional Insights
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none">
                Sustainability & Ethics
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
