import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Matteo Kaya Botez | Baptism Ceremony",
	description: "You are invited to witness the holy baptism of Matteo Kaya Botez on Saturday, February 7, 2026 at the Romanian Orthodox Church of St Gregory the Theologian in Schiedam.",
	keywords: ["baptism", "botez", "Matteo Kaya Botez", "Romanian Orthodox", "Schiedam", "ceremony"],
	openGraph: {
		title: "Matteo Kaya Botez | Baptism Ceremony",
		description: "Join us for the holy baptism of Matteo Kaya Botez on February 7, 2026",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
