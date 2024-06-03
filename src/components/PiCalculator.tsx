import React from 'react'

const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cupiditate debitis illum consectetur nobis dolorum laboriosam nemo. Minus doloribus praesentium laboriosam ut, ducimus voluptatum soluta pariatur ea sint asperiores architecto dicta ipsum, explicabo, similique nemo laudantium! Vitae illum fugit dolorum totam amet fuga iste architecto mollitia, numquam rerum quae doloremque blanditiis, libero magnam voluptate perspiciatis eveniet magni earum. Ex perferendis adipisci veritatis fugiat nam placeat necessitatibus natus, non hic, excepturi eveniet, et voluptatibus a. Ipsa eos placeat nulla esse impedit dolor harum sit dolorem adipisci perferendis quae non nihil tempore maxime odit, eveniet dolorum, autem architecto libero accusantium similique odio expedita nemo ducimus. Ad culpa, debitis quo recusandae voluptatum, itaque consequuntur veritatis, laborum dicta maiores deserunt rem! Illum repudiandae nemo sint, voluptas mollitia natus ea quae quam odio nam qui et quos enim praesentium ut laborum magni!"

const PiCalculator = (): JSX.Element => {
    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">PI to N Decimal Calculator</h1>
                <div>
                    <button className="border-blue-400 bg-green-400 hover:bg-green-500 max-w-[100px] p-3 my-3 mr-2 text-white cursor-pointer rounded-lg">Copy</button>
                    <button className="border-blue-400 bg-blue-400 hover:bg-blue-600 max-w-[100px] p-3 my-3 text-white cursor-pointer rounded-lg">Fetch</button>
                </div>
            </div>
            <textarea className="p-4 w-full bg-gray-200 rounded-md resize-none border-solid border-2 border-gray-400" cols={100} rows={10} defaultValue={text}></textarea>
        </div>
    )
}

export default PiCalculator