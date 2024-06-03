// import React from 'react'
import Header from '../components/Header'
import PiCalculator from '../components/PiCalculator'
import SunCircumferenceCalculator from '../components/SunCircumferenceCalculator'
import { UserAuth } from '../context/AuthContext'

const Home = (): JSX.Element => {
  const { user } = UserAuth()

  return (
    <div className="h-screen bg-sky-100">
      <Header />
      <div className="grid sm:grid-cols-4 auto-rows-max p-3 max-h-screen">
        <div className="col-span-full bg-white mb-3 p-3 rounded-md row-span-5 ">
          <h1 className="text-2xl font-bold pb-2">Welcome {user && user.displayName}!</h1>
          <div className="p-4 bg-gray-200 rounded-md">
            <p className="max-h-[150px] overflow-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus corrupti, odit eius atque in officiis, repudiandae cupiditate temporibus alias magni rem nam est impedit ullam molestiae ipsa fugit nisi culpa eum eligendi deleniti incidunt quia qui commodi. Repudiandae dignissimos doloremque dolore in, quas illo ratione fugiat qui voluptatibus neque officia architecto molestiae sapiente aliquid eligendi ex deleniti praesentium minima tenetur! Accusantium odio ullam repellendus molestiae laboriosam eligendi eum! A nihil dolore consequuntur. Aut aspernatur repellat eligendi minima adipisci iusto nobis doloribus, quasi architecto vitae ab quod nesciunt impedit labore dolorum ipsum perspiciatis quae omnis magnam voluptatum, consequatur officia. Tempore, rem enim magni, quia velit consequuntur dicta excepturi quos quas eligendi aspernatur. Molestiae ipsa officia exercitationem atque laboriosam magni eaque placeat repellendus dignissimos maxime asperiores eum commodi deleniti magnam, tenetur aliquam in. Libero illum repellat nisi ratione vero consectetur quidem commodi unde ullam optio dolor laboriosam quam praesentium, at, eius a quo voluptatibus explicabo! Eligendi delectus totam vero ducimus ex odio minima sunt, natus nesciunt fugiat earum quidem pariatur officiis obcaecati necessitatibus ab in suscipit. Minima cumque illum laboriosam delectus corrupti aut reprehenderit doloribus. Itaque repellendus dolore omnis eligendi laboriosam nobis iure earum doloremque provident porro maxime sint at dolores maiores alias delectus deleniti animi ab odio perspiciatis, laborum dignissimos quo blanditiis! Rem, deleniti, officiis doloremque ipsa hic rerum fugit quo esse sapiente modi iste id eos, magnam eaque perferendis cupiditate sequi praesentium aliquam accusantium itaque corrupti facere maxime ducimus? Officia possimus fugit voluptates, nobis eos repellendus beatae eaque non consectetur animi voluptatum, dolor tempora sit velit assumenda voluptate modi tempore temporibus. Doloremque, debitis deserunt. Recusandae incidunt, sunt eveniet earum natus, nisi iure itaque qui magnam cupiditate obcaecati temporibus illum omnis voluptates nihil quo, reiciendis voluptatibus laudantium explicabo ducimus eos architecto consequatur similique. Nobis laudantium dolorem commodi perspiciatis fuga corrupti possimus! Vel, saepe impedit. Dicta temporibus ut eos nobis autem laudantium sit provident corporis? In omnis, sunt quaerat perspiciatis voluptates ducimus numquam explicabo voluptatibus facere amet, voluptatem ratione nemo iure fugiat doloremque vero iste quas obcaecati suscipit? Quis fugit amet minima architecto delectus molestias nesciunt esse enim tempora hic, sequi odio consequuntur a, aliquam, laboriosam quisquam ea officiis. Illo voluptas, rerum minima recusandae temporibus, soluta reprehenderit sapiente ea laboriosam totam architecto quos hic. Incidunt corporis ducimus et minus maxime at totam accusantium, similique eum autem expedita aspernatur necessitatibus explicabo ullam est sed sunt nisi ipsam molestiae! Ipsam numquam, doloribus deserunt amet voluptates magni illum eligendi inventore cumque molestiae perferendis consequatur aspernatur ducimus suscipit iusto praesentium debitis. Doloribus tempora sapiente quisquam. Perspiciatis obcaecati voluptate aliquid eligendi eveniet? Molestias rerum ratione dolorum, repellat ipsam a dicta consequatur mollitia, sequi eaque, veritatis aliquid architecto! Delectus id quasi laborum nam voluptas velit nemo! Laboriosam quas aut obcaecati rem vero est dicta libero fugit qui dolorum. Ad, saepe in culpa expedita mollitia deleniti, placeat reiciendis qui quam natus voluptatibus eius! Quis sint animi quae enim modi, ex quidem ipsum nostrum perferendis natus impedit sapiente, voluptate voluptatem vero doloremque eaque. Animi, beatae numquam. Officia necessitatibus asperiores in ipsa commodi, nostrum quam omnis vel numquam, beatae maxime aut facilis est molestiae quis cum possimus repudiandae! Sit optio maiores cumque, exercitationem pariatur id dignissimos provident, fugiat sunt consequuntur autem. Totam, omnis. Fugit, ea neque error perspiciatis repellat doloribus molestiae cum facere impedit sapiente ipsum maxime officiis vero nam autem corporis quidem similique ut.</p>
          </div>
        </div>
        <div className="sm:col-span-3 col-span-full bg-white sm:mr-3 mr-0 sm:mb-0 mb-4 p-4 rounded-md">
          <PiCalculator />
        </div>
        <div className="sm:max-h-screen max-h-[300px] sm:col-span-1 col-span-full bg-white p-4 rounded-md">
          <SunCircumferenceCalculator />
        </div>
      </div>
    </div>
  )
}

export default Home