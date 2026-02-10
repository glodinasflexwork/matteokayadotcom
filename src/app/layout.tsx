import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
	title: "Matteo's Journey | 1st Birthday",
	description: "Celebrating the first year of blessings of our beloved son, Matteo Kaya Botez. Thank you for being part of his story.",
	keywords: ["birthday", "first birthday", "Matteo Kaya Botez", "celebration", "1st birthday", "baby"],
	authors: [{ name: "Kaya & Botez Family" }],
	robots: "index, follow",
	openGraph: {
		title: "Matteo's Journey | 1st Birthday 🎂",
		description: "Celebrating the first year of blessings of our beloved son, Matteo Kaya Botez.",
		type: "website",
		locale: "en_US",
		alternateLocale: ["nl_NL", "ro_RO"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Matteo's Journey | 1st Birthday",
		description: "Celebrating Matteo Kaya Botez's first year of blessings 🎂",
	},
};

export const viewport = {
	colorScheme: 'dark',
	themeColor: '#0B101A',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" style={{ backgroundColor: '#0B101A', colorScheme: 'dark' }}>
			<head>
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
				<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
			</head>
			<body
				className={`${inter.variable} antialiased`}
				style={{ backgroundColor: '#0B101A', color: '#e2e8f0' }}
			>
				{children}
			</body>
		</html>
	);
}
