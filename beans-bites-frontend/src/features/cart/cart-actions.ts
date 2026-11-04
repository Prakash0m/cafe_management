import { toast } from "sonner";
import { FoodItem } from "@/types/menu.types";
import { useCartStore } from "@/store/cart.store";

export function handleAddToCart(item: FoodItem, quantity: number = 1) {
  useCartStore.getState().addItem(item, quantity);
  toast.success(`Added ${quantity > 1 ? `${quantity}x ` : ""}${item.name} to cart!`, {
    description: `NPR ${item.price * quantity} • View cart to review order`,
    duration: 3000,
    action: {
      label: "View Cart",
      onClick: () => {
        window.location.href = "/cart";
      },
    },
  });
}

