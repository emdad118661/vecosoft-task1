export const orderStates = {
  delayed: {
    id: "ORD-992831",
    status: "Delayed",
    statusColor: "text-orange-600",
    eta: "Revised: Oct 28, 2023",
    alertMessage: "We're sorry! Your package is running late due to heavy traffic conditions.",
    actionButton: "Contact Support",
    product: { name: "Sony WH-1000XM5 Headphones", price: "$348.00", image: "https://via.placeholder.com/60" },
    timeline: [
      { label: "Order Placed", date: "Oct 20", status: "completed" },
      { label: "Processing", date: "Oct 21", status: "completed" },
      { label: "Shipped", date: "Oct 22", status: "completed" },
      { label: "Delayed", date: "Today", status: "error" },
    ]
  },
  delivered_not_received: {
    id: "ORD-992831",
    status: "Delivered",
    statusColor: "text-green-600",
    eta: "Delivered on Oct 22",
    alertMessage: "System shows delivered. If you haven't received it, check with your security or neighbors.",
    actionButton: "Report Not Received",
    product: { name: "Sony WH-1000XM5 Headphones", price: "$348.00", image: "https://via.placeholder.com/60" },
    timeline: [
      { label: "Order Placed", date: "Oct 20", status: "completed" },
      { label: "Processing", date: "Oct 21", status: "completed" },
      { label: "Shipped", date: "Oct 22", status: "completed" },
      { label: "Delivered", date: "Oct 22", status: "completed" },
    ]
  },
  no_tracking: {
    id: "ORD-992831",
    status: "Order Confirmed",
    statusColor: "text-blue-600",
    eta: "Pending",
    alertMessage: "We've received your order. Tracking details will be available once the item is shipped.",
    actionButton: "View Order Details",
    product: { name: "Sony WH-1000XM5 Headphones", price: "$348.00", image: "https://via.placeholder.com/60" },
    timeline: [
      { label: "Order Placed", date: "Oct 20", status: "completed" },
      { label: "Processing", date: "Awaiting", status: "pending" },
      { label: "Shipped", date: "--", status: "pending" },
      { label: "Delivered", date: "--", status: "pending" },
    ]
  }
};