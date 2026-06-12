import React from "react";

type NavbarProps = {
	title: string;
	subtitle: string;
	total: number;
};

function Navbar({ title, subtitle, total }: NavbarProps) {
	return (
		<header className="navbar">
			<div>
				<p className="navbar-kicker">Student management</p>
				<h1>{title}</h1>
				<p className="navbar-subtitle">{subtitle}</p>
			</div>
			<div className="navbar-badge">
				<span>{total}</span>
				<small>records</small>
			</div>
		</header>
	);
}

export default Navbar;
