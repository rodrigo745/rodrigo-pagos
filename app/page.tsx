import Image from "next/image";
import { redirect } from "next/navigation";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });


export default function Home() {

  async function donar(formData: FormData){
    "use server";
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "donacion",
            title: formData.get("mensaje") as string,
            quantity: 1,
            unit_price: Number(formData.get("valor"))
          }
        ],
      }
    })
    
    redirect(preference.sandbox_init_point!);

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
     <form action={donar}>
        <div className="flex flex-col bg-slate-400 p-4 rounded-md">
          <h2 className="mb-3 text-white font-medium">Donaciones</h2>
          <input type="number" name="valor" placeholder="Valor"
            className="p-2 mb-4 rounded-md"/>
          <textarea name="mensaje" placeholder="Motivo de la donación"
            className="p-2 rounded-md"/>
          <button type="submit" className="bg-cyan-900 p-1 text-white mt-4 rounded-md">Enviar</button>
        </div>

      </form>

    </main>
  );
}
