import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { Header } from "../_components/header";
import { OrderItem } from "./_components/order-item";

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
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="font-semibold">Meus pedidos</h2>

        <div className="mt-2 space-y-3">
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
