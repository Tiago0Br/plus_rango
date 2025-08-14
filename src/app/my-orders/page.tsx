import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { Header } from "@/components/header";
import { OrderItem } from "@/components/my-orders/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus pedidos</h2>

        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
