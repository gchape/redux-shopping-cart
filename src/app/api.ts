export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  imageAlt: string;
  imageCredit: string;
}

export async function getProducts(): Promise<Product[]> {
  return await fetch("/products.json", {
    method: "GET",
    mode: "same-origin",
  })
    .then((resp) => resp.json())
    .catch((error) => console.warn(error));
}

export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; message?: string };

export async function checkout(items: CartItems): Promise<CheckoutResponse> {
  const modifier = Object.keys(items).length > 0 ? "success" : "error";
  const url = `/checkout-${modifier}.json`;

  await sleep(500);

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(items),
  })
    .then((resp) => resp.json() as Promise<CheckoutResponse>)
    .catch((error: CheckoutResponse) => {
      throw new Error(error.message);
    });
}

// utility function to simulate slowness in an API call
const sleep = (time: number) => new Promise((res) => setTimeout(res, time));
