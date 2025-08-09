import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("TopWear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/products/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            } else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 p-4 sm:p-6 max-w-3xl mx-auto">

            {/* Upload Images */}
            <div className="w-full">
                <p className="mb-3 font-medium text-gray-700">Upload Images</p>
                <div className="flex gap-3 flex-wrap">
                    {[{ img: image1, set: setImage1, id: "image1" },
                    { img: image2, set: setImage2, id: "image2" },
                    { img: image3, set: setImage3, id: "image3" },
                    { img: image4, set: setImage4, id: "image4" }
                    ].map(({ img, set, id }) => (
                        <label htmlFor={id} key={id} className="w-20 h-20 border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 hover:border-gray-400 transition cursor-pointer">
                            <img src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" className="w-full h-full object-cover rounded-md" />
                            <input onChange={(e) => set(e.target.files[0])} type="file" id={id} hidden />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Name */}
            <div className="w-full">
                <p className="mb-2 text-gray-700">Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full max-w-[300px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    type="text"
                    placeholder="Type here"
                    required
                />
            </div>

            {/* Description */}
            <div className="w-full">
                <p className="mb-2 text-gray-700">Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full max-w-[300px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Drop description"
                    required
                />
            </div>

            {/* Category / Subcategory / Price */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                <div className="flex-1">
                    <p className="mb-2 text-gray-700">Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div className="flex-1">
                    <p className="mb-2 text-gray-700">Sub-Category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="winterwear">Winterwear</option>
                    </select>
                </div>

                <div className="flex-1">
                    <p className="mb-2 text-gray-700">Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        type="number"
                        placeholder="250"
                    />
                </div>
            </div>

            {/* Sizes */}
            <div className="w-full">
                <p className="mb-3 text-gray-700">Product Sizes</p>
                <div className="flex gap-3 flex-wrap">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(size)
                                        ? prev.filter((item) => item !== size)
                                        : [...prev, size]
                                )
                            }
                            className={`px-4 py-1 rounded-full text-sm cursor-pointer border transition ${sizes.includes(size)
                                    ? "bg-pink-100 text-pink-700 border-pink-300"
                                    : "bg-slate-200 text-gray-700 border-slate-300 hover:bg-slate-300"
                                }`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bestseller */}
            <div className="flex gap-2 items-center mt-2">
                <input
                    onChange={() => setBestseller((prev) => !prev)}
                    checked={bestseller}
                    type="checkbox"
                    id="bestseller"
                    className="accent-black"
                />
                <label htmlFor="bestseller" className="cursor-pointer text-gray-700">
                    Add to bestseller
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-black hover:bg-gray-900 text-white rounded-md px-5 py-3 mt-4 transition-all shadow-md w-full max-w-[200px] text-center"
            >
                Add New Piece
            </button>
        </form>

    )
}

export default Add