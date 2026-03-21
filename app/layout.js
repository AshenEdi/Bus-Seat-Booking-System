import "./globals.css";

export const metadata = {
  title: "Bus Seat Booking System",
  description: "Book seats, manage routes, and store bookings in MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
