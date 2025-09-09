import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/models/Product"

export const dynamic = "force-static"

export const GET = async () => {
  await dbConnect()

  const products = await ProductModel.find().lean()

  return Response.json({ products })
}

export const POST = (request: Request) => {}

export const DELETE = () => {}
