"use client"

import client from "@/lib/graphql-client"
import { UpdateProduct } from "@/types"
import { useMutation, useQuery } from "@apollo/client/react"
import gql from "graphql-tag"
import { useParams } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $title: String!
    $description: String!
    $price: Float!
    $_id: ID!
  ) {
    editProduct(
      title: $title
      description: $description
      price: $price
      _id: $_id
    ) {
      price
      description
      title
    }
  }
`

const PRODUCT_QUERY = gql`
  query getProduct($productId: ID!) {
    product(_id: $productId) {
      description
      _id
      title
      price
    }
  }
`

const ProductForm = () => {
  const { id } = useParams()
  const [productForm, setProductForm] = useState<UpdateProduct>({
    price: 0,
    description: "",
    title: "",
    id: "",
  })

  const { data: product } = useQuery<{
    price: number
    description: string
    title: string
    _id: string
  }>(PRODUCT_QUERY, {
    client,
    variables: { productId: id },
  })

  useEffect(() => {
    if (product) {
      //  const p = product as {
      //    price: number
      //    description: string
      //    title: string
      //    _id: string
      //  }

      //  setProductForm({
      //    price: p?.price,
      //    description: p?.description,
      //    title: p?.title,
      //    id: String(p?._id),
      //  })

      setProductForm({
        price: product?.price,
        description: product?.description,
        title: product?.title,
        id: String(product?._id),
      })
    }
  }, [product])

  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_MUTATION, {
    client,
  })

  const handleProductUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    updateProduct({
      variables: {
        title: productForm.title,
        description: productForm.description,
        price: productForm.price,
        _id: productForm.id,
      },
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  return (
    <div className="flex items-center justify-between h-screen p-5 md:p-10">
      <form
        onSubmit={handleProductUpdate}
        className="max-w-xl w-full m-auto shadow rounded p-4"
      >
        <h3 className="font-semibold">Update Product</h3>
        <p className="text-sm">Enter new product details</p>

        <div className="flex flex-col mt-6 gap-4">
          <div className="flex gap-4 items-center">
            <input
              value={productForm.title}
              onChange={handleInputChange}
              name="title"
              required
              type="text"
              placeholder="Product Title"
              className="rounded border border-gray-300 outline-none px-2 text-sm h-10 focus:border-blue-800 flex-2"
            />
            <input
              value={productForm.price}
              onChange={handleInputChange}
              name="price"
              type="number"
              required
              placeholder="Product Price"
              className="rounded border border-gray-300 outline-none px-2 text-sm h-10 focus:border-blue-800 flex-1"
            />
          </div>
          <input
            value={productForm.description}
            onChange={handleInputChange}
            type="text"
            name="description"
            placeholder="Product Description"
            className="rounded border border-gray-300 outline-none px-2 text-sm h-10 focus:border-blue-800"
          />

          <button className="h-12 rounded bg-blue-800 font-medium text-white">
            {loading ? "Updating..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
